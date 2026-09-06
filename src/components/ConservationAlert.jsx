/**
 * Conservation Alert component
 */
import React, { useState } from 'react';
import { HiExclamationTriangle, HiInformationCircle, HiXMark } from 'react-icons/hi2';
import { FiAlertCircle } from 'react-icons/fi'; // note: this one icon comes from a different icon pack (Feather Icons, "fi")

// Props:
// - message: the text to show
// - severity: 'info' | 'warning' | 'critical' — controls color + icon (defaults to 'info')
export default function ConservationAlert({ message, severity = 'info' }) {
  
  // Local state: is this alert currently shown? (user can dismiss it)
  const [isVisible, setIsVisible] = useState(true);

  // If dismissed, render nothing at all
  if (!isVisible) return null;

  // A lookup object: each severity level maps to its own colors + icon
  // This avoids writing messy if/else chains for styling
  const styles = {
    info:     { bg: 'bg-green-50', text: 'text-green-800', icon: HiInformationCircle,   iconColor: 'text-green-500' },
    warning:  { bg: 'bg-amber-50', text: 'text-amber-800', icon: HiExclamationTriangle, iconColor: 'text-amber-500' },
    critical: { bg: 'bg-red-50',   text: 'text-red-800',   icon: FiAlertCircle,          iconColor: 'text-red-500' },
  };

  // Pick the right style config based on the "severity" prop
  // Falls back to "info" style if an invalid/unknown severity is passed
  const config = styles[severity] || styles.info;
  
  // Extract the icon component from config so it can be used as JSX (<Icon />)
  const Icon = config.icon;

  return (
    // Alert box: background color changes based on severity (config.bg)
    <div className={`p-3 rounded-lg flex items-start gap-3 relative ${config.bg}`}>
      
      {/* Icon on the left, color also changes based on severity */}
      <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${config.iconColor}`} />
      
      {/* The alert message text */}
      {/* pr-6 = padding-right, so text doesn't overlap with the close (X) button */}
      <p className={`text-sm ${config.text} pr-6`}>{message}</p>
      
      {/* Close/dismiss button (top-right corner) */}
      <button 
        onClick={() => setIsVisible(false)} // clicking hides the whole alert
        className={`absolute top-3 right-2 opacity-60 hover:opacity-100 transition-opacity ${config.text}`}
      >
        <HiXMark className="h-4 w-4" />
      </button>
    </div>
  );
}