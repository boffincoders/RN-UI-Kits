import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import AppButton from '../../components/AppButton';

import auth from '@react-native-firebase/auth';
import {Colors} from '../../constants/Colors';
import React,{useEffect} from 'react';

const CreatePlan = () => {
  useEffect(() => {
    // auth()
    //   .signOut()
    //   .then(() => console.log('userSignOut'));
  }, []);
  const navigation = useNavigation<ReactNavigation.RootParamList | any>();
  let fill = 75;
  const CreateUser = () => {
    navigation.navigate('Dashboard');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.gender}>We create your</Text>
      <Text style={styles.gender}>training plan</Text>
      <AnimatedCircularProgress
        size={200}
        width={20}
        fill={fill}
        tintColorSecondary="#332B8A"
        tintColor="#332B8A"
        backgroundColor="#905DE9"
        style={{marginTop: 30}}>
        {fill => (
          <Text
            style={{
              color: Colors.WHITE,
              fontSize: 28,
              fontWeight: '700',
            }}>{`${fill}%`}</Text>
        )}
      </AnimatedCircularProgress>
      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 16, color: Colors.WHITE, textAlign: 'center'}}>
          We create a workout according
        </Text>
        <Text style={{fontSize: 16, color: Colors.WHITE, textAlign: 'center'}}>
          to demographic profile,activity
        </Text>
        <Text style={{fontSize: 16, color: Colors.WHITE, textAlign: 'center'}}>
          level and interests
        </Text>
      </View>
      <View style={styles.buttonFooter}>
        <AppButton title="Start training" width={350} onPress={CreateUser} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222332',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gender: {
    fontSize: 27,
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 10,
  },
  buttonFooter: {
    position: 'absolute',
    right: 18,
    bottom: 30,
  },
});

export default CreatePlan;
