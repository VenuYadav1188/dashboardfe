import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRole }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: '100vh', background: 'var(--bg)', color: 'var(--text-secondary)',
                fontSize: '16px', gap: '12px'
            }}>
                <div style={{
                    width: 24, height: 24, border: '3px solid var(--border)',
                    borderTopColor: 'var(--primary)', borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }} />
                Loading...
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (!user) return <Navigate to="/login" replace />;
    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to={`/${user.role}/dashboard`} replace />;
    }

    return children;
}
