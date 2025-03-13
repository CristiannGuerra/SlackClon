import React, { useState } from 'react'
import './RegisterScreen.css'
import ENVIROMENT from '../../config/enviroment.config.js'
import { useApiRequest, useForm } from '../../hooks/index'
import { AuthFooter, AuthHeader, OnboardingButton } from '../../components/index.js'
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { FaApple } from "react-icons/fa"; // Apple Icon

const RegisterScreen = () => {
  // // Initial State Form
  const formInitialState = {
    username: '',
    email: '',
    password: ''
  }

  // Custom Hook Form
  const { formState, handleInput } = useForm(formInitialState)

  // Custom Hook API Request
  const { apiResponse, postRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/register')

  // Handle Submit Form
  const handleSumbmitForm = async (e) => {
    e.preventDefault()
    await postRequest(formState)
  }


  return (
    <div className='register-screen'>
      {/* <form>
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

      </form> */}
      <AuthHeader />
      <div className='auth-body-title'>
        <h1 className='auth-body-title-text'>First, enter your email</h1>
        <span className='auth-body-title-description'>We suggest using the <strong>email address you use at work.</strong></span>
      </div>
      <form className='auth-body-form' onSubmit={handleSumbmitForm}>
        <label hidden htmlFor="username"></label>
        <input className='auth-body-form-input' type="text" name='username' id='username' placeholder='John Doe' value={formState.email} onChange={handleInput} required />
        <label hidden htmlFor="email"></label>
        <input className='auth-body-form-input' type="email" name='email' id='email' placeholder='name@work-email.com' value={formState.email} onChange={handleInput} required />
        <label hidden htmlFor="password"></label>
        <input className='auth-body-form-input' type="text" name='password' id='password' placeholder='password' value={formState.password} onChange={handleInput} required />
        <OnboardingButton text={"Continue"} isfilled={true} />
      </form>
      <div className='auth-body-divider'>
        <div className='auth-body-divider-line'></div>
        <span className='auth-body-divider-or' >OR</span>
        <div className='auth-body-divider-line'></div>
      </div>
      <div className='auth-body-buttons'>
        <OnboardingButton text={"Sign In With Google"} reactIcon={<FcGoogle />} />
        <OnboardingButton text={"Sign In With Apple"} reactIcon={<FaApple />} />
      </div>
      <AuthFooter />

    </div>
  )
}

export default RegisterScreen
