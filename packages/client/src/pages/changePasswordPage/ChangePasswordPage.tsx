import { Link } from 'react-router-dom';
import React, { useCallback } from 'react';
import { Typography, Form, Input, Button, Col, Row } from 'antd';
import { appRoutes } from '@/utils/router/appRoutes';
import './ChangePasswordPage.scss';
import { changePassword, IChangePassword } from '@/controllers/changePassword';

const { Title } = Typography;

export const ChangePasswordPage = () => {
  const submit = useCallback((inputValues: IChangePassword) => changePassword(inputValues), []);

  return (
    <Row justify="center" align="middle" className="password">
      <Col className="password__col">
        <Title className="password__form-title">Пароль</Title>
        <Form size="large" name="basic" className="password__form" layout="vertical" onFinish={submit}>
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
            <Button className="password__button" htmlType="submit" type="primary">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
        <Link to={appRoutes.userinfo}> Профиль </Link>
      </Col>
    </Row>
  );
};
