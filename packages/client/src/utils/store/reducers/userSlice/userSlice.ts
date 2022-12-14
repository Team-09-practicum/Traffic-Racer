import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/typings/IUser';
import { getUser } from '@/controllers/getUser';

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

export const getUserInfo = createAsyncThunk('user/getUser', () => getUser() as unknown as IUser);

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
    builder.addCase(getUserInfo.fulfilled, (state, action: PayloadAction<IUser>) => {
      state = Object.assign(state, action.payload);
    });
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
