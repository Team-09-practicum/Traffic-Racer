import { useNavigate } from 'react-router-dom'
import { RoutePath } from '../../utils/router/routeConfig'

export const StatsPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      StatsPage
      <button onClick={() => navigate(RoutePath.main)}> Главное меню </button>
    </div>
  )
}
