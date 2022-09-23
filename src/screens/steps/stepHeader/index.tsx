import {useNavigation} from '@react-navigation/native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {ISignUpSteps} from '../../auth/SignIn';
type IStepHeaderProps = {
  step: number;
  setStep: (value: number) => void;
  currentUserId: string;
  steps: ISignUpSteps[];
};
const StepHeader = ({
  step,
  setStep,
  currentUserId,
  steps,
}: IStepHeaderProps) => {
  const navigation = useNavigation<any>();
  const onSkipStep = async () => {
    await firestore()
      .collection('SignupSteps')
      .doc(currentUserId)
      .set({steps: steps, user_id: currentUserId, isSkipped: true}).then(()=>{
        navigation.navigate("Dashboard")
      })
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setStep(step - 1)}>
        <Image source={require('../../../assets/images/backButton.png')} />
      </TouchableOpacity>
      <Text style={styles.step}>Step {step} of 8</Text>
      <View></View>
      {/* {step > 3 ? (
        <TouchableOpacity onPress={onSkipStep}>
          <Text style={{color: Colors.WHITE}}>Skip</Text>
        </TouchableOpacity>
      ) : (
        <View></View>
      )} */}
    </View>
  );
};
const styles = StyleSheet.create({
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
});

export default StepHeader;
