import { api } from '@/utils/api';

export const getUser = async () => {
  const user = await api.getUser({
    onSuccess: (res) => {
      // eslint-disable-next-line no-console
      console.log('%cResponse = ', 'color: green', res);
    },
  });
  return user;
};
