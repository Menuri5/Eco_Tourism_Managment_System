
/**
 * ManagerDashboardPage.jsx
 * Manager dashboard with system metrics.
 */

import React from 'react';

// Import the reusable StatCard component.
import StatCard from '../../components/StatCard';

// Import analytics data used to display system information.
import analytics from '../../data/analytics';

// Import icons used for the dashboard statistic cards.
import {
  HiOutlineServer,
  HiOutlineClock,
  HiOutlineExclamationTriangle,
  HiOutlineWifi
} from 'react-icons/hi2';

// ManagerDashboardPage component.
// This page displays important system health and performance information.
const ManagerDashboardPage = () => {

  // Get system health information from the analytics data.
  const { systemHealth } = analytics;

  return (

    // Main dashboard container.
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Dashboard page title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        System Dashboard
      </h1>

      {/* Main system statistics section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {/* Displays the current system uptime */}
        <StatCard
          title="Uptime"
          value="99.97%"
          icon={<HiOutlineClock className="w-6 h-6 text-eco-forest" />}
        />

        {/* Displays the average system response time */}
        <StatCard
          title="Avg Response"
          value="145ms"
          icon={<HiOutlineServer className="w-6 h-6 text-eco-ocean" />}
        />

        {/* Displays the percentage of system errors */}
        <StatCard
          title="Error Rate"
          value="0.03%"
          icon={<HiOutlineExclamationTriangle className="w-6 h-6 text-eco-sunset" />}
        />

        {/* Displays the number of active connections */}
        <StatCard
          title="Active Conn"
          value="234"
          icon={<HiOutlineWifi className="w-6 h-6 text-eco-ocean" />}
        />

      </div>

      {/* Resource usage and service status section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* Resource usage card */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          {/* Resource usage title */}
          <h2 className="text-lg font-semibold mb-6 text-gray-800">
            Resource Usage
          </h2>

          {/* Contains all resource usage indicators */}
          <div className="space-y-6">

            {/* CPU usage section */}
            <div>

              {/* Displays CPU name and usage percentage */}
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  CPU
                </span>

                <span className="text-sm font-medium text-gray-700">
                  42%
                </span>
              </div>

              {/* Background of the CPU progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5">

                {/* Shows the current CPU usage */}
                <div
                  className="bg-eco-ocean h-2.5 rounded-full"
                  style={{ width: '42%' }}
                ></div>

              </div>
            </div>

            {/* Memory usage section */}
            <div>

              {/* Displays memory name and usage percentage */}
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Memory
                </span>

                <span className="text-sm font-medium text-gray-700">
                  68%
                </span>
              </div>

              {/* Background of the memory progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5">

                {/* Shows the current memory usage */}
                <div
                  className="bg-eco-sunset h-2.5 rounded-full"
                  style={{ width: '68%' }}
                ></div>

              </div>
            </div>

            {/* Disk space usage section */}
            <div>

              {/* Displays disk space name and usage percentage */}
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Disk Space
                </span>

                <span className="text-sm font-medium text-gray-700">
                  35%
                </span>
              </div>

              {/* Background of the disk space progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5">

                {/* Shows the current disk space usage */}
                <div
                  className="bg-eco-forest h-2.5 rounded-full"
                  style={{ width: '35%' }}
                ></div>

              </div>
            </div>

          </div>
        </div>

        {/* Services status card */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          {/* Services status title */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Services Status
          </h2>

          {/* List of system services */}
          <div className="space-y-4">

            {/* Display each service from the system health data */}
            {systemHealth.services && systemHealth.services.map((service, idx) => (

              // Individual service status row.
              <div
                key={idx}
                className="flex justify-between items-center p-3 border border-gray-100 rounded-lg bg-gray-50"
              >

                {/* Displays the service name */}
                <span className="font-medium text-gray-700">
                  {service.name}
                </span>

                <div className="flex items-center space-x-2">

                  {/* Displays the response time of the service */}
                  <span className="text-xs text-gray-500">
                    {service.responseTime}ms
                  </span>

                  {/* Shows a different color based on the service status */}
                  <span
                    className={`w-3 h-3 rounded-full ${
                      service.status === 'healthy'
                        ? 'bg-green-500'
                        : service.status === 'degraded'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  ></span>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent system events section */}
      <div className="bg-white p-6 rounded-xl shadow-md">

        {/* Section title */}
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Recent System Events
        </h2>

        {/* List of recent system events */}
        <ul className="space-y-3">

          {/* Database backup event */}
          <li className="flex items-start space-x-3 text-sm">
            <span className="font-mono text-gray-500 min-w-[140px]">
              2023-10-26 08:15:22
            </span>

            <span className="text-green-600 font-medium">
              [INFO]
            </span>

            <span className="text-gray-700">
              Database backup completed successfully (4.2GB).
            </span>
          </li>

          {/* High memory usage warning */}
          <li className="flex items-start space-x-3 text-sm">
            <span className="font-mono text-gray-500 min-w-[140px]">
              2023-10-26 07:30:00
            </span>

            <span className="text-yellow-600 font-medium">
              [WARN]
            </span>

            <span className="text-gray-700">
              High memory usage detected on worker node 2.
            </span>
          </li>

          {/* Payment gateway synchronization event */}
          <li className="flex items-start space-x-3 text-sm">
            <span className="font-mono text-gray-500 min-w-[140px]">
              2023-10-25 23:05:11
            </span>

            <span className="text-blue-600 font-medium">
              [SYNC]
            </span>

            <span className="text-gray-700">
              Payment gateway scheduled reconciliation.
            </span>
          </li>

          {/* User import event */}
          <li className="flex items-start space-x-3 text-sm">
            <span className="font-mono text-gray-500 min-w-[140px]">
              2023-10-25 18:42:09
            </span>

            <span className="text-green-600 font-medium">
              [INFO]
            </span>

            <span className="text-gray-700">
              User batch import (500 records) finished.
            </span>
          </li>

          {/* Email sending error event */}
          <li className="flex items-start space-x-3 text-sm">
            <span className="font-mono text-gray-500 min-w-[140px]">
              2023-10-25 14:15:00
            </span>

            <span className="text-red-600 font-medium">
              [ERROR]
            </span>

            <span className="text-gray-700">
              Failed to send 3 email notifications (Connection timeout).
            </span>
          </li>

        </ul>
      </div>
    </div>
  );
};

// Export the ManagerDashboardPage component.
// This allows the component to be imported and used in other files.
export default ManagerDashboardPage;
