import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';

function AuthController() {
    const [session] = useAuth();

    if(!session) {
        return <Navigate to="/login"/>;
    }

    return (
        <Outlet />
    )
}

export default AuthController