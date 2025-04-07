import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const isAuthenticatedInitialState = sessionStorage.getItem("authorization_token")
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(isAuthenticatedInitialState)

  useEffect(() => {
    const token = sessionStorage.getItem("authorization_token")
    if (token) {
      setIsAuthenticatedState(true)
    }
  }, [])

  const logout = () => {
    sessionStorage.removeItem("authorization_token")
    setIsAuthenticatedState(false)
  }

  const login = (auth_token) => {
    sessionStorage.setItem("authorization_token", auth_token)
    setIsAuthenticatedState(true)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticatedState, logout, login }} >
      {children}
    </AuthContext.Provider>
  )
}