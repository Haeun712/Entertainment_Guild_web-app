// src/ProtectedRoute.js
// A wrapper for <Route> that redirects to the home page if you're not authenticated
// Allow access based on user roles

import React from 'react';
import { useAuth } from './AuthProvider';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ roles, children }) => {
    const auth = useAuth();
    console.log("ProtectedRoute - current user:", auth.user);

    if (!auth.user) {
        // Not logged in/logged out so redirect to home page 
        return <Navigate to='/' replace />;
    }

    if (roles && !roles.includes(auth.user.role)) {
        // Role not authorised so redirect to home page
        return <Navigate to='/' replace />;
    }

    return children;
}

export default ProtectedRoute;

