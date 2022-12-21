import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { getIsAuth } from '../store/selectors/getIsAuthSelector/getIsAuthSelector';

interface IRequireAuth {
  children: JSX.Element;
}

export const RequireAuth = ({ children }: IRequireAuth) => {
  const isAuth = useSelector(getIsAuth);
  return isAuth === true ? children : <Navigate to="/" replace />;
};
