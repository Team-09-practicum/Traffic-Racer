import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Form, Input, Button } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RoutePath } from '@/utils/router/routeConfig';
import { authSchema } from '@/utils/validation/validationSchema';
import './AuthPage.scss';

const { Title } = Typography;

interface IAuthInput {
  login: string;
  password: string;
}

export const AuthPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthInput>({
    mode: 'onChange',
    resolver: yupResolver(authSchema),
  });

  const onSubmit = (data: IAuthInput) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Row justify="center" align="middle" className="auth">
      <Col className="auth__col">
        <Title className="auth__title">Вход</Title>
        <Form size="large" className="auth__form" onFinish={handleSubmit(onSubmit)}>
          <Form.Item validateStatus={errors.login ? 'error' : ''} help={errors.login?.message}>
            <Controller
              name="login"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Логин" />}
            />
          </Form.Item>
          <Form.Item validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input.Password {...field} placeholder="Пароль" />}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="auth__button" disabled={!!Object.keys(errors).length}>
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
