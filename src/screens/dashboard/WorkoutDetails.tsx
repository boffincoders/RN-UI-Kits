import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppButton from '../../components/AppButton';
import {Colors} from '../../constants/Colors';
const DATA = [
  {
    id: 1,
    title: 'The Hunger Games',
  },
  {
    id: 2,
    title: 'Harry Potter and the Order of the Phoenix',
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
  },
  {
    id: 5,
    title: 'Twilight',
  },
  {
    id: 6,
    title: 'The Book Thief',
  },
  {
    id: 7,
    title: 'The Chronicles of Narnia',
  },
  {
    id: 8,
    title: 'Animal Farm',
  },
  {
    id: 9,
    title: 'Gone with the Wind',
  },
  {
    id: 10,
    title: 'The Shadow of the Wind',
  },
  {
    id: 11,
    title: 'The Fault in Our Stars',
  },
  {
    id: 12,
    title: "The Hitchhiker's Guide to the Galaxy",
  },
  {
    id: 13,
    title: 'The Giving Tree',
  },
  {
    id: 14,
    title: 'Wuthering Heights',
  },
  {
    id: 15,
    title: 'The Da Vinci Code',
  },
];

const exercises = [
  {
    name: 'Cobra Stretch',
  },
  {
    name: 'Plank Ups',
  },
];

