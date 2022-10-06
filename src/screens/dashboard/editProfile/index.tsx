import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppInput from '../../../components/AppInput';
import DatePicker from 'react-native-modern-datepicker';
import {Colors} from '../../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import AppButton from '../../../components/AppButton';
import {getStoredData, storeData} from '../../../storage';
import {ISignUpSteps} from '../../auth/SignIn';
type IData = {
  name?: string;
  weight?: string;
  height?: string;
  dateOfBirth?: string;
  email?: string;
  setSteps: React.Dispatch<React.SetStateAction<ISignUpSteps[]>>;
};
interface IEditProfileProps {
  route: {
    params: {
      data: IData;
    };
  };
}
const heightTypes = [
  {
    name: 'Pound',
  },
  {
    name: 'kilogram',
  },
];
const EditProfile = ({route}: IEditProfileProps) => {
  const {name, dateOfBirth, email, height, weight, setSteps} =
    route?.params?.data;

    
  const navigation = useNavigation<any>();
  const [selectedWeightType, setSelectedWeightType] = useState<number>(0);
  const [routeProps, setRouteProps] = useState({
    name: '',
    dateOfBirth: '',
    email: '',
    weight: '',
    height: '',
  });
  const splitedWeight = weight?.split(' ');
  useEffect(() => {
    setRouteProps({
      name: name!,
      weight: weight ? splitedWeight![0]?.toString() : '',
      dateOfBirth: dateOfBirth!,
      email: email!,
      height: height!,
    });
  }, [route.params.data]);
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/images/backButton.png')} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Edit Profile</Text>
          </View>
          <View />
        </View>
      </View>
      <View style={styles.account}>
        <Formik
          enableReinitialize
          onSubmit={async values => {
            const updatedWeight = `${values.weight} ${
              selectedWeightType === 0 ? 'Kg' : 'Lb'
            }`;
            const currentUser = await getStoredData('currentUser');
            await storeData('currentUser', {
              ...currentUser,
              email: values.email ? values.email : currentUser?.email,
              fullName: values.name ? values.name : currentUser?.fullName,
            });
            // await firestore()
            //   .collection('SignupSteps')
            //   .doc(currentUser?.user_id)
            //   .update({
            //   steps : firestore.FieldValue.arrayUnion(

            //   )
            //   });
            navigation.navigate('AccountInformation', {});
          }}
          initialValues={
            routeProps?.name
              ? {name: routeProps?.name}
              : routeProps?.email
              ? {email: routeProps?.email}
              : routeProps?.dateOfBirth
              ? {dateOfBirth: routeProps?.dateOfBirth}
              : routeProps?.weight
              ? {weight: routeProps?.weight}
              : routeProps.height
              ? {height: routeProps.height}
              : {}
          }>
          {({errors, touched, setFieldValue, values, handleSubmit}) => (
            <>
              <Text style={styles.gender}>
                {name
                  ? 'Update Name'
                  : email
                  ? 'Update Email'
                  : dateOfBirth
                  ? 'Update Date Of Birth'
                  : weight
                  ? 'Update Weight'
                  : height
                  ? 'Update height'
                  : ''}
              </Text>
              {email ? (
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
              ) : name ? (
                <View
                  style={[
                    styles.input,
                    errors.email && touched.email
                      ? {borderWidth: 0.5, borderColor: 'red'}
                      : null,
                  ]}>
                  <AppInput
                    placeholder="Name"
                    onChangeText={value => setFieldValue('name', value)}
                    value={values.name}
                    style={styles.inputContainer}
                    placeholderTextColor={'white'}
                    autoCapitalize="none"
                  />
                </View>
              ) : weight || height ? (
                <View style={styles.listContainer}>
                  <View style={styles.heightContainer}>
                    {height
                      ? ['feet', 'centimeter']
                      : heightTypes.map((x, i) => {
                          return (
                            <TouchableOpacity
                              key={i}
                              onPress={() => setSelectedWeightType(i)}>
                              <LinearGradient
                                start={{x: 1, y: 1}}
                                end={{x: 1, y: 0}}
                                colors={
                                  selectedWeightType === i
                                    ? ['#332B8A', '#905DE9']
                                    : ['#2D3450', '#2D3450']
                                }
                                style={styles.selectedHeightStyle}>
                                <Text style={{color: Colors.WHITE}}>
                                  {x.name}
                                </Text>
                              </LinearGradient>
                            </TouchableOpacity>
                          );
                        })}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TextInput
                      style={{
                        backgroundColor: '#2D3450',
                        width: 100,
                        paddingVertical: 20,
                        fontSize: 25,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        marginTop: 30,
                        color: Colors.WHITE,
                        fontWeight: 'bold',
                      }}
                      maxLength={3}
                      value={values.weight}
                      keyboardType="numeric"
                      onChangeText={text => setFieldValue('weight', `${text}`)}
                    />
                    <Text
                      style={{
                        color: Colors.WHITE,
                        marginLeft: 10,
                        marginTop: 10,
                        fontSize: 16,
                      }}>
                      {selectedWeightType === 0 ? 'Lb' : 'Kg'}
                    </Text>
                  </View>
                </View>
              ) : dateOfBirth ? (
                <DatePicker
                  onDateChange={date => {
                    setFieldValue('dateOfBirth', date);
                  }}
                  selectorStartingYear={1990}
                  options={{
                    textDefaultColor: '#332B8A',
                    selectedTextColor: Colors.WHITE,
                    mainColor: '#905DE9',
                    textSecondaryColor: '#332B8A',
                    borderColor: 'rgba(122, 146, 165, 0.1)',
                  }}
                  selected={values?.dateOfBirth}
                  mode="calendar"
                  minuteInterval={30}
                  style={{borderRadius: 10, marginLeft: 10, marginRight: 10}}
                />
              ) : (
                <></>
              )}

              <View style={{position: 'absolute', bottom: 10, left: 50}}>
                <AppButton title="Update" width={300} onPress={handleSubmit} />
              </View>
            </>
          )}
        </Formik>
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
  headerTitle: {
    fontSize: 16,
    color: Colors.WHITE,
    fontWeight: '400',
  },
  account: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '100%',
    color: 'white',
  },
  heightContainer: {
    width: 250,
    backgroundColor: '#2D3450',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    marginTop: 20,
  },
  selectedHeightStyle: {
    paddingHorizontal: 30,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 20,
  },
  gender: {
    fontSize: 27,
    color: Colors.WHITE,
    fontWeight: '700',
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 60,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
});
export default EditProfile;
