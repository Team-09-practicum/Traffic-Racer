/* eslint-disable react/jsx-props-no-spreading */
import { Link } from 'react-router-dom';
import React from 'react';
import { Typography, Form, Input, Button } from 'antd';
import { RoutePath } from '@/utils/router/routeConfig';
import './UserInfoPage.scss';

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 34 },
};
const { Title } = Typography;

export const UserInfoPage = () => (
  <div className="profile">
    <Form {...layout} name="basic" className="profile__form" layout="vertical">
      <Title className="profile__form-title">Профиль</Title>
      <Form.Item className="profile__form-item" label="Почта" name="email">
        <Input />
      </Form.Item>
      <Form.Item className="profile__form-item" label="Логин" name="login">
        <Input />
      </Form.Item>
      <Form.Item className="profile__form-item" label="Имя" name="first_name">
        <Input />
      </Form.Item>
      <Form.Item
        className="profile__form-item"
        label="Фамилия"
        name="second_name">
        <Input />
      </Form.Item>
      <Form.Item
        className="profile__form-item"
        label="Имя в игре"
        name="display_name">
        <Input />
      </Form.Item>
      <Form.Item className="profile__form-item" label="Телефон" name="phone">
        <Input />
      </Form.Item>
      <Form.Item className="profile__form-item">
        <Button className="profile__button" htmlType="submit" type="primary">
          Сохранить
        </Button>
        <Button className="profile__button" htmlType="button" type="primary">
          Изменить пароль
        </Button>
      </Form.Item>
    </Form>
    <Link to={RoutePath.main}> Главное меню </Link>
  </div>
);
