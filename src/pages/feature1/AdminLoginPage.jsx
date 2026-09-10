/**
 * AdminLoginPage.jsx
 * Admin portal login page with dark theme.
 * Validates credentials before navigating to admin dashboard.
 */
// React and the useState hook (used to store the form values and error message)
import React, { useState } from 'react';
// useNavigate lets us move the user to another page from code
import { useNavigate } from 'react-router-dom';
// useAuth gives access to the shared login function from AuthContext
import { useAuth } from '../../context/AuthContext';

// AdminLoginPage component - login form for admins and managers
const AdminLoginPage = () => {
  // Stores what the user types in the email field
  const [email, setEmail] = useState('');
  // Stores what the user types in the password field
  const [password, setPassword] = useState('');
  // Stores the error message to show when login fails (empty = no error)
  const [error, setError] = useState('');
  // Get the login function from the auth context
  const { login } = useAuth();
  // Function used to redirect to another page
  const navigate = useNavigate();

  // Runs when the Sign In button is clicked (form submit)
  const handleSubmit = (e) => {
    // Stop the browser from reloading the page on form submit
    e.preventDefault();
    // Clear any old error message before trying again
    setError('');

    // login() returns { success, error } — check before navigating
    const result = login(email, password);
    // If the email and password are correct, go to the admin dashboard
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      // Otherwise show the error from login(), or a default message if none was given
      setError(result.error || 'Invalid credentials. Please try again.');
    }
  };

  // Render the page. The outer div is a full-height dark background with the content centered vertically
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header section: logo, title and subtitle */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* EcoAdmin logo - "Eco" inside an ocean-colored box followed by "Admin" */}
        <div className="flex justify-center">
          <span className="text-3xl font-bold text-white">
            <span className="bg-eco-ocean text-white px-2 py-1 rounded-lg mr-1">Eco</span>Admin
          </span>
        </div>
        {/* Page title */}
        <h2 className="mt-6 text-center text-2xl font-bold text-white">
          Admin Portal
        </h2>
        {/* Subtitle under the title */}
        <p className="mt-2 text-center text-sm text-gray-400">
          Sign in to access the management dashboard
        </p>
      </div>

      {/* Login card container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Dark gray card that holds the error message, form and demo credentials */}
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Error message box - only shown when the error state is not empty */}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Login form - calls handleSubmit when submitted */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                {/* Controlled input: its value comes from the email state and updates it on every key press */}
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

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                {/* Controlled input: type="password" hides the characters, value is stored in the password state */}
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

            {/* Submit button */}
            <div>
              {/* type="submit" makes this button submit the form, which runs handleSubmit */}
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-eco-ocean hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-ocean transition-colors"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Demo credentials hint */}
          {/* Shows test accounts for the demo - these login details are visible to anyone who opens the page */}
          <div className="mt-6 bg-gray-700/50 p-4 rounded-md text-sm text-gray-300 border border-gray-600">
            <p className="font-semibold mb-2 text-gray-200">Demo Credentials:</p>
            {/* Admin test account */}
            <p>Admin: <code className="text-cyan-400">admin@ecolanka.lk</code> / <code className="text-cyan-400">admin123</code></p>
            {/* Manager test account */}
            <p>Manager: <code className="text-cyan-400">manager@ecolanka.lk</code> / <code className="text-cyan-400">manager123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component so it can be used in the routes
export default AdminLoginPage;
