import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AppRouter } from './utils/router/AppRouter';

const App = () => (
  <div className="App">
    <Toaster />
    Вот тут будет жить ваше приложение :)
    <AppRouter />
  </div>
);

export default App;
