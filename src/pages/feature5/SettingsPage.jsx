/**
 * SettingsPage.jsx
 * Manager page for system settings
 */
import React, { useState } from 'react';

const SettingsPage = () => {
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h1>

      <div className="max-w-4xl space-y-6">
        {/* General */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">General</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
              <input type="text" defaultValue="EcoLanka" className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input type="email" defaultValue="support@ecolanka.lk" className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input type="text" defaultValue="Sustainable Tourism in Sri Lanka" className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean" />
            </div>
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Maintenance</h2>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium text-gray-800">Maintenance Mode</p>
              <p className="text-sm text-gray-500">Take site offline for visitors.</p>
            </div>
            <button 
              onClick={() => setMaintenance(!maintenance)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${maintenance ? 'bg-yellow-500' : 'bg-gray-200'}`}
            >
              <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${maintenance ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          {maintenance && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Message</label>
              <textarea rows="2" defaultValue="We are currently upgrading our systems. Please check back later." className="w-full border border-gray-300 rounded-md p-2 focus:ring-yellow-500"></textarea>
            </div>
          )}
        </div>

        {/* Security & API */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Security & API</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (mins)</label>
              <input type="number" defaultValue="30" className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Rate Limit (req/min)</label>
              <input type="number" defaultValue="1000" className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean" />
            </div>
          </div>
          <div className="pt-4 mt-2 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-1">Master API Key</label>
            <div className="flex space-x-2">
              <input type="password" value="************************" readOnly className="flex-1 bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-500" />
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Regenerate</button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-8 py-3 bg-eco-ocean hover:bg-cyan-800 text-white font-medium rounded-lg shadow-sm transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
