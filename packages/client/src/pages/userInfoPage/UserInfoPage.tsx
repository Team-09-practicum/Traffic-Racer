import React, { useCallback, useState } from 'react';
import { Typography, Form, Input, Button, Avatar, Modal, Row, Col } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from '@/components';
import { appRoutes } from '@/utils/router/appRoutes';
import { profileSchema } from '@/utils/validation/validationSchema';
import { getUserFull } from '@/utils/store/selectors/getUserFullSelector/getUserFullSelector';
import { apiPaths } from '@/utils/constants';
import { useAppDispatch, useAppSelector } from '@/utils/store/store';
import { IUser } from '@/typings/IUser';
import './UserInfoPage.scss';
import { fetchChangeAvatar } from '@/utils/store/reducers/thunks/fetchChangeAvatarThunk';
import { fetchChangeProfile } from '@/utils/store/reducers/thunks/fetchChangeProfileThunk';

const { Title } = Typography;

export const UserInfoPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserFull);
  const avatarPath = `${apiPaths.showAvatar}/${user?.avatar}`;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      first_name: user?.first_name,
      second_name: user?.second_name,
      display_name: user?.display_name || '',
      login: user?.login,
      email: user?.email,
      phone: user?.phone,
    },
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<File>();
  const onSubmit = async (data: IUser) => {
    dispatch(fetchChangeProfile(data));
  };

  const handleChangeAvatar = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    if (!files) {
      return;
    }
    setImage(files[0]);
  }, []);

  const uploadAvatar = useCallback(() => {
    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append('avatar', image);
    dispatch(fetchChangeAvatar(formData));
    setIsModalOpen(false);
  }, [dispatch, image]);

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
        <Avatar className="profile-page__avatar " src={avatarPath} onClick={showModal} />
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
            <Button
              className="profile-page__button"
              htmlType="submit"
              type="primary"
              disabled={!!Object.keys(errors).length}>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
        <Link to={appRoutes.changePassword}> Изменить пароль </Link>
        <br />
        <br />
        <Link to={appRoutes.game}> Главное меню </Link>
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
