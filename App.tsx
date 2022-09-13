import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import firebase, {ReactNativeFirebase} from '@react-native-firebase/app';
import {UserSignupDataContext} from './src/contextAPI/UserSignupContext';
import {UserSignupStepsDataContext} from './src/contextAPI/UserSignupStepsContext';
import AppRoutes from './src/routes';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const App = () => {
  let options: ReactNativeFirebase.FirebaseAppOptions;

  useEffect(() => {
    // firestore()
    //   .collection('Activities').doc(uid).set({activities : [
    //     {
    //       name: 'Keep fit',
    //       id: uid,
    //     },
    //     {
    //       name: 'Power training',
    //       id: uid,
    //     },
    //     {
    //       name: 'Keep fit',
    //       id: uid,
    //     },
    //     {
    //       name: 'Keep fit',
    //       id: uid,
    //     },
    //     {
    //       name: 'Yoga',
    //       id: uid,
    //     },
    //   ]})
    if (!firebase.apps.length) {
      firebase.initializeApp(options);
    }
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      webClientId:
        '978186159501-mi8fsa4cu7qjqvafdkibki9762qg1cms.apps.googleusercontent.com',
    });
    StatusBar.setHidden(true);
  }, []);
  return (
    <UserSignupStepsDataContext>
      <UserSignupDataContext>
        <AppRoutes />
      </UserSignupDataContext>
    </UserSignupStepsDataContext>
  );
};

export default App;
