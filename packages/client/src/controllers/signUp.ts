import { api } from '@/utils/api';

export interface SignUpProps {
  first_name: 'string';
  second_name: 'string';
  login: 'string';
  email: 'string';
  password: 'string';
  phone: 'string';
}

export const signUp = async (userInfo: SignUpProps) => {
  await api.postSignUp({
    data: userInfo,
    onSuccess: (res) => {
      // eslint-disable-next-line no-console
      console.log('User id =', res);
    },
  });
};
