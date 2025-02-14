import React, { useState } from 'react'
import './RegisterScreen.css'
import { LoginWrapper, RegisterFooter, RegisterHeader } from '../../components'
import ENVIROMENT from '../../config/enviroment.config.js'

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
    const { name, value } = e.target
    setFormState((prevState) => {
      return { ...prevState, [name]: value }
    })
  }

  // Handle Submit
  const handleSumbmitForm = async (e) => {
    e.preventDefault()

    const response = await fetch(
      ENVIROMENT.URL_API
      +
      '/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      }
    )
    // Luego de hacer un fetch, el mismo nos devuelve una response, dicha response la podemos capturar

    // response hace referencia al estado de nuestra consulta HTTP
    // pero no es la response de la API, sino que de la red
    // La response de la API es una promesa por lo cual debemos usar await
    // Luego de capturar la response y como La response de la API es un json podemos usar el metodo json()
    const responseData = await response.json()


    if (responseData.ok) {
      alert('User registered successfully')
    } else {
      if (responseData.status === 400) {
        alert(responseData.message)
      } else {
        alert('Something went wrong')
      }
    }
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
        <button type="submit" onClick={handleSumbmitForm}>Register</button>
      </form>

    </div>
  )
}

export default RegisterScreen
