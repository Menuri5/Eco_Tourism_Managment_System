/**
 * EnvironmentalDataPage - Displays environmental impact data for destinations.
 */
import React from 'react';
import { destinations } from '../../data/destinations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EnvironmentalDataPage() {
  const dataWithEnv = destinations.filter(d => d.environmentalData);
  
  const avgAQI = Math.round(dataWithEnv.reduce((acc, curr) => acc + curr.environmentalData.airQuality, 0) / dataWithEnv.length);
  const avgBio = (dataWithEnv.reduce((acc, curr) => acc + curr.environmentalData.biodiversityIndex, 0) / dataWithEnv.length).toFixed(1);

  const chartData = dataWithEnv.map(d => ({
    name: d.name,
    Biodiversity: d.environmentalData.biodiversityIndex
  }));

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'text-green-600 bg-green-50';
    if (aqi <= 100) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Environmental Impact Data</h1>
        <p className="text-gray-600 mt-2">Transparent tracking of our eco-destinations' environmental health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <p className="text-gray-500 text-sm mb-2">Average Air Quality Index</p>
          <p className="text-4xl font-bold text-eco-forest">{avgAQI}</p>
          <p className="text-xs text-gray-400 mt-2">Lower is better</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <p className="text-gray-500 text-sm mb-2">Avg Biodiversity Score</p>
          <p className="text-4xl font-bold text-cyan-600">{avgBio}<span className="text-xl text-gray-400">/10</span></p>
          <p className="text-xs text-gray-400 mt-2">Higher is better</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <p className="text-gray-500 text-sm mb-2">Protected Areas Tracked</p>
          <p className="text-4xl font-bold text-gray-800">{dataWithEnv.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Biodiversity Index by Destination</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} tick={{fontSize: 12}} />
              <YAxis domain={[0, 10]} />
              <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
              <Bar dataKey="Biodiversity" fill="#15803D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <h2 className="text-xl font-bold text-gray-800 p-6 border-b border-gray-100">Detailed Metrics</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="p-4 font-medium">Destination</th>
                <th className="p-4 font-medium">Air Quality (AQI)</th>
                <th className="p-4 font-medium">Biodiversity Index</th>
                <th className="p-4 font-medium">Conservation Status</th>
                <th className="p-4 font-medium">Carbon Footprint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataWithEnv.map(dest => (
                <tr key={dest.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{dest.name}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getAQIColor(dest.environmentalData.airQuality)}`}>
                      {dest.environmentalData.airQuality}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{dest.environmentalData.biodiversityIndex}/10</td>
                  <td className="p-4 text-gray-600">{dest.environmentalData.conservationStatus}</td>
                  <td className="p-4 text-gray-600">{dest.environmentalData.carbonFootprint} kg/visitor</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
