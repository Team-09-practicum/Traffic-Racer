import { DeepPartial } from '@reduxjs/toolkit';
import { IUser } from '../../typings';
import { getUserFull } from './getUserFullSelector';

describe('getUserFull', () => {
  test('should return full user info', () => {
    const state: DeepPartial<IUser> = {
      id: 0,
      email: '1122',
      login: '3344',
      first_name: '5566',
      second_name: '7788',
      display_name: '9900',
      phone: '1122',
      avatar: '3344',
    };
    expect(getUserFull(state as IUser)).toEqual({
      id: 0,
      email: '1122',
      login: '3344',
      first_name: '5566',
      second_name: '7788',
      display_name: '9900',
      phone: '1122',
      avatar: '3344',
    });
  });
});
