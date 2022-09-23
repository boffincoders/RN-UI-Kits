import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/Colors';
import {storeData} from '../../storage';
import {IUserType} from '.';
import { IPropsUserInfo } from './Home';
const Profile = (props: IPropsUserInfo) => {
  const navigation = useNavigation<ReactNavigation.RootParamList | any>();
  const [isAppleEnable, setIsAppleEnable] = useState<boolean>(true);
  const [darkModeEnable, setDarkModeEnable] = useState<boolean>(true);
  const [isPinLockEnable, setIsPinLockEnable] = useState<boolean>(true);
  const toggleSwitch = (type: string) => {
    if (type == 'apple') {
      setIsAppleEnable(prevState => !prevState);
    } else if (type == 'darkMode') {
      setDarkModeEnable(prevState => !prevState);
    } else {
      setIsPinLockEnable(prevState => !prevState);
    }
  };

  const SignOut = async () => {
    await storeData('currentUser', null);
    await storeData('uid', null);
    auth()
      .signOut()
      .then(() => {
        navigation.navigate("SignIn")
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.user}>Profile</Text>
        <LinearGradient
          start={{x: 1, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#332B8A', '#905DE9']}
          style={styles.iconContainer}>
          <TouchableOpacity style={styles.buttonTouch}>
            <Image source={require('../../assets/images/fire.png')} />
            <Text style={styles.premiumn}>Premium</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View
        style={{alignItems: 'center', marginTop: 10, justifyContent: 'center'}}>
        <View style={styles.circleImage}>
          <Image
            style={styles.image}
            source={
              props?.currentUser?.photo
                ? {uri: props?.currentUser?.photo}
                : require('../../assets/images/Vector.png')
            }
          />
        </View>
        <Text style={styles.userNameText}>
          {props.currentUser?.fullName ||
            props.currentUser?.displayName}
        </Text>
        <View style={styles.profileItemsContainer}>
          <LinearGradient
            start={{x: 1, y: 1}}
            end={{x: 1, y: 0}}
            colors={['#332B8A', '#905DE9']}
            style={styles.profileItems}>
            <Image source={require('../../assets/images/weight.png')} />
            <Text style={{color: Colors.WHITE, fontSize: 14, marginTop: 8}}>
              55 Kg
            </Text>
          </LinearGradient>
          <LinearGradient
            start={{x: 1, y: 1}}
            end={{x: 1, y: 0}}
            colors={['#332B8A', '#905DE9']}
            style={styles.profileItems}>
            <Image source={require('../../assets/images/height.png')} />
            <Text style={{color: Colors.WHITE, fontSize: 14, marginTop: 8}}>
              167 cm
            </Text>
          </LinearGradient>

          <LinearGradient
            start={{x: 1, y: 1}}
            end={{x: 1, y: 0}}
            colors={['#332B8A', '#905DE9']}
            style={styles.profileItems}>
            <Image source={require('../../assets/images/cake.png')} />
            <Text style={{color: Colors.WHITE, fontSize: 14, marginTop: 8}}>
              26 Years
            </Text>
          </LinearGradient>
        </View>
      </View>
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.account}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AccountInformation')}>
              <View style={styles.listItem}>
                <Text style={styles.listTitle}>Account</Text>
                <TouchableOpacity>
                  <Image source={require('../../assets/images/forward.png')} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <View style={styles.borderListBottom}></View>
            <TouchableOpacity>
              <View style={styles.listItem}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.listTitle}>My workouts</Text>
                  <Image
                    style={{marginLeft: 3}}
                    source={require('../../assets/images/rocket.png')}
                  />
                </View>
                <TouchableOpacity>
                  <Image source={require('../../assets/images/forward.png')} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <View style={styles.borderListBottom}></View>
            <TouchableOpacity>
              <View style={styles.listItem}>
                <Text style={styles.listTitle}>Workouts reminders</Text>
                <TouchableOpacity>
                  <Image source={require('../../assets/images/forward.png')} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <View style={styles.borderListBottom}></View>
            <TouchableOpacity onPress={SignOut}>
              <View style={styles.listItem}>
                <Text style={styles.listTitle}>Log out</Text>
                <TouchableOpacity>
                  <Image source={require('../../assets/images/forward.png')} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 16,
              color: Colors.WHITE,
              paddingHorizontal: 10,
              paddingVertical: 13,
            }}>
            Settings
          </Text>
          <View style={styles.account}>
            <TouchableOpacity>
              <View style={styles.listItem}>
                <Text style={styles.listTitle}>Preferences</Text>
                <TouchableOpacity>
                  <Image source={require('../../assets/images/forward.png')} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <View style={styles.borderListBottom}></View>
            <TouchableOpacity>
              <View style={styles.listItem}>
                <Text style={styles.listTitle}>Plan Settings</Text>
                <TouchableOpacity>
                  <Image source={require('../../assets/images/forward.png')} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <View style={styles.borderListBottom}></View>
            <TouchableOpacity>
              <View style={styles.listItem}>
                <Text style={styles.listTitle}>Pin Lock</Text>
                <Switch
                  trackColor={{false: 'grey', true: '#9662F1'}}
                  thumbColor={isPinLockEnable ? 'white' : '#9662F1'}
                  ios_backgroundColor="#9662F1"
                  onValueChange={() => toggleSwitch('pinLock')}
                  value={isPinLockEnable}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.borderListBottom}></View>
            <TouchableOpacity>
              <View style={styles.listItem}>
                <Text style={styles.listTitle}>Apple Health</Text>
                <Switch
                  trackColor={{false: 'grey', true: '#9662F1'}}
                  thumbColor={isAppleEnable ? 'white' : '#9662F1'}
                  ios_backgroundColor="#9662F1"
                  onValueChange={() => toggleSwitch('apple')}
                  value={isAppleEnable}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.borderListBottom}></View>
            <TouchableOpacity>
              <View style={styles.listItem}>
                <Text style={styles.listTitle}>Dark Mode</Text>
                <Switch
                  trackColor={{false: 'grey', true: '#9662F1'}}
                  thumbColor={darkModeEnable ? 'white' : '#9662F1'}
                  ios_backgroundColor="#9662F1"
                  onValueChange={() => toggleSwitch('darkMode')}
                  value={darkModeEnable}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.borderListBottom}></View>
            <TouchableOpacity>
              <View style={styles.listItem}>
                <Text style={styles.listTitle}>Contact Support</Text>
                <TouchableOpacity>
                  <Image source={require('../../assets/images/forward.png')} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222332',
  },
  user: {
    fontSize: 27,
    color: Colors.WHITE,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  iconContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 10,
  },
  image: {flex: 1, width: 50, height: 50, resizeMode: 'contain'},
  profileItems: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    // margin: 10,
  },
  buttonTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumn: {
    color: Colors.WHITE,
    fontSize: 10,
    alignItems: 'center',
    marginLeft: 3,
  },
  circleImage: {
    backgroundColor: '#D8D8D8',
    alignItems: 'center',
    height: '23%',
    width: '18%',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderRadius: 60,
  },
  userNameText: {
    fontSize: 20,
    color: Colors.WHITE,
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: '500',
  },
  profileItemsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  account: {
    borderRadius: 10,
    backgroundColor: '#2D3450',
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    margin: 5,
  },
  listTitle: {fontSize: 16, color: Colors.WHITE},
  borderListBottom: {borderBottomColor: '#FFFFFF', borderBottomWidth: 0.5},
});
export default Profile;
