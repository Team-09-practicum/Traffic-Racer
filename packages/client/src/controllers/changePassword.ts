import { api } from '@/utils/api';

export interface IChangePassword {
  oldPassword: 'string';
  newPassword: 'string';
}

export const changePassword = async (passwords: IChangePassword) => {
  await api.putPasswordChange({
    data: passwords,
    // eslint-disable-next-line no-console
    onSuccess: (res) => console.log('%cResponse = ', 'color: green', res),
  });
};
