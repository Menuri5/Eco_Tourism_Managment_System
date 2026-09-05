/**
 * HealthPage.jsx
 * Manager page for detailed system health monitoring
 */
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockUptimeData = [
  { time: '00:00', uptime: 100 }, { time: '04:00', uptime: 100 },
  { time: '08:00', uptime: 99.9 }, { time: '12:00', uptime: 99.9 },
  { time: '16:00', uptime: 100 }, { time: '20:00', uptime: 100 }
];

const HealthPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">System Health</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {['API Gateway', 'Database Cluster', 'Cache Layer', 'Auth Service', 'Storage'].map(service => (
          <div key={service} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">{service}</h3>
              <p className="text-sm text-gray-500">Resp: ~{Math.floor(Math.random() * 50) + 10}ms</p>
            </div>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
              Healthy
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">24h Uptime History</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockUptimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={['dataMin - 0.2', 100.1]} />
              <Tooltip />
              <Line type="stepAfter" dataKey="uptime" stroke="#15803D" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Error Logs</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">2023-10-25 14:15:00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Email Service</td>
              <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">High</span></td>
              <td className="px-6 py-4 text-sm text-gray-500">Connection timeout to SMTP server.</td>
            </tr>

            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">2023-10-24 09:12:05</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Auth Service</td>
              <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Low</span></td>
              <td className="px-6 py-4 text-sm text-gray-500">Rate limit exceeded for IP 192.168.1.5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HealthPage;
