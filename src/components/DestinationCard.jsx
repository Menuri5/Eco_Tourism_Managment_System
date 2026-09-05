/**
 * Destination Card component
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { HiStar } from 'react-icons/hi2';

export default function DestinationCard({ destination }) {
  if (!destination) return null;

  return (
    <Link to={`/destinations/${destination.id}`} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col group h-full">
      <div className="relative h-48 overflow-hidden shrink-0">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-semibold flex items-center">
          <HiStar className="text-amber-500 mr-1" /> {destination.rating}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold text-gray-800 line-clamp-1">{destination.name}</h2>
          <span className="text-eco-ocean font-bold shrink-0 ml-2">
            {destination.price === 0 ? '$0' : `$${destination.price}`}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-3 line-clamp-1">{destination.location}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{destination.description}</p>
        <div className="mt-auto">
          <span className="inline-block bg-cyan-50 text-eco-ocean text-xs px-2 py-1 rounded-full">{destination.category}</span>
        </div>
      </div>
    </Link>
  );
}
