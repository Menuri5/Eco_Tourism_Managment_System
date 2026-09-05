
/**
 * ExportPage.jsx
 * Admin page used to export system data.
 */

import React, { useState } from 'react';

// ExportPage component
const ExportPage = () => {

  // Stores the selected data type for export.
  // Default value is "destinations".
  const [exportType, setExportType] = useState('destinations');

  // Stores the selected export format.
  // Default format is CSV.
  const [format, setFormat] = useState('csv');

  // This function runs when the export form is submitted.
  const handleExport = (e) => {

    // Prevents the page from refreshing when the form is submitted.
    e.preventDefault();

    // Shows an alert with the selected data type and format.
    alert(`Export started: ${exportType} as ${format.toUpperCase()}`);
  };

  // Returns the page interface.
  return (
    // Main page container.
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Export Data
      </h1>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left section contains the export form */}
        <div className="lg:col-span-1">

          {/* Export form */}
          <form
            onSubmit={handleExport}
            className="bg-white p-6 rounded-xl shadow-md"
          >

            {/* Data type selection section */}
            <div className="mb-6">

              {/* Data type label */}
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Data Type
              </label>

              {/* Radio button list */}
              <div className="space-y-2">

                {/* Creates a radio button for each data type */}
                {['Destinations', 'Users', 'Bookings', 'Reviews', 'Campaigns'].map((t) => (

                  // Each radio button has a unique key.
                  <label key={t} className="flex items-center">

                    {/* Radio button used to select the data type */}
                    <input
                      type="radio"
                      name="dataType"
                      value={t.toLowerCase()}
                      checked={exportType === t.toLowerCase()}

                      // Updates the selected data type.
                      onChange={(e) => setExportType(e.target.value)}

                      className="h-4 w-4 text-eco-ocean focus:ring-eco-ocean border-gray-300"
                    />

                    {/* Displays the name of the data type */}
                    <span className="ml-2 text-gray-700">
                      {t}
                    </span>

                  </label>
                ))}
              </div>
            </div>

            {/* Export format selection section */}
            <div className="mb-6">

              {/* Format label */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>

              {/* Dropdown for selecting the export format */}
              <select
                value={format}

                // Updates the selected format.
                onChange={(e) => setFormat(e.target.value)}

                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"
              >

                {/* CSV format option */}
                <option value="csv">
                  CSV (Comma separated values)
                </option>

                {/* JSON format option */}
                <option value="json">
                  JSON
                </option>

                {/* Excel format option */}
                <option value="excel">
                  Excel (.xlsx)
                </option>

              </select>
            </div>

            {/* Date range section */}
            <div className="mb-6">

              {/* Date range label */}
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Range (Optional)
              </label>

              {/* Contains start date and end date inputs */}
              <div className="grid grid-cols-2 gap-2">

                {/* Start date input */}
                <input
                  type="date"
                  className="border border-gray-300 rounded-md p-2 text-sm focus:ring-eco-ocean focus:border-eco-ocean"
                />

                {/* End date input */}
                <input
                  type="date"
                  className="border border-gray-300 rounded-md p-2 text-sm focus:ring-eco-ocean focus:border-eco-ocean"
                />

              </div>
            </div>

            {/* Button used to start the export */}
            <button
              type="submit"
              className="w-full bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-4 py-2.5 font-medium transition-colors"
            >
              Start Export
            </button>

          </form>
        </div>

        {/* Right section contains preview and export history */}
        <div className="lg:col-span-2 space-y-6">

          {/* Export preview section */}
          <div className="bg-white p-6 rounded-xl shadow-md">

            {/* Preview title */}
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Preview
            </h2>

            {/* Shows a preview of the selected export format */}
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 h-48 overflow-auto font-mono text-xs text-gray-600">

              {/* Displays CSV preview when CSV is selected */}
              {format === 'csv' &&
                `id,name,category,rating\n1,"Yala National Park","National Park",4.8\n2,"Sigiriya","Heritage",4.9\n3,"Mirissa","Beach",4.7`
              }

              {/* Displays JSON preview when JSON is selected */}
              {format === 'json' &&
                `[
  {
    "id": 1,
    "name": "Yala National Park",
    "category": "National Park",
    "rating": 4.8
  }
]`
              }

              {/* Shows a message when Excel format is selected */}
              {format === 'excel' &&
                `Excel preview not available in browser.`
              }

            </div>
          </div>

          {/* Export history section */}
          <div className="bg-white p-6 rounded-xl shadow-md">

            {/* Export history title */}
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Export History
            </h2>

            {/* Table used to display previous exports */}
            <table className="min-w-full divide-y divide-gray-200">

              {/* Table header */}
              <thead>
                <tr>

                  {/* File name column */}
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    File
                  </th>

                  {/* Export date column */}
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>

                  {/* File size column */}
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Size
                  </th>

                  {/* Action column */}
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>

                </tr>
              </thead>

              {/* Table body */}
              <tbody className="divide-y divide-gray-200">

                {/* First export history record */}
                <tr>

                  {/* File name */}
                  <td className="px-4 py-3 text-sm text-gray-900">
                    users_export_20231015.csv
                  </td>

                  {/* Export date */}
                  <td className="px-4 py-3 text-sm text-gray-500">
                    Oct 15, 2023
                  </td>

                  {/* File size */}
                  <td className="px-4 py-3 text-sm text-gray-500">
                    1.2 MB
                  </td>

                  {/* Download link */}
                  <td className="px-4 py-3 text-right text-sm font-medium">
                    <a
                      href="#"
                      className="text-eco-ocean hover:underline"
                    >
                      Download
                    </a>
                  </td>

                </tr>

                {/* Second export history record */}
                <tr>

                  {/* File name */}
                  <td className="px-4 py-3 text-sm text-gray-900">
                    bookings_q3.xlsx
                  </td>

                  {/* Export date */}
                  <td className="px-4 py-3 text-sm text-gray-500">
                    Oct 01, 2023
                  </td>

                  {/* File size */}
                  <td className="px-4 py-3 text-sm text-gray-500">
                    4.5 MB
                  </td>

                  {/* Download link */}
                  <td className="px-4 py-3 text-right text-sm font-medium">
                    <a
                      href="#"
                      className="text-eco-ocean hover:underline"
                    >
                      Download
                    </a>
                  </td>

                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

// Exports the ExportPage component so it can be used in other files.
export default ExportPage;
