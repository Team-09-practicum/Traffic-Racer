import { DeepPartial } from '@reduxjs/toolkit';
import { IUser } from '@/typings/IUser';
import {
  getUserAvatar,
  getUserDisplayName,
  getUserEmail,
  getUserFirstName,
  getUserId,
  getUserLogin,
  getUserPhone,
  getUserSecondName,
} from './getUserFieldSelectors';

describe('getFieldSelectors', () => {
  test('should return user id', () => {
    const state: DeepPartial<IUser> = {
      id: 11,
    };
    expect(getUserId(state as IUser)).toEqual(11);
  });
  test('should return user Email', () => {
    const state: DeepPartial<IUser> = {
      email: 'test@yande.ru',
    };
    expect(getUserEmail(state as IUser)).toEqual('test@yande.ru');
  });
  test('should return user login', () => {
    const state: DeepPartial<IUser> = {
      login: 'Winner',
    };
    expect(getUserLogin(state as IUser)).toEqual('Winner');
  });
  test('should return user first name', () => {
    const state: DeepPartial<IUser> = {
      first_name: 'Siri',
    };
    expect(getUserFirstName(state as IUser)).toEqual('Siri');
  });
  test('should return user second name', () => {
    const state: DeepPartial<IUser> = {
      second_name: 'Alisa',
    };
    expect(getUserSecondName(state as IUser)).toEqual('Alisa');
  });
  test('should return user display name', () => {
    const state: DeepPartial<IUser> = {
      display_name: 'Admin',
    };
    expect(getUserDisplayName(state as IUser)).toEqual('Admin');
  });
  test('should return user phone number', () => {
    const state: DeepPartial<IUser> = {
      phone: '1234567890',
    };
    expect(getUserPhone(state as IUser)).toEqual('1234567890');
  });
  test('should return user Avatar path', () => {
    const state: DeepPartial<IUser> = {
      avatar: 'path to avatar',
    };
    expect(getUserAvatar(state as IUser)).toEqual('path to avatar');
  });
});
