import { Link} from 'react-router-dom'
import { RoutePath } from '@/utils/router/routeConfig'

export const AuthPage = () => {

  return (
    <div>
      Авторизация
      <Link to = {RoutePath.main}> Главное меню </Link>
      <Link to = {RoutePath.registration}> Регистрация </Link>
    </div>
  )
}
