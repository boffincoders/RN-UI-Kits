import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
export const FacebookLogin = async () => {
  try {
    await LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      async result => {
        if (result.isCancelled) {
          const data = await AccessToken.getCurrentAccessToken();
          const facebookCredential = auth.FacebookAuthProvider.credential(
            data?.accessToken as any,
          );
          return auth().signInWithCredential(facebookCredential);
        } else {
          Alert.alert('Loggin successfully');
        }
      },
    );
  } catch (err) {
    console.log(err);
  }
};
