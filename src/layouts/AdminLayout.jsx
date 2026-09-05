/**
 * AdminLayout component for the EcoLanka project.
 * Provides the layout for admin and manager roles with a specific sidebar and top bar.
 */
import React, { useState } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/AdminSidebar';
import ManagerSidebar from '../components/ManagerSidebar';
import { HiUserCircle } from 'react-icons/hi2';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Create breadcrumbs from pathname
  const pathnames = location.pathname.split('/').filter((x) => x);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar based on role */}
      {user?.role === 'manager' ? <ManagerSidebar /> : <AdminSidebar />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 z-10">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/dashboard" className="hover:text-eco-ocean transition-colors">Home</Link>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isRoleRoot = to === '/admin' || to === '/manager';
              const linkTarget = isRoleRoot ? `${to}/dashboard` : to;
              return (
                <span key={to} className="flex items-center">
                  <span className="mx-2">/</span>
                  {last ? (
                    <span className="text-gray-800 font-medium capitalize">{value.replace('-', ' ')}</span>
                  ) : (
                    <Link to={linkTarget} className="hover:text-eco-ocean transition-colors capitalize">
                      {value.replace('-', ' ')}
                    </Link>
                  )}
                </span>
              );
            })}
          </div>

          <div className="relative flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">{user?.name || 'Admin User'}</span>
            <button 
              type="button" 
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="focus:outline-none rounded-full flex items-center"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt="User Avatar" className="h-9 w-9 rounded-full object-cover border border-gray-200" />
              ) : (
                <HiUserCircle className="h-10 w-10 text-gray-400" />
              )}
            </button>
            
            {/* Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50">
                <Link 
                  to={`/${user?.role === 'manager' ? 'manager' : 'admin'}/profile`} 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  Profile Settings
                </Link>
                <button 
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
