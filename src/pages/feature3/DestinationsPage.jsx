/**
 * DestinationsPage - Displays a grid of eco-destinations with search and filtering.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDestinations, useCategories } from '../../context/GlobalDataContext';
import { HiOutlineMagnifyingGlass, HiStar } from 'react-icons/hi2';
import DestinationCard from '../../components/DestinationCard';

export default function DestinationsPage() {
  // 1. Fetch destinations and categories from global context data
  const { destinations } = useDestinations();
  const { categories } = useCategories();
  
  // 2. Component state for search query, category filtering, sorting, and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);

  // 3. Filter destinations based on category and search query, then sort them accordingly
  const filteredDestinations = destinations
    .filter(dest => (categoryFilter === 'all' || dest.categoryId === categoryFilter))
    .filter(dest => dest.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      return 0;
    });

  // 4. Pagination configuration and sliced data for the current page
  const ITEMS_PER_PAGE = 9;
  const paginatedDestinations = filteredDestinations.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Explore Eco-Destinations</h1>

      {/* Control panel: Search input and filter/sort dropdowns */}
      <div className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-ocean"
          />
          <HiOutlineMagnifyingGlass className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        
        {/* Filter and Sort Dropdowns */}
        <div className="flex w-full md:w-auto gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-eco-ocean"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-eco-ocean"
          >
            <option value="rating">Top Rated</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Destination Grid or Empty Fallback */}
      {paginatedDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedDestinations.map(dest => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-xl shadow-md text-center">
          <p className="text-gray-500">No destinations found matching your criteria.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-lg ${currentPage === i + 1 ? 'bg-eco-ocean text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
            >
              {i + 1}
            </button>
          ))}
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}