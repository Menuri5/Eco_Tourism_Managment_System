/**
 * ProtectedRoute component for handling authentication and roles
 */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-ocean"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const isAdminRoute = requiredRole === 'admin' || requiredRole === 'manager';
    return <Navigate to={isAdminRoute ? "/admin/login" : "/login"} state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // If they have wrong role, send them to their respective dashboard
    if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user?.role === 'manager') return <Navigate to="/manager/dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
