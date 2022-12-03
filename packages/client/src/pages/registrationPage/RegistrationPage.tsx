import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Form, Input, Button } from 'antd';
import { RoutePath } from '@/utils/router/routeConfig';
import './RegistrationPage.scss';
import { signUp, ISignUp } from '@/controllers/signUp';

const { Title } = Typography;

export const RegistrationPage = () => {
  const submit = useCallback((inputValues: ISignUp) => signUp(inputValues), []);

  return (
    <Row justify="center" align="middle" className="reg">
      <Col className="reg__col">
        <Title className="reg__title">Регистрация</Title>
        <Form size="large" className="reg__form" onFinish={submit}>
          <Form.Item
            name="first_name"
            rules={[
              { required: true, message: 'Пожалуйста, введите ваше имя!' },
            ]}>
            <Input placeholder="Имя" />
          </Form.Item>
          <Form.Item
            name="second_name"
            rules={[
              { required: true, message: 'Пожалуйста, введите вашу фамилию!' },
            ]}>
            <Input placeholder="Фамилия" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Пожалуйста, введите вам email!' },
            ]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: 'Пожалуйста, введите ваш телефон!' },
            ]}>
            <Input placeholder="Телефон" />
          </Form.Item>
          <Form.Item
            name="login"
            rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}>
            <Input placeholder="Логин" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' },
            ]}>
            <Input.Password placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="reg__button">
              Создать аккаунт
            </Button>
          </Form.Item>
        </Form>
        <Link className="reg__link" to={RoutePath.auth}>
          Уже есть аккаунт?
        </Link>
      </Col>
    </Row>
  );
};
