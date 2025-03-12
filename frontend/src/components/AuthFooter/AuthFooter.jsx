import React from 'react'
import './AuthFooter.css'
import { FiGlobe } from "react-icons/fi";

const AuthFooter = () => {
  return (
    <div className='auth-footer'>
      <span>Privacy & Terms</span>
      <span>Contact Us</span>
      <div className='auth-footer-region'>
        <FiGlobe />
        <span>Change region</span>
      </div>
    </div>
  )
}

export default AuthFooter