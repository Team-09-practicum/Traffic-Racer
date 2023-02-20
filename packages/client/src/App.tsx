import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout, ConfigProvider, theme, Switch, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '@/utils/store/store';
import { AppRouter } from '@/utils/router/AppRouter';
import { Navigation } from '@/components/navigation/Navigation';
import { getYandexToken } from '@/utils/OAuth';
import { getUserTheme } from './utils/store/selectors/getUserTheme/getUserTheme';
import { getUserId } from './utils/store/selectors/getUserFieldSelectors/getUserFieldSelectors';
import { userActions } from './utils/store/reducers/userSlice/userSlice';
import { updateUserTheme } from './controllers/updateUserTheme';
import { ErrorBoundary, Link } from './components';
import { getIsAuth } from './utils/store/selectors/getIsAuthSelector/getIsAuthSelector';

import './app.scss';
import { fetchUser } from './utils/store/reducers/thunks/fetchUserThunk';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const App = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);

  useEffect(() => {
    const loginWithYandex = async (code: string) => {
      await getYandexToken(code);
      dispatch(fetchUser());
    };

    if (typeof window === 'undefined') return;
    const code = new URLSearchParams(window.location.search).get('code');

    if (!isAuth && code) {
      loginWithYandex(code);
    } else if (!isAuth) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuth]);

  const userId = useAppSelector(getUserId);
  const userTheme = useAppSelector(getUserTheme);

  const handleThemeSwitchClick = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    if (userId) {
      updateUserTheme({ userId, theme: newTheme });
    }
    dispatch(userActions.setUserTheme(newTheme));
  };

  const handleRenderError = () => (
    <div className="rendering-error-wrapper">
      <Title level={1}>Ой, что-то сломалось!</Title>
      <Paragraph>
        Попробуйте <Link to={window ? window.location.href : '/'}>обновить</Link> страницу
      </Paragraph>
    </div>
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: userTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}>
      <ErrorBoundary renderErrorInfo={handleRenderError}>
        <Layout className="layout" data-testid="layoutAntDesign">
          <Header>
            <Navigation />
          </Header>
          <Content className="layout__content" data-testid="content">
            <Toaster />
            <AppRouter />
            <Switch
              checkedChildren="Dark Mode"
              unCheckedChildren="Dark Mode"
              checked={userTheme === 'dark'}
              onClick={handleThemeSwitchClick}
              data-testid="switch"
            />
          </Content>
        </Layout>
      </ErrorBoundary>
    </ConfigProvider>
  );
};

export default App;
