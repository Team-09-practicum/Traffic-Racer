import { DeepPartial } from '@reduxjs/toolkit';
import { getUserTheme } from './getUserTheme';
import { IStateSchema } from '@/typings/IStateSchema';

describe('getUserTheme', () => {
  test('should return user theme', () => {
    const state: DeepPartial<IStateSchema> = {
      user: {
        userInfo: {
          theme: 'light',
        },
      },
    };
    expect(getUserTheme(state as IStateSchema)).toEqual('light');
  });
});
