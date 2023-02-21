import React, { useState } from 'react';
import { Button, Form, Input, Modal, Space } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { createTopicSchema } from '@/utils/validation/validationSchema';
import { RichTextEditor } from '@/components/RichTextEditor';
import { createForumTopic } from '@/controllers/createForumTopic';
import { useAppSelector } from '@/utils/store/store';

interface ICreateTopicModalProps {
  isOpen: boolean;
  toggle: (isTopicCreated?: boolean) => void;
}

interface IEditorData {
  topic_name: string;
  rich_text: string;
}

export const CreateTopicModal = (props: ICreateTopicModalProps) => {
  const { isOpen, toggle } = props;
  const [loading, setLoading] = useState(false);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEditorData>({
    mode: 'onChange',
    resolver: yupResolver(createTopicSchema),
  });

  const onSubmit = async (data: IEditorData) => {
    if (!userInfo || !userInfo.id || !userInfo.login) throw Error('Could not get user id and login');

    setLoading(true);
    try {
      await createForumTopic({
        name: data.topic_name,
        body: data.rich_text,
        userId: userInfo.id,
        userName: userInfo.login,
      });

      setLoading(false);
      reset({
        topic_name: '',
        rich_text: '',
      });

      toggle(true);
    } catch (err) {
      setLoading(false);
      toast.error('Ошибка создания новой темы, попробуйте снова');
    }
  };

  const handleCancel = () => {
    toggle();
  };

  return (
    <Modal open={isOpen} title="Новая тема" className="create-topic-modal__form" onCancel={handleCancel} footer={null}>
      <Form className="create-topic-modal__form" onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Form.Item validateStatus={errors.topic_name ? 'error' : ''} help={errors.topic_name?.message}>
          <Controller
            name="topic_name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Название темы" />}
          />
        </Form.Item>
        <Form.Item validateStatus={errors.rich_text ? 'error' : ''} help={errors.rich_text?.message}>
          <Controller
            name="rich_text"
            control={control}
            render={({ field: { onChange, value } }) => <RichTextEditor onChange={onChange} value={value} />}
          />
        </Form.Item>
        <Form.Item>
          <Space direction="horizontal">
            <Button
              key="submit"
              htmlType="submit"
              type="primary"
              loading={loading}
              disabled={!!Object.keys(errors).length}>
              Создать
            </Button>
            <Button key="back" onClick={handleCancel}>
              Отмена
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};
