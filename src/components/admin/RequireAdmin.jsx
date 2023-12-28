import React from 'react'
import { Navigate } from 'react-router-dom'

const RequireAdmin = ({ children }) => {

    const currentUser = localStorage.getItem("userId")
    const role = localStorage.getItem("userRole")

    const isAdmin = currentUser && role.includes("ROLE_ADMIN");

    return isAdmin ? children : <Navigate to="/" />        
}

export default RequireAdmin