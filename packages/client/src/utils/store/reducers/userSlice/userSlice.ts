import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, Theme } from '@/typings/IUser';
import { IUserState } from '@/typings/IUserState';
import { fetchUser } from '../thunks/fetchUserThunk';
import { fetchChangeAvatar } from '../thunks/fetchChangeAvatarThunk';
import { fetchChangeProfile } from '../thunks/fetchChangeProfileThunk';

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
    setUserTheme: (state, action: PayloadAction<Theme>) => {
      if (state.userInfo) {
        state.userInfo.theme = action.payload;
      } else {
        state.userInfo = { theme: action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.userInfo = action.payload ?? null;
    });
    builder.addCase(fetchChangeAvatar.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.userInfo = action.payload ?? null;
    });
    builder.addCase(fetchChangeProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.userInfo = action.payload ?? null;
    });
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
