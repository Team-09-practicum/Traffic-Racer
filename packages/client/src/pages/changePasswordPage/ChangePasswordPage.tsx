/* eslint-disable react/jsx-props-no-spreading */
import { Link } from 'react-router-dom';
import React, { useCallback } from 'react';
import { Typography, Form, Input, Button, Col, Row } from 'antd';
import { RoutePath } from '@/utils/router/routeConfig';
import './ChangePasswordPage.scss';

const { Title } = Typography;

export const ChangePasswordPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const submitHandler = useCallback((): void => {}, []);

  return (
    <Row justify="center" align="middle" className="password">
      <Col className="password__col">
        {' '}
        <Title className="password__form-title">Пароль</Title>
        <Form
          size="large"
          name="basic"
          className="password__form"
          layout="vertical"
          onFinish={submitHandler}>
          <Form.Item className="password__form-item" name="oldPassword">
            <Input.Password placeholder="Старый пароль" />
          </Form.Item>
          <Form.Item className="password__form-item" name="newPassword">
            <Input.Password placeholder="Новый пароль" />
          </Form.Item>
          <Form.Item className="password__form-item" name="repeatPassword">
            <Input.Password placeholder="Повторите пароль" />
          </Form.Item>
          <Form.Item className="password__form-item">
            <Button
              className="password__button"
              htmlType="submit"
              type="primary">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
        <Link to={RoutePath.userinfo}> Профиль </Link>
      </Col>
    </Row>
  );
};
