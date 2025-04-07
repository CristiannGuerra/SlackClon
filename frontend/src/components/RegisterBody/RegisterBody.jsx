import React from 'react'
import './RegisterBody.css'
import { OnboardingButton } from '../index'
import { FaApple } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { useApiRequest, useForm } from '../../hooks'
import ENVIROMENT from '../../config/enviroment.config'


const RegisterBody = () => {
    // // Initial State Form
    const formInitialState = {
        username: '',
        email: '',
        password: ''
    }

    // Custom Hook Form
    const { formState, handleInput, resetFormState } = useForm(formInitialState)

    // Custom Hook API Request
    const { apiResponse, postRequest } = useApiRequest(ENVIROMENT.URL_API + '/api/auth/register')

    // Handle Submit Form
    const handleSumbmitForm = async (e) => {
        e.preventDefault()
        await postRequest(formState)
    }

    if (apiResponse.data) {
        resetFormState()
        window.location.href = '/login';
    }


    return (
        <div className='register-body'>
            <div className='auth-body-title'>
                <h1 className='auth-body-title-text'>First, enter your email</h1>
                <span className='auth-body-title-description'>We suggest using the <strong>email address you use at work.</strong></span>
            </div>
            <form className='auth-body-form' onSubmit={handleSumbmitForm}>
                <label hidden htmlFor="username"></label>
                <input className='auth-body-form-input' type="text" name='username' id='username' placeholder='John Doe' value={formState.username} onChange={handleInput} required />
                <label hidden htmlFor="email"></label>
                <input className='auth-body-form-input' type="email" name='email' id='email' placeholder='name@work-email.com' value={formState.email} onChange={handleInput} required />
                <label hidden htmlFor="password"></label>
                <input className='auth-body-form-input' type="password" name='password' id='password' placeholder='password' value={formState.password} onChange={handleInput} required />
                {apiResponse.error && <div className='auth-body-form-error'>{apiResponse.error}</div>}
                {apiResponse.loading && <div className='auth-body-form-loading'>Registering...</div>}
                {apiResponse.data && <div className='auth-body-form-success'>{apiResponse.data.message}</div>}
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
        </div>
    )
}

export default RegisterBody