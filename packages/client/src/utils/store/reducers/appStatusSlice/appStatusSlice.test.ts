import { DeepPartial } from '@reduxjs/toolkit';
import { IAppStatus, LoadingStatus } from '@/typings/IAppStatus';
import { appStatusReducer, appStatusActions } from './appStatusSlice';

describe('appStatusSlice.test', () => {
  test('should change isAuth to true ', () => {
    const state: DeepPartial<IAppStatus> = { isAuth: false };
    expect(appStatusReducer(state as IAppStatus, appStatusActions.setIsAuth(true))).toEqual({ isAuth: true });
  });
  test('should change isAuth to false ', () => {
    const state: DeepPartial<IAppStatus> = { isAuth: true };
    expect(appStatusReducer(state as IAppStatus, appStatusActions.setIsAuth(false))).toEqual({ isAuth: false });
  });
  test('should change loading to pending ', () => {
    const state: DeepPartial<IAppStatus> = { loading: LoadingStatus.Unsent };
    expect(appStatusReducer(state as IAppStatus, appStatusActions.setLoadingStatus(LoadingStatus.Pending))).toEqual({
      loading: LoadingStatus.Pending,
    });
  });
  test('should change loading to succes ', () => {
    const state: DeepPartial<IAppStatus> = { loading: LoadingStatus.Pending };
    expect(appStatusReducer(state as IAppStatus, appStatusActions.setLoadingStatus(LoadingStatus.Success))).toEqual({
      loading: LoadingStatus.Success,
    });
  });
  test('should change loading to succes ', () => {
    const state: DeepPartial<IAppStatus> = { loading: LoadingStatus.Success };
    expect(appStatusReducer(state as IAppStatus, appStatusActions.setLoadingStatus(LoadingStatus.Failure))).toEqual({
      loading: LoadingStatus.Failure,
    });
  });
  test('should change isSoundOn to false ', () => {
    const state: DeepPartial<IAppStatus> = { isSoundOn: true };
    expect(appStatusReducer(state as IAppStatus, appStatusActions.setIsSoundOn(false))).toEqual({
      isSoundOn: false,
    });
  });
});
