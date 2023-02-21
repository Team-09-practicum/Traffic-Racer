import { DeepPartial } from '@reduxjs/toolkit';
import { LoadingStatus } from '@/typings/IAppStatusState';
import { getIsSoundOn, getLoadingStatus } from './getAppStatusSelectors';
import { IStateSchema } from '@/typings/IStateSchema';

describe('getAppStatusSelectors', () => {
  test('should return loading', () => {
    const state: DeepPartial<IStateSchema> = {
      appStatus: {
        loading: LoadingStatus.Unsent,
      },
    };
    expect(getLoadingStatus(state as IStateSchema)).toEqual(LoadingStatus.Unsent);
  });
  test('should return IsSoundOn', () => {
    const state: DeepPartial<IStateSchema> = {
      appStatus: {
        isSoundOn: true,
      },
    };
    expect(getIsSoundOn(state as IStateSchema)).toEqual(true);
  });
});
