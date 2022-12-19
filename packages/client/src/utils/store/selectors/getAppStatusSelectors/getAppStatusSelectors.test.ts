import { DeepPartial } from '@reduxjs/toolkit';
import { LoadingStatus } from '@/typings/IAppStatusState';
import { getIsAuth, getLoadingStatus } from './getAppStatusSelectors';
import { IStateSchema } from '@/typings/IStateSchema';

describe('getAppStatusSelectors', () => {
  test('should return isAuth', () => {
    const state: DeepPartial<IStateSchema> = {
      appStatus: {
        isAuth: true,
      },
    };
    expect(getIsAuth(state as IStateSchema)).toEqual(true);
  });
  test('should return loading', () => {
    const state: DeepPartial<IStateSchema> = {
      appStatus: {
        loading: LoadingStatus.Unsent,
      },
    };
    expect(getLoadingStatus(state as IStateSchema)).toEqual(LoadingStatus.Unsent);
  });
});
