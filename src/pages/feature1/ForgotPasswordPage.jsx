/**
 * ForgotPasswordPage component for the EcoLanka project.
 * Allows users to request a password reset link.
 */
// React and the useState hook (used to store the email and whether the form was submitted)
import React, { useState } from 'react';
// Link is used for the "Back to login" link without reloading the page
import { Link } from 'react-router-dom';
// Key icon shown at the top of the card
import { HiOutlineKey } from 'react-icons/hi2';

// ForgotPasswordPage component - lets a user enter their email to get a reset link
export default function ForgotPasswordPage() {
  // Stores the email the user types
  const [email, setEmail] = useState('');
  // false = show the form, true = show the success message
  const [submitted, setSubmitted] = useState(false);

  // Runs when the "Send Reset Link" button is clicked
  const handleSubmit = (e) => {
    // Stop the page from reloading on form submit
    e.preventDefault();
    // Simulate API call
    // No email is actually sent - this only switches the page to the success message
    setSubmitted(true);
  };

  // Render the page. The outer div is a full-height light gray background with the card centered vertically
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Limits the card width and centers it horizontally */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* White card with rounded corners - all content inside is centered */}
        <div className="bg-white py-10 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100 text-center">
          
          {/* Round light-cyan circle holding the key icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-cyan-50 mb-6">
            <HiOutlineKey className="h-8 w-8 text-eco-ocean" />
          </div>
          
          {/* Card title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
          
          {/* Conditional rendering: show the form if not submitted yet, otherwise show the success message */}
          {!submitted ? (
            <>
              {/* Instructions text */}
              <p className="text-sm text-gray-600 mb-8">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              {/* Reset form - calls handleSubmit when submitted */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  {/* sr-only hides the label on screen but keeps it for screen readers (accessibility) */}
                  <label htmlFor="email" className="sr-only">Email address</label>
                  {/* Controlled email input: value comes from the email state and updates it on every key press */}
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

                {/* Submit button - submits the form and runs handleSubmit */}
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
              {/* Green success message that shows the email the user entered */}
              <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-6 border border-green-200">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.
              </div>
              {/* Sets submitted back to false so the form is shown again */}
              <button 
                onClick={() => setSubmitted(false)}
                className="text-sm font-medium text-eco-ocean hover:text-cyan-700"
              >
                Try a different email
              </button>
            </div>
          )}

          {/* Link back to the login page (always visible) */}
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