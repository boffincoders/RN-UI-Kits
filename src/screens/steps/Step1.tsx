import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore'
import {Colors} from '../../constants/Colors';
import {SignUpInitialValueContext} from '../../contextAPI/UserSignupContext';
import {ISignUpSteps} from '../auth/SignIn';
let gender = [
  {
    name: 'Woman',
    icon: require('../../assets/images/woman.png'),
  },
  {
    name: 'Man',
    icon: require('../../assets/images/man.png'),
  },
];
export type IPropsSteps = {
  onInputChanges: (value: ISignUpSteps) => void;
};
const Step1 = ({onInputChanges}: IPropsSteps) => {
  const [selectedList, setSelectedList] = useState<string>('Woman');
  
  const onPressGender = (data: {name: string; icon: any}) => {
    onInputChanges({gender: data.name});
    setSelectedList(data.name);
  };
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.gender}>Choose gender</Text>
        {gender.map((x, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => onPressGender(x)}>
              <LinearGradient
                start={{x: 1, y: 1}}
                end={{x: 1, y: 0}}
                colors={
                  selectedList === x.name
                    ? ['#332B8A', '#905DE9']
                    : ['#2D3450', '#2D3450']
                }
                style={styles.listItem}>
                <View style={styles.textAndIconWrapper}>
                  <LinearGradient
                    start={{x: 1, y: 1}}
                    end={{x: 1, y: 0}}
                    colors={
                      selectedList === x.name
                        ? ['#332B8A', '#905DE9']
                        : ['#2D3450', '#2D3450']
                    }
                    style={styles.iconContainer}>
                    <Image source={x.icon} />
                  </LinearGradient>
                  <Text
                    style={{color: Colors.WHITE, marginLeft: 5, fontSize: 16}}>
                    {x.name}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
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
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  step: {
    color: '#9662F1',
    fontSize: 16,
  },
  gender: {
    fontSize: 27,
    color: Colors.WHITE,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 60,
    paddingHorizontal: 10,
  },

  listItem: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 14,
  },
  textAndIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  iconContainer: {
    width: '10%',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFooter: {
    position: 'absolute',
    right: 18,
    bottom: 20,
  },
});

export default Step1;
{
  /* [ '#222332', '#2D3450'] */
}
