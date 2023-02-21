import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appStatusReducer } from './reducers/appStatusSlice/appStatusSlice';
import { userReducer } from './reducers/userSlice/userSlice';
import { IStateSchema } from '@/typings/IStateSchema';
import { isDev } from '../constants/isDev';

export function createReduxStore(initialState?: IStateSchema) {
  const rootReducer: ReducersMapObject<IStateSchema> = {
    user: userReducer,
    appStatus: appStatusReducer,
  };

  return configureStore<IStateSchema>({
    reducer: rootReducer,
    preloadedState: initialState,
    devTools: isDev(),
  });
}

type Store = ReturnType<typeof createReduxStore>;

export const useAppDispatch: () => Store['dispatch'] = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<Store['getState']>> = useSelector;
