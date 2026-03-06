import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../utils/auth';

// PrivateRoute: protects routes by checking login status and role
const PrivateRoute = ({ children, requiredRole }) => {
    const user = getUser();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // Redirect to appropriate dashboard if role doesn't match
        if (user.role === 'STUDENT') return <Navigate to="/student/dashboard" replace />;
        if (user.role === 'TEACHER') return <Navigate to="/teacher/dashboard" replace />;
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
