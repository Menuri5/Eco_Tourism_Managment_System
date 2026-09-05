/**
 * Destination Card component
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { HiStar } from 'react-icons/hi2'; // star icon, used for the rating badge

// Receives one "destination" object as a prop
export default function DestinationCard({ destination }) {
  
  // Safety check: don't render if no data passed
  if (!destination) return null;

  return (
    // Whole card is clickable -> goes to that destination's detail page
    <Link 
      to={`/destinations/${destination.id}`} 
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col group h-full"
      // "group" lets child elements (like the image) react to hover on this parent
      // h-full -> stretches to fill parent grid cell height, keeps cards same height in a grid
    >
      {/* ---- Image section ---- */}
      <div className="relative h-48 overflow-hidden shrink-0">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          // image zooms in slightly on hover (same trick as CategoryCard, smaller zoom here)
        />
        
        {/* Dark gradient at the bottom of the image (subtle, mainly for visual depth) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
        {/* pointer-events-none = this overlay doesn't block clicks, they pass through to the Link underneath */}
        
        {/* Rating badge, top-right corner, e.g. "⭐ 4.8" */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-semibold flex items-center">
          <HiStar className="text-amber-500 mr-1" /> {destination.rating}
        </div>
      </div>
      
      {/* ---- Text content section ---- */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Name + Price on the same row */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-gray-800 line-clamp-1">{destination.name}</h2>
          {/* line-clamp-1 = cuts name to 1 line with "..." if too long */}
          
          <span className="text-eco-ocean font-bold shrink-0 ml-2">
            {/* If price is 0, show "$0" (means free entry); otherwise show the price */}
            {destination.price === 0 ? '$0' : `$${destination.price}`}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-1">{destination.location}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{destination.description}</p>
        {/* description gets 2 lines max before truncating */}
        
        {/* mt-auto pushes the category tag to the bottom of the card,
            even if description text is short — keeps all cards aligned in a grid */}
        <div className="mt-auto">
          <span className="inline-block bg-cyan-50 text-eco-ocean text-xs px-2 py-1 rounded-full">
            {destination.category} {/* e.g. "Wildlife", "Beach", "Cultural" */}
          </span>
        </div>
      </div>
    </Link>
  );
}