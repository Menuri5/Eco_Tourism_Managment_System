/**
 * Weather Alert component
 */
import React from 'react';
import { HiSun, HiCloud } from 'react-icons/hi2'; // sun icon, cloud icon (used for both rainy AND cloudy — no rain-specific icon here)

// Props:
// - location: place name (e.g. "Yala")
// - temperature: display string (e.g. "32°C")
// - condition: 'sunny' | 'rainy' | 'cloudy' — defaults to 'sunny'
// - icon: OPTIONAL custom icon override, if you want to pass your own instead of the built-in ones
export default function WeatherAlert({ location, temperature, condition = 'sunny', icon }) {
  
  // Picks background/text/border color classes based on weather condition
  const getConditionStyles = () => {
    switch(condition.toLowerCase()) { // .toLowerCase() so "Sunny", "SUNNY", "sunny" all match the same case
      case 'sunny': return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'rainy': return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'cloudy': return 'bg-gray-50 text-gray-900 border-gray-200';
      default: return 'bg-white text-gray-900 border-gray-200'; // fallback for unknown condition strings
    }
  };

  // A small inner "component" that decides which icon to show
  const IconComponent = () => {
    // If a custom icon was passed as a prop, use it instead of the built-in ones
    if (icon) return icon;
    
    switch(condition.toLowerCase()) {
      case 'sunny': return <HiSun className="h-8 w-8 text-amber-500" />;
      case 'rainy': return <HiCloud className="h-8 w-8 text-blue-500" />;  // note: reuses the CLOUD icon for rain too (no dedicated rain icon used)
      case 'cloudy': return <HiCloud className="h-8 w-8 text-gray-500" />;
      default: return <HiSun className="h-8 w-8 text-amber-500" />;
    }
  };

  return (
    // Outer box color changes based on condition (amber for sunny, blue for rainy, gray for cloudy)
    <div className={`flex items-center justify-between p-3 rounded-lg border ${getConditionStyles()}`}>
      
      {/* Left side: icon + location + condition text */}
      <div className="flex items-center gap-3">
        <IconComponent />
        <div>
          <h4 className="font-bold text-sm">{location}</h4>
          <p className="text-xs opacity-80 capitalize">{condition}</p>
          {/* capitalize = CSS class that makes first letter uppercase, e.g. "sunny" displays as "Sunny" */}
        </div>
      </div>
      
      {/* Right side: big temperature number */}
      <div className="text-xl font-bold">
        {temperature}
      </div>
    </div>
  );
}