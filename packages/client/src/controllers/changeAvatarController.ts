/* eslint-disable no-console */
import { api } from '@/utils/api';
import { ErrorResProps } from '@/utils/api/typings';

export const changeAvatarController = async (form: FormData) => {
  await api.putAvatarChange({
    data: form,
    onSuccess: (res) => console.log('%cResponse = ', 'color: green', res),
    onError: (err) => {
      const error = (err as ErrorResProps).response.data.reason;
      console.log('%cError = ', 'color: red', error);
    },
  });
};
