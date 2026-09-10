/**
 * LoginPage component for the EcoLanka project.
 * Handles user authentication with form validation and mock social login options.
 */
// React and the useState hook (used to store form values, error message and loading status)
import React, { useState } from 'react';
// Link for page links without reloading, useNavigate to redirect the user from code
import { Link, useNavigate } from 'react-router-dom';
// useAuth gives access to the shared login function from AuthContext
import { useAuth } from '../../context/AuthContext';
// Logo image import (currently not used in the page - the text logo below is shown instead)
import logo from '../../assets/logo.svg';

// LoginPage component - sign-in form for tourists, admins and managers
export default function LoginPage() {
  // Stores what the user types in the email field
  const [email, setEmail] = useState('');
  // Stores what the user types in the password field
  const [password, setPassword] = useState('');
  // Error message to show when login fails (empty = no error)
  const [error, setError] = useState('');
  // true while signing in - used to disable the button and change its text
  const [loading, setLoading] = useState(false);
  // Get the login function from the auth context
  const { login } = useAuth();
  // Function used to redirect to another page
  const navigate = useNavigate();

  // Runs when the Sign in button is clicked (form submit)
  const handleSubmit = (e) => {
    // Stop the browser from reloading the page on form submit
    e.preventDefault();
    // Clear any old error message
    setError('');
    // Show the loading state on the button
    setLoading(true);

    // login() is synchronous and returns { success, error }
    const result = login(email, password);
    if (result.success) {
      // Route to role-appropriate dashboard
      // Read the logged-in user saved in the browser's localStorage and convert it from JSON text to an object
      const storedUser = JSON.parse(localStorage.getItem('ecolanka_user'));
      // Admins go to the admin dashboard (?. avoids an error if storedUser is null)
      if (storedUser?.role === 'admin') {
        navigate('/admin/dashboard');
      // Managers go to the manager dashboard
      } else if (storedUser?.role === 'manager') {
        navigate('/manager/dashboard');
      // Everyone else (tourists) goes to the normal user dashboard
      } else {
        navigate('/dashboard');
      }
    } else {
      // Login failed: show the error message and turn off the loading state
      setError(result.error || 'Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  // Render the page. The outer div is a full-height light gray background with the content centered vertically
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header section: logo, title and link to the register page */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-eco-ocean font-bold text-3xl items-center gap-2">
            {/* Fallback to text if logo image is missing */}
            <span className="bg-eco-ocean text-white p-2 rounded-lg">Eco</span>Lanka
        </div>
        {/* Page title */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        {/* Link for new users to create an account ({' '} adds a space before the link) */}
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/register" className="font-medium text-eco-ocean hover:text-cyan-700">
            create a new account
          </Link>
        </p>
      </div>

      {/* Login card container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {/* White card that holds the error message, form, social buttons and demo credentials */}
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          
          {/* Red error box - only shown when the error state is not empty */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Login form - calls handleSubmit when submitted */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                {/* Controlled input: value comes from the email state and updates it on every key press */}
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"
                />
              </div>
            </div>

            {/* Row with "Remember me" on the left and "Forgot password" on the right */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* Remember me checkbox (not connected to any state, so it does not change the login yet) */}
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-eco-ocean focus:ring-eco-ocean border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              {/* Link to the forgot password page */}
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-eco-ocean hover:text-cyan-700">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Submit button */}
            <div>
              {/* Disabled while loading so the user cannot click it twice; faded with disabled:opacity-70 */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-eco-ocean hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-ocean transition-colors disabled:opacity-70"
              >
                {/* Button text changes to "Signing in..." while loading */}
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          {/* Social login section */}
          <div className="mt-6">
            {/* Divider: a horizontal line with "Or continue with" text in the middle */}
            <div className="relative">
              {/* The gray line, placed behind the text */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              {/* The text sits on a white background so it covers the line behind it */}
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Two social login buttons side by side (mock buttons - they have no onClick, so they do nothing yet) */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {/* Google button */}
              <div>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  {/* Hidden text for screen readers (the button only shows an icon) */}
                  <span className="sr-only">Sign in with Google</span>
                  {/* Google "G" icon drawn with SVG */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                </button>
              </div>
              {/* Facebook button */}
              <div>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  {/* Hidden text for screen readers (the button only shows an icon) */}
                  <span className="sr-only">Sign in with Facebook</span>
                  {/* Facebook "f" icon drawn with SVG */}
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Demo credentials box - test accounts for each user role, visible to anyone who opens the page */}
          <div className="mt-8 bg-blue-50 p-4 rounded-md text-sm text-blue-800 border border-blue-100">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>Tourist: sarah@example.com / tourist123</p>
            <p>Admin: admin@ecolanka.lk / admin123</p>
            <p>Manager: manager@ecolanka.lk / manager123</p>
          </div>
        </div>
      </div>
    </div>
  );
}