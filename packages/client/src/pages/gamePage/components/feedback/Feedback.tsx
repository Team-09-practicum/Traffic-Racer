/* eslint-disable max-len */
import React from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector, useAppDispatch } from '@/utils/store/store';
import { feedbackFormSchema } from '@/utils/validation/validationSchema';
import { getIsFeedbackOpen } from '@/utils/store/selectors/getAppStatusSelectors/getAppStatusSelectors';
import { appStatusActions } from '@/utils/store/reducers/appStatusSlice/appStatusSlice';
import { sendFeedback, sentFeedbackToTelegram } from '@/controllers/sendFeedback';
import './Feedback.scss';

export interface IFeedbackForm {
  first_name: string;
  email: string;
  message: string;
}

export const Feedback = () => {
  const isFeedbackOpen = useAppSelector(getIsFeedbackOpen);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFeedbackForm>({
    mode: 'onChange',
    resolver: yupResolver(feedbackFormSchema),
  });

  const closeFeedbackForm = () => {
    dispatch(appStatusActions.setIsFeedbackOpen(!isFeedbackOpen));
  };

  const onSubmit = async (data: IFeedbackForm) => {
    const message = `<b>Имя:</b> ${data.first_name}\n<b>Email:</b> ${data.email}\n<b>Сообщение:</b> ${data.message}`;
    await sendFeedback(data);
    await sentFeedbackToTelegram({ text: message });
    closeFeedbackForm();
  };

  return (
    <Modal
      centered
      title="Обратная связь c разработчиками"
      className="feedback-modal"
      open={isFeedbackOpen}
      onCancel={closeFeedbackForm}
      footer={null}>
      <Form name="basic" className="feedback-modal__form" layout="vertical" onFinish={handleSubmit(onSubmit)}>
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
        <Form.Item className="feedback-modal__form-button">
          <Button key="submit" htmlType="submit" type="primary" disabled={!!Object.keys(errors).length}>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
