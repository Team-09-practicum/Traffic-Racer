import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppStatusState, LoadingStatus } from '@/typings/IAppStatusState';
import { fetchUser } from '../thunks/fetchUserThunk';

const initialState: IAppStatusState = {
  isAuth: false,
  loading: LoadingStatus.Unsent,
  isSoundOn: true,
};

export const appStatusSlice = createSlice({
  name: 'appStatus',
  initialState,
  reducers: {
    setLoadingStatus: (state: IAppStatusState, action: PayloadAction<LoadingStatus>) => {
      state.loading = action.payload;
    },
    setIsAuth: (state: IAppStatusState, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setIsSoundOn: (state: IAppStatus, action: PayloadAction<boolean>) => {
      state.isSoundOn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
    });
  },
});

export const { actions: appStatusActions, reducer: appStatusReducer } = appStatusSlice;
