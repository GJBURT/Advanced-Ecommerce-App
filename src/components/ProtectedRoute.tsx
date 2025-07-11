import React, { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type ProtectedRouteProps = {
    children: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Loading...</div>; // Optionally, you can show a loading spinner or message
    }

    return user ? (
        children
    ) : (
        <Navigate to="/login" replace />
    );

};

export default ProtectedRoute;