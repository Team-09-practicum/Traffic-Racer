import { fetchChangeAvatar } from './fetchChangeAvatarThunk';
import { api } from '@/utils/api';
import { TestAsyncThunk } from '@/utils/test/TestAsyncThunk';

const data = {
  userInfo: {
    avatar: 'path to avatar',
  },
};

jest.mock('axios');

describe('fetchChangeAvatar', () => {
  test('should get succesfuly', async () => {
    const thunk = new TestAsyncThunk(fetchChangeAvatar);
    const mockedQuery = jest.spyOn(api, 'putAvatarChange').mockResolvedValue(data);
    const formData = new FormData();
    const result = await thunk.callThunk(formData);

    expect(mockedQuery).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });
});
