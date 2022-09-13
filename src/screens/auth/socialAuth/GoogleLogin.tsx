import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
export const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices()
    .then(() => {
      return GoogleSignin.signIn();
    })
    .then(async response => {
      if (response.idToken !== '') {
        // console.log(response,'response');
        
        const googleCredential = auth.GoogleAuthProvider.credential(
          response.idToken,
        );
        return auth().signInWithCredential(googleCredential);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
