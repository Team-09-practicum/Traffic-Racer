import { Link } from 'react-router-dom';
import React, { useCallback } from 'react';
import { Typography, Form, Input, Button, Avatar, Radio } from 'antd';
import { appRoutes } from '@/utils/router/appRoutes';
import React, { useCallback, useState } from 'react';
import {
  Typography,
  Form,
  Input,
  Button,
  Avatar,
  Radio,
  Modal,
  Row,
  Col,
} from 'antd';
import { RoutePath } from '@/utils/router/routeConfig';
import './UserInfoPage.scss';

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="profile">
      <Title className="profile__form-title">Профиль</Title>
      <Form
        name="basic"
        className="profile__form"
        layout="vertical"
        initialValues={userProfile || {}}
        onFinish={submitHandler}>
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
          <Button
            className="profile__button"
            htmlType="button"
            type="primary"
            onClick={showModal}>
            Изменить пароль
          </Button>
        </Form.Item>
      </Form>
      <Link to={appRoutes.main}> Главное меню </Link>
      <Link to={RoutePath.main}> Главное меню </Link>
      <Link to={RoutePath.сhangePassword}> Изменить пароль </Link>
      <Modal
        centered
        title="Изменение пароля"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" type="primary" onClick={handleCancel}>
            Изменить
          </Button>,
        ]}>
        <Form>
          <Form.Item
            className="profile__form-item"
            label="Имя"
            name="first_name">
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
          <Form.Item
            className="profile__form-item"
            label="Телефон"
            name="phone">
            <Input />
          </Form.Item>
          <Form.Item className="profile__form-item">
            <Button
              className="profile__button"
              htmlType="submit"
              type="primary">
              Сохранить
            </Button>
          </Form.Item>
          <Link to={RoutePath.сhangePassword}> Изменить пароль </Link>
          <br />
          <br />
          <Link to={RoutePath.main}> Главное меню </Link>
        </Form>
      </Col>
    </Row>
  );
};
