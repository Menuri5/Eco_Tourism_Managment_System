/**
 * PublicLayout component for the EcoLanka project.
 * Provides the main layout for all public-facing pages, including a header, main content area, footer, and chatbot widget.
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatbotWidget from '../components/ChatbotWidget';

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
