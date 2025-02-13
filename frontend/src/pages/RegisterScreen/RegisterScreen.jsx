import React, { useState } from 'react'
import './RegisterScreen.css'
import { LoginWrapper, RegisterFooter, RegisterHeader } from '../../components'

const RegisterScreen = () => {
  // Initial State
  const formInitialState = {
    username: '',
    email: '',
    password: ''
  }

  // FormState
  const [formState, setFormState] = useState(formInitialState)

  // Handle Change
  const handleInput = (e) => {
    setFormState((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }


  return (
    <div className='register-screen'>
      <form>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder='Username' id='username' name='username' value={formState.username} onChange={handleInput} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder='Email' id='email' name='email' value={formState.email} onChange={handleInput} />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input type="password" placeholder='Password' id='password' name='password' value={formState.password} onChange={handleInput} />
        </div>
        <button type="submit">Register</button>
      </form>

    </div>
  )
}

export default RegisterScreen
