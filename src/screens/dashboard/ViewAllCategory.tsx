import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
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
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../../constants/Colors';
import {IExercises} from './Home';
import Spinner from 'react-native-loading-spinner-overlay/lib';
const ViewAllCategory = () => {
  const [loader, setLoader] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<IExercises[]>([]);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const getCategories = async (refresh?: boolean) => {
    if (refresh) setRefreshing(refresh);
    setLoader(refresh ? false : true);
    await firestore()
      .collection('Categories')
      .get()
      .then(res => {
        const data = res.docs.map(x => x.data());
        setCategories(data as IExercises[]);
      })
      .catch(err => {
        console.log(err, 'on exercises fetch error');
      });
    setRefreshing(false);
    setLoader(false);
  };

  React.useEffect(() => {
    getCategories();
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/images/backButton.png')} />
            </TouchableOpacity>
            <View>
              <Text style={{color: Colors.WHITE}}>Category</Text>
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
            />
          </View>
          <View style={{flex: 1}}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  tintColor={Colors.WHITE}
                  refreshing={refreshing}
                  onRefresh={() => getCategories(true)}
                />
              }
              showsVerticalScrollIndicator={false}>
              {categories.map((x, index) => {
                console.log(x,"dsds");
                
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.list}
                    onPress={() =>
                      navigation.navigate('CategoriesExercises', {
                        categoryId: x.id,
                      })
                    }>
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
                          colors={['#332B8A', '#905DE9']}
                          style={styles.iconContainer}>
                          <Image
                            resizeMode="contain"
                            style={{height: 30, width: 25}}
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
                          source={require('../../assets/images/forward.png')}
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
export default ViewAllCategory;
