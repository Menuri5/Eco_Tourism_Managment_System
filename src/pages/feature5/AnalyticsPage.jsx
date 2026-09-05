/**
 * AnalyticsPage.jsx
 * Admin page for detailed analytics
 */
import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import analytics from '../../data/analytics';
import StatCard from '../../components/StatCard';
import { HiOutlineChartBar } from 'react-icons/hi2';

const AnalyticsPage = () => {
  const { visitorTrends, categoryPopularity, touristOrigins, dailyActiveUsers, dashboardStats } = analytics;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
        <select className="border border-gray-300 rounded-md p-2 bg-white">
          <option>Last 12 Months</option>
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Visitors" value="482.1K" icon={<HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />} />
        <StatCard title="Avg Session Time" value="4m 32s" icon={<HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />} />
        <StatCard title="Bounce Rate" value="32.4%" icon={<HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />} />
        <StatCard title="Conversion Rate" value="4.2%" icon={<HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />} />
      </div>

      {/* Row 2: Line & Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Visitor Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visitors" stroke="#0E7490" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Revenue Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue" fill="#06B6D4" stroke="#0E7490" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Bar & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Category Popularity</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPopularity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#15803D" />
                <Bar dataKey="bookings" fill="#22C55E" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Tourist Origins</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Visitors</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">% of Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {touristOrigins.map((t, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-3 text-sm text-gray-900">{t.country}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-500">{t.visitors.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-500">{t.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 4: DAU */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Daily Active Users (Last 7 Days)</h2>
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
  );
};

export default AnalyticsPage;
