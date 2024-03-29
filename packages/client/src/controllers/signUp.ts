import { isAxiosError } from 'axios';
import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export interface ISignUp {
  first_name: 'string';
  second_name: 'string';
  login: 'string';
  email: 'string';
  password: 'string';
  phone: 'string';
}

export const signUp = async (userInfo: ISignUp) => {
  await api.postSignUp({
    data: userInfo,
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        showNetworkError(err.response.data.reason);
      }
      throw Error(err.message);
    },
  });
};
