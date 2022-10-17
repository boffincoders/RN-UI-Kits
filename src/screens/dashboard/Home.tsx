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
  StatusBar,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppButton from '../../components/AppButton';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../../constants/Colors';
import {IUserType} from '.';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import {IExerciseSchedule} from '../../components/timer';
export type IPropsUserInfo = {
  currentUser: IUserType;
};
export interface IExercises {
  name: string;
  id: string;
  image: string;
}
const Home = (props: IPropsUserInfo) => {
  const navigation = useNavigation<any>();
  const [exercises, setExercises] = useState<IExerciseSchedule[]>([]);
  const [categories, setCategories] = useState<IExercises[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const getCategories = async () => {
    await firestore()
      .collection('Categories')
      .limit(4)
      .get()
      .then(async res => {
        const data = res.docs.map(x => x.data());
        setCategories(data as IExercises[]);
      })
      .catch(err => {
        console.log(err, 'on categories fetch error');
      });
  };

  const getNestedCollections = async () => {
    let allCategories = await firestore().collection('Categories').get();
    let _exercies = [...exercises];
    Promise.all(
      allCategories?.docs.map(x => {
        firestore()
          .collection(`Categories/${x?.data()?.id}/Exercises`)
          .get()
          .then(res => {
            res.docs.map(x => {
              _exercies.push(x.data());
            });
            setExercises(_exercies);
          });
      }),
    );
  };

  useEffect(() => {
    Promise.all(
      [getCategories, getNestedCollections].map(async x => {
        setLoader(true);
        await x();
        setLoader(false);
      }),
    );
  }, [props?.currentUser?.user_id]);

  const refreshScreen = async (refresh: boolean) => {
    Promise.all(
      [getCategories, getNestedCollections].map(async x => {
        setRefreshing(pre => !pre && refresh);
        await x();
        setRefreshing(false);
        // console.log("hii");
      }),
    );
    const refreshControl = refreshing;
    Toast.showWithGravity(
      refreshControl ? 'Refreshing...' : 'Refreshed',
      Toast.SHORT,
      Toast.TOP,
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#673ab7"
        barStyle="light-content"
        hidden={false}
        translucent={true}
      />
      {loader ? (
        <Spinner
          visible={loader}
          textStyle={{color: Colors.WHITE}}
          textContent={'Loading...'}
          overlayColor={'#222332'}
          customIndicator={<ActivityIndicator color={'#9662F1'} size="large" />}
        />
      ) : (
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                colors={['#2D3450', 'white', 'black']}
                tintColor={'white'}
                refreshing={refreshing}
                onRefresh={() => refreshScreen(true)}
              />
            }>
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
                    <TouchableOpacity
                      key={i}
                      onPress={() =>
                        navigation.navigate('CategoriesExercises', {
                          categoryId: x.id,
                        })
                      }>
                      <LinearGradient
                        key={i}
                        start={{x: 1, y: 1}}
                        end={{x: 1, y: 0}}
                        colors={['#332B8A', '#905DE9']}
                        style={styles.iconContainer}>
                        <Image
                          source={{uri: x.image}}
                          style={{height: 40, width: 50}}
                          resizeMode="contain"
                        />
                        <Text style={{color: Colors.WHITE, fontSize: 14 ,fontFamily : "Poppins-Regular"}}>
                          {x.name}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{paddingHorizontal: 10}}>
              <LinearGradient
                colors={['#332B8A', '#905DE9']}
                style={styles.toning}>
                <View>
                  <Text style={{fontSize: 20, color: Colors.WHITE ,fontFamily : "Poppins-Regular"}}>
                    Full Body Toning
                  </Text>
                  <Text style={{fontSize: 20, color: Colors.WHITE ,fontFamily : "Poppins-Regular"}}>
                    Workout
                  </Text>
                  <Text style={{color: '#F1F4F8', fontSize: 14, marginTop: 10 ,fontFamily : "Poppins-Regular"}}>
                    Includes circuits to work
                  </Text>
                  <Text style={{color: '#F1F4F8', fontSize: 14 ,fontFamily : "Poppins-Regular"}}>
                    every muscle
                  </Text>
                  <View style={{marginTop: 10}}>
                    <AppButton
                      title="Start Training"
                      width={200}
                      onPress={() => navigation.navigate('ViewAllCategory')}
                    />
                  </View>
                </View>
                <Image
                  source={require('../../assets/images/Vector.png')}
                  style={{height: 70, width: 100, resizeMode: 'contain'}}
                />
              </LinearGradient>
            </View>
            <View style={styles.bodyHead}>
              <View>
                <Text style={styles.category}>Popular workouts</Text>
                <Text style={{color: '#F1F4F8', fontSize: 12 ,fontFamily : "Poppins-Regular"}}>
                  Workouts:80
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              pagingEnabled={false}>
              <>
                {exercises.map((x, index) => {
                  return (
                    <View
                      style={{paddingHorizontal: 2, paddingVertical: 5}}
                      key={index}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('WorkoutDetails', {
                            id: x.id,
                            data: x,
                          });
                        }}>
                        <Image
                          style={styles.box}
                          source={
                            x.image === ''
                              ? require('../../assets/images/Vector.png')
                              : {uri: x.image}
                          }
                        />
                      </TouchableOpacity>
                      <View style={{paddingHorizontal: 5}}>
                        <Text style={styles.titleText}>{x.name}</Text>
                        <View style={styles.boxFooterText}>
                          <Text style={{fontSize: 12, color: '#9662F1'}}>
                            Beginner
                          </Text>
                          <Text style={styles.footerTextItem}>.</Text>
                          <Text style={styles.footerTextItem}>42 min</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </>
            </ScrollView>
            {/* <View style={styles.bodyHead}>
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
                          resizeMode="contain"
                          source={{uri: x.image}}
                          style={{height: 40, width: 40}}
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
            </View> */}
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
    fontFamily : "Poppins-Bold"
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
    fontFamily : "Poppins-Regular",
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
    fontFamily : "Poppins-Regular",
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
    fontFamily : "Poppins-Regular"
  },
  category: {
    color: Colors.WHITE,
    fontWeight: '500',
    fontSize: 20,
    fontFamily : "Poppins-Bold"
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
    resizeMode: 'contain',
    height: 120,
    width: 120,
    marginTop: 20,
    margin: 10,
  },
  titleText: {
    color: Colors.WHITE,
    fontSize: 16,
    paddingHorizontal: 5,
    fontFamily : "Poppins-Regular"
  },
  boxFooterText: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
    fontFamily : "Poppins-Regular"
  },
  footerTextItem: {
    color: Colors.WHITE,
    fontSize: 12,
    fontFamily : "Poppins-Regular"
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
    fontFamily : "Poppins-Regular"
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
