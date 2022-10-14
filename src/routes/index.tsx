import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
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
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  
  const getAllUsers = async () => {
    //Find user signup steps
    setLoading(true);
    auth().onAuthStateChanged(async user => {
      setIsLoggedIn(true);
      if (user) {
        setUser(user);
      } else {
        setIsLoggedIn(false);
      }
    });
    setLoading(false);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const AppStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <React.Fragment>
          <Stack.Screen name="SignUpSteps">
            {props => (
              <SignupStepsScreen
                {...props}
                user={user}
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
        edges={['top', 'bottom']}
        style={{flex: 1, backgroundColor: '#222332'}}>
        <NavigationContainer>
          <>{isLoggedIn ? <AppStackNavigator /> : <AuthStackNavigator />}</>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppRoutes;
