import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import PhoneVerification from '../screens/auth/PhoneVerification';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import SignIn, {ISignUpSteps} from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import Dashboard from '../screens/dashboard';
import OnBoardingScreens from '../screens/onBoardingScreens';
import StartTraining from '../screens/StartTraining';
import CreatePlan from '../screens/steps/createPlan';
import SignupStepsScreen from '../screens/steps/SignupStepsScreen';
const AppRoutes = () => {
  const Stack = createNativeStackNavigator();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUserSteps, setCurrentUserSteps] = useState<ISignUpSteps[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(
    null,
  );
  const getAllUsers = async () => {
    //Find user signup steps
    setLoading(true);
    const users = await firestore().collection('Users').get();
    const getData = users.docs.map(async x => {
      if (
        x?.data()?.email.toLowerCase() === currentUser?.email?.toLowerCase() ||
        `+91${x?.data()?.phone}` === currentUser?.phoneNumber
      ) {
        const steps = await firestore().collection('SignupSteps').get();
        steps.docs.map(y => {
          if (y.data().user_id === x?.data()?.user_id)
            setCurrentUserSteps(y?.data()?.steps);
        });
      }
      return {...x.data()};
    });
    setAllUsers(getData);
    setLoading(false);
  };

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    getAllUsers();
  }, [currentUser]);

  const AppStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <React.Fragment>
          <Stack.Screen name="SignUpSteps">
            {props => (
              <SignupStepsScreen
                {...props}
                steps={currentUserSteps}
                loading={loading}
                setLoading={setLoading}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="PhoneVerification"
            component={PhoneVerification}
          />
          <Stack.Screen name="CreatePlan" component={CreatePlan} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </React.Fragment>
      </Stack.Navigator>
    );
  };

  const AuthStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="onBoarding" component={OnBoardingScreens} />
        <Stack.Screen name="startTraining" component={StartTraining} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    );
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top']}
        style={{flex: 1, backgroundColor: '#222332'}}>
        <StatusBar translucent backgroundColor={'#222332'} />
        <NavigationContainer>
          <>{isLoggedIn ? <AppStackNavigator /> : <AuthStackNavigator />}</>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppRoutes;
