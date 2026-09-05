
/**
 * ManagerAnalyticsPage.jsx
 * Manager page for viewing system usage analytics and API statistics.
 */

import React from 'react';

// Import chart components from Recharts.
// These components are used to display analytics data as charts.
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// Import analytics data from the local data file.
import analytics from '../../data/analytics';

// Import the reusable StatCard component.
import StatCard from '../../components/StatCard';

// Import the chart icon used inside the statistic cards.
import { HiOutlineChartBar } from 'react-icons/hi2';

// ManagerAnalyticsPage component.
// This page displays system usage and API statistics.
const ManagerAnalyticsPage = () => {

  // Get API call volume and daily active user data
  // from the analytics data.
  const { apiCallVolume, dailyActiveUsers } = analytics;

  return (

    // Main page container.
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Usage Analytics
      </h1>

      {/* Statistics cards section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        {/* Displays the total number of API calls */}
        <StatCard
          title="Total API Calls"
          value="1.2M"
          icon={<HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />}
        />

        {/* Displays the highest number of users connected at the same time */}
        <StatCard
          title="Peak Concurrent"
          value="1,452"
          icon={<HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />}
        />

        {/* Displays the average user session duration */}
        <StatCard
          title="Avg Session"
          value="12m 4s"
          icon={<HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />}
        />

        {/* Displays the total bandwidth used by the system */}
        <StatCard
          title="Bandwidth Used"
          value="458 GB"
          icon={<HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />}
        />

      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* API call volume chart card */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          {/* Chart title */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            API Call Volume (24h)
          </h2>

          {/* Chart container */}
          <div className="h-72">

            {/* Makes the chart responsive to the screen size */}
            <ResponsiveContainer width="100%" height="100%">

              {/* Line chart for API call volume */}
              <LineChart data={apiCallVolume}>

                {/* Adds grid lines to the chart */}
                <CartesianGrid strokeDasharray="3 3" />

                {/* Displays time values on the X-axis */}
                <XAxis dataKey="time" />

                {/* Displays the number of API calls on the Y-axis */}
                <YAxis />

                {/* Shows data values when hovering over the chart */}
                <Tooltip />

                {/* Displays the API call volume as a line */}
                <Line
                  type="monotone"
                  dataKey="calls"
                  stroke="#0E7490"
                  strokeWidth={2}
                  dot={false}
                />

              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily active users chart card */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          {/* Chart title */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Daily Active Users
          </h2>

          {/* Chart container */}
          <div className="h-72">

            {/* Makes the chart responsive to the screen size */}
            <ResponsiveContainer width="100%" height="100%">

              {/* Bar chart for daily active users */}
              <BarChart data={dailyActiveUsers}>

                {/* Adds grid lines to the chart */}
                <CartesianGrid strokeDasharray="3 3" />

                {/* Displays days on the X-axis */}
                <XAxis dataKey="day" />

                {/* Displays the number of users on the Y-axis */}
                <YAxis />

                {/* Shows data values when hovering over the chart */}
                <Tooltip />

                {/* Displays the number of users as bars */}
                <Bar
                  dataKey="users"
                  fill="#F59E0B"
                />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Top API endpoints section */}
      <div className="bg-white p-6 rounded-xl shadow-md">

        {/* Section title */}
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Top Endpoints
        </h2>

        {/* Table for displaying popular API endpoints */}
        <table className="min-w-full divide-y divide-gray-200">

          {/* Table header */}
          <thead>
            <tr>

              {/* API endpoint column */}
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Endpoint
              </th>

              {/* HTTP method column */}
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Method
              </th>

              {/* Number of API calls column */}
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Calls
              </th>

              {/* Average response time column */}
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Avg Latency
              </th>

            </tr>
          </thead>

          {/* Table body */}
          <tbody className="divide-y divide-gray-200">

            {/* First API endpoint record */}
            <tr>

              {/* API endpoint name */}
              <td className="px-4 py-3 font-mono text-sm">
                /api/destinations
              </td>

              {/* HTTP GET method */}
              <td className="px-4 py-3">
                <span className="text-xs font-bold text-blue-600">
                  GET
                </span>
              </td>

              {/* Number of calls made to the endpoint */}
              <td className="px-4 py-3 text-right text-sm text-gray-500">
                452,109
              </td>

              {/* Average response time */}
              <td className="px-4 py-3 text-right text-sm text-gray-500">
                45ms
              </td>

            </tr>

            {/* Second API endpoint record */}
            <tr>

              {/* API endpoint name */}
              <td className="px-4 py-3 font-mono text-sm">
                /api/auth/login
              </td>

              {/* HTTP POST method */}
              <td className="px-4 py-3">
                <span className="text-xs font-bold text-green-600">
                  POST
                </span>
              </td>

              {/* Number of calls made to the endpoint */}
              <td className="px-4 py-3 text-right text-sm text-gray-500">
                120,442
              </td>

              {/* Average response time */}
              <td className="px-4 py-3 text-right text-sm text-gray-500">
                120ms
              </td>

            </tr>

            {/* Third API endpoint record */}
            <tr>

              {/* API endpoint name */}
              <td className="px-4 py-3 font-mono text-sm">
                /api/reviews
              </td>

              {/* HTTP GET method */}
              <td className="px-4 py-3">
                <span className="text-xs font-bold text-blue-600">
                  GET
                </span>
              </td>

              {/* Number of calls made to the endpoint */}
              <td className="px-4 py-3 text-right text-sm text-gray-500">
                98,230
              </td>

              {/* Average response time */}
              <td className="px-4 py-3 text-right text-sm text-gray-500">
                35ms
              </td>

            </tr>

            {/* Fourth API endpoint record */}
            <tr>

              {/* API endpoint name */}
              <td className="px-4 py-3 font-mono text-sm">
                /api/bookings/create
              </td>

              {/* HTTP POST method */}
              <td className="px-4 py-3">
                <span className="text-xs font-bold text-green-600">
                  POST
                </span>
              </td>

              {/* Number of calls made to the endpoint */}
              <td className="px-4 py-3 text-right text-sm text-gray-500">
                12,400
              </td>

              {/* Average response time */}
              <td className="px-4 py-3 text-right text-sm text-gray-500">
                450ms
              </td>

            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

// Export the ManagerAnalyticsPage component.
// This allows the component to be imported and used in other files.
export default ManagerAnalyticsPage;
