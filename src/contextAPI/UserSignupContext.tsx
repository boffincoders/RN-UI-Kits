import React, {createContext, useState} from 'react';
export const SignUpInitialValueContext = createContext<ISignUpDataContext>({
  signUpdata: {
    fullName: '',
    email: '',
    password: '',
    phone: '',
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
  },
  setSignUpdata: () => {},
});
const signUpdataDefaultValues = {
  fullName: '',
  email: '',
  password: '',
  phone: '',
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
interface ISignUpData {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
  gender?: string;
  mainGoal?: string;
  birthDate?: string;
  height?: string;
  weight?: string;
  goalWeight?: string;
  trainingLevel?: string;
  InterestedActivities?: {
    name: string;
    id: string;
  }[];
}
export interface ISignUpDataContext {
  signUpdata: ISignUpData;
  setSignUpdata: (values: ISignUpData) => void;
}
export const UserSignupDataContext = ({children}: Props) => {
  const [signUpdata, setSignUpdata] = useState<ISignUpData>(
    signUpdataDefaultValues,
  );
  return (
    <SignUpInitialValueContext.Provider
      value={{signUpdata, setSignUpdata: values => setSignUpdata(values)}}>
      {children}
    </SignUpInitialValueContext.Provider>
  );
};
