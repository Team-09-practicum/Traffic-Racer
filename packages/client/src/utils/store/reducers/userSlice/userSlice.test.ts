import { userReducer, userActions } from './userSlice';
import { IUserState } from '@/typings/IUserState';
import { fetchUser } from '../thunks/fetchUserThunk';
import { fetchChangeAvatar } from '../thunks/fetchChangeAvatarThunk';
import { fetchChangeProfile } from '../thunks/fetchChangeProfileThunk';

const mockUser = {
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

const changedMockUserData = {
  id: 999,
  email: 'changed@mail.com',
  login: 'changedLogin',
  first_name: 'changedFirstName',
  second_name: 'changedSecondName',
  display_name: 'changedDisplayName',
  phone: '987654321',
  avatar: 'changedpathToAvatar',
};

const changedMockUserState: IUserState = {
  userInfo: {
    ...changedMockUserData,
  },
};

describe('userSlice.test', () => {
  test('should change full user info ', () => {
    const state: IUserState = mockUser;
    expect(userReducer(state, userActions.changeUserFullInfo(changedMockUserData))).toEqual(changedMockUserState);
  });
  test('should add user theme', () => {
    const state: IUserState = { userInfo: {} };
    expect(userReducer(state, userActions.setUserTheme('light'))).toEqual({ userInfo: { theme: 'light' } });
  });
  test('should change user theme', () => {
    const state: IUserState = { userInfo: { theme: 'light' } };
    expect(userReducer(state, userActions.setUserTheme('dark'))).toEqual({ userInfo: { theme: 'dark' } });
  });

  test('should should update fetchUser fullfiled', () => {
    const state: IUserState = { userInfo: { theme: 'light' } };
    expect(userReducer(state, fetchUser.fulfilled(mockUser.userInfo, ''))).toEqual(mockUser);
  });

  test('should should update fetchChangeAvatar fullfiled', () => {
    const state: IUserState = mockUser;
    expect(userReducer(state, fetchUser.fulfilled(mockUser.userInfo, ''))).toEqual(mockUser);
  });
  test('should should add fetchChangeAvatar fullfiled', () => {
    const state: IUserState = { userInfo: {} };
    expect(userReducer(state, fetchUser.fulfilled(mockUser.userInfo, ''))).toEqual(mockUser);
  });

  test('should should add fetchChangeAvatar fullfiled', () => {
    const state: IUserState = { userInfo: {} };
    const formData = new FormData();
    const newState = { avatar: 'pathToAvatar' };
    expect(userReducer(state, fetchChangeAvatar.fulfilled(newState, '', formData))).toEqual({
      userInfo: { avatar: 'pathToAvatar' },
    });
  });

  test('should should add fetchChangeAvatar fullfiled', () => {
    const state: IUserState = mockUser;
    expect(userReducer(state, fetchChangeProfile.fulfilled(changedMockUserData, '', mockUser.userInfo))).toEqual(
      changedMockUserState
    );
  });
});
