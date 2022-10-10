import React, {createContext, useState} from 'react';
const signUpdataDefaultValues = [
  {
    step: 1,
    isValidate: true,
  },
  {
    step: 2,
    isValidate: true,
  },
  {
    step: 3,
    isValidate: false,
  },
  {
    step: 4,
    isValidate: false,
  },
  {
    step: 5,
    isValidate: false,
  },
  {
    step: 6,
    isValidate: false,
  },
  {
    step: 7,
    isValidate: false,
  },
  {
    step: 8,
    isValidate: false,
  },
];
export const SignUpInitialValueContext = createContext<ISignUpDataContext>({
  signUpdata: signUpdataDefaultValues,
  setSignUpdata: values => {},
});
type Props = {
  children: React.ReactNode;
};
export interface ISignUpData {
  step: number;
  isValidate: boolean;
}
export interface ISignUpDataContext {
  signUpdata: ISignUpData[];
  setSignUpdata: (values: ISignUpData) => void;
}
export const UserSignupDataContext = ({children}: Props) => {
  const [signUpdata, setSignUpdata] = useState<ISignUpData[]>(
    signUpdataDefaultValues,
  );
  return (
    <SignUpInitialValueContext.Provider
      value={{
        signUpdata,
        setSignUpdata: values =>
          setSignUpdata(prevState => {
            let updatedState = prevState.map(x => {
              if (values.step === x.step) x.isValidate = values.isValidate;
              return x;
            });

            return [...updatedState];
          }),
      }}>
      {children}
    </SignUpInitialValueContext.Provider>
  );
};
