
/**
 * HealthPage.jsx
 * Manager page for detailed system health monitoring.
 */

import React from 'react';

// Import chart components from Recharts.
// These components are used to display the uptime graph.
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Mock data used to display the system uptime for 24 hours.
// Each object contains a time and the uptime percentage.
const mockUptimeData = [
  { time: '00:00', uptime: 100 },
  { time: '04:00', uptime: 100 },
  { time: '08:00', uptime: 99.9 },
  { time: '12:00', uptime: 99.9 },
  { time: '16:00', uptime: 100 },
  { time: '20:00', uptime: 100 }
];

// HealthPage component.
// This page displays system health information.
const HealthPage = () => {
  return (
    // Main page container.
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        System Health
      </h1>

      {/* Service health cards section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Create a health card for each system service */}
        {['API Gateway', 'Database Cluster', 'Cache Layer', 'Auth Service', 'Storage'].map(service => (

          // Service health card.
          <div
            key={service}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
          >

            {/* Service information */}
            <div>

              {/* Displays the service name */}
              <h3 className="font-semibold text-gray-800">
                {service}
              </h3>

              {/* Displays the response time.
                  Math.random() is used to create a sample response time. */}
              <p className="text-sm text-gray-500">
                Resp: ~{Math.floor(Math.random() * 50) + 10}ms
              </p>

            </div>

            {/* Displays the current health status of the service */}
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Healthy
            </span>

          </div>
        ))}
      </div>

      {/* Uptime history section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">

        {/* Section title */}
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          24h Uptime History
        </h2>

        {/* Container for the uptime chart */}
        <div className="h-64">

          {/* Makes the chart responsive to screen size */}
          <ResponsiveContainer width="100%" height="100%">

            {/* Line chart using the uptime data */}
            <LineChart data={mockUptimeData}>

              {/* Adds background grid lines to the chart */}
              <CartesianGrid strokeDasharray="3 3" />

              {/* Displays time values on the X-axis */}
              <XAxis dataKey="time" />

              {/* Displays uptime percentage on the Y-axis */}
              <YAxis domain={['dataMin - 0.2', 100.1]} />

              {/* Shows data values when the user moves over the chart */}
              <Tooltip />

              {/* Displays the uptime line on the chart */}
              <Line
                type="stepAfter"
                dataKey="uptime"
                stroke="#15803D"
                strokeWidth={2}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent error logs section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        {/* Error log section header */}
        <div className="p-4 border-b border-gray-200">

          {/* Section title */}
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Error Logs
          </h2>

        </div>

        {/* Error logs table */}
        <table className="min-w-full divide-y divide-gray-200">

          {/* Table header */}
          <thead className="bg-gray-50">
            <tr>

              {/* Timestamp column */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Timestamp
              </th>

              {/* Service column */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Service
              </th>

              {/* Severity column */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Severity
              </th>

              {/* Error message column */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Message
              </th>

            </tr>
          </thead>

          {/* Table body */}
          <tbody className="bg-white divide-y divide-gray-200">

            {/* First error log */}
            <tr>

              {/* Error timestamp */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                2023-10-25 14:15:00
              </td>

              {/* Service that caused the error */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Email Service
              </td>

              {/* Error severity level */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  High
                </span>
              </td>

              {/* Error message */}
              <td className="px-6 py-4 text-sm text-gray-500">
                Connection timeout to SMTP server.
              </td>

            </tr>

            {/* Second error log */}
            <tr>

              {/* Error timestamp */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                2023-10-24 09:12:05
              </td>

              {/* Service that caused the error */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Auth Service
              </td>

              {/* Error severity level */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                  Low
                </span>
              </td>

              {/* Error message */}
              <td className="px-6 py-4 text-sm text-gray-500">
                Rate limit exceeded for IP 192.168.1.5
              </td>

            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
};

// Export the HealthPage component.
// This allows the component to be imported and used in other files.
export default HealthPage;
