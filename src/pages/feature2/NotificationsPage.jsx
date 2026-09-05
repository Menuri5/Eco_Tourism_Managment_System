/**
 * NotificationsPage - Displays user notifications.
 */
import React, { useState } from 'react';
import { notifications } from '../../data/notifications';
import { HiOutlineBell, HiOutlineCheck, HiOutlineCheckCircle, HiOutlineExclamationTriangle, HiOutlineInformationCircle } from 'react-icons/hi2';

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const filteredNotifications = localNotifications.filter(n => 
    filter === 'unread' ? !n.read : true
  );

  const unreadCount = localNotifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setLocalNotifications(prev => prev.map(n => ({...n, read: true})));
  };

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <HiOutlineCheckCircle className="text-green-500" size={24} />;
      case 'warning': return <HiOutlineExclamationTriangle className="text-amber-500" size={24} />;
      case 'alert': return <HiOutlineBell className="text-red-500" size={24} />;
      default: return <HiOutlineInformationCircle className="text-eco-ocean" size={24} />;
    }
  };

  const getBgColor = (type, read) => {
    if (read) return 'bg-white';
    switch(type) {
      case 'success': return 'bg-green-50';
      case 'warning': return 'bg-amber-50';
      case 'alert': return 'bg-red-50';
      default: return 'bg-cyan-50';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            Notifications 
            {unreadCount > 0 && <span className="ml-3 bg-eco-ocean text-white text-sm px-2 py-0.5 rounded-full">{unreadCount}</span>}
          </h1>
          <p className="text-gray-600 mt-2">Stay updated on your bookings and alerts.</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-ocean text-sm"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
          </select>
          <button onClick={markAllRead} className="text-sm font-medium text-eco-ocean hover:text-cyan-800 flex items-center">
            <HiOutlineCheck className="mr-1" /> Mark all read
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div key={notification.id} className={`${getBgColor(notification.type, notification.read)} border ${notification.read ? 'border-gray-200' : 'border-transparent'} p-5 rounded-xl shadow-sm flex items-start space-x-4 transition-colors`}>
              <div className="flex-shrink-0 mt-1">
                {getIcon(notification.type)}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>{notification.title}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{notification.date}</span>
                </div>
                <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>{notification.message}</p>
                {notification.link && (
                  <button className="text-eco-ocean text-sm font-medium mt-3 hover:underline">
                    View Details
                  </button>
                )}
              </div>
              {!notification.read && (
                <div className="flex-shrink-0 w-2 h-2 bg-eco-ocean rounded-full mt-2"></div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-xl border border-gray-200 text-center">
            <HiOutlineBell className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500">You have no notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}
