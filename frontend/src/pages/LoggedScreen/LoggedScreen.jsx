import React from 'react'
import "./LoggedScreen.css"
import { AuthFooter, LoggedBody, RegisterHeader } from '../../components'

const LoggedScreen = () => {
    return (
        <div className='logged-screen' >
            <RegisterHeader />
            <LoggedBody/>
            <AuthFooter />
        </div>
    )
}

export default LoggedScreen