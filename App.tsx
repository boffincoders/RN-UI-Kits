import React, {useEffect} from 'react';
import {NativeModules, StatusBar, Text} from 'react-native';
import firebase, {ReactNativeFirebase} from '@react-native-firebase/app';
import {UserSignupDataContext} from './src/contextAPI/UserSignupContext';
import {UserSignupStepsDataContext} from './src/contextAPI/UserSignupStepsContext';
import AppRoutes from './src/routes';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const App = () => {
  // let oldRender = Text?.prototype?.render;
  // Text?.prototype?.render = function (...args) {
  //     let origin = oldRender.call(this, ...args);
  //     return React.cloneElement((origin), {
  //         style: [{color: 'red', fontFamily: 'Arial'}, origin?.props?.style]
  //     });
  // };
  
  let options: ReactNativeFirebase.FirebaseAppOptions;
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(options);
    }
    GoogleSignin.configure({
      scopes: ['profile', 'email'],
      webClientId:
        '978186159501-f1r5qsrdsn421gehvt564uv1knf7a23j.apps.googleusercontent.com',
    });
    StatusBar.setHidden(true);
  }, []);
  return (
    <UserSignupStepsDataContext>
      <UserSignupDataContext>
        <StatusBar
          backgroundColor="#673ab7"
          barStyle="light-content"
          hidden={false}
          translucent={true}
        />
        <AppRoutes />
      </UserSignupDataContext>
    </UserSignupStepsDataContext>
  );
};

export default App;
