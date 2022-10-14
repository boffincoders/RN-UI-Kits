import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AppButton from '../../components/AppButton';
import StepHeader from './stepHeader';
import Step1 from './Step1';
import Step2 from './Step2';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import {getStoredData} from '../../storage';
import {ISignUpSteps} from '../auth/SignIn';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {Colors} from '../../constants/Colors';
import Step3 from './Step3';
import Dashboard from '../dashboard';
import {
  SignUpInitialValueContext,
} from '../../contextAPI/UserSignupContext';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
type SignupStepsScreen = {
  user: FirebaseAuthTypes.User | null;
};
let userId: string = '';
const SignupStepsScreen = (props: SignupStepsScreen) => {
  const {signUpdata, setSignUpdata} = useContext(SignUpInitialValueContext);
  const [loading, setLoading] = useState<boolean>(false);
  let {user} = props;
  const [step, setStep] = useState<number>(1);
  const [submitStepLoading, setSubmitStepLoading] = useState<boolean>(false);
  const [currentUserSteps, setCurrentUserSteps] = useState<ISignUpSteps[]>([]);
  const [userSignUpData, setUserSignupData] = useState<ISignUpSteps>({
    step: 1,
    isCompleted: false,
    gender: '',
    mainGoal: '',
    birthDate: '',
    height: '',
    weight: '',
    goalWeight: '',
    trainingLevel: '',
    InterestedActivities: [
      {
        name: '',
        id: '',
      },
    ],
  });
  const navigation = useNavigation<any>();
  const getUserId = async () => {
    userId = await getStoredData('uid');
  };

  const getSteps = async () => {
    setLoading(true);
    await firestore()
      .collection('SignupSteps')
      .doc(user?.uid)
      .get()
      .then(res => {
        const userSteps: ISignUpSteps[] = res?.data()?.steps;
        setStep(userSteps?.filter(x => !x.isCompleted)?.[0]?.step ?? 1);
        setCurrentUserSteps(userSteps);
      });
    setLoading(false);
  };
  const onInputChanges = async (data: ISignUpSteps) => {
    let isValidated = false;
    let _signUpdata = signUpdata.filter(x => x.step === step)[0];
    switch (step) {
      case 1:
        isValidated = true;
        break;
      case 2:
        isValidated = true;
        break;
      case 3:
        isValidated = data.birthDate !== '' ? true : false;
        break;
      case 4:
        let formattedHeight = parseInt(data.height?.replace(' cm', '') ?? '0');
        isValidated = formattedHeight ? true : false;
        break;
      case 5:
        let formattedWeight = parseInt(data.weight?.replace(' kg', '') ?? '0');
        isValidated = formattedWeight ? true : false;
        break;
      case 6:
        let updatedGoalWeight = parseInt(
          data.goalWeight?.replace(' kg', '') ?? '0',
        );
        isValidated = updatedGoalWeight ? true : false;
        break;
      case 7:
        let traingiLevel = data.trainingLevel !== '';
        isValidated = traingiLevel ? true : false;
        break;
      case 8:
        isValidated =
          data.InterestedActivities && data?.InterestedActivities[0].name
            ? true
            : false;
        break;
    }
    _signUpdata = {..._signUpdata, isValidate: isValidated};
    setSignUpdata(_signUpdata);
    setUserSignupData({...userSignUpData, ...data});
  };
  const getScreen = (step: number) => {
    switch (step) {
      case 1:
        return <Step1 onInputChanges={onInputChanges} />;
      case 2:
        return <Step2 onInputChanges={onInputChanges} />;
      case 3:
        return <Step3 onInputChanges={onInputChanges} />;
      case 4:
        return <Step4 onInputChanges={onInputChanges} />;
      case 5:
        return <Step5 onInputChanges={onInputChanges} />;
      case 6:
        return <Step6 onInputChanges={onInputChanges} />;
      case 7:
        return <Step7 onInputChanges={onInputChanges} />;
      case 8:
        return <Step8 onInputChanges={onInputChanges} />;
      default:
      // return navigation.navigate('Dashboard');
    }
  };
  useEffect(() => {
    getSteps();
    getUserId();
  }, []);

  const onContinue = async () => {
    setSubmitStepLoading(true);
    if (step === 1) {
      let newState = [...currentUserSteps];
      newState[0].gender = userSignUpData?.gender;
      newState[0].isCompleted = true;
      newState[0].step = step;
    } else if (step === 2) {
      let newState = [...currentUserSteps];
      newState[1].mainGoal = userSignUpData?.mainGoal;
      newState[1].isCompleted = true;
      newState[1].step = step;
    } else if (step === 3) {
      let newState = [...currentUserSteps];
      newState[2].birthDate = userSignUpData?.birthDate;
      newState[2].isCompleted = true;
      newState[2].step = step;
    } else if (step === 4) {
      let newState = [...currentUserSteps];
      newState[3].height = userSignUpData?.height;
      newState[3].isCompleted = true;
      newState[3].step = step;
    } else if (step === 5) {
      let newState = [...currentUserSteps];
      newState[4].weight = userSignUpData?.weight;
      newState[4].isCompleted = true;
      newState[4].step = step;
    } else if (step === 6) {
      let newState = [...currentUserSteps];
      newState[5].goalWeight = userSignUpData?.goalWeight;
      newState[5].isCompleted = true;
      newState[5].step = step;
    } else if (step === 7) {
      let newState = [...currentUserSteps];
      newState[6].trainingLevel = userSignUpData?.trainingLevel;
      newState[6].isCompleted = true;
      newState[6].step = step;
    } else if (step === 8) {
      let newState = [...currentUserSteps];
      newState[7].InterestedActivities = userSignUpData?.InterestedActivities;
      newState[7].isCompleted = true;
      newState[7].step = step;
    }

    await getSignUpUpdatedData(currentUserSteps);
    setSubmitStepLoading(false);
  };

  const getSignUpUpdatedData = async (data: ISignUpSteps[]) => {
    await firestore()
      .collection('SignupSteps')
      .doc(userId)
      .set({
        user_id: userId,
        steps: data,
      })
      .then(res => {
        console.log(res, 'hiiii');
      })
      .catch(err => console.log(err, 'hii'));
    setSubmitStepLoading(false);
    setStep(prevState =>
      prevState > 7 ? navigation.navigate('CreatePlan') : prevState + 1,
    );
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={loading || submitStepLoading}
        textStyle={{color: Colors.WHITE}}
        textContent={'Loading...'}
        overlayColor={'#222332'}
        customIndicator={<ActivityIndicator color={'#9662F1'} size="large" />}
      />

      {!loading && (
        <>
          {currentUserSteps.some(x => !x.isCompleted) ? (
            <StepHeader
              step={step}
              setStep={setStep}
              currentUserId={userId}
              steps={currentUserSteps}
            />
          ) : null}
          {!loading && currentUserSteps.some(x => !x.isCompleted) ? (
            (() => {
              switch (step) {
                case step: {
                  return _.compact(
                    currentUserSteps.map(_step => {
                      if (!_step?.isCompleted) return getScreen(step);
                    }),
                  )?.[0];
                }
                default:
                // return navigation.navigate('Dashboard');
              }
            })()
          ) : (
            <Dashboard />
          )}

          {currentUserSteps.some(x => !x.isCompleted) ? (
            signUpdata.find(
              element => element.step === step && element.isValidate,
            ) ? (
              <View style={styles.buttonFooter}>
                <AppButton title="Continue" width={350} onPress={onContinue} />
              </View>
            ) : null
          ) : null}
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
  buttonFooter: {
    position: 'absolute',
    right: 18,
    bottom: 20,
  },
});
export default SignupStepsScreen;
