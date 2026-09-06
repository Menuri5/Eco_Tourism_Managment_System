/**
 * Header component for the public site
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // custom hook — gives access to logged-in user info + login/logout functions
import { HiBars3, HiXMark, HiBell } from 'react-icons/hi2'; // hamburger menu icon, close (X) icon, bell (notification) icon
import logo from '../assets/logo.svg';

export default function Header() {
  // Pulls current user data + auth status + logout function from a global Context
  // (so ANY component in the app can know "is someone logged in?" without passing props manually)
  const { user, isAuthenticated, logout } = useAuth();
  
  const navigate = useNavigate(); // lets us redirect the user programmatically (e.g. after logout)
  
  // Three separate open/closed toggles — mobile menu, profile dropdown, notifications dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // ⚠️ Hardcoded fake notification data — NOT coming from backend/API yet
  // This needs to be replaced with a real API call later
  const mockNotifications = [
    { id: 1, title: 'Booking Confirmed', message: 'Your stay at Sigiriya Eco Resort has been confirmed.', time: '2h ago' },
    { id: 2, title: 'New Message', message: 'Guide Kamal sent you a new message regarding your tour.', time: '5h ago' },
    { id: 3, title: 'Campaign Update', message: 'Goal reached for Sinharaja Perimeter Restoration!', time: '1d ago' },
  ];
  const notificationCount = mockNotifications.length; // used to show/hide the red "unread" dot

  // Logout handler: clears auth state, then redirects to homepage
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Main navigation menu items (used in BOTH desktop nav and mobile menu, so defined once here)
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Categories', path: '/categories' },
    { name: 'Stays & Dining', path: '/stays' },
    { name: 'Campaigns', path: '/campaigns' },
    { name: 'About', path: '/about' },
  ];

  return (
    // sticky top-0 = header stays fixed at the top of the page even when scrolling
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        
        {/* ---- Logo (always visible, left side) ---- */}
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">EcoLanka</span> {/* hidden text for screen readers */}
            <img className="h-8 w-auto" src={logo} alt="EcoLanka" />
          </Link>
        </div>
        
        {/* ---- Hamburger button — ONLY visible on small screens (lg:hidden = hidden on large screens) ---- */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)} // opens the mobile menu overlay
          >
            <span className="sr-only">Open main menu</span>
            <HiBars3 className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        {/* ---- Desktop nav links — ONLY visible on large screens (hidden by default, lg:flex shows it) ---- */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navLinks.map((item) => (
            <Link key={item.name} to={item.path} className="text-sm font-semibold leading-6 text-gray-900 hover:text-eco-ocean">
              {item.name}
            </Link>
          ))}
        </div>
        
        {/* ---- Right side: login state stuff — also desktop only ---- */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
          
          {isAuthenticated ? (
            // ====== LOGGED IN VIEW ======
            <>
              {/* --- Notification bell + dropdown --- */}
              <div className="relative">
                <button 
                  type="button" 
                  className="text-gray-500 hover:text-gray-700 relative p-1"
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen); // toggle notifications open/closed
                    if (profileDropdownOpen) setProfileDropdownOpen(false); // close profile dropdown if it was open
                    // (so you never have BOTH dropdowns open at the same time)
                  }}
                >
                  <span className="sr-only">View notifications</span>
                  <HiBell className="h-6 w-6" aria-hidden="true" />
                  {/* Red dot badge — only shows if there are unread notifications */}
                  {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                  )}
                </button>
                
                {/* Dropdown panel — only rendered when notificationsOpen is true */}
                {notificationsOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-md">
                      <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                      <button className="text-xs text-eco-ocean hover:underline font-medium">Mark all as read</button>
                      {/* ⚠️ note: this button has no onClick yet — not wired to any function */}
                    </div>
                    <div className="max-h-80 overflow-y-auto"> {/* scrollable if many notifications */}
                      {mockNotifications.map(notification => (
                        <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer transition-colors">
                          <p className="text-sm font-semibold text-gray-800">{notification.title}</p>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-0.5">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <Link 
                      to="/notifications" 
                      className="block text-center px-4 py-3 text-sm font-medium text-eco-ocean hover:bg-gray-50 border-t border-gray-100" 
                      onClick={() => setNotificationsOpen(false)} // close dropdown when navigating away
                    >
                      View all notifications
                    </Link>
                  </div>
                )}
              </div>
              
              {/* --- Profile avatar + dropdown --- */}
              <div className="relative">
                <button
                  type="button"
                  className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => {
                    setProfileDropdownOpen(!profileDropdownOpen); // toggle profile menu
                    if (notificationsOpen) setNotificationsOpen(false); // close the other dropdown, same pattern as above
                  }}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.avatar || "https://ui-avatars.com/api/?name=" + (user?.name || "User")}
                    // user?.avatar -> optional chaining, safe even if "user" is null
                    // fallback: auto-generated avatar from name, or generic "User" if no name either
                    alt=""
                  />
                </button>
                
                {profileDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                    
                    {/* Dashboard link changes destination based on role -> admin goes to admin dashboard, normal user goes to their own dashboard */}
                    <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                    
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // ====== LOGGED OUT VIEW ======
            <>
              <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-eco-ocean px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eco-ocean transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
      
      {/* ---- MOBILE MENU — full-screen slide-in panel, only rendered when mobileMenuOpen is true ---- */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          
          {/* Dark semi-transparent backdrop behind the menu — clicking it closes the menu */}
          <div className="fixed inset-0 z-50 bg-gray-900/80" onClick={() => setMobileMenuOpen(false)}></div>
          
          {/* The actual menu panel, slides in from the right */}
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            
            {/* Top row: logo + close button */}
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <span className="sr-only">EcoLanka</span>
                <img className="h-8 w-auto" src={logo} alt="EcoLanka" />
                <span className="text-xl font-bold text-eco-ocean">EcoLanka</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <HiXMark className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10"> {/* divide-y = horizontal line between the 2 sections below */}
                
                {/* Section 1: main nav links */}
                <div className="space-y-2 py-6">
                  {navLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)} // clicking any link closes the menu automatically
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                {/* Section 2: auth links — same logged-in/logged-out logic as desktop, just laid out differently for mobile */}
                <div className="py-6">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Profile
                      </Link>
                      <Link
                        to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => { handleLogout(); setMobileMenuOpen(false); }} // logs out AND closes menu, in one click
                        className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Log in
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 mt-4 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white bg-eco-ocean hover:bg-cyan-800 text-center"
                      >
                        Sign up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}