
import React, { useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../constants/Colors';
import {IPropsSteps} from './Step1';

const heightTypes = [
  {
    name: 'Pound',
  },
  {
    name: 'kilogram',
  },
];
const Step6 = ({onInputChanges}: IPropsSteps) => {
  const [selectedGoalWeightType, setSelectedGoalWeightType] =
    useState<number>(0);
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.gender}>Select goal weight </Text>
        <View style={styles.heightContainer}>
          {heightTypes.map((x, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedGoalWeightType(i)}>
                <LinearGradient
                  start={{x: 1, y: 1}}
                  end={{x: 1, y: 0}}
                  colors={
                    selectedGoalWeightType === i
                      ? ['#332B8A', '#905DE9']
                      : ['#2D3450', '#2D3450']
                  }
                  style={styles.selectedHeightStyle}>
                  <Text style={{color: Colors.WHITE , fontFamily : "Poppins-Regular"}}>{x.name}</Text>
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
            style={styles.input}
            maxLength={3}
            keyboardType="numeric"
            onChangeText={text =>
              onInputChanges({
                goalWeight: `${text} ${
                  selectedGoalWeightType === 0 ? 'Lb' : 'Kg'
                }`,
              })
            }
          />
          <Text
            style={{
              color: Colors.WHITE,
              marginLeft: 10,
              marginTop: 10,
              fontSize: 16,
              fontFamily : "Poppins-Regular"
            }}>
            {selectedGoalWeightType === 0 ? 'Lb' : 'Kg'}
          </Text>
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
    fontFamily : "Poppins-Regular"
  },
  listContainer: {
    marginTop: 60,
    paddingHorizontal: 10,
    alignItems: 'center',
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
  input: {
    backgroundColor: '#2D3450',
    width: 100,
    paddingVertical: 20,
    fontSize: 25,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 30,
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontFamily : "Poppins-Regular"
  },
});

export default Step6;
