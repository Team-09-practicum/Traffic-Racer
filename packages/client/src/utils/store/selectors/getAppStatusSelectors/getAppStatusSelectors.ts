import type { IAppStatus } from '../../typings';

export const getIsAuth = (state: IAppStatus) => state.isAuth;

export const getIsLoading = (state: IAppStatus) => state.isLoading;
