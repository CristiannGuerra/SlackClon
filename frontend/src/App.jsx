import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomeScreen, LoginScreen, RegisterScreen } from './pages'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomeScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/login' element={<LoginScreen />} />
    </Routes>
  )
}

export default App
