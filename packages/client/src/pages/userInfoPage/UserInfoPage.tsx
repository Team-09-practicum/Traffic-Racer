import React, { useCallback, useState } from 'react';
import { Typography, Form, Input, Button, Avatar, Modal, Row, Col } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from '@/components';
import { appRoutes } from '@/utils/router/appRoutes';
import { changeAvatar } from '@/controllers/changeAvatar';
import { profileSchema } from '@/utils/validation/validationSchema';
import { IUser } from '@/typings/IUser';
import './UserInfoPage.scss';

const { Title } = Typography;

export const UserInfoPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      first_name: 'Test',
      second_name: 'Testov',
      display_name: 'test',
      login: 'test111',
      avatar: '',
      email: 'test3@test.com',
      phone: '89998887766',
    },
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<File>();

  const onSubmit = (data: IUser) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const handleChangeAvatar = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    if (!files) {
      return;
    }
    setImage(files[0]);
  }, []);

  const uploadAvatar = useCallback((): void => {
    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append('avatar', image);
    changeAvatar(formData);
    setIsModalOpen(false);
  }, [image]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Row justify="center" align="middle" className="profile-page">
      <Col className="profile-page__col">
        <Title className="profile-page__form-title">Профиль</Title>
        <Avatar className="profile-page__avatar " onClick={showModal} />
        <Form name="basic" className="profile-page__form" layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            className="profile-page__form-item"
            label="Почта"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}>
            <Controller name="email" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
          <Form.Item
            className="profile-page__form-item"
            label="Логин"
            validateStatus={errors.login ? 'error' : ''}
            help={errors.login?.message}>
            <Controller name="login" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
          <Form.Item
            className="profile-page__form-item"
            label="Имя"
            validateStatus={errors.first_name ? 'error' : ''}
            help={errors.first_name?.message}>
            <Controller name="first_name" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
          <Form.Item
            className="profile-page__form-item"
            label="Фамилия"
            validateStatus={errors.second_name ? 'error' : ''}
            help={errors.second_name?.message}>
            <Controller name="second_name" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
          <Form.Item
            className="profile-page__form-item"
            label="Имя в игре"
            validateStatus={errors.display_name ? 'error' : ''}
            help={errors.display_name?.message}>
            <Controller name="display_name" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
          <Form.Item
            className="profile-page__form-item"
            label="Телефон"
            validateStatus={errors.phone ? 'error' : ''}
            help={errors.phone?.message}>
            <Controller name="phone" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
          <Form.Item className="profile-page__form-item">
            <Button className="profile-page__button" htmlType="submit" type="primary">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
        <Link to={appRoutes.сhangePassword}> Изменить пароль </Link>
        <br />
        <br />
        <Link to={appRoutes.main}> Главное меню </Link>
        <Modal
          centered
          title="Изменение пароля"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button key="back" type="primary" onClick={uploadAvatar}>
              Изменить
            </Button>,
          ]}>
          <Form>
            <Input onChange={handleChangeAvatar} accept="image/*" type="file" className="profile-page__avatar-input" />
          </Form>
        </Modal>
      </Col>
    </Row>
  );
};
