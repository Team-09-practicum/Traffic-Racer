import { api } from '@/utils/api';

export const changeAvatar = async (form: FormData) => {
  await api.putAvatarChange({
    data: form,
    // eslint-disable-next-line no-console
    onSuccess: (res) => console.log('%cResponse = ', 'color: green', res),
  });
};
