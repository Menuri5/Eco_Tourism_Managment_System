/**
 * RegisterPage component for the EcoLanka project.
 * Allows new users to create an account and specify travel preferences.
 */
// React and the useState hook (used to store the form values and selected preferences)
import React, { useState } from 'react';
// Link for page links without reloading, useNavigate to redirect the user from code
import { Link, useNavigate } from 'react-router-dom';
// Travel category list loaded from a local data file (used for the preference checkboxes)
import { categories } from '../../data/categories';

// RegisterPage component - sign-up form for new users
export default function RegisterPage() {
  // One state object that holds all the main form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });
  // Array of selected category ids (travel preferences), starts empty
  const [preferences, setPreferences] = useState([]);
  // Function used to redirect to another page
  const navigate = useNavigate();

  // One shared change handler for all inputs in formData
  const handleChange = (e) => {
    // Read the input's name, value, type and checked status from the event
    const { name, value, type, checked } = e.target;
    // Copy the old form data (...prev) and update only the field that changed
    // [name] uses the input's name attribute as the key; checkboxes use checked (true/false), other inputs use value
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Adds or removes a category from the preferences list when its checkbox is clicked
  const handlePreferenceChange = (categoryId) => {
    // If the id is already in the list, remove it (filter); otherwise add it to the end
    setPreferences(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Runs when the Create Account button is clicked (form submit)
  const handleSubmit = (e) => {
    // Stop the browser from reloading the page on form submit
    e.preventDefault();
    // In a real app, API call would happen here
    // For now, redirect to verify email
    // Note: the form data is not saved and password / confirm password are not compared yet
    navigate('/verify-email');
  };

  // Render the page. The outer div is a full-height light gray background with the content centered vertically
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header section: logo, title and link to the login page */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Text logo - "Eco" inside an ocean-colored box followed by "Lanka" */}
        <div className="flex justify-center text-eco-ocean font-bold text-3xl items-center gap-2">
            <span className="bg-eco-ocean text-white p-2 rounded-lg">Eco</span>Lanka
        </div>
        {/* Page title */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        {/* Link for existing users to go to the login page ({' '} adds a space before the link) */}
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-eco-ocean hover:text-cyan-700">
            Sign in
          </Link>
        </p>
      </div>

      {/* Form card container (slightly wider than the login card: max-w-lg) */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        {/* White card that holds the registration form */}
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          {/* Registration form - calls handleSubmit when submitted */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                {/* Controlled input: value comes from formData.fullName and updates through handleChange */}
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

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                {/* Controlled input: type="email" makes the browser check the email format before submitting */}
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

            {/* Password fields: stacked on mobile, side by side on small screens and up */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  {/* Controlled input: type="password" hides the characters */}
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

              {/* Confirm Password field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  {/* Controlled input for typing the password again */}
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
                {/* Checkbox grid with 2 columns */}
                <div className="grid grid-cols-2 gap-2">
                    {/* Show the first 6 categories, each with its own checkbox */}
                    {categories.slice(0, 6).map(cat => (
                        <div key={cat.id} className="flex items-center">
                            {/* Checked if this category id is in the preferences array; clicking toggles it */}
                            <input
                                id={`pref-${cat.id}`}
                                type="checkbox"
                                checked={preferences.includes(cat.id)}
                                onChange={() => handlePreferenceChange(cat.id)}
                                className="h-4 w-4 text-eco-ocean focus:ring-eco-ocean border-gray-300 rounded"
                            />
                            {/* Category name label - clicking it also toggles the checkbox (htmlFor matches the id) */}
                            <label htmlFor={`pref-${cat.id}`} className="ml-2 block text-sm text-gray-700">
                                {cat.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Terms and conditions agreement */}
            <div className="flex items-center">
              {/* Required checkbox - the form cannot be submitted until it is ticked */}
              <input
                id="agreed"
                name="agreed"
                type="checkbox"
                required
                checked={formData.agreed}
                onChange={handleChange}
                className="h-4 w-4 text-eco-ocean focus:ring-eco-ocean border-gray-300 rounded"
              />
              {/* Label with links to the terms and privacy policy (href="#" means they are placeholders) */}
              <label htmlFor="agreed" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="text-eco-ocean hover:underline">Terms & Conditions</a>
                {' '}and{' '}
                <a href="#" className="text-eco-ocean hover:underline">Privacy Policy</a>
              </label>
            </div>

            {/* Submit button */}
            <div>
              {/* type="submit" makes this button submit the form, which runs handleSubmit */}
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