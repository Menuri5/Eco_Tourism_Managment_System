
/**
 * IntegrationsPage.jsx
 * Manager page for managing third-party integrations.
 */

import React, { useState } from 'react';

// Import icons for showing connected and disabled statuses.
import { HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi2';

// Initial integration data.
// This data contains details about the external services.
const initialIntegrations = [
  {
    id: 1,
    name: 'Weather API',
    provider: 'OpenWeather',
    status: true,
    key: 'sk_live_...a8f2',
    lastSync: '10 mins ago',
    latency: '45ms'
  },
  {
    id: 2,
    name: 'Maps Service',
    provider: 'Google Maps',
    status: true,
    key: 'AIzaSy...9dLw',
    lastSync: '1 hour ago',
    latency: '120ms'
  },
  {
    id: 4,
    name: 'Email Service',
    provider: 'SendGrid',
    status: false,
    key: 'SG.abc...xyz',
    lastSync: '1 day ago',
    latency: '-'
  },
  {
    id: 5,
    name: 'Image CDN',
    provider: 'Cloudinary',
    status: true,
    key: 'cld_...441',
    lastSync: '2 mins ago',
    latency: '35ms'
  },
];

// IntegrationsPage component.
// This page displays and manages third-party services.
const IntegrationsPage = () => {

  // Stores the list of integrations.
  // The initial data is loaded from initialIntegrations.
  const [integrations, setIntegrations] = useState(initialIntegrations);

  // Changes the enabled or disabled status of an integration.
  const toggleStatus = (id) => {

    // Creates a new integration list.
    // Only the selected integration status is changed.
    setIntegrations(
      integrations.map(i =>
        i.id === id
          ? { ...i, status: !i.status }
          : i
      )
    );
  };

  return (

    // Main page container.
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page header with title and Add Integration button */}
      <div className="flex justify-between items-center mb-6">

        {/* Page title */}
        <h1 className="text-2xl font-bold text-gray-800">
          Third-Party Integrations
        </h1>

        {/* Button used to add a new integration */}
        <button className="bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-6 py-2.5 font-medium transition-colors">
          Add Integration
        </button>

      </div>

      {/* Integration cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Creates one card for each integration */}
        {integrations.map(integration => (

          // Integration card.
          <div
            key={integration.id}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >

            {/* Integration name and status toggle section */}
            <div className="flex justify-between items-start mb-4">

              {/* Integration information */}
              <div>

                {/* Displays the integration name */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {integration.name}
                </h3>

                {/* Displays the service provider */}
                <p className="text-sm text-gray-500">
                  {integration.provider}
                </p>

              </div>

              {/* Button used to enable or disable the integration */}
              <button
                onClick={() => toggleStatus(integration.id)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  integration.status ? 'bg-eco-ocean' : 'bg-gray-200'
                }`}
              >

                {/* Small circle inside the toggle button */}
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    integration.status ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />

              </button>
            </div>

            {/* Integration details section */}
            <div className="space-y-3 mb-6">

              {/* API key information */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  API Key
                </span>

                <span className="font-mono text-gray-800">
                  {integration.key}
                </span>
              </div>

              {/* Last synchronization information */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Last Sync
                </span>

                <span className="text-gray-800">
                  {integration.lastSync}
                </span>
              </div>

              {/* API response time information */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Latency
                </span>

                <span className="text-gray-800">
                  {integration.latency}
                </span>
              </div>

              {/* Current integration status */}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Status
                </span>

                <span className="flex items-center">

                  {/* Shows Connected when the integration is enabled */}
                  {integration.status ? (

                    <>
                      {/* Green check icon shows that the service is connected */}
                      <HiOutlineCheckCircle className="w-4 h-4 text-green-500 mr-1"/>

                      {/* Connected status text */}
                      <span className="text-green-600 font-medium">
                        Connected
                      </span>
                    </>

                  ) : (

                    <>
                      {/* Gray X icon shows that the service is disabled */}
                      <HiOutlineXCircle className="w-4 h-4 text-gray-400 mr-1"/>

                      {/* Disabled status text */}
                      <span className="text-gray-500">
                        Disabled
                      </span>
                    </>

                  )}

                </span>
              </div>

            </div>

            {/* Action buttons section */}
            <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">

              {/* Button used to configure the integration */}
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Configure
              </button>

              {/* Button used to test the integration connection.
                  This button is disabled when the integration is inactive. */}
              <button
                className="px-4 py-2 text-sm font-medium text-eco-ocean bg-cyan-50 rounded-md hover:bg-cyan-100"
                disabled={!integration.status}
              >
                Test Connection
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

// Export the IntegrationsPage component.
// This allows it to be used in other files.
export default IntegrationsPage;
