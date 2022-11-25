import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../utils/router/routeConfig'

export const AuthPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      authPage
      <button onClick={() => navigate(RoutePath.main)}> Главный экран </button>
      <button onClick={() => navigate(RoutePath.registation)}>
        {' '}
        Регистрация{' '}
      </button>
    </div>
  )
}
