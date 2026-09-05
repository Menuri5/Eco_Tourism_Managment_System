/**
 * VerifyEmailPage component for the EcoLanka project.
 * Prompts the user to enter a verification code sent to their email.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineEnvelopeOpen } from 'react-icons/hi2';

export default function VerifyEmailPage() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate verification
    navigate('/login', { state: { message: 'Email verified successfully! Please log in.' } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100 text-center">
          
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-cyan-50 mb-6">
            <HiOutlineEnvelopeOpen className="h-8 w-8 text-eco-ocean" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
          <p className="text-sm text-gray-600 mb-8">
            We've sent a 6-digit verification code to your email address. Enter the code below to verify your account.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-2 sm:gap-4 mb-8">
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

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-eco-ocean hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-ocean transition-colors"
            >
              Verify Email
            </button>
          </form>

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
