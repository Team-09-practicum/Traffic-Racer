import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../utils/router/routeConfig'

export const Error500Page = () => {
  const navigate = useNavigate()

  return (
    <div>
      Error500Page
      <button onClick={() => navigate(RoutePath.main)}>Главное меню</button>
    </div>
  )
}
