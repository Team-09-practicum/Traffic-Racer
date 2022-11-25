import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../utils/router/routeConfig'
import { Button } from 'antd'

export const MainPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      Гланое меню
      <Button type="primary" onClick={() => navigate(RoutePath.auth)}>
        Авторизация
      </Button>
      <button onClick={() => navigate(RoutePath.stats)}> Лидерборд </button>
      <button onClick={() => navigate(RoutePath.forum)}> Форум </button>
      <button onClick={() => navigate(RoutePath.userinfo)}>
        {' '}
        Настройка игрока{' '}
      </button>
    </div>
  )
}
