import { IUser } from '@/typings/IUser';
import { api } from '@/utils/api';

export const getUser = async () => {
  const user = await api.getUser<IUser>({
    onSuccess: (res) => {
      // eslint-disable-next-line no-console
      console.log('%cResponse = ', 'color: green', res);
    },
  });

  const userThemeResponse = await api.getUserTheme({
    urlParams: {
      userId: user?.id,
    },
  });
  return { ...user, theme: userThemeResponse?.theme };
};
