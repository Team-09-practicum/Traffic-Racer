import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appStatusReducer } from './reducers/appStatusSlice/appStatusSlice';
import { userReducer } from './reducers/userSlice/userSlice';
import { IStateSchema } from '@/typings/IStateSchema';

export function createReduxStore(initialState?: IStateSchema) {
  const rootReducer: ReducersMapObject<IStateSchema> = {
    user: userReducer,
    appStatus: appStatusReducer,
  };

  return configureStore<IStateSchema>({
    reducer: rootReducer,
    preloadedState: initialState,
    // devTools: Добавить значение `false` для отключения при продакт сборке
  });
}

type Store = ReturnType<typeof createReduxStore>;

export const useAppDispatch: () => Store['dispatch'] = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<Store['getState']>> = useSelector;
