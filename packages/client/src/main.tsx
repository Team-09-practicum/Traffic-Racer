import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.scss'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './utils/router/AppRouter'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <AppRouter /> {/*Уберется отсюда после доработки тестов*/}
    </BrowserRouter>
  </React.StrictMode>
)
