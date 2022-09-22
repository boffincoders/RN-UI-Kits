import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Timer from '../../components/timer';
import {Colors} from '../../constants/Colors';

const StartWorkout = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{color: 'white'}}>Exercise 5/12</Text>
        <Text style={styles.time}>05:39</Text>
      </View>
      <LinearGradient
        style={styles.imageBox}
        start={{x: 1, y: 1}}
        end={{x: 1, y: 0}}
        colors={['#332B8A', '#905DE9']}>
        <Image
          source={require('../../assets/images/Vector.png')}
          style={{height: 150, width: 150, resizeMode: 'contain'}}
        />
      </LinearGradient>
      <View>
        <Timer />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222332',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingVertical: 10,
  },
  time: {
    fontSize: 27,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: '55%',
    margin: 15,
    borderRadius: 7,
  },
});
export default StartWorkout;
