import { useState } from 'react'
import './App.css'
import Layout from './Components/Layout'
import Home from './Pages/Home'
import Cartelera from './Pages/Cartelera'
import EditarReserva from './Pages/EditarReserva'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
      <Route path='/' element={<Layout><Home /></Layout>}></Route>
      <Route path='/Cartelera' element={<Layout><Cartelera /></Layout>}></Route>
      <Route path='/EditarReserva' element={<Layout><EditarReserva /></Layout>}></Route>
    </Routes>
    </Router>
  )
}

export default App
