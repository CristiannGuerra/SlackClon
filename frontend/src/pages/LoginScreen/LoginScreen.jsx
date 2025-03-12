import React from 'react'
import './LoginScreen.css'
import { AuthBody, AuthHeader, AuthFooter } from '../../components'


const LoginScreen = () => {

    return (
        <div className='login-screen'>
            <AuthHeader />
            <AuthBody />
            <AuthFooter />
        </div>
    )
}

export default LoginScreen