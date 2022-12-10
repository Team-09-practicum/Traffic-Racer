import { DeepPartial } from '@reduxjs/toolkit';
import { IAppStatus, LoadingStatus } from '@/typings/IAppStatus';
import { getIsAuth, getLoadingStatus } from './getAppStatusSelectors';

describe('getAppStatusSelectors', () => {
  test('should return isAuth', () => {
    const state: DeepPartial<IAppStatus> = {
      isAuth: true,
    };
    expect(getIsAuth(state as IAppStatus)).toEqual(true);
  });
  test('should return loading', () => {
    const state: DeepPartial<IAppStatus> = {
      loading: LoadingStatus.Unsent,
    };
    expect(getLoadingStatus(state as IAppStatus)).toEqual(LoadingStatus.Unsent);
  });
});
