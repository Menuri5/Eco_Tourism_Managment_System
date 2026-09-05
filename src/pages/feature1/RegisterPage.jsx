/**
 * RegisterPage component for the EcoLanka project.
 * Allows new users to create an account and specify travel preferences.
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });
  const [preferences, setPreferences] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePreferenceChange = (categoryId) => {
    setPreferences(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, API call would happen here
    // For now, redirect to verify email
    navigate('/verify-email');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-eco-ocean font-bold text-3xl items-center gap-2">
            <span className="bg-eco-ocean text-white p-2 rounded-lg">Eco</span>Lanka
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-eco-ocean hover:text-cyan-700">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Travel Preferences */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Preferences (Optional)
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {categories.slice(0, 6).map(cat => (
                        <div key={cat.id} className="flex items-center">
                            <input
                                id={`pref-${cat.id}`}
                                type="checkbox"
                                checked={preferences.includes(cat.id)}
                                onChange={() => handlePreferenceChange(cat.id)}
                                className="h-4 w-4 text-eco-ocean focus:ring-eco-ocean border-gray-300 rounded"
                            />
                            <label htmlFor={`pref-${cat.id}`} className="ml-2 block text-sm text-gray-700">
                                {cat.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center">
              <input
                id="agreed"
                name="agreed"
                type="checkbox"
                required
                checked={formData.agreed}
                onChange={handleChange}
                className="h-4 w-4 text-eco-ocean focus:ring-eco-ocean border-gray-300 rounded"
              />
              <label htmlFor="agreed" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="text-eco-ocean hover:underline">Terms & Conditions</a>
                {' '}and{' '}
                <a href="#" className="text-eco-ocean hover:underline">Privacy Policy</a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-eco-ocean hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-ocean transition-colors"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
