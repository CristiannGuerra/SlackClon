import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomeScreen, RegisterScreen } from './pages'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
    </Routes>
  )
}

export default App
