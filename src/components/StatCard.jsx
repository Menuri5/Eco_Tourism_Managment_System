/**
 * StatCard — Dashboard metric card component.
 * Displays an icon, label, value, and optional trend indicator.
 * Accepts `icon` as either a React element (JSX) or a component reference.
 * Accepts `label` or `title` for the metric name.
 */
import React from 'react';
import { HiArrowTrendingUp, HiArrowTrendingDown } from 'react-icons/hi2'; // up-trend arrow, down-trend arrow

// Props:
// - icon: the icon to show — can be passed TWO different ways (see renderIcon below)
// - label / title: the metric's name (e.g. "Total Users") — BOTH prop names work
// - value: the actual number/stat to display (e.g. "1,204")
// - trend: optional text like "+12%" — if not passed, no trend indicator shows at all
// - trendDirection: 'up' (default) or 'down' — controls arrow + color
// - color: a Tailwind bg color class (e.g. "bg-blue-500"), used for both the icon badge AND icon color
export default function StatCard({ icon, label, title, value, trend, trendDirection = 'up', color = 'bg-blue-500' }) {
  
  // Support BOTH `label` and `title` as prop names — whichever one was actually passed wins
  // (protects against a teammate accidentally using the "wrong" prop name when reusing this component)
  const displayLabel = label || title || '';

  // This function figures out HOW to render the icon, because "icon" can arrive in 2 different forms:
  const renderIcon = () => {
    if (!icon) return null; // no icon passed at all -> render nothing
    
    // FORM 1: icon is already a rendered JSX element, e.g. someone passed <HiUsers className="h-6 w-6" />
    // React.isValidElement() checks: "is this actual JSX, not just a plain component reference?"
    if (React.isValidElement(icon)) return icon; // just use it directly, as-is
    
    // FORM 2: icon is a component REFERENCE (the component itself, not yet turned into JSX)
    // e.g. someone passed icon={HiUsers} (no angle brackets, no parentheses)
    const IconComponent = icon;
    // Now WE render it ourselves, and we get to control its styling
    // color.replace('bg-', 'text-') -> converts "bg-blue-500" into "text-blue-500" automatically,
    // so the icon color always matches the badge background color, just as text instead of background
    return <IconComponent className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      
      {/* Top row: icon badge (left) + trend indicator (right) */}
      <div className="flex items-center justify-between mb-4">
        
        {/* Icon badge — colored box behind the icon */}
        {/* bg-opacity-10 = makes the background color very light/pastel (10% opacity), so it looks like a soft tinted badge, not a solid block */}
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          {renderIcon()}
        </div>
        
        {/* Trend indicator — only shows if "trend" prop was actually passed */}
        {trend && (
          <div className={`flex items-center text-sm font-medium ${trendDirection === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trendDirection === 'up' 
              ? <HiArrowTrendingUp className="h-4 w-4 mr-1" /> 
              : <HiArrowTrendingDown className="h-4 w-4 mr-1" />}
            {trend} {/* e.g. "+12%" or "-3%" */}
          </div>
        )}
      </div>
      
      {/* Bottom: label + big value number */}
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{displayLabel}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
    </div>
  );
}