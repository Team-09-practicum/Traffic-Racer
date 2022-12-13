import { DeepPartial } from '@reduxjs/toolkit';
import { LoadingStatus } from '@/typings/IAppStatus';
import { getIsAuth, getLoadingStatus } from './getAppStatusSelectors';
import { IStateScheme } from '@/typings/IStateSchema';

describe('getAppStatusSelectors', () => {
  test('should return isAuth', () => {
    const state: DeepPartial<IStateScheme> = {
      appStatus: { isAuth: true },
    };
    expect(getIsAuth(state as IStateScheme)).toEqual(true);
  });
  test('should return loading', () => {
    const state: DeepPartial<IStateScheme> = {
      appStatus: { loading: LoadingStatus.Unsent },
    };
    expect(getLoadingStatus(state as IStateScheme)).toEqual(LoadingStatus.Unsent);
  });
});
