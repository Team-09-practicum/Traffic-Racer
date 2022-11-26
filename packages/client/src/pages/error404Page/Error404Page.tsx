import { Link } from 'react-router-dom'
import { RoutePath } from '@/utils/router/routeConfig'

export const Error404Page = () => {

  return (
    <div>
      Error404Page
      <Link to = {RoutePath.main}> Главное меню </Link>
    </div>
  )
}
