/**
 * ForgotPasswordPage component for the EcoLanka project.
 * Allows users to request a password reset link.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineKey } from 'react-icons/hi2';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100 text-center">
          
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-cyan-50 mb-6">
            <HiOutlineKey className="h-8 w-8 text-eco-ocean" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
          
          {!submitted ? (
            <>
              <p className="text-sm text-gray-600 mb-8">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-eco-ocean hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-ocean transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div className="mb-6">
              <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6 border border-green-200">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-sm font-medium text-eco-ocean hover:text-cyan-700"
              >
                Try a different email
              </button>
            </div>
          )}

          <div className="mt-8 text-sm">
            <Link to="/login" className="font-medium text-gray-600 hover:text-gray-900 flex items-center justify-center gap-1">
              &larr; Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
