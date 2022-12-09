import { DeepPartial } from '@reduxjs/toolkit';
import { IAppStatus } from '../../typings';
import { getIsAuth, getIsLoading } from './getAppStatusSelectors';

describe('getAppStatusSelectors', () => {
  test('should return isAuth', () => {
    const state: DeepPartial<IAppStatus> = {
      isAuth: true,
    };
    expect(getIsAuth(state as IAppStatus)).toEqual(true);
  });
  test('should return isLoading', () => {
    const state: DeepPartial<IAppStatus> = {
      isLoading: true,
    };
    expect(getIsLoading(state as IAppStatus)).toEqual(true);
  });
});
