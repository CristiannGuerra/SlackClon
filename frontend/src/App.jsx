import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { HomeScreen, LoginScreen, RegisterScreen, ResetPasswordScreen, RewritePasswordScreen } from './pages'
import { ProtectedRoute } from './components'

function App() {

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<HomeScreen />} />
      </Route>
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/reset-password' element={<ResetPasswordScreen />} />
      <Route path='/rewrite-password' element={<RewritePasswordScreen />} />
    </Routes>
  )
}

export default App
