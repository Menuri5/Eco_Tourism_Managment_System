/**
 * Admin Sidebar component
 */
import React from 'react';
import { NavLink } from 'react-router-dom'; // NavLink is like <a>, but it knows if the link is "active" (current page)
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
} from 'react-icons/hi2'; // icons used next to each menu item
import logo from '../assets/logo.svg'; // the EcoLanka logo image

// This component receives a "role" prop — either 'admin' or 'manager'
// Default value is 'admin' if nothing is passed
export default function AdminSidebar({ role = 'admin' }) {

  // Depending on the role, we show a different set of menu items.
  // This is a simple JavaScript ternary: condition ? doThisIfTrue : doThisIfFalse
  const navItems = role === 'manager' ? [
    // ---- Manager menu (shorter list) ----
    { name: 'Dashboard', path: '/manager/dashboard', icon: HiChartPie },
    { name: 'System Health', path: '/manager/health', icon: HiShieldCheck },
    { name: 'Integrations', path: '/manager/integrations', icon: HiMap },
    { name: 'Settings', path: '/manager/settings', icon: HiTag },
    { name: 'Analytics', path: '/manager/analytics', icon: HiChartBar },
  ] : [
    // ---- Admin menu (full list) ----
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
    // Outer container: fixed width (w-64), full screen height, dark background
    <div className="flex flex-col w-64 h-screen bg-gray-900 text-white shadow-xl flex-shrink-0">
      
      {/* Top section: logo + title */}
      <div className="flex items-center h-20 px-6 border-b border-gray-800">
        <img 
          src={logo} 
          alt="EcoLanka" 
          className="h-8 w-8 mr-3" 
          style={{ filter: 'brightness(0) invert(1)' }} // makes the logo white, since background is dark
        />
        {/* Title changes based on role */}
        <span className="text-xl font-bold tracking-wider">
          {role === 'manager' ? 'EcoManager' : 'EcoAdmin'}
        </span>
      </div>
      
      {/* Middle section: the actual menu links */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {/* Loop through navItems array and create one NavLink per item */}
          {navItems.map((item) => (
            <NavLink
              key={item.name} // React needs a unique "key" for each item in a list
              to={item.path}
              end // "end" means: only mark active on exact path match (not sub-routes)
              className={({ isActive }) =>
                // isActive is given automatically by NavLink
                // if this is the current page -> highlight it (cyan background)
                // if not -> normal gray, with hover effect
                `group flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-cyan-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              {/* icon component for this menu item */}
              <item.icon
                className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-white"
                aria-hidden="true" // hides icon from screen readers (it's decorative, text next to it explains it)
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}