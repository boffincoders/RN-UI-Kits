import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as yup from 'yup';
import React, {useContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import {Colors} from '../../constants/Colors';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {UserSignupStepsContext} from '../../contextAPI/UserSignupStepsContext';
import {getStoredData, storeData} from '../../storage';
import {GoogleLogin} from './socialAuth/GoogleLogin';
import {FacebookLogin} from './socialAuth/FacebookLogin';
import AppleLogin from './socialAuth/AppleLogin';
interface ILoginValues {
  email: string;
  password: string;
}
export interface ISignUpSteps {
  step?: number;
  isCompleted?: boolean;
  gender?: string;
  mainGoal?: string;
  birthDate?: string;
  height?: string;
  weight?: string;
  goalWeight?: string;
  trainingLevel?: string;
  isSkipped?: false;
  InterestedActivities?: {
    name: string;
    id: string;
  }[];
}
const SignIn = () => {
  const [spinner, setSpinner] = useState<boolean>(false);
  const signInValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(6, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });
  const navigation = useNavigation<ReactNavigation.RootParamList | any>();
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const getAllUsers = async () => {
    const users = await firestore().collection('Users').get();
    const getUsers = users.docs.map(x => {
      return {...x.data()};
    });
    setAllUsers(getUsers);
  };
  useEffect(() => {
    // auth().onAuthStateChanged(user => {
    // if (user)
    getAllUsers();
    // });
  }, []);
  console.log(allUsers, 'getUsers');

  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textStyle={{color: Colors.WHITE}}
        textContent={'Loading...'}
        customIndicator={<ActivityIndicator color={'#9662F1'} />}
      />
      <Formik
        validationSchema={signInValidationSchema}
        initialValues={{email: '', password: ''} as ILoginValues}
        onSubmit={async values => {
          setSpinner(true);
          try {
            await auth()
              .signInWithEmailAndPassword(values.email, values.password)
              .then(async res => {
                const getUser = allUsers.filter(x => x.email === values.email);
                await storeData('uid', res.user.uid);
                await storeData('currentUser', getUser[0]);
                if (getUser.length > 0) {
                  const checkingForSignupSteps = firestore()
                    .collection('SignupSteps')
                    .get();
                  (await checkingForSignupSteps).docs.map(async x => {
                    if (x?.data()?.user_id === getUser[0]?.user_id) {
                      let steps: ISignUpSteps[] = x?.data()?.steps;
                      await storeData('steps', steps);
                      return steps.some(x => {
                        if (!x.isCompleted) {
                          navigation.navigate('SignUpSteps');
                        } else {
                          navigation.navigate('Dashboard');
                        }
                      });
                    }
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          } catch (err) {
            console.log(err);
          }
          setSpinner(false);
        }}>
        {({handleSubmit, errors, values, setFieldValue, touched}) => (
          <>
            <Text style={styles.titleFont}>Sign In</Text>
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
                autoCapitalize="none"
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
                autoCapitalize="none"

                secureTextEntry={true}
                placeholderTextColor={'white'}
              />
            </View>
            <AppButton title="Sign In" width={350} onPress={handleSubmit} />

            <TouchableOpacity>
              <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={{marginTop: 100}}>
              <Text style={styles.signInWith}>Sign in with</Text>
              <View style={styles.socialIcons}>
                <TouchableOpacity onPress={() => AppleLogin()}>
                  <Image
                    source={require('../../assets/images/apple.png')}
                    style={{height: 37, width: 30}}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => GoogleLogin()}>
                  <Image source={require('../../assets/images/google.png')} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.footer}>
              <Text style={{color: '#F1F4F8'}}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp', {})}>
                <Text style={{color: '#9662F1'}}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
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
    padding: 10,
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
    width: 90,
    // paddingHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 18,
  },
});
export default SignIn;
