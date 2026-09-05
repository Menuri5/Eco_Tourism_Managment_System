/**
 * ExportPage.jsx
 * Admin page for exporting data
 */
import React, { useState } from 'react';

const ExportPage = () => {
  const [exportType, setExportType] = useState('destinations');
  const [format, setFormat] = useState('csv');

  const handleExport = (e) => {
    e.preventDefault();
    alert(`Export started: ${exportType} as ${format.toUpperCase()}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Export Data</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <form onSubmit={handleExport} className="bg-white p-6 rounded-xl shadow-md">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Data Type</label>
              <div className="space-y-2">
                {['Destinations', 'Users', 'Bookings', 'Reviews', 'Campaigns'].map((t) => (
                  <label key={t} className="flex items-center">
                    <input 
                      type="radio" 
                      name="dataType" 
                      value={t.toLowerCase()}
                      checked={exportType === t.toLowerCase()}
                      onChange={(e) => setExportType(e.target.value)}
                      className="h-4 w-4 text-eco-ocean focus:ring-eco-ocean border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <select 
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"
              >
                <option value="csv">CSV (Comma separated values)</option>
                <option value="json">JSON</option>
                <option value="excel">Excel (.xlsx)</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range (Optional)</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="date" className="border border-gray-300 rounded-md p-2 text-sm focus:ring-eco-ocean focus:border-eco-ocean" />
                <input type="date" className="border border-gray-300 rounded-md p-2 text-sm focus:ring-eco-ocean focus:border-eco-ocean" />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-4 py-2.5 font-medium transition-colors"
            >
              Start Export
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Preview</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 h-48 overflow-auto font-mono text-xs text-gray-600">
              {format === 'csv' && `id,name,category,rating\n1,"Yala National Park","National Park",4.8\n2,"Sigiriya","Heritage",4.9\n3,"Mirissa","Beach",4.7`}
              {format === 'json' && `[\n  {\n    "id": 1,\n    "name": "Yala National Park",\n    "category": "National Park",\n    "rating": 4.8\n  }\n]`}
              {format === 'excel' && `Excel preview not available in browser.`}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Export History</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">File</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">users_export_20231015.csv</td>
                  <td className="px-4 py-3 text-sm text-gray-500">Oct 15, 2023</td>
                  <td className="px-4 py-3 text-sm text-gray-500">1.2 MB</td>
                  <td className="px-4 py-3 text-right text-sm font-medium"><a href="#" className="text-eco-ocean hover:underline">Download</a></td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-900">bookings_q3.xlsx</td>
                  <td className="px-4 py-3 text-sm text-gray-500">Oct 01, 2023</td>
                  <td className="px-4 py-3 text-sm text-gray-500">4.5 MB</td>
                  <td className="px-4 py-3 text-right text-sm font-medium"><a href="#" className="text-eco-ocean hover:underline">Download</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPage;
