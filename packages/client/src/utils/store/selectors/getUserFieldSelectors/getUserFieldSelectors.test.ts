import { DeepPartial } from '@reduxjs/toolkit';
import { IStateScheme } from '@/typings/IStateSchema';
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
    const state: DeepPartial<IStateScheme> = {
      user: {
        id: 11,
      },
    };
    expect(getUserId(state as IStateScheme)).toEqual(11);
  });
  test('should return user Email', () => {
    const state: DeepPartial<IStateScheme> = {
      user: {
        email: 'test@yande.ru',
      },
    };
    expect(getUserEmail(state as IStateScheme)).toEqual('test@yande.ru');
  });
  test('should return user login', () => {
    const state: DeepPartial<IStateScheme> = {
      user: {
        login: 'Winner',
      },
    };
    expect(getUserLogin(state as IStateScheme)).toEqual('Winner');
  });
  test('should return user first name', () => {
    const state: DeepPartial<IStateScheme> = {
      user: {
        first_name: 'Siri',
      },
    };
    expect(getUserFirstName(state as IStateScheme)).toEqual('Siri');
  });
  test('should return user second name', () => {
    const state: DeepPartial<IStateScheme> = {
      user: {
        second_name: 'Alisa',
      },
    };
    expect(getUserSecondName(state as IStateScheme)).toEqual('Alisa');
  });
  test('should return user display name', () => {
    const state: DeepPartial<IStateScheme> = {
      user: {
        display_name: 'Admin',
      },
    };
    expect(getUserDisplayName(state as IStateScheme)).toEqual('Admin');
  });
  test('should return user phone number', () => {
    const state: DeepPartial<IStateScheme> = {
      user: {
        phone: '1234567890',
      },
    };
    expect(getUserPhone(state as IStateScheme)).toEqual('1234567890');
  });
  test('should return user Avatar path', () => {
    const state: DeepPartial<IStateScheme> = {
      user: {
        avatar: 'path to avatar',
      },
    };
    expect(getUserAvatar(state as IStateScheme)).toEqual('path to avatar');
  });
});
