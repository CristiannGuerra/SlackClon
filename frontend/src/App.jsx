import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { CreateWorkspace, HomeScreen, LoggedScreen, LoginScreen, RegisterScreen, ResetPasswordScreen, RewritePasswordScreen, Workspace } from './pages'
import { ProtectedRoute } from './components'

function App() {

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login-success' element={<LoggedScreen />} />
        <Route path='/workspace/:workspace_id' element={<Workspace />} />
        <Route path='/workspace/:workspace_id/channel/:channel_id' element={<Workspace/>} />
        <Route path='/create-workspace' element={<CreateWorkspace />} />
      </Route>
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/reset-password' element={<ResetPasswordScreen />} />
      <Route path='/rewrite-password' element={<RewritePasswordScreen />} />

    </Routes>
  )
}

export default App
