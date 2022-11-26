import { Link } from 'react-router-dom'
import { RoutePath } from '@/utils/router/routeConfig'

export const RegistrationPage = () => {

  return (
    <div>
      Регистрация
      <Link to = {RoutePath.auth}> Авторизация </Link>
      <Link to = {RoutePath.main}> Главное меню </Link>
    </div>
  )
}
