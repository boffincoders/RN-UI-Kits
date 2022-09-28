import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native';
import {Colors} from '../../constants/Colors';
import {getStoredData} from '../../storage';
import {ISignUpSteps} from '../auth/SignIn';
import firestore from '@react-native-firebase/firestore';
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
  const [currentUser, setCurrentUser] = useState<null | ICurrentUser>(null);
  const getSteps = async () => {
    const getCurrentUser = await getStoredData('currentUser');
    setCurrentUser(getCurrentUser);
    await firestore()
      .collection('SignupSteps')
      .doc(getCurrentUser?.user_id)
      .get()
      .then(res => {
        setSteps(res?.data()?.steps);
      })
      .catch(err => console.log(err));
  };
  console.log(steps, 'steps');

  useEffect(() => {
    getSteps();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/backButton.png')} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Account Information</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
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
              <TouchableOpacity>
                <Image source={require('../../assets/images/forward.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderListBottom}></View>
          <View style={styles.row}>
            <Text style={{color: Colors.WHITE, fontSize: 16}}>Weight</Text>
            <View style={styles.secondaryRow}>
              {steps?.map(x => {
                return (
                  <Text style={{color: Colors.WHITE, fontSize: 14}}>
                    {x.weight}
                  </Text>
                );
              })}

              <TouchableOpacity>
                <Image source={require('../../assets/images/forward.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderListBottom}></View>
          <View style={styles.row}>
            <Text style={{color: Colors.WHITE, fontSize: 16}}>
              Date of Birth
            </Text>
            <View style={styles.secondaryRow}>
              {steps?.map(x => {
                return (
                  <Text style={{color: Colors.WHITE, fontSize: 14}}>
                    {x?.birthDate}
                  </Text>
                );
              })}

              <TouchableOpacity>
                <Image source={require('../../assets/images/forward.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[styles.borderListBottom, {borderBottomWidth: 0.5}]}></View>
          <View style={styles.row}>
            <Text style={{color: Colors.WHITE, fontSize: 16}}>Email</Text>
            <View style={styles.secondaryRow}>
              <Text style={{color: Colors.WHITE, fontSize: 14}}>
                {currentUser?.email}
              </Text>
              <TouchableOpacity>
                <Image source={require('../../assets/images/forward.png')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
  saveButton: {
    color: '#9662F1',
    fontSize: 16,
  },
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
});
export default AccountInformation;
