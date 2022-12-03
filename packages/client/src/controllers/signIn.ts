import { api } from '@/utils/api';

export interface SignInProps {
  login: string;
  password: string;
}

export const signIn = async (userInfo: SignInProps) => {
  await api
    .postSignIn({
      data: userInfo,
      // eslint-disable-next-line no-console
      onSuccess: (res) => console.log('%cResponse = ', 'color: green', res),
    })
    .then(() =>
      api.getUser({
        // eslint-disable-next-line no-console
        onSuccess: (res) => console.log('%cResponse = ', 'color: green', res),
      })
    );
};
