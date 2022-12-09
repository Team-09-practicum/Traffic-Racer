import type { IAppStatus } from '@/typings/IAppStatus';

export const getIsAuth = (state: IAppStatus) => state.isAuth;

export const getIsLoading = (state: IAppStatus) => state.isLoading;
