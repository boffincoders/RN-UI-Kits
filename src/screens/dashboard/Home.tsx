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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppButton from '../../components/AppButton';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '../../constants/Colors';
import {IUserType} from '.';
import Spinner from 'react-native-loading-spinner-overlay';
export type IPropsUserInfo = {
  currentUser: IUserType;
};
export interface IExercises {
  name: string;
  id: string;
  image: string;
}
const Home = (props: IPropsUserInfo) => {
  const steps = props?.currentUser?.steps;
  const [ids, setIds] = useState<string[]>([]);
  const navigation = useNavigation<any>();
  const [exercises, setExercises] = useState<IExercises[]>([]);
  const [categories, setCategories] = useState<IExercises[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const hi = async () => {
    await firestore()
      .collection('SignupSteps')
      .doc(props?.currentUser?.user_id)
      .get()
      .then(async res => {
        const data = res?.data();
       
        let _data = data?.steps?.filter((c: any) => {
          if (c?.step === 8 && c.isCompleted) {
            return c.InterestedActivities;
          }
        });
      

        // setIds(
        //   () => _data?.[0]?.InterestedActivities?.map((x: any) => x.id) ?? [],
        // );

        getExercises(
          _data?.[0]?.InterestedActivities?.map((x: any) => x.id) ?? [],
        );
      });
  };
  useEffect(() => {
    hi();
  }, []);
  const getExercises = async (ids: string[]) => {
    setLoader(true);
    await firestore()
      .collection('Exercises')
      // .where('activities', 'array-contains-any', ids)
      .get()
      .then(res => {
        const data = res.docs.map(x => x.data());
        setExercises(data as IExercises[]);
      });
    setLoader(false);
  };
  const getCategories = async () => {
    setLoader(true);
    await firestore()
      .collection('Categories')
      .limit(4)
      .get()
      .then(async res => {
        const data =  res.docs.map(x => x.data());
        setCategories(data as IExercises[]);
      })
      .catch(err => {
        console.log(err, 'on categories fetch error');
      });
    setLoader(false);
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <View style={styles.container}>
       <StatusBar
                    backgroundColor = "#673ab7"  
                    barStyle = "light-content"   
                    hidden = {false}    
                    translucent = {true}  
                />  
      <Spinner
        visible={loader}
        textStyle={{color: Colors.WHITE}}
        textContent={'Loading...'}
        overlayColor={'#222332'}
        customIndicator={<ActivityIndicator color={'#9662F1'} size="large" />}
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
                        <Text style={{color: Colors.WHITE, fontSize: 14}}>
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
