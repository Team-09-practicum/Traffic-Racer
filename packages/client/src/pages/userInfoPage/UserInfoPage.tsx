import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../utils/router/routeConfig'

export const UserInfoPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      userInfoPage
      <button onClick={() => navigate(RoutePath.main)}>Главный экран</button>
    </div>
  )
}
