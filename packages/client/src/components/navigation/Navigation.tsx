import React from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/utils/store/store';
import { logout } from '@/controllers/logout';
import { fetchUser } from '@/utils/store/reducers/thunks/fetchUserThunk';
import './Navigation.scss';
import { getIsAuth } from '@/utils/store/selectors/getIsAuthSelector/getIsAuthSelector';

const baseMenuItems = [
  { key: '/', label: 'Главная' },
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
  const isAuth = useAppSelector(getIsAuth);

  return (
    <Menu
      onClick={async ({ key }) => {
        if (key === 'logout') {
          await logout();
          dispatch(fetchUser());
        } else {
          navigate(key);
        }
      }}
      selectedKeys={[pathname]}
      items={isAuth ? authMenuItems : nonAuthMenuItems}
      mode="horizontal"
      className="navigation"
      data-testid="navigation"
    />
  );
};
