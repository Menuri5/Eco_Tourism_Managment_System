/**
 * Admin Sidebar component
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HiChartPie, 
  HiMap, 
  HiTag, 
  HiUserGroup, 
  HiUsers, 
  HiHeart, 
  HiShieldCheck, 
  HiChartBar, 
  HiArrowDownTray,
  HiBuildingStorefront
} from 'react-icons/hi2';
import logo from '../assets/logo.svg';

export default function AdminSidebar({ role = 'admin' }) {
  const navItems = role === 'manager' ? [
    { name: 'Dashboard', path: '/manager/dashboard', icon: HiChartPie },
    { name: 'System Health', path: '/manager/health', icon: HiShieldCheck },
    { name: 'Integrations', path: '/manager/integrations', icon: HiMap },
    { name: 'Settings', path: '/manager/settings', icon: HiTag },
    { name: 'Analytics', path: '/manager/analytics', icon: HiChartBar },
  ] : [
    { name: 'Dashboard', path: '/admin/dashboard', icon: HiChartPie },
    { name: 'Destinations', path: '/admin/manage-destinations', icon: HiMap },
    { name: 'Categories', path: '/admin/manage-categories', icon: HiTag },
    { name: 'Guides', path: '/admin/manage-guides', icon: HiUserGroup },
    { name: 'Users', path: '/admin/manage-users', icon: HiUsers },
    { name: 'Campaigns', path: '/admin/manage-campaigns', icon: HiHeart },
    { name: 'Stays & Dining', path: '/admin/manage-stays', icon: HiBuildingStorefront },
    { name: 'Moderation', path: '/admin/moderation', icon: HiShieldCheck },
    { name: 'Analytics', path: '/admin/analytics', icon: HiChartBar },
    { name: 'Export', path: '/admin/export', icon: HiArrowDownTray },
  ];

  return (
    <div className="flex flex-col w-64 h-screen bg-gray-900 text-white shadow-xl flex-shrink-0">
      <div className="flex items-center h-20 px-6 border-b border-gray-800">
        <img src={logo} alt="EcoLanka" className="h-8 w-8 mr-3" style={{ filter: 'brightness(0) invert(1)' }} />
        <span className="text-xl font-bold tracking-wider">{role === 'manager' ? 'EcoManager' : 'EcoAdmin'}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end
              className={({ isActive }) =>
                `group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-cyan-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <item.icon
                className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-white"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
