
/**
 * EnvironmentalDataPage - Displays environmental impact data for destinations.
 */

// Import React
import React from 'react';

// Import destination data
import { destinations } from '../../data/destinations';

// Import chart components from Recharts
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';


// Environmental Data Page component
export default function EnvironmentalDataPage() {

  // Get only destinations that have environmental data
  const dataWithEnv = destinations.filter(d => d.environmentalData);
  
  // Calculate the average Air Quality Index (AQI)
  // Math.round() is used to get a whole number
  const avgAQI = Math.round(
    dataWithEnv.reduce(
      (acc, curr) => acc + curr.environmentalData.airQuality, 
      0
    ) / dataWithEnv.length
  );

  // Calculate the average biodiversity index
  // toFixed(1) keeps one decimal place
  const avgBio = (
    dataWithEnv.reduce(
      (acc, curr) => acc + curr.environmentalData.biodiversityIndex, 
      0
    ) / dataWithEnv.length
  ).toFixed(1);


  // Create data for the biodiversity chart
  const chartData = dataWithEnv.map(d => ({
    // Destination name is used on the X axis
    name: d.name,

    // Biodiversity score is used in the chart
    Biodiversity: d.environmentalData.biodiversityIndex
  }));


  // Function to select a color based on the AQI value
  const getAQIColor = (aqi) => {

    // Green means good air quality
    if (aqi <= 50) return 'text-green-600 bg-green-50';

    // Amber means moderate air quality
    if (aqi <= 100) return 'text-amber-600 bg-amber-50';

    // Red means poor air quality
    return 'text-red-600 bg-red-50';
  };


  // Return the Environmental Data page UI
  return (

    // Main page container
    <div className="p-6 max-w-7xl mx-auto space-y-8">


      {/* Page heading and description */}
      <div>

        {/* Main page title */}
        <h1 className="text-3xl font-bold text-gray-800">
          Environmental Impact Data
        </h1>

        {/* Short description about environmental data */}
        <p className="text-gray-600 mt-2">
          Transparent tracking of our eco-destinations' environmental health.
        </p>

      </div>


      {/* Summary cards
          These cards show important environmental statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


        {/* Average Air Quality card */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">

          {/* Card title */}
          <p className="text-gray-500 text-sm mb-2">
            Average Air Quality Index
          </p>

          {/* Display average AQI value */}
          <p className="text-4xl font-bold text-eco-forest">
            {avgAQI}
          </p>

          {/* AQI explanation */}
          <p className="text-xs text-gray-400 mt-2">
            Lower is better
          </p>

        </div>


        {/* Average Biodiversity Score card */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">

          {/* Card title */}
          <p className="text-gray-500 text-sm mb-2">
            Avg Biodiversity Score
          </p>

          {/* Display biodiversity score */}
          <p className="text-4xl font-bold text-cyan-600">
            {avgBio}
            
            {/* Display maximum score */}
            <span className="text-xl text-gray-400">
              /10
            </span>

          </p>

          {/* Biodiversity explanation */}
          <p className="text-xs text-gray-400 mt-2">
            Higher is better
          </p>

        </div>


        {/* Protected Areas card */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center">

          {/* Card title */}
          <p className="text-gray-500 text-sm mb-2">
            Protected Areas Tracked
          </p>

          {/* Display number of destinations with environmental data */}
          <p className="text-4xl font-bold text-gray-800">
            {dataWithEnv.length}
          </p>

        </div>

      </div>


      {/* Biodiversity chart section */}
      <div className="bg-white rounded-xl shadow-md p-6">

        {/* Chart title */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Biodiversity Index by Destination
        </h2>

        {/* Set the height of the chart */}
        <div className="h-80">

          {/* ResponsiveContainer makes the chart responsive */}
          <ResponsiveContainer width="100%" height="100%">

            {/* Bar chart displays biodiversity scores */}
            <BarChart 
              data={chartData} 
              margin={{ 
                top: 20, 
                right: 30, 
                left: 0, 
                bottom: 50 
              }}
            >

              {/* Add horizontal grid lines */}
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
              />

              {/* X axis displays destination names */}
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80} 
                interval={0} 
                tick={{fontSize: 12}} 
              />

              {/* Y axis displays biodiversity score
                  The score is between 0 and 10 */}
              <YAxis domain={[0, 10]} />

              {/* Shows information when hovering over a bar */}
              <Tooltip 
                cursor={{fill: 'rgba(0,0,0,0.05)'}} 
              />

              {/* Bars display biodiversity scores */}
              <Bar 
                dataKey="Biodiversity" 
                fill="#15803D" 
                radius={[4, 4, 0, 0]} 
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* Detailed environmental metrics section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        {/* Table title */}
        <h2 className="text-xl font-bold text-gray-800 p-6 border-b border-gray-100">
          Detailed Metrics
        </h2>

        {/* Makes the table scrollable on small screens */}
        <div className="overflow-x-auto">

          {/* Environmental data table */}
          <table className="w-full text-left border-collapse">


            {/* Table header */}
            <thead>

              <tr className="bg-gray-50 text-gray-600 text-sm">

                {/* Destination column */}
                <th className="p-4 font-medium">
                  Destination
                </th>

                {/* Air quality column */}
                <th className="p-4 font-medium">
                  Air Quality (AQI)
                </th>

                {/* Biodiversity column */}
                <th className="p-4 font-medium">
                  Biodiversity Index
                </th>

                {/* Conservation status column */}
                <th className="p-4 font-medium">
                  Conservation Status
                </th>

                {/* Carbon footprint column */}
                <th className="p-4 font-medium">
                  Carbon Footprint
                </th>

              </tr>

            </thead>


            {/* Table body */}
            <tbody className="divide-y divide-gray-100">

              {/* Loop through all destinations with environmental data */}
              {dataWithEnv.map(dest => (

                // Create a row for each destination
                <tr 
                  key={dest.id} 
                  className="hover:bg-gray-50"
                >

                  {/* Display destination name */}
                  <td className="p-4 font-medium text-gray-800">
                    {dest.name}
                  </td>


                  {/* Display Air Quality Index */}
                  <td className="p-4">

                    {/* Apply a color based on the AQI value */}
                    <span 
                      className={`px-2 py-1 rounded text-xs font-bold ${getAQIColor(
                        dest.environmentalData.airQuality
                      )}`}
                    >
                      {dest.environmentalData.airQuality}
                    </span>

                  </td>


                  {/* Display biodiversity index */}
                  <td className="p-4 text-gray-600">
                    {dest.environmentalData.biodiversityIndex}/10
                  </td>


                  {/* Display conservation status */}
                  <td className="p-4 text-gray-600">
                    {dest.environmentalData.conservationStatus}
                  </td>


                  {/* Display carbon footprint */}
                  <td className="p-4 text-gray-600">
                    {dest.environmentalData.carbonFootprint} kg/visitor
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}