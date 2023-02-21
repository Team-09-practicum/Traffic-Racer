import { DeepPartial } from '@reduxjs/toolkit';
import { IAppStatusState, LoadingStatus } from '@/typings/IAppStatusState';
import { appStatusReducer, appStatusActions } from './appStatusSlice';

describe('appStatusSlice.test', () => {
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
  test('should change loading to failure ', () => {
    const state: DeepPartial<IAppStatusState> = { loading: LoadingStatus.Success };
    expect(
      appStatusReducer(state as IAppStatusState, appStatusActions.setLoadingStatus(LoadingStatus.Failure))
    ).toEqual({
      loading: LoadingStatus.Failure,
    });
  });
  test('should change isSoundOn to false ', () => {
    const state: DeepPartial<IAppStatusState> = { isSoundOn: true };
    expect(appStatusReducer(state as IAppStatusState, appStatusActions.setIsSoundOn(false))).toEqual({
      isSoundOn: false,
    });
  });
  test('should change isFeedbackOpen to true ', () => {
    const state: DeepPartial<IAppStatusState> = { isFeedbackOpen: false };
    expect(appStatusReducer(state as IAppStatusState, appStatusActions.setIsFeedbackOpen(true))).toEqual({
      isFeedbackOpen: true,
    });
  });
});
