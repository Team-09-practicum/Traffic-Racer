import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AppRouter } from './utils/router/AppRouter';
import './app.scss';
import { StoreProvider } from './utils/store/StoreProvider';

const App = () => (
  <StoreProvider>
    <div className="App">
      <Toaster />
      Вот тут будет жить ваше приложение :)
      <AppRouter />
    </div>
  </StoreProvider>
);

export default App;
