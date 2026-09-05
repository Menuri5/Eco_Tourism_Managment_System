/**
 * IntegrationsPage.jsx
 * Manager page for 3rd party integrations
 */
import React, { useState } from 'react';
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2';

const initialIntegrations = [
  { id: 1, name: 'Weather API', provider: 'OpenWeather', status: true, key: 'sk_live_...a8f2', lastSync: '10 mins ago', latency: '45ms' },
  { id: 2, name: 'Maps Service', provider: 'Google Maps', status: true, key: 'AIzaSy...9dLw', lastSync: '1 hour ago', latency: '120ms' },
  { id: 4, name: 'Email Service', provider: 'SendGrid', status: false, key: 'SG.abc...xyz', lastSync: '1 day ago', latency: '-' },
  { id: 5, name: 'Image CDN', provider: 'Cloudinary', status: true, key: 'cld_...441', lastSync: '2 mins ago', latency: '35ms' },
];

const IntegrationsPage = () => {
  const [integrations, setIntegrations] = useState(initialIntegrations);

  const toggleStatus = (id) => {
    setIntegrations(integrations.map(i => i.id === id ? { ...i, status: !i.status } : i));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Third-Party Integrations</h1>
        <button className="bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-6 py-2.5 font-medium transition-colors">
          Add Integration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map(integration => (
          <div key={integration.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{integration.name}</h3>
                <p className="text-sm text-gray-500">{integration.provider}</p>
              </div>
              <button 
                onClick={() => toggleStatus(integration.id)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${integration.status ? 'bg-eco-ocean' : 'bg-gray-200'}`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${integration.status ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">API Key</span>
                <span className="font-mono text-gray-800">{integration.key}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Sync</span>
                <span className="text-gray-800">{integration.lastSync}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Latency</span>
                <span className="text-gray-800">{integration.latency}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="flex items-center">
                  {integration.status ? (
                    <><HiOutlineCheckCircle className="w-4 h-4 text-green-500 mr-1"/> <span className="text-green-600 font-medium">Connected</span></>
                  ) : (
                    <><HiOutlineXCircle className="w-4 h-4 text-gray-400 mr-1"/> <span className="text-gray-500">Disabled</span></>
                  )}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Configure</button>
              <button className="px-4 py-2 text-sm font-medium text-eco-ocean bg-cyan-50 rounded-md hover:bg-cyan-100" disabled={!integration.status}>Test Connection</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsPage;
