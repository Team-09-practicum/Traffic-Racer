import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../utils/router/routeConfig'

export const RegistrationPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      Регистрация
      <button onClick={() => navigate(RoutePath.auth)}> Авторизация </button>
      <button onClick={() => navigate(RoutePath.main)}> Главное меню </button>
    </div>
  )
}
