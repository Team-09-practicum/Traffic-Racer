import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/typings/IUser';
import { fetchUser } from '../thunks/fetchUserThunk';

interface userState {
  userInfo: IUser | null;
}

const initialState: userState = {
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
      if (action.payload) {
        state.userInfo = action.payload;
      } else {
        state.userInfo = null;
      }
    });
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
