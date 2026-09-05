/**
 * SearchPage - Global search results page with sidebar filtering.
 */
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { destinations } from '../../data/destinations';
import { HiOutlineMagnifyingGlass, HiStar } from 'react-icons/hi2';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  
  useEffect(() => {
    if (query) {
      setResults(destinations.filter(d => 
        d.name.toLowerCase().includes(query.toLowerCase()) || 
        d.description.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setResults(destinations);
    }
  }, [query]);

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Filter Panel */}
      <div className="w-full md:w-64 flex-shrink-0 space-y-6">
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="font-bold text-gray-800 mb-4">Filters</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <input type="range" className="w-full accent-eco-ocean" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="space-y-2">
                {[4, 3, 2].map(star => (
                  <label key={star} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-eco-ocean focus:ring-eco-ocean" />
                    <span className="text-sm text-gray-600 flex items-center">{star}+ <HiStar className="text-amber-400 ml-1" /></span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow space-y-6">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by destination, activity, or keyword..."
            className="w-full pl-12 pr-4 py-3 bg-white border-0 shadow-md rounded-xl focus:ring-2 focus:ring-eco-ocean text-lg"
          />
          <HiOutlineMagnifyingGlass className="absolute left-4 top-3.5 text-gray-400" size={24} />
        </div>

        <p className="text-gray-600 font-medium">
          Showing {results.length} results {query ? `for "${query}"` : ''}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(dest => (
            <Link key={dest.id} to={`/destinations/${dest.id}`} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <img src={dest.image} alt={dest.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{dest.name}</h3>
                <p className="text-sm text-gray-500">{dest.location}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <HiStar className="text-amber-400 mr-1" />
                    <span className="font-medium">{dest.rating}</span>
                  </div>
                  <span className="font-bold text-eco-ocean">${dest.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {results.length === 0 && (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-gray-500">No results found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