const workout = [
  {
    name: 'Double Heel Tabs',
  },
  {
    name: 'Lung Jumps Atlernated',
  },
  {
    name: 'Squat jump',
  },
];
const HEADER_EXPANDED_HEIGHT = 300;
const HEADER_COLLAPSED_HEIGHT = 60;
const WorkoutDetails = () => {
  const [scrollY] = useState(new Animated.Value(0));
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });
  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const heroTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerTitle = 'HEADER';
  const navigation = useNavigation<ReactNavigation.RootParamList | any>();

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ])}
          scrollEventThrottle={16}>
          <Animated.View style={[styles.header]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // padding: 10,
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('../../assets/images/backButton.png')}
                  style={{tintColor: Colors.WHITE}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/images/heartOutline.png')}
                  style={{tintColor: Colors.WHITE}}
                />
              </TouchableOpacity>
            </View>
            {!scrollY ? null : (
              <View style={{alignSelf: 'center'}}>
                <Image source={require('../../assets/images/Vector.png')} />
              </View>
            )}
          </Animated.View>

          <View style={styles.card}>
            <Text style={styles.workoutName}>Upper Body Workout</Text>
            <Text style={styles.des}>
              Resistance training, also known as strength
            </Text>
            <Text style={styles.des}>
              training, is an essential component of any
            </Text>
            <Text style={styles.des}>
              fitness routine, especially for your upper body
            </Text>

            <View style={styles.profileItemsContainer}>
              <LinearGradient
                start={{x: 1, y: 1}}
                end={{x: 1, y: 0}}
                colors={['#332B8A', '#905DE9']}
                style={styles.profileItems}>
                <Image source={require('../../assets/images/time.png')} />
                <Text style={{color: Colors.WHITE, fontSize: 14, marginTop: 8}}>
                  30 min
                </Text>
              </LinearGradient>
              <LinearGradient
                start={{x: 1, y: 1}}
                end={{x: 1, y: 0}}
                colors={['#332B8A', '#905DE9']}
                style={styles.profileItems}>
                <Image source={require('../../assets/images/fire.png')} />
                <Text style={{color: Colors.WHITE, fontSize: 14, marginTop: 8}}>
                  340 kal
                </Text>
              </LinearGradient>

              <LinearGradient
                start={{x: 1, y: 1}}
                end={{x: 1, y: 0}}
                colors={['#332B8A', '#905DE9']}
                style={styles.profileItems}>
                <Image source={require('../../assets/images/cake.png')} />
                <Text style={{color: Colors.WHITE, fontSize: 14, marginTop: 8}}>
                  26 Years
                </Text>
              </LinearGradient>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.equip}>Equipment</Text>
              <Text style={styles.items}>2 Items</Text>
            </View>

            <View style={{flexDirection: 'row', padding: 10}}>
              <View>
                <View style={styles.borderBoxes}>
                  <Image
                    style={{height: 50, width: 70}}
                    source={require('../../assets/images/Vector.png')}
                  />
                </View>
                <Text
                  style={{color: Colors.WHITE, fontSize: 16, marginLeft: 3}}>
                  2 dumbles
                </Text>
              </View>
              <View>
                <View style={styles.borderBoxes}>
                  <Image
                    style={{height: 50, width: 70}}
                    source={require('../../assets/images/Vector.png')}
                  />
                </View>
                <Text
                  style={{color: Colors.WHITE, fontSize: 16, marginLeft: 3}}>
                  Mat
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.account}>
            <View>
              <View style={styles.listItem}>
                <Text style={styles.listTitle}>Schedule workout</Text>
                <TouchableOpacity>
                  <Image source={require('../../assets/images/forward.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.borderListBottom}></View>
            </View>
            <View>
              <View style={styles.listItem}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.listTitle}>Pick a playlist</Text>
                </View>
                <TouchableOpacity>
                  <Image source={require('../../assets/images/forward.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              fontSize: 20,
              color: Colors.WHITE,
            }}>
            Exercises
          </Text>
          <View style={styles.rowContainer}>
            <Text style={[styles.equip, {fontSize: 16}]}>Warm-up</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.items}>3 Exercises</Text>
              <Text style={styles.items}>.</Text>
              <Text style={styles.items}>2 Minutes</Text>
            </View>
          </View>
          <View>
            {exercises.map((x, i) => {
              return (
                <View key={i} style={styles.list}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={require('../../assets/images/Vector.png')}
                        style={{height: 30, width: 40}}
                      />
                    </View>
                    <View style={{marginLeft: 5}}>
                      <Text style={{color: Colors.WHITE}}>{x.name}</Text>
                      <Text style={{color: Colors.WHITE}}>0:30</Text>
                    </View>
                  </View>
                  <Image source={require('../../assets/images/warning.png')} />
                </View>
              );
            })}
            <View style={styles.list}>
              <View style={{flexDirection: 'row', paddingHorizontal: 15}}>
                <View style={styles.restCircle}>
                  <Text style={{color: '#9662F1', fontSize: 10}}>00:30</Text>
                </View>
                <View style={{marginLeft: 11}}>
                  <Text style={{color: Colors.WHITE}}>Rest</Text>
                  <Text style={{color: Colors.WHITE}}>0:30</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <Text style={[styles.equip, {fontSize: 16}]}>Workout</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.items}>3 Exercises</Text>
              <Text style={styles.items}>.</Text>
              <Text style={styles.items}>2 Minutes</Text>
            </View>
          </View>
          <View>
            {workout.map((x, i) => {
              return (
                <View key={i} style={styles.list}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={require('../../assets/images/Vector.png')}
                        style={{height: 30, width: 40}}
                      />
                    </View>
                    <View style={{marginLeft: 5}}>
                      <Text style={{color: Colors.WHITE}}>{x.name}</Text>
                      <Text style={{color: Colors.WHITE}}>x</Text>
                      <Text style={{color: Colors.WHITE}}>0:30</Text>
                    </View>
                  </View>
                  <Image source={require('../../assets/images/warning.png')} />
                </View>
              );
            })}
            <View style={styles.list}>
              <View style={{flexDirection: 'row', paddingHorizontal: 15}}>
                <View style={styles.restCircle}>
                  <Text style={{color: '#9662F1', fontSize: 10}}>00:30</Text>
                </View>
                <View style={{marginLeft: 11}}>
                  <Text style={{color: Colors.WHITE}}>Rest</Text>
                  <Text style={{color: Colors.WHITE}}>0:30</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
          <AppButton title="Start Workout" />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222332',
  },
  header: {
    backgroundColor: '#222332',
    height: 200,
    // width : "100%",
    // flex : 1,
    zIndex: 999999,
  },
  card: {
    backgroundColor: '#2D3450',
    // width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    zIndex: 9999,
    // marginBottom : 50
  },
  workoutName: {
    fontSize: 27,
    fontWeight: '500',
    color: Colors.WHITE,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    padding: 16,
    // paddingTop: HEADER_EXPANDED_HEIGHT,
  },
  des: {
    fontSize: 14,
    color: Colors.WHITE,
    marginTop: 3,
    paddingHorizontal: 10,
  },
  profileItems: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    // margin: 10,
  },
  profileItemsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  equip: {fontSize: 20, color: Colors.WHITE, fontWeight: '400'},
  items: {
    fontSize: 14,
    color: '#F1F4F8',
  },
  borderBoxes: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 7,
    padding: 15,
    margin: 5,
  },
  account: {
    borderRadius: 10,
    backgroundColor: '#2D3450',
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    margin: 5,
  },
  listTitle: {fontSize: 16, color: Colors.WHITE},
  borderListBottom: {borderBottomColor: '#FFFFFF', borderBottomWidth: 0.5},
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
  restCircle: {
    borderColor: '#9662F1',
    borderWidth: 1.5,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default WorkoutDetails;
