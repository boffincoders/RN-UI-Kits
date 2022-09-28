import {ISignUpSteps} from '../screens/auth/SignIn';
export const ValidationButton = (step: number, data: ISignUpSteps) => {
  switch (step) {
    case step:
      if (data?.weight!= "") return true;
      else false;
  }
  return data;
};
