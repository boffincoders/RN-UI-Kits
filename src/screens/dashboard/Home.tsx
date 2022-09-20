import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppButton from '../../components/AppButton';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../../constants/Colors';
import {IUserType} from '.';
import Spinner from 'react-native-loading-spinner-overlay/lib';
let categories = [
  {
    name: 'Cardio',
    icon: require('../../assets/images/run.png'),
  },
  {
    name: 'Yoga',
    icon: require('../../assets/images/yoga.png'),
  },
  {
    name: 'Strech',
    icon: require('../../assets/images/exe.png'),
  },
  {
    name: 'Gym',
    icon: require('../../assets/images/lifter.png'),
  },
];

export const exercises = [
  {
    name: 'Front and Back Lunge',
  },
  {
    name: 'Side Plank',
  },
  {
    name: 'Arm circles',
  },
  {
    name: 'Sumo Squat',
  },
];
export type IPropsUserInfo = {
  currentUser: IUserType;
};
export interface IExercises {
  name: string;
  id: string;
  image: string;
}
const Home = (props: IPropsUserInfo) => {
  const [exercises, setExercises] = useState<IExercises[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const getExercises = () => {
    setLoader(true);
    firestore()
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
  };

  useEffect(() => {
    getExercises();
  }, []);
  const navigation = useNavigation<ReactNavigation.RootParamList | any>();
  return (
    <View style={styles.container}>
      <Spinner
        visible={loader}
        textStyle={{color: Colors.WHITE}}
        textContent={'Loading...'}
        overlayColor={'#222332'}
        customIndicator={<ActivityIndicator color={'#9662F1'} />}
      />
      {!loader && (
        <>
          <View style={styles.header}>
            <Text style={styles.user}>
              Hi,
              {props.currentUser?.fullName || props?.currentUser?.displayName}
            </Text>
            <LinearGradient
              start={{x: 1, y: 1}}
              end={{x: 1, y: 0}}
              colors={['#332B8A', '#905DE9']}
              style={styles.iconContainer}>
              <TouchableOpacity>
                <Image source={require('../../assets/images/noti.png')} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
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
            <View style={styles.bodyHead}>
              <Text style={styles.category}>Category</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ViewAllCategory')}>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categoryContainer}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled={false}>
                {categories.map((x, i) => {
                  return (
                    <LinearGradient
                      key={i}
                      start={{x: 1, y: 1}}
                      end={{x: 1, y: 0}}
                      colors={['#332B8A', '#905DE9']}
                      style={styles.iconContainer}>
                      <Image source={x.icon} />
                      <Text style={{color: Colors.WHITE, fontSize: 14}}>
                        {x.name}
                      </Text>
                    </LinearGradient>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <LinearGradient
                colors={['#332B8A', '#905DE9']}
                style={styles.toning}>
                <View>
                  <Text style={{fontSize: 20, color: Colors.WHITE}}>
                    Full Body Toning
                  </Text>
                  <Text style={{fontSize: 20, color: Colors.WHITE}}>
                    Workout
                  </Text>
                  <Text style={{color: '#F1F4F8', fontSize: 14, marginTop: 10}}>
                    Includes circuits to work
                  </Text>
                  <Text style={{color: '#F1F4F8', fontSize: 14}}>
                    every muscle
                  </Text>
                  <View style={{marginTop: 10}}>
                    <AppButton title="Start Training" width={200} />
                  </View>
                </View>
                <Image
                  source={require('../../assets/images/Vector.png')}
                  style={{height: 70, width: 100}}
                />
              </LinearGradient>
            </View>
            <View style={styles.bodyHead}>
              <View>
                <Text style={styles.category}>Popular workouts</Text>
                <Text style={{color: '#F1F4F8', fontSize: 12}}>
                  Workouts:80
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={{paddingHorizontal: 2}}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                pagingEnabled={false}>
                <View>
                  <View style={styles.box}>
                    <Image
                      source={require('../../assets/images/Vector.png')}
                      style={{height: 40, width: 60}}
                    />
                  </View>
                  <View style={{paddingHorizontal: 5}}>
                    <Text style={styles.titleText}>Rapid Lower Body</Text>
                    <View style={styles.boxFooterText}>
                      <Text style={{fontSize: 12, color: '#9662F1'}}>
                        Beginner
                      </Text>
                      <Text style={styles.footerTextItem}>.</Text>
                      <Text style={styles.footerTextItem}>42 min</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <View style={styles.box}>
                    <Image
                      source={require('../../assets/images/Vector.png')}
                      style={{height: 40, width: 60}}
                    />
                  </View>
                  <View style={{paddingHorizontal: 5}}>
                    <Text style={styles.titleText}>Rapid Lower Body</Text>
                    <View style={styles.boxFooterText}>
                      <Text style={{fontSize: 12, color: '#9662F1'}}>
                        Beginner
                      </Text>
                      <Text style={styles.footerTextItem}>.</Text>
                      <Text style={styles.footerTextItem}>42 min</Text>
                    </View>
                  </View>
                </View>
                <View>
                  <View style={styles.box}>
                    <Image
                      source={require('../../assets/images/Vector.png')}
                      style={{height: 40, width: 60}}
                    />
                  </View>
                  <View style={{paddingHorizontal: 5}}>
                    <Text style={styles.titleText}>Rapid Lower Body</Text>
                    <View style={styles.boxFooterText}>
                      <Text style={{fontSize: 12, color: '#9662F1'}}>
                        Beginner
                      </Text>
                      <Text style={styles.footerTextItem}>.</Text>
                      <Text style={styles.footerTextItem}>42 min</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
            <View style={styles.bodyHead}>
              <View>
                <Text style={styles.category}>Exercises</Text>
                <Text style={{color: '#F1F4F8', fontSize: 12}}>
                  Exercises:{exercises?.length}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ViewAllExercise')}>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <View>
              {exercises.map((x, i) => {
                return (
                  <View key={i} style={styles.list}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={{uri: x.image}}
                          style={{height: 30, width: 40}}
                        />
                      </View>
                      <View style={{marginLeft: 5}}>
                        <Text style={{color: Colors.WHITE}}>{x.name}</Text>
                        <Text style={{color: Colors.WHITE}}>0:30</Text>
                      </View>
                    </View>
                    <Image
                      source={require('../../assets/images/warning.png')}
                    />
                  </View>
                );
              })}
            </View>
          </ScrollView>
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
  user: {
    fontSize: 27,
    color: Colors.WHITE,
    fontWeight: '500',
    marginLeft: 10,
  },
  iconContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
    marginTop: 8,
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
  searchIcon: {
    height: 15,
    width: 15,
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
  bodyHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  viewAll: {
    color: Colors.WHITE,
    fontSize: 15,
  },
  category: {
    color: Colors.WHITE,
    fontWeight: '500',
    fontSize: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  toning: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    paddingVertical: 20,
    borderRadius: 6,
  },
  box: {
    backgroundColor: '#CAD0D8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    marginTop: 20,
    borderRadius: 10,
    margin: 10,
  },
  titleText: {
    color: Colors.WHITE,
    fontSize: 16,
    paddingHorizontal: 5,
  },
  boxFooterText: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  footerTextItem: {
    color: Colors.WHITE,
    fontSize: 12,
  },
  list: {
    backgroundColor: '#2D3450',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    margin: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  imageContainer: {
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CAD0D8',
  },
});
export default Home;
