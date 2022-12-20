import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '@/typings/IUser';
import { changeProfile } from '@/controllers/changeProfile';

export const fetchChangeProfile = createAsyncThunk(
  'user/changeProfile',
  async (data: IUser) => (await changeProfile(data)) as unknown as Promise<IUser>
);
