/* eslint-disable max-len */
import React from 'react';
// import { FormOutlined } from '@ant-design/icons';
import { Modal, Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSchema, messageSchema } from '@/utils/validation/validationSchema';
import './Feedback.scss';

interface IFeeedbackForm {
  first_name?: string;
  email?: string;
  message?: string;
  isFeedbackOpen?: boolean;
  cancelFeedback: () => void;
}

export const Feedback = (props: IFeeedbackForm) => {
  const { isFeedbackOpen } = props;
  const { cancelFeedback } = props;
  const {
    control,
    formState: { errors },
  } = useForm<IFeeedbackForm>({
    mode: 'onChange',
    resolver: yupResolver(profileSchema, messageSchema),
  });

  return (
    <div>
      <Modal
        centered
        title="Обратная связь c разработчиками"
        open={isFeedbackOpen}
        onCancel={cancelFeedback}
        footer={[
          <Button key="back" type="primary">
            Отправить
          </Button>,
        ]}>
        <Form name="basic" layout="vertical">
          <Form.Item label="Имя" validateStatus={errors.first_name ? 'error' : ''} help={errors.first_name?.message}>
            <Controller name="first_name" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
          <Form.Item label="Почта" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
            <Controller name="email" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>
          <Form.Item label="Сообщение" validateStatus={errors.message ? 'error' : ''} help={errors.message?.message}>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Input.TextArea
                  placeholder="Напишите нам, если у Вас есть предложения по улучшению и доработке игры или Вы просто хотите поделиться впечатлением. "
                  {...field}
                />
              )}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
