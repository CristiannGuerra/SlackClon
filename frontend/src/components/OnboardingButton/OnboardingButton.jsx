import React from 'react'
import './OnboardingButton.css'

const OnboardingButton = ({text, reactIcon, isfilled= false, isbutton = false}) => {
  return (    
    <button type='submit'  className={`onboarding-button ${isfilled ? 'filled' : 'stock'} `}>
      {reactIcon && React.cloneElement(reactIcon, { className: "onboarding-button-icon" })}
      <div className='onboarding-button-text'>{text}</div>
    </button>
  )
}

export default OnboardingButton