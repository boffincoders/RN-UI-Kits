import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import {getStoredData} from '../../storage';
import {ISignUpSteps} from '../auth/SignIn';
import firestore, {firebase} from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
import SimpleToast from 'react-native-simple-toast';
interface ICurrentUser {
  email: string;
  fullName: string;
  password: string;
  phone: string;
  user_id: string;
}
const AccountInformation = () => {
  const navigation = useNavigation<ReactNavigation.RootParamList | any>();
  const [steps, setSteps] = useState<ISignUpSteps[]>([]);
  const [BMIResult, setBMIResult] = useState<string>('');
  const [BMIValue, setBMIValue] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<null | ICurrentUser>(null);
  const getSteps = async () => {
    setLoader(true);
    const getCurrentUser = await getStoredData('currentUser');
    setCurrentUser(getCurrentUser);
    await firestore()
      .collection('SignupSteps')
      .doc(getCurrentUser?.user_id)
      .get()
      .then(res => {
        CalculateBMIResult(res?.data()?.steps);
        setSteps(res?.data()?.steps);
      })
      .catch(err => console.log(err));
    setLoader(false);
  };
  const reAuthenticateUser = (currentPassword: string) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user?.email!,
      currentPassword,
    );
    return user?.reauthenticateWithCredential(cred);
  };
  const onSaveProfile = async () => {
    setSaveLoading(true);
    try {
      await firestore()
        .collection('Users')
        .doc(currentUser?.user_id)
        .update({email: currentUser?.email, fullName: currentUser?.fullName})
        .then(async () => {});
      let user = firebase.auth().currentUser;
      await reAuthenticateUser(currentUser?.password!)?.then(() => {
        var user = firebase.auth().currentUser;
        user
          ?.updateEmail(currentUser?.email!)
          .then(async () => {
            await firebase
              .auth()
              .signInWithEmailAndPassword(
                currentUser?.email!,
                currentUser?.password!,
              );
            SimpleToast.showWithGravity(
              'Profile updated successfully!',
              SimpleToast.LONG,
              SimpleToast.TOP,
            );
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-user') {
              return SimpleToast.showWithGravity(
                'Email already in use!',
                SimpleToast.LONG,
                SimpleToast.TOP,
              );
            }
          });
      });
      await user?.updateEmail(currentUser!?.email?.toString()).then(() => {
      });
    } catch (err) {
      console.log(err, 'error on onFetch');
    }
    setSaveLoading(false);
  };
  const CalculateBMIResult = (signUpSteps: ISignUpSteps[]) => {
    const height = signUpSteps.filter(x => {
      if (x.step === 4 && x.isCompleted) {
        const splitHieght = x?.height?.split(' ');
        return (x.height = splitHieght![0]!);
      }
    });
    const weight = signUpSteps.filter(x => {
      if (x.step === 5 && x.isCompleted) {
        const splitWeight = x?.weight?.split(' ');
        return (x.weight = splitWeight && splitWeight![0]);
      }
    });
    let result: any = (
      ([
        Number(weight[0]?.weight!) /
          Number(height[0]?.height!) /
          Number(height[0]?.height!),
      ] as any) * 10000
    ).toFixed(1);
    setBMIValue(result);
    if (result < 18.5) {
      setBMIResult('Under Weight');
    } else if (result >= 18.5 && result < 25) {
      setBMIResult('Normal Weight');
    } else if (result >= 25 && result < 30) {
      setBMIResult('Over Weight');
    } else if (result >= 30) {
      setBMIResult('Fat or Over weight');
    } else {
      setBMIResult('');
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getSteps();
    }, [currentUser?.user_id]),
  );
  const checkColors = () => {
    let state = BMIResult;
    if (state === 'Fat or Over weight' || state === 'Over Weight') {
      return '#f93154';
    } else if (state === 'Under Weight') {
      return '#57d147';
    } else if (state === 'Normal Weight') {
      return '#cce5ff';
    }
  };
  return (
    <View style={styles.container}>
      {loader ? (
        <Spinner
          visible={loader}
          textStyle={{color: Colors.WHITE}}
          textContent={'Loading...'}
          overlayColor={'#222332'}
          customIndicator={<ActivityIndicator color={'#9662F1'} size="large" />}
        />
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack(-1)}>
              <Image source={require('../../assets/images/backButton.png')} />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>Account Information</Text>
            </View>
            {saveLoading ? (
              <ActivityIndicator color={'#9662F1'} size="small" />
            ) : (
              <TouchableOpacity onPress={onSaveProfile}>
                <Text style={styles.saveButton}>Save</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.circleImage}>
              <Image
                style={styles.image}
                source={require('../../assets/images/Vector.png')}
              />
            </View>
          </View>
          <View>
            <View style={styles.account}>
              <View style={styles.row}>
                <Text style={{color: Colors.WHITE, fontSize: 16}}>Name</Text>
                <View style={styles.secondaryRow}>
                  <Text style={{color: Colors.WHITE, fontSize: 14}}>
                    {currentUser?.fullName}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EditProfile', {
                        data: {name: currentUser?.fullName},
                      })
                    }>
                    <Image
                      source={require('../../assets/images/forward.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.borderListBottom}></View>
              <View style={styles.row}>
                <Text style={{color: Colors.WHITE, fontSize: 16}}>Weight</Text>
                <View style={styles.secondaryRow}>
                  {steps?.map((x ,index) => {
                    return (
                      <Text style={{color: Colors.WHITE, fontSize: 14}} key={index}>
                        {x.weight}
                      </Text>
                    );
                  })}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EditProfile', {
                        data: {weight: steps[4]?.weight, setSteps: setSteps},
                      })
                    }>
                    <Image
                      source={require('../../assets/images/forward.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[
                  styles.borderListBottom,
                  {borderBottomWidth: 0.5},
                ]}></View>
              <View style={styles.row}>
                <Text style={{color: Colors.WHITE, fontSize: 16}}>Height</Text>
                <View style={styles.secondaryRow}>
                  {steps?.map((x , index) => {
                    return (
                      <Text style={{color: Colors.WHITE, fontSize: 14}} key={index}>
                        {x.height}
                      </Text>
                    );
                  })}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EditProfile', {
                        data: {height: steps[4]?.height, setSteps: setSteps},
                      })
                    }>
                    <Image
                      source={require('../../assets/images/forward.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.borderListBottom}></View>
              <View style={styles.row}>
                <Text style={{color: Colors.WHITE, fontSize: 16}}>
                  Date of Birth
                </Text>
                <View style={styles.secondaryRow}>
                  {steps?.map((x , index) => {
                    return (
                      <Text style={{color: Colors.WHITE, fontSize: 14}} key={index}>
                        {x?.birthDate}
                      </Text>
                    );
                  })}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EditProfile', {
                        data: {
                          dateOfBirth: steps[2]?.birthDate,
                          setSteps: setSteps,
                        },
                      })
                    }>
                    <Image
                      source={require('../../assets/images/forward.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[
                  styles.borderListBottom,
                  {borderBottomWidth: 0.5},
                ]}></View>
              <View style={styles.row}>
                <Text style={{color: Colors.WHITE, fontSize: 16}}>Email</Text>
                <View style={styles.secondaryRow}>
                  <Text style={{color: Colors.WHITE, fontSize: 14}}>
                    {currentUser?.email}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EditProfile', {
                        data: {email: currentUser?.email},
                      })
                    }>
                    <Image
                      source={require('../../assets/images/forward.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.account, {marginTop: 20}]}>
              <Text style={{color: 'white', fontSize: 20}}>
                BMI Calculations
              </Text>
              <View
                style={[styles.bmiContainer, {backgroundColor: checkColors()}]}>
                <Text
                  style={[
                    styles.bmiFonts,
                    {color: BMIResult === 'Normal Weight' ? 'black' : 'white'},
                  ]}>
                  {BMIResult}
                </Text>
                <Text
                  style={[
                    styles.bmiFonts,
                    {color: BMIResult === 'Normal Weight' ? 'black' : 'white'},
                  ]}>
                  {BMIValue}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222332',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  saveButton: {color: '#9662F1', fontSize: 17},

  headerTitle: {
    fontSize: 16,
    color: Colors.WHITE,
    fontWeight: '400',
  },
  circleImage: {
    backgroundColor: '#D8D8D8',
    alignItems: 'center',
    height: '33%',
    width: '20%',
    justifyContent: 'center',
    borderRadius: 60,
  },
  account: {
    borderRadius: 10,
    backgroundColor: '#2D3450',
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  image: {flex: 1, width: 50, height: 50, resizeMode: 'contain'},
  borderListBottom: {borderBottomColor: '#FFFFFF', borderBottomWidth: 0.2},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    margin: 5,
  },
  secondaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bmiContainer: {
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bmiFonts: {
    fontWeight: '600',
    fontSize: 16,
  },
});
export default AccountInformation;
