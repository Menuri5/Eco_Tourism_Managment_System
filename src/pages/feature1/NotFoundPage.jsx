/**
 * NotFoundPage component for the EcoLanka project.
 * Displays a 404 error page for unmatched routes.
 */
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 text-center">
      <div className="text-eco-ocean font-extrabold text-9xl tracking-widest mb-4">
        404
      </div>
      
      <div className="text-6xl mb-6">
        🌴
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Page Not Found
      </h1>
      
      <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto">
        Oops! The trail you're looking for seems to have disappeared into the jungle. Let's get you back on the right path.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to="/" 
          className="bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-8 py-3 font-medium transition-colors shadow-sm"
        >
          Go Home
        </Link>
        <Link 
          to="/destinations" 
          className="border border-eco-ocean text-eco-ocean hover:bg-cyan-50 rounded-lg px-8 py-3 font-medium transition-colors"
        >
          Browse Destinations
        </Link>
      </div>
    </div>
  );
}
