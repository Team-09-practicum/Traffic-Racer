import { DeepPartial } from '@reduxjs/toolkit';
import { getUserFull } from './getUserFullSelector';
import { IStateSchema } from '@/typings/IStateSchema';

describe('getUserFull', () => {
  test('should return full user info', () => {
    const state: DeepPartial<IStateSchema> = {
      user: {
        userInfo: {
          id: 0,
          email: '1122',
          login: '3344',
          first_name: '5566',
          second_name: '7788',
          display_name: '9900',
          phone: '1122',
          avatar: '3344',
        },
      },
    };
    expect(getUserFull(state as IStateSchema)).toEqual({
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
