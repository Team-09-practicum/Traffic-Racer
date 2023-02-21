import type { IUserState } from './IUserState';
import type { IAppStatusState } from './IAppStatusState';

export interface IStateSchema {
  user: IUserState;
  appStatus: IAppStatusState;
}
