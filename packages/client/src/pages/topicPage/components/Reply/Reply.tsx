import React, { useState } from 'react';
import { Card, Button, Form, Space } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { RichTextEditor } from '@/components/RichTextEditor';
import { replyInTopicSchema } from '@/utils/validation/validationSchema';
import { createForumComment } from '@/controllers/createForumComment';
import { ICommentDTO } from '@/typings/ICommentDTO';
import { useAppSelector } from '@/utils/store/store';
import './Reply.scss';

export interface IReplyProps extends Pick<ICommentDTO, 'topicId' | 'parentId' | 'lvl'> {
  onReply: () => void;
}

interface IReplyFormData {
  rich_text: string;
}

export const Reply = ({ topicId, parentId = null, lvl, onReply }: IReplyProps) => {
  const [loading, setLoading] = useState(false);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReplyFormData>({
    mode: 'onChange',
    resolver: yupResolver(replyInTopicSchema),
  });

  const handleCancel = () => {
    reset({
      rich_text: '',
    });
  };

  const onSubmit = async (data: IReplyFormData) => {
    if (!userInfo || !userInfo.id || !userInfo.login) throw Error('Could not get user id and login');

    setLoading(true);
    try {
      await createForumComment(
        {
          topicId,
          parentId,
          body: data.rich_text,
          userId: userInfo.id,
          userName: userInfo.login,
        },
        () => {
          handleCancel();
          onReply();
        }
      );
    } catch (e) {
      toast.error('Ошибка создания комментария, попробуйте снова');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="reply" title="Ответить" size="small" style={{ marginLeft: 30 * lvl, marginTop: 8 }}>
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
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
              Отправить
            </Button>
            <Button key="back" onClick={handleCancel}>
              Отмена
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};
