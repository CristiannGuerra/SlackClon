import React, { useState } from 'react'
import './RegisterScreen.css'
import { LoginWrapper, RegisterFooter, RegisterHeader } from '../../components'
import ENVIROMENT from '../../config/enviroment.config.js'
import ServerError from '../../utils/errors.utils.js'
import { useApiRequest, useForm } from '../../hooks/index'

const RegisterScreen = () => {
  // // Initial State Form
  const formInitialState = {
    username: '',
    email: '',
    password: ''
  }

  // // FormState
  // const [formState, setFormState] = useState(formInitialState)

  // // Handle Change Input
  // const handleInput = (e) => {
  //   const { name, value } = e.target
  //   setFormState((prevState) => {
  //     return { ...prevState, [name]: value }
  //   })
  // }

  // Custom Hook Form
  const { formState, handleInput } = useForm(formInitialState)

  // Custom Hook API Request
  const { apiResponse, postRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/register')


  // // Initial API Response State
  // const initialApiResponseState = {
  //   loading: false,
  //   error: null,
  //   data: null
  // }

  // // API Response State
  // const [apiResponse, setApiResponse] = useState(initialApiResponseState)

  // Handle Submit Form
  const handleSumbmitForm = async (e) => {
    // try {
      e.preventDefault()
      await postRequest(formState)

    //   // Set API Response Loading to true
    //   setApiResponse(() => {
    //     return { ...initialApiResponseState, loading: true }
    //   })


    //   const response = await fetch(
    //     ENVIROMENT.URL_API
    //     +
    //     '/api/auth/register',
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(formState)
    //     }
    //   )
    //   // Luego de hacer un fetch, el mismo nos devuelve una response, dicha response la podemos capturar

    //   // response hace referencia al estado de nuestra consulta HTTP
    //   // pero no es la response de la API, sino que de la red
    //   // La response de la API es una promesa por lo cual debemos usar await
    //   // Luego de capturar la response y como La response de la API es un json podemos usar el metodo json()
    //   const responseData = await response.json()

    //   if (responseData.ok) {
    //     setApiResponse((prevState) => {
    //       return { ...prevState, data: responseData }
    //     })
    //   } else {
    //     throw new ServerError(responseData.message, responseData.ok)
    //   }

    // } catch (error) {
    //   setApiResponse((prevState) => {
    //     if (error.status) {
    //       return { ...prevState, error: error.message }
    //     } else {
    //       return { ...prevState, error: 'Something went wrong' }
    //     }
    //   })

    // }
    // finally {
    //   // Set API Response Loading to false
    //   setApiResponse((prevState) => {
    //     return { ...prevState, loading: false }
    //   })
    // }
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
        {
          apiResponse.loading
            ? <span>Loading...</span>
            : <button type="submit" onClick={handleSumbmitForm}>Register</button>
        }

      </form>

    </div>
  )
}

export default RegisterScreen
