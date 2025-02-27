import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const { isAuthenticatedState } = useContext(AuthContext)
    return (
        isAuthenticatedState
            ? <Outlet />
            : <Navigate to={'/login'} />
    )
}

export default ProtectedRoute