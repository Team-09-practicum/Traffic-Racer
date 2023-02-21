import { DeepPartial } from '@reduxjs/toolkit';
import { IStateSchema } from '@/typings/IStateSchema';
import {
  getUserAvatar,
  getUserDisplayName,
  getUserEmail,
  getUserFirstName,
  getUserId,
  getUserIdLoginAvatar,
  getUserLogin,
  getUserPhone,
  getUserSecondName,
} from './getUserFieldSelectors';

describe('getFieldSelectors', () => {
  test('should return user id', () => {
    const state: DeepPartial<IStateSchema> = {
      user: {
        userInfo: {
          id: 11,
        },
      },
    };
    expect(getUserId(state as IStateSchema)).toEqual(11);
  });
  test('should return user Email', () => {
    const state: DeepPartial<IStateSchema> = {
      user: {
        userInfo: {
          email: 'test@yande.ru',
        },
      },
    };
    expect(getUserEmail(state as IStateSchema)).toEqual('test@yande.ru');
  });
  test('should return user login', () => {
    const state: DeepPartial<IStateSchema> = {
      user: {
        userInfo: {
          login: 'Winner',
        },
      },
    };
    expect(getUserLogin(state as IStateSchema)).toEqual('Winner');
  });
  test('should return user first name', () => {
    const state: DeepPartial<IStateSchema> = {
      user: {
        userInfo: {
          first_name: 'Siri',
        },
      },
    };
    expect(getUserFirstName(state as IStateSchema)).toEqual('Siri');
  });
  test('should return user second name', () => {
    const state: DeepPartial<IStateSchema> = {
      user: {
        userInfo: {
          second_name: 'Alisa',
        },
      },
    };
    expect(getUserSecondName(state as IStateSchema)).toEqual('Alisa');
  });
  test('should return user display name', () => {
    const state: DeepPartial<IStateSchema> = {
      user: {
        userInfo: {
          display_name: 'Admin',
        },
      },
    };
    expect(getUserDisplayName(state as IStateSchema)).toEqual('Admin');
  });
  test('should return user phone number', () => {
    const state: DeepPartial<IStateSchema> = {
      user: {
        userInfo: {
          phone: '1234567890',
        },
      },
    };
    expect(getUserPhone(state as IStateSchema)).toEqual('1234567890');
  });
  test('should return user Avatar path', () => {
    const state: DeepPartial<IStateSchema> = {
      user: {
        userInfo: {
          avatar: 'path to avatar',
        },
      },
    };
    expect(getUserAvatar(state as IStateSchema)).toEqual('path to avatar');
  });
  test('should return user id, login and avatar path', () => {
    const state: DeepPartial<IStateSchema> = {
      user: {
        userInfo: {
          id: 11,
          login: 'Winner',
          avatar: 'path to avatar',
        },
      },
    };
    expect(getUserIdLoginAvatar(state as IStateSchema)).toEqual({
      id: 11,
      login: 'Winner',
      avatar: 'path to avatar',
    });
  });
});
