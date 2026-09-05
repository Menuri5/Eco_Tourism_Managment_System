/**
 * FavouritesPage - Displays user's saved/favourite destinations.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { destinations } from '../../data/destinations';
import { HiHeart, HiStar } from 'react-icons/hi2';

export default function FavouritesPage() {
  const { user } = useAuth();
  
  // Mock favourites if none exist on user
  const favouriteIds = user?.favourites?.length > 0 ? user.favourites : [1, 3, 5];
  // Filter the destination catalogue to only include destinations present in favouriteIds
  const favouriteDestinations = destinations.filter(d => favouriteIds.includes(d.id));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header: Title and descriptive subtitle */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">My Favourites</h1>
        <p className="text-gray-600 mt-2">Your curated list of dream eco-destinations.</p>
      </div>
      {/* Conditional rendering based on whether user has any saved favourites */}
      {favouriteDestinations.length > 0 ? (
        /* Favourites Grid: Responsive card layout*/
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favouriteDestinations.map(dest => (
            <div key={dest.id} className="bg-white rounded-xl shadow-md overflow-hidden group relative">
              <Link to={`/destinations/${dest.id}`}>
                <div className="h-48 overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
              </Link>
              {/* Floating favourite/remove button pinned to the top-right corner */}
              <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-600 transition-colors">
                <HiHeart size={20} />
              </button>
              {/* Destination Details Section */}
              <div className="p-4">
                <Link to={`/destinations/${dest.id}`}>
                  <h3 className="font-bold text-gray-800 text-lg hover:text-eco-ocean transition-colors">{dest.name}</h3>
                </Link>
                {/* Location indicator */}
                <p className="text-sm text-gray-500 mb-3">{dest.location}</p>
                {/* Metadata Row: Displays review rating score and category tag badge */}
                <div className="flex justify-between items-center">
                  <span className="flex items-center text-sm font-medium"><HiStar className="text-amber-500 mr-1" /> {dest.rating}</span>
                  <span className="text-sm bg-eco-ocean/10 text-eco-ocean px-2 py-1 rounded">{dest.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State: Displayed when no favourites match the criteria */
        <div className="bg-white rounded-xl shadow-md p-16 text-center">
          <HiHeart className="mx-auto text-gray-200 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No favourites yet</h2>
          <p className="text-gray-500 mb-6">Start exploring and save destinations you'd like to visit later.</p>
          <Link to="/destinations" className="bg-eco-ocean hover:bg-cyan-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Explore Destinations
          </Link>
        </div>
      )}
    </div>
  );
}
