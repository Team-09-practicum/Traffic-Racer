/* eslint-disable no-console */
import { api } from '@/utils/api';
import { ErrorResProps } from '@/utils/api/typings';

export interface SignUpProps {
  first_name: 'string';
  second_name: 'string';
  login: 'string';
  email: 'string';
  password: 'string';
  phone: 'string';
}

interface ResProps {
  id: string;
}

export const signUpController = async (values: SignUpProps) => {
  await api.postSignUp({
    data: values,
    onSuccess: (res) => {
      console.log('User id =', (res as ResProps).id);
    },
    onError: (err) => {
      const error = (err as ErrorResProps).response.data.reason;
      console.log('%cError', 'color: red', `= ${error}`);
    },
  });
};
