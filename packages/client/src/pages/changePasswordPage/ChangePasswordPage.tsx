/* eslint-disable react/jsx-props-no-spreading */
import { Link } from 'react-router-dom';
import React, { useCallback } from 'react';
import { Typography, Form, Input, Button } from 'antd';
import { RoutePath } from '@/utils/router/routeConfig';

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 34 },
};
const { Title } = Typography;

export const ChangePasswordPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const submitHandler = useCallback((): void => {}, []);

  return (
    <div className="profile">
      <Form
        {...layout}
        name="basic"
        className="profile__form"
        layout="vertical"
        onFinish={submitHandler}>
        <Title className="profile__form-title">Изменение пароль</Title>
        <Form.Item className="profile__form-item" name="oldPassword">
          <Input placeholder="Старый пароль" />
        </Form.Item>
        <Form.Item className="profile__form-item" name="newPassword">
          <Input placeholder="Новый пароль" />
        </Form.Item>
        <Form.Item className="profile__form-item" name="repeatPassword">
          <Input placeholder="Повторите пароль" />
        </Form.Item>
        <Form.Item className="profile__form-item">
          <Button className="profile__button" htmlType="submit" type="primary">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
      <Link to={RoutePath.userinfo}> Профиль </Link>
    </div>
  );
};
