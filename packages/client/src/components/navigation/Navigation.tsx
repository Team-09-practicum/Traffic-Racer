import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import './Navigation.scss';

const menuItems = [
  { key: '/', label: 'Главная' },
  { key: '/game', label: 'Игра' },
  { key: '/stats', label: 'Лидерборд' },
  { key: '/forum', label: 'Форум' },
  { key: '/auth', label: 'Авторизация' },
  { key: '/userinfo', label: 'Настройка игрока' },
];

export const Navigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Menu
      onClick={({ key }) => {
        navigate(key);
      }}
      selectedKeys={[pathname]}
      items={menuItems}
      mode="horizontal"
      className="navigation"
    />
  );
};
