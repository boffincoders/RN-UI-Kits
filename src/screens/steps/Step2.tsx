
import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/Colors';
import {SignUpInitialValueContext} from '../../contextAPI/UserSignupContext';
import {IPropsSteps} from './Step1';

let gender = [
  {
    name: 'Loose weight',
    icon: require('../../assets/images/weight.png'),
  },
  {
    name: 'Keep fit',
    icon: require('../../assets/images/leaf.png'),
  },
  {
    name: 'Get Stronger',
    icon: require('../../assets/images/muscle.png'),
  },
  {
    name: 'Gain muscle mass',
    icon: require('../../assets/images/dumbell.png'),
  },
];
const Step2 = ({onInputChanges}: IPropsSteps) => {
  const [selectedList, setSelectedList] = useState<string>('Loose weight');
  const {setSignUpdata, signUpdata} = useContext(SignUpInitialValueContext);
  useEffect(() => {
    setSignUpdata({...signUpdata, mainGoal: selectedList});
  }, []);
  const onMainGoal = (name: string) => {
    setSelectedList(name);
    setSignUpdata({
      ...signUpdata,
      mainGoal: name,
    });
    onInputChanges({mainGoal: selectedList});
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.gender}>Choose main goal</Text>
        {gender.map((x, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => onMainGoal(x.name)}>
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

export default Step2;

