/**
 * ProtectedRoute component for handling authentication and roles
 */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// Navigate = redirects the user to a different route (like a programmatic <Link> that fires immediately)
// useLocation = gives info about the current URL the user was trying to visit
import { useAuth } from '../context/AuthContext'; // same auth hook used in Header.js

// Props:
// - children: the actual page/component this route is protecting (e.g. <AdminDashboard />)
// - requiredRole: optional — if set, only users with this exact role can access (e.g. 'admin', 'manager')
export default function ProtectedRoute({ children, requiredRole }) {
  
  // Pull auth info from context: current user, whether logged in, and whether we're still checking (loading)
  const { user, isAuthenticated, loading } = useAuth();
  
  // Current URL location — used to remember "where the user was trying to go" before redirecting
  const location = useLocation();

  // ---- CHECK 1: Still checking auth status? ----
  // (e.g. app just loaded, still verifying token/session with backend)
  // Show a spinner instead of flickering between "logged out" and "logged in" views
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-ocean"></div>
      </div>
    );
  }

  // ---- CHECK 2: Not logged in at all? ----
  if (!isAuthenticated) {
    // Figure out which login page to send them to — admin/manager routes need the admin login page,
    // regular routes need the normal user login page
    const isAdminRoute = requiredRole === 'admin' || requiredRole === 'manager';
    
    return (
      <Navigate 
        to={isAdminRoute ? "/admin/login" : "/login"} 
        state={{ from: location }} // remembers where they WERE trying to go
        // so after logging in, the app can redirect them back to that original page instead of always going to homepage
        replace // replaces current history entry instead of adding a new one
        // (so clicking "back" after redirect doesn't take them back to the protected page again, causing a redirect loop)
      />
    );
  }

  // ---- CHECK 3: Logged in, but WRONG role for this specific page? ----
  // e.g. a normal user trying to access an admin-only page
  if (requiredRole && user?.role !== requiredRole) {
    // Instead of showing an error, just redirect them to wherever THEY are allowed to go
    if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (user?.role === 'manager') return <Navigate to="/manager/dashboard" replace />;
    return <Navigate to="/dashboard" replace />; // normal user's own dashboard
  }

  // ---- All checks passed: user is logged in AND has the correct role (or no role was required) ----
  // Render the actual protected page
  return children;
}