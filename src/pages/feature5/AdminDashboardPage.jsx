
/** 
 * AdminDashboardPage.jsx 
 * Admin dashboard with stats, charts and recent activity 
 */

// Import React
import React from 'react';

// Link is used to navigate to other admin pages
import { Link } from 'react-router-dom';

// Import chart components from Recharts
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Import the StatCard component used to display dashboard statistics
import StatCard from '../../components/StatCard';

// Import analytics data used for the charts
import analytics from '../../data/analytics';

// Import icons used in the statistic cards
import { 
  HiOutlineUsers, 
  HiOutlineMap, 
  HiOutlineTicket, 
  HiOutlineCurrencyDollar 
} from 'react-icons/hi2';


// Main Admin Dashboard component
const AdminDashboardPage = () => {

  // Get the required data from the analytics data file
  const { dashboardStats, visitorTrends, categoryPopularity } = analytics; 

  // Return the dashboard UI
  return ( 

    // Main dashboard container
    <div className="p-6 bg-gray-50 min-h-screen"> 

      {/* Dashboard page title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Admin Dashboard
      </h1> 


      {/* Stat Cards
          These cards show important dashboard numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"> 

        {/* Shows the total number of users */}
        <StatCard 
          title="Total Users" 
          value="14,520" 
          icon={<HiOutlineUsers className="w-6 h-6 text-eco-ocean" />} 
        /> 

        {/* Shows the number of active destinations */}
        <StatCard 
          title="Active Destinations" 
          value="48" 
          icon={<HiOutlineMap className="w-6 h-6 text-eco-ocean" />} 
        /> 

        {/* Shows the total number of bookings */}
        <StatCard 
          title="Total Bookings" 
          value="4,520" 
          icon={<HiOutlineTicket className="w-6 h-6 text-eco-ocean" />} 
        /> 

        {/* Shows the total revenue */}
        <StatCard 
          title="Revenue" 
          value="$283,500" 
          icon={<HiOutlineCurrencyDollar className="w-6 h-6 text-eco-ocean" />} 
        /> 

      </div> 


      {/* Charts Row
          This section contains two charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"> 


        {/* Visitor Trends Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md"> 

          {/* Chart title */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Visitor Trends
          </h2> 

          {/* Set the height of the chart */}
          <div className="h-72"> 

            {/* ResponsiveContainer makes the chart responsive */}
            <ResponsiveContainer width="100%" height="100%"> 

              {/* Line chart displays visitor changes over time */}
              <LineChart data={visitorTrends}> 

                {/* Adds grid lines to the chart */}
                <CartesianGrid strokeDasharray="3 3" /> 

                {/* Shows months on the X axis */}
                <XAxis dataKey="month" /> 

                {/* Shows visitor numbers on the Y axis */}
                <YAxis /> 

                {/* Shows data when the user moves over the chart */}
                <Tooltip /> 

                {/* Shows the chart information */}
                <Legend /> 

                {/* Line used to display visitor data */}
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#0E7490" 
                  activeDot={{ r: 8 }} 
                /> 

              </LineChart> 

            </ResponsiveContainer> 

          </div> 

        </div> 


        {/* Category Popularity Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md"> 

          {/* Chart title */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Category Popularity
          </h2> 

          {/* Set the height of the chart */}
          <div className="h-72"> 

            {/* ResponsiveContainer makes the chart responsive */}
            <ResponsiveContainer width="100%" height="100%"> 

              {/* Bar chart displays category popularity */}
              <BarChart data={categoryPopularity}> 

                {/* Adds grid lines to the chart */}
                <CartesianGrid strokeDasharray="3 3" /> 

                {/* Shows categories on the X axis */}
                <XAxis dataKey="category" /> 

                {/* Shows view numbers on the Y axis */}
                <YAxis /> 

                {/* Shows data when the user moves over the chart */}
                <Tooltip /> 

                {/* Shows the chart information */}
                <Legend /> 

                {/* Bar used to display category views */}
                <Bar 
                  dataKey="views" 
                  fill="#15803D" 
                /> 

              </BarChart> 

            </ResponsiveContainer> 

          </div> 

        </div> 

      </div> 


      {/* Recent Activity and Quick Actions
          This section shows recent system activities
          and useful admin shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"> 


        {/* Recent Activity Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md"> 

          {/* Section title */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Recent Activity
          </h2> 

          {/* List of recent activities */}
          <ul className="space-y-4"> 


            {/* Activity 1 - New booking */}
            <li className="flex items-start space-x-3 text-sm text-gray-600"> 

              {/* Green dot used as activity indicator */}
              <span className="w-2 h-2 mt-1.5 rounded-full bg-eco-forest"></span> 

              {/* Activity message */}
              <span>
                New booking #B-4092 created for Sigiriya Rock Fortress.
              </span> 

            </li> 


            {/* Activity 2 - New user registration */}
            <li className="flex items-start space-x-3 text-sm text-gray-600"> 

              {/* Blue dot used as activity indicator */}
              <span className="w-2 h-2 mt-1.5 rounded-full bg-eco-ocean"></span> 

              {/* Activity message */}
              <span>
                New user registration: John Doe.
              </span> 

            </li> 


            {/* Activity 3 - New review */}
            <li className="flex items-start space-x-3 text-sm text-gray-600"> 

              {/* Orange dot used as activity indicator */}
              <span className="w-2 h-2 mt-1.5 rounded-full bg-eco-sunset"></span> 

              {/* Activity message */}
              <span>
                New review pending moderation for Yala National Park.
              </span> 

            </li> 


            {/* Activity 4 - Donation campaign */}
            <li className="flex items-start space-x-3 text-sm text-gray-600"> 

              {/* Gray dot used as activity indicator */}
              <span className="w-2 h-2 mt-1.5 rounded-full bg-gray-400"></span> 

              {/* Activity message */}
              <span>
                Campaign "Plant 10,000 Trees" reached 80% of goal.
              </span> 

            </li> 


            {/* Activity 5 - System alert */}
            <li className="flex items-start space-x-3 text-sm text-gray-600"> 

              {/* Red dot shows an important system alert */}
              <span className="w-2 h-2 mt-1.5 rounded-full bg-red-500"></span> 

              {/* Alert message */}
              <span>
                System alert: High traffic spike detected.
              </span> 

            </li> 

          </ul> 

        </div> 


        {/* Quick Actions Section */}
        <div className="bg-white p-6 rounded-xl shadow-md"> 

          {/* Section title */}
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Quick Actions
          </h2> 

          {/* Contains buttons for common admin actions */}
          <div className="flex flex-col space-y-3"> 


            {/* Button to add a new destination */}
            <Link 
              to="/admin/manage-destinations/add" 
              className="w-full text-center bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-6 py-2.5 font-medium transition-colors"
            > 
              Add Destination 
            </Link> 


            {/* Button to moderate reviews */}
            <Link 
              to="/admin/moderation" 
              className="w-full text-center border border-eco-ocean text-eco-ocean hover:bg-cyan-50 rounded-lg px-6 py-2.5 font-medium transition-colors"
            > 
              Moderate Reviews 
            </Link> 


            {/* Button to export dashboard data */}
            <Link 
              to="/admin/export" 
              className="w-full text-center border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-6 py-2.5 font-medium transition-colors"
            > 
              Export Data 
            </Link> 

          </div> 

        </div> 

      </div> 

    </div> 
  ); 
}; 


// Export the AdminDashboardPage component
// so it can be used in other files
export default AdminDashboardPage;
