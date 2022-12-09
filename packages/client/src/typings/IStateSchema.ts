import { IAppStatus } from './IAppStatus';
import { IUser } from './IUser';

export interface IStateScheme {
  user: IUser;
  appStatus: IAppStatus;
}
