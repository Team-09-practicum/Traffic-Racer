import { DeepPartial } from '@reduxjs/toolkit';
import { getUserFull } from './getUserFullSelector';
import { IStateScheme } from '@/typings/IStateSchema';

describe('getUserFull', () => {
  test('should return full user info', () => {
    const state: DeepPartial<IStateScheme> = {
      user: {
        id: 0,
        email: '1122',
        login: '3344',
        first_name: '5566',
        second_name: '7788',
        display_name: '9900',
        phone: '1122',
        avatar: '3344',
      },
    };
    expect(getUserFull(state as IStateScheme)).toEqual({
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
