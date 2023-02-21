import { fetchUser } from './fetchUserThunk';
import { api } from '@/utils/api';
import { TestAsyncThunk } from '@/utils/test/TestAsyncThunk';

const data = {
  userInfo: {
    id: 4,
  },
};

jest.mock('axios');

describe('fetchUserThunk', () => {
  test('should get succesfuly', async () => {
    const thunk = new TestAsyncThunk(fetchUser);
    const mockedQuery = jest.spyOn(api, 'getUser').mockResolvedValue(data);
    const result = await thunk.callThunk();

    expect(mockedQuery).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });
});
