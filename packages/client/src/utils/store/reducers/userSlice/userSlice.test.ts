import { userReducer, userActions } from './userSlice';
import { IUserState } from '@/typings/IUserState';

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

const changedMockUserState = {
  userInfo: {
    ...changedMockUserData,
  },
};

describe('userSlice.test', () => {
  test('should change full user info ', () => {
    const state: IUserState = mockUser;
    expect(userReducer(state, userActions.changeUserFullInfo(changedMockUserData))).toEqual(changedMockUserState);
  });
});
