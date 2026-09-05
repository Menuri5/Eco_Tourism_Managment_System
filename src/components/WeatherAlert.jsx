/**
 * Weather Alert component
 */
import React from 'react';
import { HiSun, HiCloud } from 'react-icons/hi2';

export default function WeatherAlert({ location, temperature, condition = 'sunny', icon }) {
  const getConditionStyles = () => {
    switch(condition.toLowerCase()) {
      case 'sunny': return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'rainy': return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'cloudy': return 'bg-gray-50 text-gray-900 border-gray-200';
      default: return 'bg-white text-gray-900 border-gray-200';
    }
  };

  const IconComponent = () => {
    if (icon) return icon;
    switch(condition.toLowerCase()) {
      case 'sunny': return <HiSun className="h-8 w-8 text-amber-500" />;
      case 'rainy': return <HiCloud className="h-8 w-8 text-blue-500" />;
      case 'cloudy': return <HiCloud className="h-8 w-8 text-gray-500" />;
      default: return <HiSun className="h-8 w-8 text-amber-500" />;
    }
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${getConditionStyles()}`}>
      <div className="flex items-center gap-3">
        <IconComponent />
        <div>
          <h4 className="font-bold text-sm">{location}</h4>
          <p className="text-xs opacity-80 capitalize">{condition}</p>
        </div>
      </div>
      <div className="text-xl font-bold">
        {temperature}
      </div>
    </div>
  );
}
