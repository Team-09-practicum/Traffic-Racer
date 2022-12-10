import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout } from 'antd';
import { AppRouter } from '@/utils/router/AppRouter';
import { Navigation } from '@/components/navigation/Navigation';
import { StoreProvider } from './utils/store/StoreProvider';
import './app.scss';

const { Header, Content } = Layout;

const App = () => (
  <StoreProvider>
    <Layout className="layout">
      <Header>
        <Navigation />
      </Header>
      <Content className="layout__content">
        <Toaster />
        <AppRouter />
      </Content>
    </Layout>
  </StoreProvider>
);

export default App;
