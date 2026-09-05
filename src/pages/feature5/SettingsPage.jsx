

/**
 * SettingsPage.jsx
 * Manager page for system settings
 */

// Import React and useState hook
import React, { useState } from 'react';

// Create the Settings page component
const SettingsPage = () => {

  // Store the maintenance mode status
  const [maintenance, setMaintenance] = useState(false);

  return (
    // Main page container
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h1>

      {/* Main settings container */}
      <div className="max-w-4xl space-y-6">

        {/* General settings section */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          {/* General section title */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">General</h2>

          {/* General settings form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Site name field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
              <input type="text" defaultValue="EcoLanka" className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean" />
            </div>

            {/* Contact email field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input type="email" defaultValue="support@ecolanka.lk" className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean" />
            </div>

            {/* Website tagline field */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input type="text" defaultValue="Sustainable Tourism in Sri Lanka" className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean" />
            </div>
          </div>
        </div>

        {/* Maintenance settings section */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">

          {/* Maintenance section title */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Maintenance</h2>

          {/* Maintenance mode controls */}
          <div className="flex items-center justify-between mb-4">

            {/* Maintenance mode information */}
            <div>
              <p className="font-medium text-gray-800">Maintenance Mode</p>
              <p className="text-sm text-gray-500">Take site offline for visitors.</p>
            </div>

            {/* Maintenance mode toggle button */}
            <button 
              onClick={() => setMaintenance(!maintenance)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${maintenance ? 'bg-yellow-500' : 'bg-gray-200'}`}
            >

              {/* Toggle button circle */}
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${maintenance ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Show maintenance message field when maintenance mode is enabled */}
          {maintenance && (
            <div>

              {/* Maintenance message label */}
              <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Message</label>

              {/* Maintenance message input */}
              <textarea rows="2" defaultValue="We are currently upgrading our systems. Please check back later." className="w-full border border-gray-300 rounded-md p-2 focus:ring-yellow-500"></textarea>
            </div>
          )}
        </div>

        {/* Security and API settings section */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          {/* Security and API section title */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Security & API</h2>

          {/* Security and API input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

             {/* Session timeout field */}
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (mins)</label>
              <input type="number" defaultValue="30" className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean" />
            </div>

            {/* API rate limit field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Rate Limit (req/min)</label>
              <input type="number" defaultValue="1000" className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean" />
            </div>
          </div>

          {/* Master API key section */}
          <div className="pt-4 mt-2 border-t border-gray-100">

            {/* Master API key label */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Master API Key</label>

            {/* API key input and regenerate button */}
            <div className="flex space-x-2">

              {/* Display the hidden API key */}
              <input type="password" value="************************" readOnly className="flex-1 bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-500" />

              {/* Regenerate API key button */}
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Regenerate</button>
            </div>
          </div>
        </div>

        {/* Save settings button */}
        <div className="flex justify-end">
          <button className="px-8 py-3 bg-eco-ocean hover:bg-cyan-800 text-white font-medium rounded-lg shadow-sm transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Export the Settings page component
export default SettingsPage;
