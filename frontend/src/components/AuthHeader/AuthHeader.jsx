import React from 'react'
import './AuthHeader.css'

const AuthHeader = () => {
  return (
    <div className='auth-header'>
      <img className='auth-header-logo' src="https://a.slack-edge.com/bv1-13/slack_logo-ebd02d1.svg" alt="Slack" />
      <div className='auth-header-signup' >
        <span>New to Slack?</span>
        <a className='auth-header-signup-link' href="#">Create an account</a>
      </div>
    </div>

  )
}

export default AuthHeader