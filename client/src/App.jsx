import { Routes, Route } from 'react-router-dom'

import './App.css'
import LobbyScreen from './pages/lobby'
import RoomPage from './pages/room'

function App() {
  return <div className="App">
    <Routes>
      <Route path='/' element={<LobbyScreen />} />
      <Route path='/room/:roomID' element={<RoomPage />} />
    </Routes>
  </div>
}

export default App
