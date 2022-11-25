import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../utils/router/routeConfig'

export const GamePage = () => {
  const navigate = useNavigate()

  return (
    <div>
      gamePage''
      <button onClick={() => navigate(RoutePath.main)}>Главное меню</button>
    </div>
  )
}
