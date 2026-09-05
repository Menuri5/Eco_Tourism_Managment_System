/**
 * RecommendationsPage - AI-based or preference-based personalized destination recommendations.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { destinations } from '../../data/destinations';
import { HiStar, HiOutlineSparkles } from 'react-icons/hi2';

export default function RecommendationsPage() {
  const { user } = useAuth();
  const preferences = user?.preferences || [];

  // Very simple mock logic: filter destinations whose category matches user preferences, or fallback to featured
  let recommended = destinations.filter(d => 
    preferences.some(p => d.category.toLowerCase().includes(p.toLowerCase()))
  );

  if (recommended.length === 0) {
    recommended = destinations.filter(d => d.isFeatured);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Hero Banner: Highlights personalization based on user preferences */}
      <div className="bg-gradient-to-r from-eco-ocean to-cyan-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold flex items-center"><HiOutlineSparkles className="mr-3" /> Recommended for You</h1>
          <p className="mt-2 text-cyan-100 max-w-2xl">Based on your interest in {preferences.length > 0 ? preferences.join(', ') : 'eco-tourism'}, our AI has curated these perfect sustainable getaways just for you.</p>
        </div>
        {/* Decorative background circle */}
        <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>
        {/* Recommendations Grid*/
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommended.map(dest => (
          <Link key={dest.id} to={`/destinations/${dest.id}`} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
            
            {/* Card Thumbnail Container */}
            <div className="relative h-48 overflow-hidden">

              {/* Cover image with zoom-in scale effect on card hover */}
              <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              {/* Category pill badge positioned over the top right corner */}
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-eco-ocean">
                {dest.category}
              </div>
            </div>

            {/* Destination Metadata Body */}
            <div className="p-4">
              <h3 className="font-bold text-gray-800 text-lg mb-1">{dest.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{dest.location}</p>

              {/* Footer: User star rating and starting price display */}
              <div className="flex justify-between items-center mt-4">
                <span className="flex items-center text-sm font-medium"><HiStar className="text-amber-500 mr-1" /> {dest.rating}</span>
                <span className="font-bold text-gray-800">${dest.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
