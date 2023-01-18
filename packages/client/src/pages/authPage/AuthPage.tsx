import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Form, Input, Button } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { appRoutes } from '@/utils/router/appRoutes';
import { authSchema } from '@/utils/validation/validationSchema';
import { signIn } from '@/controllers/signIn';
import { useAppDispatch } from '@/utils/store/store';
import { fetchUser } from '@/utils/store/reducers/thunks/fetchUserThunk';
import { signinWithYandex } from '@/utils/OAuth';
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

  const dispatch = useAppDispatch();

  const onSubmit = async (data: IAuthInput) => {
    await signIn(data);
    dispatch(fetchUser());
  };

  const OAuthHandler = async () => {
    await signinWithYandex();
  };

  return (
    <Row justify="center" align="middle" className="auth-page">
      <Col className="auth-page__col">
        <Title className="auth-page__title">Вход</Title>
        <Form size="large" className="auth-page__form" onFinish={handleSubmit(onSubmit)}>
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
            <Button htmlType="submit" className="auth-page__button" disabled={!!Object.keys(errors).length}>
              Авторизация
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={OAuthHandler} htmlType="button" className="auth-page__button">
              Войти с Яндекс ID
            </Button>
          </Form.Item>
        </Form>
        <Link className="auth-page__link" to={appRoutes.registration}>
          Нет аккаунта?
        </Link>
      </Col>
    </Row>
  );
};
