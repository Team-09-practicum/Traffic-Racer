import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Typography } from 'antd';
import { appRoutes } from '@/utils/router/appRoutes';
import { ITopic } from '@/typings/ITopic';
import { Link } from '@/components';
import { getForumIndex } from '@/controllers/getForumIndex';
import { CreateTopicModal } from '@/pages/forumPage/components/CreateTopicModal';
import { ISODateToLocaleString } from '@/utils/ISODateToLocaleString';
import { useAppSelector } from '@/utils/store/store';
import './ForumPage.scss';
import { getIsAuth } from '@/utils/store/selectors/getIsAuthSelector/getIsAuthSelector';

const columns = [
  {
    title: 'Темы',
    dataIndex: 'name',
    key: 'name',
    render: (topicName: string, topic: ITopic) => {
      const path = new URLSearchParams({ id: topic.id.toString() });

      return <Link to={`${appRoutes.topic}?${path.toString()}`}>{topicName}</Link>;
    },
    sorter: { compare: (currentTopic: ITopic, nextTopic: ITopic) => currentTopic.name.localeCompare(nextTopic.name) },
  },
  {
    title: 'Сообщений',
    dataIndex: 'commentsCount',
    key: 'commentsCount',
    sorter: {
      compare: (currentTopic: ITopic, nextTopic: ITopic) => currentTopic.commentsCount - nextTopic.commentsCount,
    },
  },
  {
    title: 'Последнее сообщение',
    dataIndex: 'lastCommentDate',
    key: 'lastCommentDate',
    render: (date: string | null) => (!date ? 'Нет сообщений' : ISODateToLocaleString(date)),
    sorter: {
      compare: (currentTopic: ITopic, nextTopic: ITopic) =>
        Date.parse(currentTopic.lastCommentDate) - Date.parse(nextTopic.lastCommentDate),
    },
  },
];

export const ForumPage = () => {
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<ITopic[]>();
  const [isModalOpened, setModalOpened] = useState<boolean>(false);
  const isAuth = useAppSelector(getIsAuth);

  const fetchForumTopics = async () => {
    const topicsData = await getForumIndex();
    setTopics(topicsData);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuth) fetchForumTopics();
  }, [isAuth]);

  const toggleModal = (isTopicCreated = false) => {
    setModalOpened((prevState) => !prevState);
    if (isTopicCreated) fetchForumTopics();
  };

  return (
    <div className="forum-page">
      {isAuth ? (
        <>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Button type="primary" onClick={() => setModalOpened(true)}>
              Новая тема
            </Button>
            <Table
              className="forum-page__table"
              dataSource={topics}
              columns={columns}
              rowKey={(topicItem) => topicItem.id}
              loading={loading}
              locale={{
                triggerDesc: 'Сортировать по убыванию',
                triggerAsc: 'Сортировать по возрастанию',
                cancelSort: 'Отменить сортировку',
                emptyText: 'Нет тем',
              }}
              pagination={{ hideOnSinglePage: true }}
            />
          </Space>
          <CreateTopicModal isOpen={isModalOpened} toggle={toggleModal} />
        </>
      ) : (
        <Typography className="forum-page__restricted">
          Нужно <Link to={appRoutes.auth}>войти</Link>, чтобы посмотреть форум
        </Typography>
      )}
    </div>
  );
};
