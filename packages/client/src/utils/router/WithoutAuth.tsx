import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { getIsAuth } from '../store/selectors/getIsAuthSelector/getIsAuthSelector';

interface IWithoutAuth {
  children: JSX.Element;
}

export const WithoutAuth = ({ children }: IWithoutAuth) => {
  const isAuth = useSelector(getIsAuth);
  return isAuth === false ? children : <Navigate to="/" replace />;
};
