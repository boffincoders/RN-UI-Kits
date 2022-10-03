import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import OtpInputs from 'react-native-otp-inputs';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay/lib';
const PhoneVerification = ({route, navigation}: any) => {
  const uid = route?.params?.collectionId;
  const [spinner, setSpinner] = useState<boolean>(false);
  let OTPConfirmation = route?.params?.confirm;
  const onNext = async (code: any) => {
    try {
      if (code.length === 6) {
        setSpinner(true);
        console.log(code);
        await OTPConfirmation?.confirm(code);
        Toast.showWithGravity('Signed in successfully', Toast.LONG, Toast.TOP);
        navigation.navigate('SignUpSteps', {collectionId: uid});
      }
    } catch (err) {
      Toast.showWithGravity('Invalid Code', Toast.LONG, Toast.TOP);
    }
    setSpinner(false);
  };
  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textStyle={{color: Colors.WHITE}}
        textContent={'Loading...'}
        customIndicator={<ActivityIndicator color={'#9662F1'} size="large"/>}
      />
      <Text style={styles.titleFont}>Phone Verification</Text>
      <Text style={{color: Colors.WHITE, fontSize: 16}}>
        We sent a code to your number
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: Colors.WHITE, fontSize: 16}}>9152568474</Text>
        <TouchableOpacity>
          <Text style={{color: '#9662F1', marginLeft: 5}}>Change</Text>
        </TouchableOpacity>
      </View>
      <OtpInputs
        autofillFromClipboard={false}
        autoFocus={true}
        style={styles.otp}
        inputStyles={{
          fontSize: 20,
          color: Colors.WHITE,
          alignSelf: 'center',
          fontWeight: '500',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
        inputContainerStyles={{
          marginHorizontal: 5,
          backgroundColor: '#2D3450',
          borderColor: '#2D3450',
          height: 50,
          width: 50,
          borderWidth: 1,

          justifyContent: 'center',
          borderRadius: 8,
        }}
        numberOfInputs={6}
        keyboardType="phone-pad"
        handleChange={code => onNext(code)}
      />
      <View style={styles.resendCode}>
        <Text style={{color: Colors.WHITE, fontSize: 16}}>
          Don't receive your code?
        </Text>
        <TouchableOpacity>
          <Text style={{color: '#9662F1', marginLeft: 5}}>Resend</Text>
        </TouchableOpacity>
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
  titleFont: {
    fontSize: 32,
    color: Colors.WHITE,
    fontWeight: '700',
    marginBottom: 20,
  },
  otp: {flexDirection: 'row', paddingHorizontal: 5, marginTop: 10},
  inputFieldStyle: {
    backgroundColor: '#2D3450',
    padding: 30,
    borderRadius: 10,
    color: 'white',
    borderWidth: 0,
  },
  resendCode: {flexDirection: 'row', alignItems: 'center', marginTop: 20},
});
export default PhoneVerification;
