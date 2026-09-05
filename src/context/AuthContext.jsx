import { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../data/users';

/**
 * Authentication Context
 * Provides user state, login/logout functions, and role-based access.
 * Uses localStorage for session persistence across page reloads.
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('ecolanka_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('ecolanka_user');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Authenticate a user by email and password.
   * @param {string} email
   * @param {string} password
   * @returns {{ success: boolean, error?: string }}
   */
  const login = (email, password) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      const userData = { ...found };
      delete userData.password; // Don't store password in state
      setUser(userData);
      localStorage.setItem('ecolanka_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  /** Log the current user out and clear session. */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecolanka_user');
  };

  /** Check if the current user has a specific role. */
  const hasRole = (role) => user?.role === role;

  /** Check if any user is authenticated. */
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, login, logout, hasRole, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context.
 * @returns {{ user, login, logout, hasRole, isAuthenticated, loading }}
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
