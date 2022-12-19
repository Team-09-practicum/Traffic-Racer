import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/typings/IUser';
import { IUserState } from '@/typings/IUserState';
import { fetchUser } from '../thunks/fetchUserThunk';

const initialState: IUserState = {
  userInfo: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserFullInfo: (state, action: PayloadAction<IUser>) => {
      state.userInfo = action.payload ? action.payload : null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.userInfo = action.payload ? action.payload : null;
    });
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
