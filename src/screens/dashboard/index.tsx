import auth from '@react-native-firebase/auth';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import {getStoredData} from '../../storage';
import AccountInformation from './AccountInformation';
import Activity from './Activity';
import BottomTabBar from './bottomTabBar';
import CategoriesExercises from './categoriesExercises';
import Home from './Home';
import Profile from './Profile';
import StartWorkout from './StartWorkout';
import Trainings from './Trainings';
import ViewAllCategory from './ViewAllCategory';
import ViewAllExercise from './ViewAllExercise';
import WorkoutDetails from './WorkoutDetails';
export type IUserType = {
  email?: string | null;
  fullName?: string;
  password?: string;
  phone?: string;
  user_id?: string;
  displayName?: string | null;
  photo?: string | null;
};
const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState<IUserType>();
  const getFirebaseSocialLogin = () => {
    auth().onAuthStateChanged(user => {
      setCurrentUser({
        displayName: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
      });
    });
  };
  useEffect(() => {    
    getFirebaseSocialLogin();
    {
      (async () => {
        const currentUser = await getStoredData('currentUser');
        if (currentUser) {
          setCurrentUser(currentUser);
        }
      })();
    }
  }, []);
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={(props: BottomTabBarProps) => {
        return <BottomTabBar parentProps={props} />;
      }}>
      <Tab.Screen name="Home">
        {props => <Home {...props} currentUser={currentUser as IUserType} />}
      </Tab.Screen>
      <Tab.Screen name="Training" component={Trainings} />
      <Tab.Screen name="AccountInformation" component={AccountInformation} />
      <Tab.Screen name="WorkoutDetails" component={WorkoutDetails} />
      <Tab.Screen name="StartWorkout" component={StartWorkout} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen
        name="ViewAllCategory"
        component={ViewAllCategory}
        options={{tabBarStyle: false}}
      />
      <Tab.Screen name="ViewAllExercise" component={ViewAllExercise} />
      <Tab.Screen name="CategoriesExercises" component={CategoriesExercises} />
      <Tab.Screen name="Profile">
        {props => <Profile {...props} currentUser={currentUser as IUserType} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
export default Dashboard;
