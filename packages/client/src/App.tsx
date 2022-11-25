import { useEffect } from 'react'
import './App.css'
import './styles/index.scss'
import { AppRouter } from './utils/router/AppRouter'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      Вот тут будет жить ваше приложение :)
      {/* <AppRouter /> для инспользования необходимо доработать тесты */}
    </div>
  )
}

export default App
