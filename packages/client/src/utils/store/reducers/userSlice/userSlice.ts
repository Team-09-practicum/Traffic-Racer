import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/typings/IUser';
import { fetchUser } from '../thunks/fetchUserThunk';

const initialState: IUser = {
  id: 0,
  email: '',
  login: '',
  first_name: '',
  second_name: '',
  display_name: '',
  phone: '',
  avatar: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserFullInfo: (state, action: PayloadAction<IUser>) => ({ ...action.payload }),
    changeUserId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    changeUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    changeUserLogin: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    changeUserFirstName: (state, action: PayloadAction<string>) => {
      state.first_name = action.payload;
    },
    changeUserSecondName: (state, action: PayloadAction<string>) => {
      state.second_name = action.payload;
    },
    changeUserDisplayName: (state, action: PayloadAction<string>) => {
      state.display_name = action.payload;
    },
    changeUserPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    changeUserAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<IUser>) => {
      if (action.payload) {
        state = Object.assign(state, action.payload);
      } else {
        state = Object.assign(state, initialState);
      }
    });
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
