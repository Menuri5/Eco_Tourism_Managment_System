/**
 * AdminLoginPage.jsx
 * Admin portal login page with dark theme.
 * Validates credentials before navigating to admin dashboard.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // login() returns { success, error } — check before navigating
    const result = login(email, password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <span className="text-3xl font-bold text-white">
            <span className="bg-eco-ocean text-white px-2 py-1 rounded-lg mr-1">Eco</span>Admin
          </span>
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold text-white">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Sign in to access the management dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md mb-6 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm bg-gray-700 text-white"
                  placeholder="admin@ecolanka.lk"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm bg-gray-700 text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-eco-ocean hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-ocean transition-colors"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Demo credentials hint */}
          <div className="mt-6 bg-gray-700/50 p-4 rounded-md text-sm text-gray-300 border border-gray-600">
            <p className="font-semibold mb-2 text-gray-200">Demo Credentials:</p>
            <p>Admin: <code className="text-cyan-400">admin@ecolanka.lk</code> / <code className="text-cyan-400">admin123</code></p>
            <p>Manager: <code className="text-cyan-400">manager@ecolanka.lk</code> / <code className="text-cyan-400">manager123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
