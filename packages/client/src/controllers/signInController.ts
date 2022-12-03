/* eslint-disable no-console */
import { api } from '@/utils/api';
import { ErrorResProps } from '@/utils/api/typings';

export interface SignInProps {
  login: string;
  password: string;
}

export const signInController = async (values: SignInProps) => {
  await api
    .postSignIn({
      data: values,
      onSuccess: (res) => console.log('%cResponse = ', 'color: green', res),
      onError: (err) => {
        const error = (err as ErrorResProps).response.data.reason;
        console.log('%cError = ', 'color: red', error);
      },
    })
    .then(() =>
      api.getUser({
        onSuccess: (res) => console.log('%cResponse = ', 'color: green', res),
      })
    );
};
