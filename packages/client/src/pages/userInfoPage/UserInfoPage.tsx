/* eslint-disable react/jsx-props-no-spreading */
import { Link } from 'react-router-dom';
import React, { useCallback } from 'react';
import { Typography, Form, Input, Button, Avatar, Radio } from 'antd';
import { appRoutes } from '@/utils/router/appRoutes';
import './UserInfoPage.scss';

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 34 },
};
const { Title } = Typography;

// временная заглушка
const userProfile = {
  id: 111,
  first_name: 'Test',
  second_name: 'Testov',
  display_name: 'test',
  login: 'test111',
  avatar: '',
  email: 'test3@test.com',
  phone: '89998887766',
};

export const UserInfoPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const submitHandler = useCallback((): void => {}, []);

  return (
    <div className="profile">
      <Form
        {...layout}
        name="basic"
        className="profile__form"
        layout="vertical"
        initialValues={userProfile || {}}
        onFinish={submitHandler}>
        <Title className="profile__form-title">Профиль</Title>
        <Avatar className="profile__avatar" size={96}>
          User
        </Avatar>
        <Form.Item className="profile__form-item" label="Почта" name="email">
          <Input />
        </Form.Item>
        <Form.Item className="profile__form-item" label="Логин" name="login">
          <Input />
        </Form.Item>
        <Form.Item className="profile__form-item" label="Имя" name="first_name">
          <Input />
        </Form.Item>
        <Form.Item className="profile__form-item" label="Фамилия" name="second_name">
          <Input />
        </Form.Item>
        <Form.Item className="profile__form-item" label="Имя в игре" name="display_name">
          <Input />
        </Form.Item>
        <Form.Item className="profile__form-item" label="Телефон" name="phone">
          <Input />
        </Form.Item>
        <Form.Item className="profile__form-item" label="Выбрать тему :">
          <Radio.Group>
            <Radio value="dark"> Темная </Radio>
            <Radio value="light"> Светлая </Radio>
          </Radio.Group>
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
      <Link to={appRoutes.main}> Главное меню </Link>
    </div>
  );
};
