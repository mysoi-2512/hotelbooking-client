import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const RequireLogin = ({ children }) => {

    const currentUser = localStorage.getItem("userId")
    const location = useLocation()

    if(!currentUser) {
        return <Navigate to="/login" state={{ path: location.pathname }}  />
    }

    return children
}

export default RequireLogin