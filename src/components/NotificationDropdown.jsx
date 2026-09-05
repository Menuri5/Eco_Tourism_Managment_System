/**
 * NotificationDropdown component
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { HiInformationCircle, HiExclamationTriangle, HiCheckCircle } from 'react-icons/hi2';

export default function NotificationDropdown({ notifications = [] }) {
  if (!notifications.length) return null;
  
  const getIcon = (type) => {
    switch (type) {
      case 'warning': return <HiExclamationTriangle className="h-5 w-5 text-amber-500" />;
      case 'success': return <HiCheckCircle className="h-5 w-5 text-green-500" />;
      default: return <HiInformationCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="absolute right-0 z-50 mt-2 w-80 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="px-4 py-2 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.slice(0, 5).map((notif) => (
          <div key={notif.id} className={`flex items-start p-4 hover:bg-gray-50 border-b border-gray-50 ${!notif.read ? 'border-l-4 border-l-blue-500 bg-blue-50/30' : ''}`}>
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(notif.type)}
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{notif.title}</p>
              <p className="mt-1 text-xs text-gray-500 line-clamp-2">{notif.message}</p>
              <p className="mt-1 text-xs text-gray-400">{notif.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 border-t border-gray-100 text-center">
        <Link to="/notifications" className="text-sm font-medium text-eco-ocean hover:text-cyan-800">
          View All Notifications
        </Link>
      </div>
    </div>
  );
}
