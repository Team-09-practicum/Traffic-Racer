import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../utils/router/routeConfig'

export const Error404Page = () => {
  const navigate = useNavigate()

  return (
    <div>
      Error404Page
      <button onClick={() => navigate(RoutePath.main)}>Главное меню</button>
    </div>
  )
}
