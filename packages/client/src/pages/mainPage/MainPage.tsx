import { Link } from 'react-router-dom'
import { RoutePath } from '../../utils/router/routeConfig'


export const MainPage = () => {

  return (
    <div>
      Гланое меню
      
        <Link to = {RoutePath.stats}> Лидерборд </Link>
        <Link to = {RoutePath.forum}> Форум </Link>
        <Link to = {RoutePath.game}> Игра </Link>
        <Link to = {RoutePath.userinfo}> Настройка игрока </Link>
        
    </div>
  )
}
