import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/Colors';
import {IExercises} from './Home';
import Spinner from 'react-native-loading-spinner-overlay/lib';
const ViewAllExercise = () => {
  const [exercises, setExercises] = useState<IExercises[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [refreshingList, setRefreshingList] = useState<boolean>(false);
  const getExercises = async () => {
    setLoader(true);
    setRefreshingList(true);
    await firestore()
      .collection('Exercises')
      .get()
      .then(res => {
        const data = res.docs.map(x => x.data());
        setExercises(data as IExercises[]);
      })
      .catch(err => {
        console.log(err, 'on exercises fetch error');
      });
    setLoader(false);
    setRefreshingList(false);
  };
  useEffect(() => {
    getExercises();
  }, []);
  const navigation = useNavigation<ReactNavigation.RootParamList | any>();
  const [selectedTag, setSelectedTag] = React.useState<number>(0);
  const [tags] = React.useState([
    'All exercises',
    'Beginner',
    'Medium',
    'Beginner',
  ]);
  return (
    <View style={styles.container}>
      {loader && (
        <Spinner
          visible={loader}
          textStyle={{color: Colors.WHITE}}
          textContent={'Loading...'}
          overlayColor={'#222332'}
          customIndicator={<ActivityIndicator color={'#9662F1'} size="large"/>}
        />
      )}
      {!loader && (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack(null)}>
              <Image source={require('../../assets/images/backButton.png')} />
            </TouchableOpacity>

            <View>
              <Text style={{color: Colors.WHITE}}>Exercises</Text>
            </View>
            <View></View>
          </View>
          <View style={styles.searchSection}>
            <Image
              style={styles.searchIcon}
              source={require('../../assets/images/search.png')}
            />
            <TextInput
              style={styles.input}
              placeholder="Search something"
              autoFocus={false}
              placeholderTextColor={Colors.WHITE}
              onChangeText={searchString => console.log(searchString)}
            />
          </View>
          <View style={{marginTop: 5}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {tags.map((x, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedTag(index)}>
                    <LinearGradient
                      style={styles.tags}
                      start={{x: 1, y: 1}}
                      end={{x: 1, y: 0}}
                      colors={
                        selectedTag === index
                          ? ['#332B8A', '#905DE9']
                          : ['#2D3450', '#2D3450', '#2D3450']
                      }>
                      <Text style={styles.tagText}>{x}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View style={{flex: 1}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  tintColor={Colors.WHITE}
                  refreshing={refreshingList}
                  onRefresh={getExercises}
                />
              }>
              {exercises.map((x, index) => {
                return (
                  <TouchableOpacity key={index} style={styles.list}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <LinearGradient
                          start={{x: 1, y: 1}}
                          end={{x: 1, y: 0}}
                          colors={['#CAD0D8', '#CAD0D8']}
                          style={styles.iconContainer}>
                          <Image
                            style={{height: 30, width: 43}}
                            source={{uri: x.image}}
                          />
                        </LinearGradient>
                        <View style={{marginLeft: 10}}>
                          <Text style={styles.titleText}>{x.name}</Text>
                          <Text style={styles.secondaryText}>2 workouts</Text>
                        </View>
                      </View>
                      <View>
                        <Image
                          source={require('../../assets/images/warning.png')}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222332',
  },
  tags: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  tagText: {
    color: Colors.WHITE,
    fontSize: 12,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 7,
    marginRight: 7,
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 8,
    color: Colors.WHITE,
    backgroundColor: '#2D3450',
  },
  iconContainer: {
    width: '10%',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    height: 15,
    width: 15,
  },
  titleText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryText: {
    fontSize: 14,
    color: '#F1F4F8',
  },
  list: {
    flex: 1,
    backgroundColor: '#2D3450',
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    paddingTop: 7,
    paddingRight: 7,
    paddingBottom: 7,
    paddingLeft: 0,
    margin: 5,
    fontSize: 14,
    backgroundColor: '#2D3450',
    color: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
export default ViewAllExercise;
