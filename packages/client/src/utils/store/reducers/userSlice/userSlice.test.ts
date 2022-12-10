import { DeepPartial } from '@reduxjs/toolkit';
import { IUser } from '@/typings/IUser';
import { userReducer, userActions } from './userSlice';

const mockUser = {
  id: 101,
  email: 'some@mail.com',
  login: 'someLogin',
  first_name: 'mockFirstName',
  second_name: 'mockSecondName',
  display_name: 'mockDisplayName',
  phone: '123456789',
  avatar: 'pathToAvatar',
};

const changedmockUser = {
  id: 999,
  email: 'changed@mail.com',
  login: 'changedLogin',
  first_name: 'changedFirstName',
  second_name: 'changedSecondName',
  display_name: 'changedDisplayName',
  phone: '987654321',
  avatar: 'changedpathToAvatar',
};

describe('userSlice.test', () => {
  test('should change full user info ', () => {
    const state: IUser = mockUser;
    expect(userReducer(state, userActions.changeUserFullInfo(changedmockUser))).toEqual(changedmockUser);
  });
  test('should change user id', () => {
    const state: DeepPartial<IUser> = {
      id: 101,
    };
    expect(userReducer(state as IUser, userActions.changeUserId(11))).toEqual({ id: 11 });
  });
  test('should change user email', () => {
    const state: DeepPartial<IUser> = {
      email: 'test@email.ru',
    };
    expect(userReducer(state as IUser, userActions.changeUserEmail('test@gmail.com'))).toEqual({
      email: 'test@gmail.com',
    });
  });
  test('should change user login', () => {
    const state: DeepPartial<IUser> = {
      login: 'Admin',
    };
    expect(userReducer(state as IUser, userActions.changeUserLogin('user'))).toEqual({
      login: 'user',
    });
  });
  test('should change user first name', () => {
    const state: DeepPartial<IUser> = {
      first_name: 'Any',
    };
    expect(userReducer(state as IUser, userActions.changeUserFirstName('user'))).toEqual({
      first_name: 'user',
    });
  });
  test('should change user second name', () => {
    const state: DeepPartial<IUser> = {
      second_name: 'Second',
    };
    expect(userReducer(state as IUser, userActions.changeUserSecondName('Third'))).toEqual({
      second_name: 'Third',
    });
  });
  test('should change user display name', () => {
    const state: DeepPartial<IUser> = {
      display_name: 'Winner',
    };
    expect(userReducer(state as IUser, userActions.changeUserDisplayName('Looser'))).toEqual({
      display_name: 'Looser',
    });
  });
  test('should change user phone number', () => {
    const state: DeepPartial<IUser> = {
      phone: '910000111',
    };
    expect(userReducer(state as IUser, userActions.changeUserPhone('901111000'))).toEqual({
      phone: '901111000',
    });
  });
  test('should change user avatar', () => {
    const state: DeepPartial<IUser> = {
      avatar: 'emptypath',
    };
    expect(userReducer(state as IUser, userActions.changeUserAvatar('pathToAvatar'))).toEqual({
      avatar: 'pathToAvatar',
    });
  });
});
