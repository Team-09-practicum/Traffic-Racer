import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Row, Col, Form, Input, Button } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RoutePath } from '@/utils/router/routeConfig';
import { registrationSchema } from '@/utils/validation/validationSchema';
import './RegistrationPage.scss';

const { Title } = Typography;

interface IRegInput {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  login: string;
  password: string;
  confirm_password: string;
}

export const RegistrationPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegInput>({
    mode: 'onChange',
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = (data: IRegInput) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Row justify="center" align="middle" className="registration-page">
      <Col className="registration-page__col">
        <Title className="registration-page__title">Регистрация</Title>
        <Form size="large" className="registration-page__form" onFinish={handleSubmit(onSubmit)}>
          <Form.Item validateStatus={errors.first_name ? 'error' : ''} help={errors.first_name?.message}>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Имя" />}
            />
          </Form.Item>
          <Form.Item validateStatus={errors.second_name ? 'error' : ''} help={errors.second_name?.message}>
            <Controller
              name="second_name"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Фамилия" />}
            />
          </Form.Item>
          <Form.Item validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Email" />}
            />
          </Form.Item>
          <Form.Item validateStatus={errors.phone ? 'error' : ''} help={errors.phone?.message}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Телефон" />}
            />
          </Form.Item>
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
          <Form.Item validateStatus={errors.confirm_password ? 'error' : ''} help={errors.confirm_password?.message}>
            <Controller
              name="confirm_password"
              control={control}
              render={({ field }) => <Input.Password {...field} placeholder="Подтвердите пароль" />}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="registration-page__button" disabled={!!Object.keys(errors).length}>
              Создать аккаунт
            </Button>
          </Form.Item>
        </Form>
        <Link className="registration-page__link" to={RoutePath.auth}>
          Уже есть аккаунт?
        </Link>
      </Col>
    </Row>
  );
};
