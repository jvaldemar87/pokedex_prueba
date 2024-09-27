import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './login/Login'
import Index from './views/Index'
import PokeDetails from './views/PokeDetails'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Index/>}/>  {/* Cambiado a /home */}
        <Route path='/pokemon/:id' element={<PokeDetails/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
