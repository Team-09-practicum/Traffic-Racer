import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Form, Input, Button } from 'antd';
import { RoutePath } from '@/utils/router/routeConfig';
import './AuthPage.scss';
import { signIn, SignInProps } from '@/controllers/signIn';

const { Title } = Typography;

export const AuthPage = () => {
  const submit = useCallback(
    (inputValues: SignInProps) => signIn(inputValues),
    []
  );

  return (
    <Row justify="center" align="middle" className="auth">
      <Col className="auth__col">
        <Title className="auth__title">Вход</Title>
        <Form size="large" className="auth__form" onFinish={submit}>
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
            <Button htmlType="submit" className="auth__button">
              Авторизация
            </Button>
          </Form.Item>
        </Form>
        <Link className="auth__link" to={RoutePath.registration}>
          Нет аккаунта?
        </Link>
      </Col>
    </Row>
  );
};
