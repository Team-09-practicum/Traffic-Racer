import { Link } from 'react-router-dom'
import { RoutePath } from '../../utils/router/routeConfig'

export const ForumPage = () => {

  return (
    <div>
      ForumPage
      <Link to = {RoutePath.main}> Главное меню </Link>
    </div>
  )
}
