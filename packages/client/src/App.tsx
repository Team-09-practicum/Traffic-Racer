import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout } from 'antd';
import { AppRouter } from '@/utils/router/AppRouter';
import { Navigation } from '@/components/navigation/Navigation';
import { useAppDispatch } from '@/utils/store/store';
import { fetchUser } from './utils/store/reducers/thunks/fetchUserThunk';
import { getYandexToken } from '@/utils/OAuth';
import './app.scss';

const { Header, Content } = Layout;

const App = () => {
  if (typeof window === 'undefined') {
    return <div>🍩Заглушка до добавления Redux и Роутинга в SSR</div>;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      getYandexToken(code);
    }

    dispatch(fetchUser());
  });

  return (
    <Layout className="layout">
      <Header>
        <Navigation />
      </Header>
      <Content className="layout__content">
        <Toaster />
        <AppRouter />
      </Content>
    </Layout>
  );
};

export default App;
