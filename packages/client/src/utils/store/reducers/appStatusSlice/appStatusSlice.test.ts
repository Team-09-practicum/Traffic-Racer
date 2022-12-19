import { DeepPartial } from '@reduxjs/toolkit';
import { IAppStatusState, LoadingStatus } from '@/typings/IAppStatusState';
import { appStatusReducer, appStatusActions } from './appStatusSlice';

describe('appStatusSlice.test', () => {
  test('should change isAuth to true ', () => {
    const state: DeepPartial<IAppStatusState> = { isAuth: false };
    expect(appStatusReducer(state as IAppStatusState, appStatusActions.setIsAuth(true))).toEqual({ isAuth: true });
  });
  test('should change isAuth to false ', () => {
    const state: DeepPartial<IAppStatusState> = { isAuth: true };
    expect(appStatusReducer(state as IAppStatusState, appStatusActions.setIsAuth(false))).toEqual({ isAuth: false });
  });
  test('should change loading to pending ', () => {
    const state: DeepPartial<IAppStatusState> = { loading: LoadingStatus.Unsent };
    expect(
      appStatusReducer(state as IAppStatusState, appStatusActions.setLoadingStatus(LoadingStatus.Pending))
    ).toEqual({
      loading: LoadingStatus.Pending,
    });
  });
  test('should change loading to succes ', () => {
    const state: DeepPartial<IAppStatusState> = { loading: LoadingStatus.Pending };
    expect(
      appStatusReducer(state as IAppStatusState, appStatusActions.setLoadingStatus(LoadingStatus.Success))
    ).toEqual({
      loading: LoadingStatus.Success,
    });
  });
  test('should change loading to succes ', () => {
    const state: DeepPartial<IAppStatusState> = { loading: LoadingStatus.Success };
    expect(
      appStatusReducer(state as IAppStatusState, appStatusActions.setLoadingStatus(LoadingStatus.Failure))
    ).toEqual({
      loading: LoadingStatus.Failure,
    });
  });
});
