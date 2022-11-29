import React from 'react';
import { Typography, Row, Col, Form, Input, Button } from 'antd';
import './AuthPage.scss';

const { Title } = Typography;

export const AuthPage = () => (
  <Row justify="center" align="middle" className="auth">
    <Col className="auth__col">
      <Title className="auth__title">Вход</Title>
      <Form size="large">
        <Form.Item
          name="login"
          rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}>
          <Input placeholder="Логин" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}>
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="auth__button">
            Авторизация
          </Button>
        </Form.Item>
      </Form>
    </Col>
  </Row>
);
