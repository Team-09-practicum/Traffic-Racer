import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { getIsAuth } from '../store/selectors/getIsAuthSelector/getIsAuthSelector';

interface IRequireAuth {
  children: React.ReactNode;
}

export const RequireAuth = ({ children }: IRequireAuth) => {
  const isAuth = useSelector(getIsAuth);
  return <div>{isAuth === true ? children : <Navigate to="/" replace />}</div>;
};
