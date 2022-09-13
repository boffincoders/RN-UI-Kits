import React, {useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/Colors';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AppButton from '../../components/AppButton';
import {useNavigation} from '@react-navigation/native';
const OnBoardingScreens = () => {
  const navigation = useNavigation<ReactNavigation.RootParamList | any>();
  let sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <LinearGradient
      start={{x: 1, y: 1}}
      end={{x: 1, y: 0}}
      colors={['#332B8A', '#905DE9']}
      style={styles.container}>
      <Image
        source={require('../../assets/images/Vector.png')}
        style={{height: 130, width: 200}}
      />
      <View style={styles.bottomContainer}>
        <Carousel
          onScrollIndexChanged={index => setActiveIndex(index)}
          ref={sliderRef}
          vertical={false}
          renderItem={({item, index}: any) => {
            return activeIndex === 0 ? (
              <View style={styles.popup}>
                <Text style={[styles.titleFont, {fontWeight : "700"}]}>Welcome</Text>
                <Text style={[styles.titleFont, {fontWeight : "700"}]}> to FitooZone</Text>
                <Text style={[styles.description, {marginTop: 5}]}>
                  FitooZone has workouts on demand that you
                </Text>
                <Text style={styles.description}>
                  can find based on how much time you have
                </Text>
              </View>
            ) : activeIndex === 1 ? (
              <View style={styles.popup}>
                <Text style={[styles.titleFont, {fontWeight : "700"}]}>Workout Catgories</Text>

                <Text style={[styles.description, {marginTop: 5}]}>
                  Workout categories will help you gain strength,
                </Text>
                <Text style={styles.description}>
                  get in better shape and embrace
                </Text>
                <Text style={styles.description}>a healthy lifestyle</Text>
              </View>
            ) : (
              <View style={styles.popup}>
                <Text style={[styles.titleFont, {fontWeight : "700"}]}>Custom Workouts</Text>

                <Text style={[styles.description, {marginTop: 5}]}>
                  Create and save your own custom workouts.
                </Text>
                <Text style={styles.description}>
                  Name your workouts, save them, and they’ll
                </Text>
                <Text style={styles.description}>
                  automatically appear when you’re ready
                </Text>
                <Text style={styles.description}> to workout</Text>
              </View>
            );
          }}
          layout={'default'}
          sliderWidth={500}
          itemWidth={500}
          data={[
            {
              id: 1,
              name: 'React JS',
              url: 'https://icon-library.com/images/react-icon/react-icon-29.jpg',
            },
            {
              id: 2,
              name: 'JavaScript',
              url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Javascript_Logo.png',
            },
            {
              id: 3,
              name: 'Node JS',
              url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/NodeJS.png',
            },
          ]}
        />
        <Pagination
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          containerStyle={{marginTop: 20}}
          dotStyle={styles.paginationDot}
          inactiveDotColor="#495170"
          activeDotIndex={activeIndex}
          dotsLength={3}
          dotColor={'#9662F1'}
        />
        <AppButton
        width={300}
          onPress={() => {
            if (activeIndex > 1) {
              navigation.navigate('startTraining', {});
            } else setActiveIndex(activeIndex + 1);
          }}
          title={activeIndex === 0 ? 'Get Started' : 'Start Training'}
        />
        {activeIndex === 0 ? (
          <View style={styles.footer}>
            <Text style={{color: '#F1F4F8'}}>Already have account?</Text>
            <TouchableOpacity onPress={() =>navigation.navigate("SignIn")}>
              <Text style={{color: '#9662F1'}}>Sign in</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  bottomContainer: {
    backgroundColor: Colors.BLACK,
    borderTopLeftRadius: 25,
    paddingVertical: 20,
    borderTopRightRadius: 25,
    minHeight: 100,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleFont: {
    color: Colors.WHITE,
    fontSize: 25,
  },
  description: {
    color: Colors.WHITE,
    fontSize: 14,
  },
  popup: {
    marginHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.BLACK,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
  },
});
export default OnBoardingScreens;
