/**
 * Tourist Sidebar component showing filters and alerts
 */
import React from 'react';
import WeatherAlert from './WeatherAlert';           // separate component, not shown yet, but used here
import ConservationAlert from './ConservationAlert';  // the one you shared earlier
import { HiFunnel } from 'react-icons/hi2';            // funnel/filter icon

export default function TouristSidebar() {
  return (
    // sticky top-24 = this sidebar stays visible while scrolling, positioned 24 units from top
    // h-fit = height shrinks to fit its content (doesn't stretch to fill parent)
    <div className="w-72 bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">
      
      {/* ---- SECTION 1: Filters ---- */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <HiFunnel className="text-eco-ocean h-5 w-5" />
          <h3 className="text-lg font-bold text-gray-800">Filters</h3>
        </div>
        
        <div className="space-y-4">
          
          {/* Category checkboxes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="space-y-2">
              {['Wildlife', 'Beaches', 'Mountains', 'Heritage'].map((cat) => (
                <label key={cat} className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-eco-ocean focus:ring-eco-ocean h-4 w-4" />
                  {/* ⚠️ no "checked" or "onChange" here — see note below */}
                  <span className="ml-2 text-sm text-gray-600">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Price range slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-eco-ocean" />
            {/* ⚠️ no "value" or "onChange" either — see note below */}
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Free</span>
              <span>Premium</span>
            </div>
          </div>
          
          {/* Rating dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-eco-ocean focus:outline-none focus:ring-eco-ocean sm:text-sm">
              <option>Any</option>
              <option>4+ Stars</option>
              <option>5 Stars</option>
            </select>
            {/* ⚠️ same story — no value/onChange */}
          </div>
        </div>
      </div>
      
      {/* ---- SECTION 2: Weather Alerts ---- */}
      <div className="mb-8 border-t pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Weather Alerts</h3>
        <div className="space-y-3">
          {/* Hardcoded weather data passed directly as props — not from an API */}
          <WeatherAlert location="Yala" temperature="32°C" condition="sunny" />
          <WeatherAlert location="Nuwara Eliya" temperature="16°C" condition="rainy" />
        </div>
      </div>
      
      {/* ---- SECTION 3: Conservation Alerts ---- */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Conservation Alerts</h3>
        <div className="space-y-3">
          {/* Reuses the ConservationAlert component you shared earlier */}
          <ConservationAlert severity="warning" message="High tide warning at Mirissa beach." />
          <ConservationAlert severity="info" message="Turtle nesting season started." />
        </div>
      </div>
    </div>
  );
}