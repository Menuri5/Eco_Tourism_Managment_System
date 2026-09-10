/**
 * VerifyEmailPage component for the EcoLanka project.
 * Prompts the user to enter a verification code sent to their email.
 */
// React and the useState hook (used to store the 6 code digits)
import React, { useState } from 'react';
// useNavigate lets us redirect the user to another page from code
import { useNavigate } from 'react-router-dom';
// Open envelope icon shown at the top of the card
import { HiOutlineEnvelopeOpen } from 'react-icons/hi2';

// VerifyEmailPage component - 6-box code entry screen shown after registering
export default function VerifyEmailPage() {
  // Array of 6 strings, one for each code box (all empty at the start)
  const [code, setCode] = useState(['', '', '', '', '', '']);
  // Function used to redirect to another page
  const navigate = useNavigate();

  // Runs when the user types in one of the code boxes
  const handleChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple chars
    // Make a copy of the code array (state should not be changed directly)
    const newCode = [...code];
    // Put the typed character into the box at this position
    newCode[index] = value;
    // Save the updated array to state
    setCode(newCode);
    
    // Auto focus next input
    // Only if something was typed and this is not the last box (index 5)
    if (value && index < 5) {
      // Find the next box by its id (for example code-1, code-2 ...)
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Runs when a key is pressed inside a code box
  const handleKeyDown = (index, e) => {
    // If Backspace is pressed in an empty box (and it is not the first box), move the cursor back to the previous box
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Runs when the Verify Email button is clicked (form submit)
  const handleSubmit = (e) => {
    // Stop the browser from reloading the page on form submit
    e.preventDefault();
    // Simulate verification
    // The code is not checked, so any 6 characters are accepted
    // Go to the login page and pass a success message in the navigation state
    navigate('/login', { state: { message: 'Email verified successfully! Please log in.' } });
  };

  // Render the page. The outer div is a full-height light gray background with the card centered vertically
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Limits the card width and centers it horizontally */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* White card with rounded corners - all content inside is centered */}
        <div className="bg-white py-10 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100 text-center">
          
          {/* Round light-cyan circle holding the envelope icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-cyan-50 mb-6">
            <HiOutlineEnvelopeOpen className="h-8 w-8 text-eco-ocean" />
          </div>
          
          {/* Card title and instructions */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
          <p className="text-sm text-gray-600 mb-8">
            We've sent a 6-digit verification code to your email address. Enter the code below to verify your account.
          </p>

          {/* Verification form - calls handleSubmit when submitted */}
          <form onSubmit={handleSubmit}>
            {/* Row of code boxes - smaller gap on mobile, bigger gap on small screens and up */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-8">
              {/* Create one input box for each item in the code array (6 boxes). Each box has a unique id like code-0 ... code-5 */}
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean focus:border-eco-ocean"
                  required
                />
              ))}
            </div>

            {/* Submit button - every box is required, so the form only submits when all 6 boxes are filled */}
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-eco-ocean hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-ocean transition-colors"
            >
              Verify Email
            </button>
          </form>

          {/* Resend code section - the button has no onClick, so it does not send a new code yet */}
          <div className="mt-6 text-sm text-gray-600">
            Didn't receive the code?{' '}
            <button className="font-medium text-eco-ocean hover:text-cyan-700">
              Resend code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}