import React from 'react';
import {Text, View} from 'react-native';

const Screen3 = (styles: any) => {
  return (
    <View style={styles.popup}>
      <Text style={styles.titleFont}>Welcome</Text>
      <Text style={styles.titleFont}> to FitooZone</Text>
      <Text style={[styles.description, {marginTop: 5}]}>
        FitooZone has workouts on demand that you
      </Text>
      <Text style={styles.description}>
        can find based on how much time you have
      </Text>
    </View>
  );
};

export default Screen3;
