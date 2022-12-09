import { createSlice } from '@reduxjs/toolkit';
import { IAppStatus } from '@/typings/IAppStatus';

const initialState: IAppStatus = {
  isAuth: false,
  isLoading: false,
};

export const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState,
  reducers: {
    setIsLoadingTrue: (state) => {
      state.isLoading = true;
    },
    setIsLoadingFalse: (state) => {
      state.isLoading = false;
    },
    setIsAuthTrue: (state) => {
      state.isAuth = true;
    },
    setIsAuthFalse: (state) => {
      state.isAuth = false;
    },
  },
});

export const { actions: appStatusActions } = appStatusSlice;
export const { reducer: appStatusReducer } = appStatusSlice;
