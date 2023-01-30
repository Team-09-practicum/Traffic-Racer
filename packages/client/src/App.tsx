import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout, ConfigProvider, theme, Switch } from 'antd';
import { useSelector } from 'react-redux';
import { AppRouter } from '@/utils/router/AppRouter';
import { Navigation } from '@/components/navigation/Navigation';
import { useAppDispatch } from '@/utils/store/store';
import { fetchUser } from './utils/store/reducers/thunks/fetchUserThunk';
import { getYandexToken } from '@/utils/OAuth';
import { getUserTheme } from './utils/store/selectors/getUserTheme/getUserTheme';
import { getUserId } from './utils/store/selectors/getUserFieldSelectors/getUserFieldSelectors';

import './app.scss';
import { userActions } from './utils/store/reducers/userSlice/userSlice';
import { updateUserTheme } from './controllers/updateUserTheme';

const { Header, Content } = Layout;

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      getYandexToken(code);
    }

    dispatch(fetchUser());
  }, [dispatch]);

  const userId = useSelector(getUserId);
  const userTheme = useSelector(getUserTheme);

  const handleThemeSwitchClick = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    if (userId) {
      updateUserTheme({ userId, theme: newTheme });
    }
    dispatch(userActions.setUserTheme(newTheme));
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: userTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}>
      <Layout className="layout">
        <Header>
          <Navigation />
        </Header>
        <Content className="layout__content">
          <Toaster />
          <AppRouter />
          <Switch
            checkedChildren="Dark Mode"
            unCheckedChildren="Dark Mode"
            checked={userTheme === 'dark'}
            onClick={handleThemeSwitchClick}
          />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
