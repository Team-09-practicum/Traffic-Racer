import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../utils/router/routeConfig'

export const ForumPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      ForumPage
      <button onClick={() => navigate(RoutePath.main)}>Главное меню</button>
    </div>
  )
}
