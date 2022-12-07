import { Link } from 'react-router-dom';
import React, { useCallback } from 'react';
import { Typography, Form, Input, Button, Col, Row } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { appRoutes } from '@/utils/router/appRoutes';
import './ChangePasswordPage.scss';
import { changePassword } from '@/controllers/changePassword';
import { changePasswordSchema } from '@/utils/validation/validationSchema';

const { Title } = Typography;

interface IPasswordInput {
  oldPassword: string;
  newPassword: string;
  confirm_password: string;
}

export const ChangePasswordPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordInput>({
    mode: 'onChange',
    resolver: yupResolver(changePasswordSchema),
  });

  const onSubmit = useCallback((data: IPasswordInput) => changePassword(data), []);

  return (
    <Row justify="center" align="middle" className="password">
      <Col className="password__col">
        <Title className="password__form-title">Пароль</Title>
        <Form size="large" name="basic" className="password__form" layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            className="password__form-item"
            validateStatus={errors.oldPassword ? 'error' : ''}
            help={errors.oldPassword?.message}>
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => <Input.Password {...field} placeholder="Старый пароль" />}
            />
          </Form.Item>
          <Form.Item
            className="password__form-item"
            validateStatus={errors.newPassword ? 'error' : ''}
            help={errors.newPassword?.message}>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => <Input.Password {...field} placeholder="Новый пароль" />}
            />
          </Form.Item>
          <Form.Item
            className="password__form-item"
            validateStatus={errors.confirm_password ? 'error' : ''}
            help={errors.confirm_password?.message}>
            <Controller
              name="confirm_password"
              control={control}
              render={({ field }) => <Input.Password {...field} placeholder="Подтвердите  пароль" />}
            />
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
