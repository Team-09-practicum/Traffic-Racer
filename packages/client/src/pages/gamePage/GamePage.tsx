import { Link } from 'react-router-dom'
import { RoutePath } from '../../utils/router/routeConfig'

export const GamePage = () => {

  return (
    <div>
      gamePage
      <Link to = {RoutePath.main}> Главное меню </Link>
    </div>
  )
}
