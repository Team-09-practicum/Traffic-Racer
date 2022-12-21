import { api } from '@/utils/api';
import { showNetworkError } from '@/utils/showNetworkError';

export interface ISignIn {
  login: string;
  password: string;
}

export const signIn = async (userInfo: ISignIn) => {
  await api.postSignIn({
    data: userInfo,
    onError: (err) => showNetworkError(err.response.data.reason),
  });
};
