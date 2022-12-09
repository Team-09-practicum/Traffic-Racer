import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { appStatusReducer } from './reducers/appStatusSlice/appStatusSlice';
import { userReducer } from './reducers/userSlice/userSlice';
import { IStateScheme } from './typings';

export function createReduxStore(initialState?: IStateScheme) {
  const rootReducer: ReducersMapObject<IStateScheme> = {
    user: userReducer,
    appStatus: appStatusReducer,
  };

  return configureStore<IStateScheme>({
    reducer: rootReducer,
    preloadedState: initialState,
    // devTools: Добавить значение для отключения при продакт сборке
  });
}
