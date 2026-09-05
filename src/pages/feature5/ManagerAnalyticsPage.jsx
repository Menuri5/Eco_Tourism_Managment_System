/**
 * ManagerAnalyticsPage.jsx
 * Manager usage analytics and API stats
 */
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import analytics from '../../data/analytics';
import StatCard from '../../components/StatCard';
import { HiOutlineChartBar } from 'react-icons/hi2';

const ManagerAnalyticsPage = () => {
  const { apiCallVolume, dailyActiveUsers } = analytics;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Usage Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total API Calls" value="1.2M" icon={<HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />} />
        <StatCard title="Peak Concurrent" value="1,452" icon={<HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />} />
        <StatCard title="Avg Session" value="12m 4s" icon={<HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />} />
        <StatCard title="Bandwidth Used" value="458 GB" icon={<HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">API Call Volume (24h)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={apiCallVolume}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="calls" stroke="#0E7490" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Daily Active Users</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyActiveUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Top Endpoints</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Endpoint</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Calls</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Avg Latency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-3 font-mono text-sm">/api/destinations</td>
              <td className="px-4 py-3"><span className="text-xs font-bold text-blue-600">GET</span></td>
              <td className="px-4 py-3 text-right text-sm text-gray-500">452,109</td>
              <td className="px-4 py-3 text-right text-sm text-gray-500">45ms</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-sm">/api/auth/login</td>
              <td className="px-4 py-3"><span className="text-xs font-bold text-green-600">POST</span></td>
              <td className="px-4 py-3 text-right text-sm text-gray-500">120,442</td>
              <td className="px-4 py-3 text-right text-sm text-gray-500">120ms</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-sm">/api/reviews</td>
              <td className="px-4 py-3"><span className="text-xs font-bold text-blue-600">GET</span></td>
              <td className="px-4 py-3 text-right text-sm text-gray-500">98,230</td>
              <td className="px-4 py-3 text-right text-sm text-gray-500">35ms</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-sm">/api/bookings/create</td>
              <td className="px-4 py-3"><span className="text-xs font-bold text-green-600">POST</span></td>
              <td className="px-4 py-3 text-right text-sm text-gray-500">12,400</td>
              <td className="px-4 py-3 text-right text-sm text-gray-500">450ms</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerAnalyticsPage;
