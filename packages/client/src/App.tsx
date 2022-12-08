import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout } from 'antd';
import { AppRouter } from '@/utils/router/AppRouter';
import { Navigation } from '@/components/navigation/Navigation';
import './app.scss';

const { Header, Content } = Layout;

const App = () => (
  <Layout className="layout">
    <Header className="layout__header">
      <Navigation />
    </Header>
    <Content className="layout__content">
      <Toaster />
      <AppRouter />
    </Content>
  </Layout>
);

export default App;
