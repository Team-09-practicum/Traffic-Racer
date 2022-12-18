import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { IStateSchema } from '@/typings/IStateSchema';
import { createReduxStore } from './store';

interface IStoreProvider {
  children?: ReactNode;
  initialState?: IStateSchema;
}

export const StoreProvider = (props: IStoreProvider) => {
  const { children, initialState } = props;

  const store = createReduxStore(initialState);

  return <Provider store={store}>{children}</Provider>;
};
