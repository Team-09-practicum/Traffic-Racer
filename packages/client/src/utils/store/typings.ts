import { UserProfileForm } from '@/pages/userInfoPage/typings';

export interface IUser extends UserProfileForm {
  id: number;
}

export interface IAppStatus {
  isLoading: boolean;
  isAuth: boolean;
}

export interface IStateScheme {
  user: IUser;
  appStatus: IAppStatus;
}
