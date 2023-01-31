import React, { ReactNode, useState } from 'react';
import { Button, Card, Space, Typography } from 'antd';
import parse from 'html-react-parser';
import toast from 'react-hot-toast';
import { ISODateToLocaleString } from '@/utils/ISODateToLocaleString';
import { IReplyProps, Reply } from '@/pages/topicPage/components/Reply/Reply';
import { ICommentDTO } from '@/typings/ICommentDTO';
import './Comment.scss';

interface ICommentProps extends ICommentDTO {
  onReply: () => void;
}

const { Text } = Typography;

export const Comment = (props: ICommentProps) => {
  const { id, body, topicId, createdAt, userName, comments, lvl, onReply } = props;
  const replyProps: IReplyProps = {
    topicId,
    parentId: id,
    lvl,
    onReply,
  };
  const [hasReplyForm, setHasReplyForm] = useState<boolean>(false);

  const toggleReplyForm = () => {
    setHasReplyForm((prevState) => !prevState);
  };

  const onReplyHandler = () => {
    toggleReplyForm();
    onReply();
  };

  const deleteComment = () => {
    toast.error('Метод ещё не реализован');
  };

  const actions: ReactNode[] = id
    ? [
        <Button type="link" size="small" onClick={toggleReplyForm}>
          Ответить
        </Button>,
        !comments.length && (
          <Button type="link" size="small" danger onClick={deleteComment}>
            Удалить
          </Button>
        ),
      ]
    : [];

  return (
    <>
      <Card
        className={`comment ${lvl ? 'comment_inner' : null}`}
        style={{ marginLeft: 30 * lvl }}
        size="small"
        title={
          <Space direction="horizontal">
            <Text>{userName}</Text>
            <Text type="secondary">{ISODateToLocaleString(createdAt)}</Text>
          </Space>
        }
        headStyle={{ backgroundColor: '#f5f5f5' }}
        extra={<a href={`#${id}`} id={`anchor-${id}`}>{`#${id}`}</a>}
        actions={actions}
        key={id}>
        {parse(body)}
      </Card>
      {hasReplyForm && <Reply {...replyProps} onReply={onReplyHandler} />}
      {comments.length > 0 &&
        comments.map((comment) => <Comment {...comment} onReply={onReplyHandler} key={comment.id} />)}
    </>
  );
};
