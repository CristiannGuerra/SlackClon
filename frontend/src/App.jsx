import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home, Register } from './pages'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  )
}

export default App
