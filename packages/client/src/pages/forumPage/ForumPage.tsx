import React from 'react';
import { Table } from 'antd';
import { generatePath } from 'react-router';
import { appRoutes } from '@/utils/router/appRoutes';
import { response } from './mock';
import { ITopic } from './typings';
import { Link } from '@/components';

const columns = [
  {
    title: 'Топики',
    dataIndex: 'name',
    key: 'name',
    render: (topicName: string, topic: ITopic) => {
      const path = generatePath(appRoutes.topic, { id: topic.id });

      return <Link to={path}>{topicName}</Link>;
    },
    sorter: { compare: (currentTopic: ITopic, nextTopic: ITopic) => currentTopic.name.localeCompare(nextTopic.name) },
  },
  {
    title: 'Тем в топике',
    dataIndex: 'themeCount',
    key: 'themeCount',
    sorter: { compare: (currentTopic: ITopic, nextTopic: ITopic) => currentTopic.themeCount - nextTopic.themeCount },
  },
  {
    title: 'Последнее сообщение',
    dataIndex: 'lastMessageDate',
    key: 'lastMessageDate',
    render: (date: string) => new Date(date).toLocaleDateString(),
    sorter: {
      compare: (currentTopic: ITopic, nextTopic: ITopic) =>
        Date.parse(currentTopic.lastMessageDate) - Date.parse(nextTopic.lastMessageDate),
    },
  },
];

export const ForumPage = () => (
  <>
    <Link to={appRoutes.main} isRouter>
      Главное меню
    </Link>
    <Table
      dataSource={response}
      columns={columns}
      rowKey={(topicItem) => topicItem.id}
      locale={{
        triggerDesc: 'Сортировать по убыванию',
        triggerAsc: 'Сортировать по возрастанию',
        cancelSort: 'Отменить сортировку',
        emptyText: 'Пока тут нет топиков...',
      }}
    />
  </>
);
