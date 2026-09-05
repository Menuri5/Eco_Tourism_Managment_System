/**
 * AdminDashboardPage.jsx
 * Admin dashboard with stats, charts and recent activity
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../../components/StatCard';
import analytics from '../../data/analytics';
import { HiOutlineUsers, HiOutlineMap, HiOutlineTicket, HiOutlineCurrencyDollar } from 'react-icons/hi2';

const AdminDashboardPage = () => {
  const { dashboardStats, visitorTrends, categoryPopularity } = analytics;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value="14,520" icon={<HiOutlineUsers className="w-6 h-6 text-eco-ocean" />} />
        <StatCard title="Active Destinations" value="48" icon={<HiOutlineMap className="w-6 h-6 text-eco-ocean" />} />
        <StatCard title="Total Bookings" value="4,520" icon={<HiOutlineTicket className="w-6 h-6 text-eco-ocean" />} />
        <StatCard title="Revenue" value="$283,500" icon={<HiOutlineCurrencyDollar className="w-6 h-6 text-eco-ocean" />} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Visitor Trends</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visitors" stroke="#0E7490" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Category Popularity</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPopularity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#15803D" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h2>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3 text-sm text-gray-600">
              <span className="w-2 h-2 mt-1.5 rounded-full bg-eco-forest"></span>
              <span>New booking #B-4092 created for Sigiriya Rock Fortress.</span>
            </li>
            <li className="flex items-start space-x-3 text-sm text-gray-600">
              <span className="w-2 h-2 mt-1.5 rounded-full bg-eco-ocean"></span>
              <span>New user registration: John Doe.</span>
            </li>
            <li className="flex items-start space-x-3 text-sm text-gray-600">
              <span className="w-2 h-2 mt-1.5 rounded-full bg-eco-sunset"></span>
              <span>New review pending moderation for Yala National Park.</span>
            </li>
            <li className="flex items-start space-x-3 text-sm text-gray-600">
              <span className="w-2 h-2 mt-1.5 rounded-full bg-gray-400"></span>
              <span>Campaign "Plant 10,000 Trees" reached 80% of goal.</span>
            </li>
            <li className="flex items-start space-x-3 text-sm text-gray-600">
              <span className="w-2 h-2 mt-1.5 rounded-full bg-red-500"></span>
              <span>System alert: High traffic spike detected.</span>
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Actions</h2>
          <div className="flex flex-col space-y-3">
            <Link to="/admin/manage-destinations/add" className="w-full text-center bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-6 py-2.5 font-medium transition-colors">
              Add Destination
            </Link>
            <Link to="/admin/moderation" className="w-full text-center border border-eco-ocean text-eco-ocean hover:bg-cyan-50 rounded-lg px-6 py-2.5 font-medium transition-colors">
              Moderate Reviews
            </Link>
            <Link to="/admin/export" className="w-full text-center border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-6 py-2.5 font-medium transition-colors">
              Export Data
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
