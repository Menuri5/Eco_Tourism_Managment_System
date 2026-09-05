/**
 * StatCard — Dashboard metric card component.
 * Displays an icon, label, value, and optional trend indicator.
 * Accepts `icon` as either a React element (JSX) or a component reference.
 * Accepts `label` or `title` for the metric name.
 */
import React from 'react';
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2';

export default function StatCard({ icon, label, title, value, trend, trendDirection = 'up', color = 'bg-blue-500' }) {
  // Support both `label` and `title` prop names
  const displayLabel = label || title || '';

  // Render icon: if it's a valid React element (JSX), render directly;
  // if it's a component reference, instantiate it.
  const renderIcon = () => {
    if (!icon) return null;
    // Already a rendered JSX element (e.g., <HiOutlineUsers className="..." />)
    if (React.isValidElement(icon)) return icon;
    // A component reference (e.g., HiOutlineUsers)
    const IconComponent = icon;
    return <IconComponent className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          {renderIcon()}
        </div>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${trendDirection === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trendDirection === 'up' ? <HiArrowTrendingUp className="h-4 w-4 mr-1" /> : <HiArrowTrendingDown className="h-4 w-4 mr-1" />}
            {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{displayLabel}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );
}
