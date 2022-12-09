import { api } from '@/utils/api';

export interface IChangeProfile {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
}

export const changeProfile = async (data: IChangeProfile) => {
  await api.putProfileChange({
    data,
    // eslint-disable-next-line no-console
    onSuccess: (res) => console.log('%cResponse = ', 'color: green', res),
  });
};
