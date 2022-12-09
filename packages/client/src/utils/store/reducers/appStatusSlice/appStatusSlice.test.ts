import { DeepPartial } from '@reduxjs/toolkit';
import { IAppStatus } from '@/typings/IAppStatus';
import { appStatusReducer, appStatusActions } from './appStatusSlice';

describe('appStatusSlice.test', () => {
  test('shuld change isAuth to true ', () => {
    const state: DeepPartial<IAppStatus> = { isAuth: false };
    expect(appStatusReducer(state as IAppStatus, appStatusActions.setIsAuthTrue)).toEqual({ isAuth: true });
  });
  test('shuld change isAuth to false ', () => {
    const state: DeepPartial<IAppStatus> = { isAuth: true };
    expect(appStatusReducer(state as IAppStatus, appStatusActions.setIsAuthFalse)).toEqual({ isAuth: false });
  });
  test('shuld change isLoading to false ', () => {
    const state: DeepPartial<IAppStatus> = { isLoading: true };
    expect(appStatusReducer(state as IAppStatus, appStatusActions.setIsLoadingFalse)).toEqual({ isLoading: false });
  });
  test('shuld change isLoading to true ', () => {
    const state: DeepPartial<IAppStatus> = { isLoading: false };
    expect(appStatusReducer(state as IAppStatus, appStatusActions.setIsLoadingTrue)).toEqual({ isLoading: true });
  });
});
