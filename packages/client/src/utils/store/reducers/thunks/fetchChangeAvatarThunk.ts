import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '@/typings/IUser';
import { changeAvatar } from '@/controllers/changeAvatar';

export const fetchChangeAvatar = createAsyncThunk(
  'user/changeAvatar',
  async (data: FormData) => (await changeAvatar(data)) as Promise<IUser>
);
