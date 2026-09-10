/**
 * NotFoundPage component for the EcoLanka project.
 * Displays a 404 error page for unmatched routes.
 */
// Import React so this file can use JSX
import React from 'react';
// Link is used for the buttons so the user can go to other pages without reloading
import { Link } from 'react-router-dom';

// NotFoundPage component - shown when the user opens a URL that does not match any route
export default function NotFoundPage() {
  // Render the page. The outer div is full height and centers all content both vertically and horizontally
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 text-center">
      {/* Very large "404" text in the ocean color with wide letter spacing */}
      <div className="text-eco-ocean font-extrabold text-9xl tracking-widest mb-4">
        404
      </div>
      
      {/* Palm tree emoji for a jungle / travel theme */}
      <div className="text-6xl mb-6">
        🌴
      </div>
      
      {/* Page heading - larger text on medium screens and up */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Page Not Found
      </h1>
      
      {/* Friendly message explaining that the page does not exist */}
      <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto">
        Oops! The trail you're looking for seems to have disappeared into the jungle. Let's get you back on the right path.
      </p>
      
      {/* Buttons: stacked on mobile, side by side on small screens and up */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* Filled button - goes back to the home page */}
        <Link 
          to="/" 
          className="bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-8 py-3 font-medium transition-colors shadow-sm"
        >
          Go Home
        </Link>
        {/* Outline button - goes to the destinations page */}
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