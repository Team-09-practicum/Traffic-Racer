/* eslint-disable no-undef */

import { AsyncThunkAction, DeepPartial } from '@reduxjs/toolkit';
import { IStateSchema } from '@/typings/IStateSchema';

type ActionCreatorType<Return, Arg, RejectedValue> = (
  arg: Arg
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispath: jest.MockedFn<any>;

  getState: () => IStateSchema;

  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

  constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>, state?: DeepPartial<IStateSchema>) {
    this.actionCreator = actionCreator;
    this.dispath = jest.fn();
    this.getState = jest.fn(() => state as IStateSchema);
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispath, this.getState, {});

    return result;
  }
}
