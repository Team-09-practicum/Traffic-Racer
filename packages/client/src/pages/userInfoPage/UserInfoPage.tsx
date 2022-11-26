import { Link } from "react-router-dom"
import { RoutePath } from "@/utils/router/routeConfig"

export const UserInfoPage = () => {

  return (
    <div>
        userInfoPage
        <Link to = {RoutePath.main}> Главное меню </Link>
    </div>
  )
}
