import { fetchChangeProfile } from './fetchChangeProfileThunk';
import { api } from '@/utils/api';
import { TestAsyncThunk } from '@/utils/test/TestAsyncThunk';

const changeData = {
  userInfo: {
    id: 4,
    login: 'admin',
    second_name: 'user',
  },
};

const mockUserfromServer = {
  userInfo: {
    id: 101,
    email: 'some@mail.com',
    login: 'someLogin',
    first_name: 'mockFirstName',
    second_name: 'mockSecondName',
    display_name: 'mockDisplayName',
    phone: '123456789',
    avatar: 'pathToAvatar',
  },
};

jest.mock('axios');

describe('fetchChangeProfile', () => {
  test('should get succesfuly', async () => {
    const thunk = new TestAsyncThunk(fetchChangeProfile);
    const mockedQuery = jest.spyOn(api, 'putProfileChange').mockResolvedValue(mockUserfromServer);
    const result = await thunk.callThunk(changeData.userInfo);

    expect(mockedQuery).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(mockUserfromServer);
  });
});
