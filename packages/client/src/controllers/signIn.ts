import { api } from '@/utils/api';

export interface ISignIn {
  login: string;
  password: string;
}

export const signIn = async (userInfo: ISignIn) => {
  await api.postSignIn({
    data: userInfo,
    // eslint-disable-next-line no-console
    onSuccess: (res) => console.log('%cResponse = ', 'color: green', res),
  });

  api.getUser({
    // eslint-disable-next-line no-console
    onSuccess: (res) => console.log('%cResponse = ', 'color: green', res),
  });
};
