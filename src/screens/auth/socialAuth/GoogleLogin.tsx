import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {Image, TouchableOpacity} from 'react-native';
import {steps} from '../SignUp';
import {storeData} from '../../../storage';
const GoogleLogin = ({navigation}: any) => {
  const handleSignIn = async () => {
    await GoogleSignin.hasPlayServices()
      .then(() => {
        return GoogleSignin.signIn();
      })
      .then(async response => {
        if (response.idToken !== '') {
          const googleCredential = auth.GoogleAuthProvider.credential(
            response.idToken,
          );
          const user = await auth().signInWithCredential(googleCredential);
          if (user) {
            await firestore()
              .collection('SignupSteps')
              .doc(user.user.uid)
              .get()
              .then(res => {
                if (!res.exists) {
                  firestore().collection('SignupSteps').doc(user.user.uid).set({
                    user_id: user.user.uid,
                    steps: steps,
                  });
                }
              });
            await storeData('steps', steps);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <TouchableOpacity onPress={() => handleSignIn()}>
      <Image source={require('../../../assets/images/google.png')} />
    </TouchableOpacity>
  );
};
export default GoogleLogin;
