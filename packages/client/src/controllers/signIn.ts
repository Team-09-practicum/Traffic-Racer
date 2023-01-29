import { isAxiosError } from 'axios';
import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export interface ISignIn {
  login: string;
  password: string;
}

export const signIn = async (userInfo: ISignIn) => {
  await api.postSignIn({
    data: userInfo,
    onError: (err) => {
      if (isAxiosError(err) && err.response) {
        showNetworkError(err.response.data.reason);
      }
      throw Error(err.message);
    },
  });
};
