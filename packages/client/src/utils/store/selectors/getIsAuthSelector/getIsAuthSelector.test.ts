import { DeepPartial } from '@reduxjs/toolkit';
import { getIsAuth } from './getIsAuthSelector';
import { IStateSchema } from '@/typings/IStateSchema';

describe('getAppStatusSelectors', () => {
  test('should return isAuth value true', () => {
    const state: DeepPartial<IStateSchema> = {
      user: {
        userInfo: {
          id: 1,
        },
      },
    };
    expect(getIsAuth(state as IStateSchema)).toEqual(true);
  });
  test('should return isAuth value false', () => {
    const state: DeepPartial<IStateSchema> = {
      user: {
        userInfo: {
          id: 0,
        },
      },
    };
    expect(getIsAuth(state as IStateSchema)).toEqual(false);
  });
});
