import appleAuth from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import React from 'react';

export const AppleLogin = async () => {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });
  const {identityToken, nonce} = appleAuthRequestResponse;
  if (identityToken) {
    const credential =  auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    await auth().signInWithCredential(credential);
  }
};

export default AppleLogin;
