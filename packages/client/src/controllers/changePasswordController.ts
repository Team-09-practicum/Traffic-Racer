/* eslint-disable no-console */
import { api } from '@/utils/api';
import { ErrorResProps } from '@/utils/api/typings';

export interface ChangePasswordProps {
  oldPassword: 'string';
  newPassword: 'string';
}

export const changePasswordController = async (values: ChangePasswordProps) => {
  await api.putPasswordChange({
    data: values,
    onSuccess: (res) => console.log('%cResponse = ', 'color: green', res),
    onError: (err) => {
      const error = (err as ErrorResProps).response.data.reason;
      console.log('%cError = ', 'color: red', error);
    },
  });
};
