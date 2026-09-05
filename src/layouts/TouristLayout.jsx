/**
 * TouristLayout component for the EcoLanka project.
 * Provides the layout for authenticated tourists, including a sidebar.
 */
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget';
import TouristSidebar from '../components/TouristSidebar';
import { HiBars3 } from 'react-icons/hi2';

export default function TouristLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const showSidebar = location.pathname === '/destinations' || location.pathname === '/stays';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 relative">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && showSidebar && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        
        {/* Sidebar */}
        {showSidebar && (
          <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 w-72 bg-white shadow-md flex-shrink-0`}>
            <TouristSidebar />
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-auto w-full">
          {showSidebar && (
            <button 
              className="md:hidden mb-4 p-2 rounded-md bg-white shadow text-gray-600 hover:text-eco-ocean focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <HiBars3 className="h-6 w-6" />
            </button>
          )}
          <Outlet />
        </main>
      </div>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
