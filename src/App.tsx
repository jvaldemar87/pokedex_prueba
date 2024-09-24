import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Index from './views/Index'
import PokeDetails from './views/PokeDetails'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index/>}/>
        <Route path='/pokemon/:id' element={<PokeDetails/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
