import React from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/utils/store/store';
import { logout } from '@/controllers/logout';
import { getUserInfo } from '@/utils/store/reducers/userSlice/userSlice';
import './Navigation.scss';

const baseMenuItems = [
  { key: '/', label: 'Главная' },
  { key: '/game', label: 'Игра' },
  { key: '/stats', label: 'Лидерборд' },
  { key: '/forum', label: 'Форум' },
];

const authMenuItems = baseMenuItems.concat([
  { key: '/userinfo', label: 'Настройка игрока' },
  { key: 'logout', label: 'Выход' },
]);

const nonAuthMenuItems = baseMenuItems.concat([{ key: '/auth', label: 'Авторизация' }]);

export const Navigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.id);

  return (
    <Menu
      onClick={async ({ key }) => {
        if (key === 'logout') {
          await logout();
          dispatch(getUserInfo());
        } else {
          navigate(key);
        }
      }}
      selectedKeys={[pathname]}
      items={userId ? authMenuItems : nonAuthMenuItems}
      mode="horizontal"
      className="navigation"
    />
  );
};
