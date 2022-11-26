import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routeConfig } from './routeConfig'

export const AppRouter = () => {
  return (
    <Suspense fallback={<div> Loading... </div>}> {/*TODO: Добавить лоадер здесь при делении страниц на бандлы */}
      <Routes>
        {Object.values(routeConfig).map(({ element, path }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  )
}
