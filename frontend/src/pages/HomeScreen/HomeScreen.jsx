import React from 'react'
import './HomeScreen.css'

const HomeScreen = () => {
  const token = sessionStorage.getItem('authorization_token')

  if (!token) {
    window.location.href = '/login'
  } else {
    window.location.href = '/login'
  }

  return (
    <div className='home-screen'></div>
  )
}

export default HomeScreen