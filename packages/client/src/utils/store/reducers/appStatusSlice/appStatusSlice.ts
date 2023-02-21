import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppStatusState, LoadingStatus } from '@/typings/IAppStatusState';

const initialState: IAppStatusState = {
  loading: LoadingStatus.Unsent,
  isSoundOn: true,
  isFeedbackOpen: false,
};

export const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState,
  reducers: {
    setLoadingStatus: (state: IAppStatusState, action: PayloadAction<LoadingStatus>) => {
      state.loading = action.payload;
    },
    setIsSoundOn: (state: IAppStatusState, action: PayloadAction<boolean>) => {
      state.isSoundOn = action.payload;
    },
    setIsFeedbackOpen: (state: IAppStatusState, action: PayloadAction<boolean>) => {
      state.isFeedbackOpen = action.payload;
    },
  },
});

export const { actions: appStatusActions, reducer: appStatusReducer } = appStatusSlice;
