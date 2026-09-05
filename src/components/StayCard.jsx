/**
 * StayCard — Card component for Stays & Dining listings.
 * Displays thumbnail, name, type badge, location, rating, price range,
 * and a brief description with a "View Details" link.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { HiMapPin, HiStar } from 'react-icons/hi2';

export default function StayCard({ place }) {
  const categoryColor = place.category === 'dining'
    ? 'bg-amber-500'
    : 'bg-eco-forest-light';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden group">
      {/* Image with overlay badges */}
      <div className="relative overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Category badge */}
        <span className={`absolute top-3 left-3 ${categoryColor} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>
          {place.type}
        </span>
        {/* Price range badge */}
        <span className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
          {place.priceRange}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-eco-ocean transition-colors">
          {place.name}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <HiMapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{place.location}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <HiStar className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-semibold text-gray-700">{place.rating}</span>
          <span className="text-sm text-gray-400">({place.reviewCount} reviews)</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {place.shortDescription}
        </p>

        {/* View Details link */}
        <Link
          to={`/stays/${place.id}`}
          className="inline-block w-full text-center bg-eco-ocean hover:bg-cyan-800 text-white text-sm font-medium rounded-lg px-4 py-2.5 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
