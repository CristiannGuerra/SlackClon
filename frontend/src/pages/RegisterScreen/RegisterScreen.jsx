import React, { useState } from 'react'
import './RegisterScreen.css'
import { AuthFooter, RegisterBody, RegisterHeader } from '../../components/index.js'

const RegisterScreen = () => {

  return (
    <div className='register-screen'>
      <RegisterHeader />
      <RegisterBody />
      <AuthFooter />
    </div>
  )
}

export default RegisterScreen
