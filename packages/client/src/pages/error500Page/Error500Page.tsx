import { Link } from 'react-router-dom'
import { RoutePath } from '../../utils/router/routeConfig'

export const Error500Page = () => {

  return (
    <div>
      Error500Page
      <Link to = {RoutePath.main}> Главное меню </Link>
    </div>
  )
}
