import { IStateScheme } from '@/typings/IStateSchema';

export const getIsAuth = (state: IStateScheme) => state.appStatus.isAuth;

export const getLoadingStatus = (state: IStateScheme) => state.appStatus.loading;
