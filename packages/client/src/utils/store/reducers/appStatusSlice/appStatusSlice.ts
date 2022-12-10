import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppStatus, LoadingStatus } from '@/typings/IAppStatus';

const initialState: IAppStatus = {
  isAuth: false,
  loading: LoadingStatus.Unsent,
};

export const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState,
  reducers: {
    setLoadingStatus: (state: IAppStatus, action: PayloadAction<LoadingStatus>) => {
      state.loading = action.payload;
    },
    setIsAuth: (state: IAppStatus, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { actions: appStatusActions, reducer: appStatusReducer } = appStatusSlice;
