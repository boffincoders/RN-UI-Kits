import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';
import React, {useContext, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppButton from '../../components/AppButton';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import AppInput from '../../components/AppInput';
import {Colors} from '../../constants/Colors';
import {phoneRegex} from '../../utils/regex';
import Toast from 'react-native-simple-toast';
import {SignUpInitialValueContext} from '../../contextAPI/UserSignupContext';
import {v4 as uuidv4} from 'uuid';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {storeData} from '../../storage';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import AppleLogin from './socialAuth/AppleLogin';
import {FacebookLogin} from './socialAuth/FacebookLogin';
import {GoogleLogin} from './socialAuth/GoogleLogin';

let steps = [
  {
    gender: '',
    isCompleted: false,
    step: 1,
  },
  {
    mainGoal: '',
    isCompleted: false,
    step: 2,
  },
  {
    birthDate: Date(),
    isCompleted: false,
    step: 3,
  },
  {
    step: 4,
    isCompleted: false,
    height: '',
  },
  {
    step: 5,
    isCompleted: false,
    weight: '',
  },
  {
    step: 6,
    isCompleted: false,
    goalWeight: '',
  },
  {
    trainingLevel: '',
    isCompleted: false,
    step: 7,
  },
  {
    step: 8,
    isCompleted: false,
    InterestedActivities: [],
  },
];
const SignUp = () => {
  const uid = uuidv4();
  const signupValidationSchema = yup.object().shape({
    phone: yup
      .string()
      .matches(phoneRegex as any, 'Phone number is not valid')
      .required('Phone number is required.'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(6, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    fullName: yup.string().required('Full name is required'),
  });
  const navigation = useNavigation<ReactNavigation.RootParamList | any>();
  const [spinner, setSpinner] = useState<boolean>(false);
  const [checkboxState, setCheckBoxState] = useState(false);
  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textStyle={{color: Colors.WHITE}}
        textContent={'Loading...'}
        customIndicator={<ActivityIndicator color={'#9662F1'} />}
      />
      <Text style={styles.titleFont}>Sign Up</Text>
      <Formik
        validationSchema={signupValidationSchema}
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          phone: '',
        }}
        onSubmit={async (values, {resetForm}) => {
          setSpinner(true);
          try {
            auth()
              .createUserWithEmailAndPassword(values.email, values.password)
              .then(async res => {
                firestore().collection('Users').doc(uid).set({
                  email: values.email,
                  password: values.password,
                  fullName: values.fullName,
                  phone: values.phone,
                  user_id: uid,
                });
                await storeData('uid', uid);
                await firestore()
                  .collection('SignupSteps')
                  .doc(uid)
                  .set({
                    user_id: uid,
                    steps: steps,
                  })
                  .then(res => {
                    console.log(res);
                  })
                  .catch(err => console.log(err));
                const confirmCode: FirebaseAuthTypes.ConfirmationResult =
                  await auth().signInWithPhoneNumber(`+91${values.phone}`);
                navigation.navigate('PhoneVerification', {
                  confirm: confirmCode,
                  collectionId: uid,
                });
                Toast.showWithGravity(
                  'Code sent successfully',
                  Toast.LONG,
                  Toast.TOP,
                );
              })
              .catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                  Toast.showWithGravity(
                    'Email already exists',
                    Toast.LONG,
                    Toast.TOP,
                  );
                }
              });

            resetForm({});
            setSpinner(false);
          } catch (err) {
            console.log(err);
          }
        }}>
        {({handleSubmit, errors, values, setFieldValue, touched}) => (
          <>
            <View
              style={[
                styles.input,
                errors.fullName && touched.fullName
                  ? {borderWidth: 0.5, borderColor: 'red'}
                  : {borderWidth: 0.5, borderColor: '#2D3450'},
              ]}>
              <AppInput
                onChangeText={value => setFieldValue('fullName', value)}
                placeholder="Full Name"
                value={values.fullName}
                style={[styles.inputContainer]}
                placeholderTextColor={'white'}
              />
            </View>

            <View
              style={[
                styles.input,
                errors.email && touched.email
                  ? {borderWidth: 0.5, borderColor: 'red'}
                  : null,
              ]}>
              <AppInput
                placeholder="Email"
                onChangeText={value => setFieldValue('email', value)}
                value={values.email}
                style={styles.inputContainer}
                placeholderTextColor={'white'}
              />
            </View>

            <View
              style={[
                styles.input,
                errors.phone && touched.phone
                  ? {borderWidth: 0.5, borderColor: 'red'}
                  : null,
              ]}>
              <AppInput
                placeholder="Phone"
                onChangeText={value => setFieldValue('phone', value)}
                value={values.phone}
                style={styles.inputContainer}
                placeholderTextColor={'white'}
              />
            </View>

            <View
              style={[
                styles.input,
                errors.password && touched.password
                  ? {borderWidth: 0.5, borderColor: 'red'}
                  : null,
              ]}>
              <AppInput
                placeholder="Password"
                value={values.password}
                onChangeText={value => setFieldValue('password', value)}
                style={styles.inputContainer}
                secureTextEntry={true}
                placeholderTextColor={'white'}
              />
            </View>

            <View style={styles.acceptContainer}>
              <TouchableOpacity
                onPress={() => setCheckBoxState(!checkboxState)}>
                {checkboxState ? (
                  <Image
                    source={require('../../assets/images/checkbox.png')}
                    style={{height: 20, width: 20}}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/unchecked.png')}
                    style={{height: 20, width: 20}}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.acceptText}>
                By continuing you accept our Privacy Policy
              </Text>
            </View>
            <AppButton title="Sign Up" width={350} onPress={handleSubmit} />
            <View style={{marginTop: 100}}>
              <Text style={styles.signInWith}>Sign in with</Text>
              <View style={styles.socialIcons}>
                <TouchableOpacity onPress={() => AppleLogin()}>
                  <Image
                    source={require('../../assets/images/apple.png')}
                    style={{height: 37, width: 30}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => FacebookLogin()}>
                  <Image source={require('../../assets/images/fb.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => GoogleLogin()}>
                  <Image source={require('../../assets/images/google.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </Formik>

      <View style={styles.footer}>
        <Text style={{color: '#F1F4F8'}}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={{color: '#9662F1'}}>Sign In</Text>
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
  form: {
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: '#2D3450',
    borderRadius: 30,
    width: '90%',
    height: 45,
    marginBottom: 20,
  },
  inputContainer: {
    height: 50,
    padding: 15,
    color: 'white',
  },
  forgot_button: {
    height: 30,
    marginTop: 30,
    color: Colors.WHITE,
  },
  signInWith: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.WHITE,
    textAlign: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    width: 130,
    // paddingHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 18,
  },
  acceptText: {
    color: '#CAD0D8',
    fontSize: 12,
    marginLeft: 6,
  },
  acceptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginRight: 30,
  },
});
export default SignUp;
