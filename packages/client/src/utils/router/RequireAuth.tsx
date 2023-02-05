import React from 'react';
import { Navigate } from 'react-router';
import { getIsAuth } from '../store/selectors/getIsAuthSelector/getIsAuthSelector';
import { useAppSelector } from '../store/store';

interface IRequireAuth {
  children: JSX.Element;
}

export const RequireAuth = ({ children }: IRequireAuth) => {
  const isAuth = useAppSelector(getIsAuth);
  return isAuth === true ? children : <Navigate to="/" replace />;
};
