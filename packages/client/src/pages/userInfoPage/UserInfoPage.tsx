import { Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { Typography, Form, Input, Button, Avatar, Modal, Row, Col } from 'antd';
import { appRoutes } from '@/utils/router/appRoutes';
import { changeAvatar } from '@/controllers/changeAvatar';

import './UserInfoPage.scss';

const { Title } = Typography;

// временная заглушка
const userProfile = {
  id: 111,
  first_name: 'Test',
  second_name: 'Testov',
  display_name: 'test',
  login: 'test111',
  avatar: '',
  email: 'test3@test.com',
  phone: '89998887766',
};

export const UserInfoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<File>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const submitHandler = useCallback((): void => {}, []);

  const handleChangeAvatar = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;
    if (!files) {
      return;
    }
    setImage(files[0]);
  }, []);

  const uploadAvatar = useCallback((): void => {
    if (image) {
      const formData = new FormData();
      formData.append('avatar', image);
      changeAvatar(formData);
      setIsModalOpen(false);
    }
  }, [image]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Row justify="center" align="middle" className="profile">
      <Col className="profile__col">
        <Title className="profile__form-title">Профиль</Title>
        <Avatar className="profile__avatar" onClick={showModal} />
        <Form
          name="basic"
          className="profile__form"
          layout="vertical"
          initialValues={userProfile || {}}
          onFinish={submitHandler}>
          <Form.Item className="profile__form-item" label="Почта" name="email">
            <Input />
          </Form.Item>
          <Form.Item className="profile__form-item" label="Логин" name="login">
            <Input />
          </Form.Item>
          <Form.Item className="profile__form-item" label="Имя" name="first_name">
            <Input />
          </Form.Item>
          <Form.Item className="profile__form-item" label="Фамилия" name="second_name">
            <Input />
          </Form.Item>
          <Form.Item className="profile__form-item" label="Имя в игре" name="display_name">
            <Input />
          </Form.Item>
          <Form.Item className="profile__form-item" label="Телефон" name="phone">
            <Input />
          </Form.Item>
          <Form.Item className="profile__form-item">
            <Button className="profile__button" htmlType="submit" type="primary">
              Сохранить
            </Button>
          </Form.Item>
        </Form>
        <Link to={appRoutes.main}> Главное меню </Link>
        <br />
        <br />
        <Link to={appRoutes.сhangePassword}> Изменить пароль </Link>
        <Modal
          centered
          title="Изменение пароля"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" type="primary" onClick={uploadAvatar}>
              Изменить
            </Button>,
          ]}>
          <Form>
            <Input onChange={handleChangeAvatar} accept="image/*" type="file" className="profile__avatar-input" />
          </Form>
        </Modal>
      </Col>
    </Row>
  );
};
