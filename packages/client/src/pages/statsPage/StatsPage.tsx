import { Link } from 'react-router-dom'
import { RoutePath } from '../../utils/router/routeConfig'

export const StatsPage = () => {

  return (
    <div>
      StatsPage
      <Link to = {RoutePath.main}> Главное меню </Link>
    </div>
  )
}
