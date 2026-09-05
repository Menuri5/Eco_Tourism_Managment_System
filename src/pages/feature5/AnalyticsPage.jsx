
/**
 * AnalyticsPage.jsx
 * Admin page for detailed analytics
 */

// Import React
import React from 'react';

// Import chart components from Recharts
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Import analytics data
import analytics from '../../data/analytics';

// Import the StatCard component
import StatCard from '../../components/StatCard';

// Import chart icon
import { HiOutlineChartBar } from 'react-icons/hi2';


// Main Analytics Page component
const AnalyticsPage = () => {

  // Get the required analytics data from the analytics file
  const { 
    visitorTrends, 
    categoryPopularity, 
    touristOrigins, 
    dailyActiveUsers, 
    dashboardStats 
  } = analytics;

  // Return the Analytics page UI
  return (

    // Main page container
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page header with title and time period selection */}
      <div className="flex justify-between items-center mb-6">

        {/* Page title */}
        <h1 className="text-2xl font-bold text-gray-800">
          Analytics & Reports
        </h1>

        {/* Dropdown for selecting the analytics time period */}
        <select className="border border-gray-300 rounded-md p-2 bg-white">
          <option>Last 12 Months</option>
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>This Year</option>
        </select>

      </div>


      {/* Metric Cards
          These cards show important analytics values */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        {/* Shows the total number of visitors */}
        <StatCard 
          title="Total Visitors" 
          value="482.1K" 
          icon={
            <HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />
          } 
        />

        {/* Shows the average time users spend on the website */}
        <StatCard 
          title="Avg Session Time" 
          value="4m 32s" 
          icon={
            <HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />
          } 
        />

        {/* Shows the percentage of users who leave without further interaction */}
        <StatCard 
          title="Bounce Rate" 
          value="32.4%" 
          icon={
            <HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />
          } 
        />

        {/* Shows the percentage of visitors who complete a desired action */}
        <StatCard 
          title="Conversion Rate" 
          value="4.2%" 
          icon={
            <HiOutlineChartBar className="w-6 h-6 text-eco-ocean" />
          } 
        />

      </div>


      {/* Row 2
          Contains Visitor Trends and Revenue Trends charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">


        {/* Visitor Trends section */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          {/* Chart title */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Visitor Trends
          </h2>

          {/* Set the chart height */}
          <div className="h-80">

            {/* ResponsiveContainer makes the chart responsive */}
            <ResponsiveContainer width="100%" height="100%">

              {/* Line chart for showing visitor trends */}
              <LineChart data={visitorTrends}>

                {/* Add grid lines to the chart */}
                <CartesianGrid strokeDasharray="3 3" />

                {/* X axis shows the month */}
                <XAxis dataKey="month" />

                {/* Y axis shows the visitor count */}
                <YAxis />

                {/* Shows information when hovering over the chart */}
                <Tooltip />

                {/* Shows chart labels */}
                <Legend />

                {/* Line represents the number of visitors */}
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#0E7490" 
                  strokeWidth={2} 
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* Revenue Trends section */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          {/* Chart title */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Revenue Trends
          </h2>

          {/* Set the chart height */}
          <div className="h-80">

            {/* ResponsiveContainer makes the chart responsive */}
            <ResponsiveContainer width="100%" height="100%">

              {/* Area chart for showing revenue trends */}
              <AreaChart data={visitorTrends}>

                {/* Add grid lines to the chart */}
                <CartesianGrid strokeDasharray="3 3" />

                {/* X axis shows the month */}
                <XAxis dataKey="month" />

                {/* Y axis shows the revenue amount */}
                <YAxis />

                {/* Shows information when hovering over the chart */}
                <Tooltip />

                {/* Shows chart labels */}
                <Legend />

                {/* Area represents revenue data */}
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  fill="#06B6D4" 
                  stroke="#0E7490" 
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* Row 3
          Contains Category Popularity chart and Tourist Origins table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">


        {/* Category Popularity section */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          {/* Chart title */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Category Popularity
          </h2>

          {/* Set the chart height */}
          <div className="h-80">

            {/* ResponsiveContainer makes the chart responsive */}
            <ResponsiveContainer width="100%" height="100%">

              {/* Bar chart displays category popularity */}
              <BarChart data={categoryPopularity}>

                {/* Add grid lines to the chart */}
                <CartesianGrid strokeDasharray="3 3" />

                {/* X axis shows the category names */}
                <XAxis dataKey="category" />

                {/* Y axis shows the numbers */}
                <YAxis />

                {/* Shows information when hovering over the chart */}
                <Tooltip />

                {/* Shows chart labels */}
                <Legend />

                {/* Bar showing the number of views */}
                <Bar dataKey="views" fill="#15803D" />

                {/* Bar showing the number of bookings */}
                <Bar dataKey="bookings" fill="#22C55E" />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* Tourist Origins section */}
        <div className="bg-white p-6 rounded-xl shadow-md">

          {/* Table title */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Tourist Origins
          </h2>

          {/* Allows the table to scroll horizontally on small screens */}
          <div className="overflow-x-auto">

            {/* Table containing tourist country information */}
            <table className="min-w-full divide-y divide-gray-200">

              {/* Table header */}
              <thead>
                <tr>

                  {/* Country column */}
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Country
                  </th>

                  {/* Visitors column */}
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Visitors
                  </th>

                  {/* Percentage column */}
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    % of Total
                  </th>

                </tr>
              </thead>


              {/* Table body */}
              <tbody className="divide-y divide-gray-200">

                {/* Loop through all tourist origin data */}
                {touristOrigins.map((t, idx) => (

                  // Create one table row for each country
                  <tr key={idx}>

                    {/* Display country name */}
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {t.country}
                    </td>

                    {/* Display visitor count with comma formatting */}
                    <td className="px-4 py-3 text-sm text-right text-gray-500">
                      {t.visitors.toLocaleString()}
                    </td>

                    {/* Display percentage of total visitors */}
                    <td className="px-4 py-3 text-sm text-right text-gray-500">
                      {t.percentage}%
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>


      {/* Row 4
          Shows Daily Active Users for the last 7 days */}
      <div className="bg-white p-6 rounded-xl shadow-md">

        {/* Chart title */}
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Daily Active Users (Last 7 Days)
        </h2>

        {/* Set the chart height */}
        <div className="h-72">

          {/* ResponsiveContainer makes the chart responsive */}
          <ResponsiveContainer width="100%" height="100%">

            {/* Bar chart displays daily active users */}
            <BarChart data={dailyActiveUsers}>

              {/* Add grid lines to the chart */}
              <CartesianGrid strokeDasharray="3 3" />

              {/* X axis shows the days */}
              <XAxis dataKey="day" />

              {/* Y axis shows the number of users */}
              <YAxis />

              {/* Shows information when hovering over the chart */}
              <Tooltip />

              {/* Bar represents the number of active users */}
              <Bar dataKey="users" fill="#F59E0B" />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};


// Export the AnalyticsPage component
// so it can be used in other files
export default AnalyticsPage;
