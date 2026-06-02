import React from 'react'
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/tokenUtils';
import { getRole } from '../utils/roleUtils';

function ProtectedRoute({children , allowedRole}){
    const token = getToken();
    const role = getRole();

    console.log("Stored Role:", role);
    console.log("Allowed Role:", allowedRole);
    
    if (!token) return <Navigate to="/" />;
    if (role !== allowedRole) return <Navigate to="/" />;

    return children;
}

export default ProtectedRoute