import React, { useCallback, useEffect, useState } from 'react';
import { Skeleton, Typography, Space, Card } from 'antd';
import { useSearchParams, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getForumTopic } from '@/controllers/getForumTopic';
import { Comment } from './components/Comment/Comment';
import { Reply } from './components/Reply/Reply';
import { ITopicDTO } from '@/typings/ITopicDTO';
import './TopicPage.scss';

const { Title } = Typography;

export const TopicPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [topicData, setTopicData] = useState<ITopicDTO>();
  const topicId = searchParams.get('id');
  const { hash } = useLocation();

  const focusOnComment = useCallback(() => {
    const commentId = hash.substring(1);
    if (commentId) {
      const element = document.getElementById(`anchor-${commentId}`) as HTMLAnchorElement;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const fetchForumTopic = useCallback(async () => {
    try {
      if (!topicId) return;
      const topic = await getForumTopic(+topicId);
      setTopicData(topic);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast.error('Ошибка при загрузке данных темы, попробуйте обновить старницу');
    }
  }, [topicId]);

  useEffect(() => {
    fetchForumTopic();
  }, [fetchForumTopic]);

  useEffect(() => {
    focusOnComment();
  }, [focusOnComment]);

  return (
    <div className="topic-page">
      <Skeleton
        className="topic-page__skeleton_title"
        active
        loading={loading}
        paragraph={false}
        title={{ width: 300 }}>
        <Title className="topic-page__title">{topicData?.name}</Title>
      </Skeleton>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        {loading && <Card loading={loading} />}
        {topicData && (
          <Comment
            id={0}
            body={topicData.body}
            createdAt={topicData.createdAt}
            userId={topicData.userId}
            userName={topicData.userName}
            comments={[]}
            lvl={0}
            parentId={null}
            topicId={topicData.id}
            onReply={fetchForumTopic}
          />
        )}
        {topicData &&
          topicData.comments.map((comment) => <Comment {...comment} onReply={fetchForumTopic} key={comment.id} />)}
        {topicData && <Reply topicId={topicData.id} parentId={null} lvl={0} onReply={fetchForumTopic} />}
      </Space>
    </div>
  );
};
