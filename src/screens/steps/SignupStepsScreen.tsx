import React, {useEffect, useState} from 'react';
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
type SignupStepsScreen = {
  steps: ISignUpSteps[];
  loading: boolean;
  setLoading: (value: boolean) => void;
};
let userId: string = '';
const SignupStepsScreen = (props: SignupStepsScreen) => {
  let {steps} = props;
  const [sendUserStepsData, setSendUserStepsData] =
    useState<ISignUpSteps[]>(steps);
  const [submitStepLoading, setSubmitStepLoading] = useState<boolean>(false);
  const [isSkipped, setIsSkipped] = useState<boolean>(false);
  const [userSignUpData, setUserSignupData] = useState<ISignUpSteps>();

  const [step, setStep] = useState<number>(
    steps.filter(x => !x.isCompleted)?.[0]?.step ?? 1,
  );
  const getUserId = async () => {
    userId = await getStoredData('uid');
  };
  const onInputChanges = async (data: ISignUpSteps) => {
    setUserSignupData(data);
  };
  const navigation = useNavigation<any>();

  const getScreen = (step: number) => {
    if (!props.loading)
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
    getUserId();
  }, []);
  useEffect(() => {
    firestore()
      .collection('SignupSteps')
      .get()
      .then(res => {
        const fullData = res.docs.map(x => x.data());
        const user: ISignUpSteps[] = fullData.filter(x => x.user_id === userId);
        user[0]?.isSkipped && navigation.navigate("Dashboard")
        setIsSkipped(user[0]?.isSkipped!);
      });
  }, [isSkipped]);
  console.log(isSkipped, 'is');

  const onContinue = async () => {
    setSubmitStepLoading(true);
    if (step === 1) {
      let newState = [...sendUserStepsData];
      newState[0].gender = userSignUpData?.gender;
      newState[0].isCompleted = true;
      newState[0].step = step;
    } else if (step === 2) {
      let newState = [...sendUserStepsData];
      newState[1].mainGoal = userSignUpData?.mainGoal;
      newState[1].isCompleted = true;
      newState[1].step = step;
    } else if (step === 3) {
      let newState = [...sendUserStepsData];
      newState[2].birthDate = userSignUpData?.birthDate;
      newState[2].isCompleted = true;
      newState[2].step = step;
    } else if (step === 4) {
      let newState = [...sendUserStepsData];
      newState[3].height = userSignUpData?.height;
      newState[3].isCompleted = true;
      newState[3].step = step;
    } else if (step === 5) {
      let newState = [...sendUserStepsData];
      newState[4].weight = userSignUpData?.weight;
      newState[4].isCompleted = true;
      newState[4].step = step;
    } else if (step === 6) {
      let newState = [...sendUserStepsData];
      newState[5].goalWeight = userSignUpData?.goalWeight;
      newState[5].isCompleted = true;
      newState[5].step = step;
    } else if (step === 7) {
      let newState = [...sendUserStepsData];
      newState[6].trainingLevel = userSignUpData?.trainingLevel;
      newState[6].isCompleted = true;
      newState[6].step = step;
    } else if (step === 8) {
      let newState = [...sendUserStepsData];
      newState[7].InterestedActivities = userSignUpData?.InterestedActivities;
      newState[7].isCompleted = true;
      newState[7].step = step;
    }

    await getSignUpUpdatedData(sendUserStepsData);
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
        console.log(res);
      })
      .catch(err => console.log(err));
    setSubmitStepLoading(false);
    setStep(prevState =>
      prevState > 7 ? navigation.navigate('CreatePlan') : prevState + 1,
    );
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={props.loading || submitStepLoading}
        textStyle={{color: Colors.WHITE}}
        textContent={'Loading...'}
        overlayColor={'#222332'}
        customIndicator={<ActivityIndicator color={'#9662F1'} />}
      />
      <>
        {steps.some(x => !x.isCompleted) ? (
          <StepHeader
            step={step}
            setStep={setStep}
            currentUserId={userId}
            steps={steps}
          />
        ) : null}
        {steps.some(x => !x.isCompleted) ?(
          (() => {
            switch (step) {
              case step: {
                return _.compact(
                  steps.map(_step => {
                    if (!_step?.isCompleted && !isSkipped) return getScreen(step);
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
        {steps.some(x => !x.isCompleted) ? (
          userSignUpData?.goalWeight?.length &&
          userSignUpData?.goalWeight?.length > 1 ? null : (
            <View style={styles.buttonFooter}>
              <AppButton title="Continue" width={350} onPress={onContinue} />
            </View>
          )
        ) : null}
      </>
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
