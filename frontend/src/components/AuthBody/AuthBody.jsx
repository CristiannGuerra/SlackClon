import React, { useContext, useEffect } from 'react'
import "./AuthBody.css"
import { OnboardingButton } from "../index"
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { FaApple } from "react-icons/fa"; // Apple Icon
import { HiOutlineSparkles } from "react-icons/hi2"; // Sparkles Icon
import { useApiRequest, useForm } from '../../hooks';
import ENVIROMENT from '../../config/enviroment.config';
import { AuthContext } from '../../Context/AuthContext';

const AuthBody = () => {
  const { login } = useContext(AuthContext)


  const formInitialState = {
    email: "",
    password: ""
  }

  const { formState, handleInput } = useForm(formInitialState)

  const { apiResponse, postRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/login')

  useEffect(() => {
    if (apiResponse.data) {
      login(apiResponse.data.payload.autorizathion_token)
    }
  }, [apiResponse])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await postRequest(formState)
  }

  return (
    <div className='auth-body'>
      <div className='auth-body-title'>
        <h1 className='auth-body-title-text'>Sign in to Slack</h1>
        <span className='auth-body-title-description'>We suggest using the <strong>email address you use at work.</strong></span>
      </div>
      <div className='auth-body-buttons'>
        <OnboardingButton text={"Sign In With Google"} reactIcon={<FcGoogle />} />
        <OnboardingButton text={"Sign In With Apple"} reactIcon={<FaApple />} />
      </div>
      <div className='auth-body-divider'>
        <div className='auth-body-divider-line'></div>
        <span className='auth-body-divider-or' >OR</span>
        <div className='auth-body-divider-line'></div>
      </div>
      <form className='auth-body-form' onSubmit={handleSubmit}>
        <label hidden htmlFor="email"></label>
        <input className='auth-body-form-input' type="email" name='email' id='email' placeholder='name@work-email.com' value={formState.email} onChange={handleInput} required />
        <label hidden htmlFor="password"></label>
        <input className='auth-body-form-input' type="text" name='password' id='password' placeholder='password' value={formState.password} onChange={handleInput} required />
        <OnboardingButton text={"Sign In With Email"} isfilled={true} />
      </form>
      <div className='auth-body-signin-manual' >
        <HiOutlineSparkles className='auth-body-signin-manual-icon' />
        <span className='auth-body-signin-manual-text'>We’ll email you a magic code for a password-free sign in. Or you can sign in manually instead.</span>
      </div>
    </div>
  )
}

export default AuthBody