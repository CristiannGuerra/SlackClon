import React from 'react'
import './AuthHeader.css'
import { SiSlack } from "react-icons/si";

const AuthHeader = () => {
  return (
    <div className='auth-header'>
      <div className='auth-header-logo'><SiSlack /></div>
      <div className='auth-header-title'>slack</div>       
    </div>

  )
}

export default AuthHeader