import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '@/controllers/getUser';
import { IUser } from '@/typings/IUser';

export const fetchUser = createAsyncThunk('user/getUser', () => getUser() as Promise<IUser>);
