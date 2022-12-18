import { IUserState } from './IUserState';
import { IAppStatusState } from './IAppStatusState';

export interface IStateSchema {
  user: IUserState;
  appStatus: IAppStatusState;
}
