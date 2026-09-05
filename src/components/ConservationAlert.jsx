/**
 * Conservation Alert component
 */
import React, { useState } from 'react';
import { HiExclamationTriangle, HiInformationCircle, HiXMark } from 'react-icons/hi2';
import { FiAlertCircle } from 'react-icons/fi';

export default function ConservationAlert({ message, severity = 'info' }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const styles = {
    info: { bg: 'bg-green-50', text: 'text-green-800', icon: HiInformationCircle, iconColor: 'text-green-500' },
    warning: { bg: 'bg-amber-50', text: 'text-amber-800', icon: HiExclamationTriangle, iconColor: 'text-amber-500' },
    critical: { bg: 'bg-red-50', text: 'text-red-800', icon: FiAlertCircle, iconColor: 'text-red-500' },
  };

  const config = styles[severity] || styles.info;
  const Icon = config.icon;

  return (
    <div className={`p-3 rounded-lg flex items-start gap-3 relative ${config.bg}`}>
      <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${config.iconColor}`} />
      <p className={`text-sm ${config.text} pr-6`}>{message}</p>
      <button 
        onClick={() => setIsVisible(false)}
        className={`absolute top-3 right-2 opacity-60 hover:opacity-100 transition-opacity ${config.text}`}
      >
        <HiXMark className="h-4 w-4" />
      </button>
    </div>
  );
}
