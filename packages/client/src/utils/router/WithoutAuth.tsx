import React from 'react';
import { Navigate } from 'react-router';
import { getIsAuth } from '../store/selectors/getIsAuthSelector/getIsAuthSelector';
import { useAppSelector } from '../store/store';

interface IWithoutAuth {
  children: JSX.Element;
}

export const WithoutAuth = ({ children }: IWithoutAuth) => {
  const isAuth = useAppSelector(getIsAuth);
  return isAuth === false ? children : <Navigate to="/" replace />;
};
