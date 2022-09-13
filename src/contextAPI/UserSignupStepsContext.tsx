import React, {createContext, useState} from 'react';
import {ISignUpSteps} from '../screens/auth/SignIn';
export const UserSignupStepsContext = createContext<ISignUpStepsContext>({
  steps: {
    isCompleted: false,
    step: 0,
    gender: '',
    mainGoal: '',
    birthDate: '',
    height: '',
    weight: '',
    goalWeight: '',
    trainingLevel: '',
    InterestedActivities: [],
  },
  setSteps: () => {},
});
const stepsDefaultValues = {
  step: 0,
  isCompleted: false,
  gender: '',
  mainGoal: '',
  birthDate: '',
  height: '',
  weight: '',
  goalWeight: '',
  trainingLevel: '',
  InterestedActivities: [],
};
type Props = {
  children: React.ReactNode;
};

export interface ISignUpStepsContext {
  steps: ISignUpSteps;
  setSteps: (values: ISignUpSteps) => void;
}
export const UserSignupStepsDataContext = ({children}: Props) => {
  const [steps, setSteps] = useState<ISignUpSteps>(stepsDefaultValues);
  return (
    <UserSignupStepsContext.Provider
      value={{steps, setSteps: values => setSteps(values)}}>
      {children}
    </UserSignupStepsContext.Provider>
  );
};
