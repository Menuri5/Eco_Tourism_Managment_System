/**
 * FilterPanel component
 */
import React, { useState } from 'react';
import { HiStar } from 'react-icons/hi2';

export default function FilterPanel({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters || {
    categories: [],
    minPrice: 0,
    maxPrice: 1000,
    rating: 0,
    sort: 'popular'
  });

  const handleCategoryChange = (cat) => {
    const updated = localFilters.categories.includes(cat)
      ? localFilters.categories.filter(c => c !== cat)
      : [...localFilters.categories, cat];
    
    setLocalFilters({ ...localFilters, categories: updated });
  };

  const apply = () => {
    if (onFilterChange) onFilterChange(localFilters);
  };

  const clear = () => {
    const cleared = { categories: [], minPrice: 0, maxPrice: 1000, rating: 0, sort: 'popular' };
    setLocalFilters(cleared);
    if (onFilterChange) onFilterChange(cleared);
  };

  const categories = ['Wildlife', 'Beaches', 'Mountains', 'Heritage', 'Adventure'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full max-w-sm">
      <h3 className="font-bold text-gray-900 text-lg mb-4">Filters</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={localFilters.categories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="rounded border-gray-300 text-eco-ocean focus:ring-eco-ocean h-4 w-4" 
                />
                <span className="ml-2 text-sm text-gray-600">{cat}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range ($)</h4>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              value={localFilters.minPrice}
              onChange={(e) => setLocalFilters({...localFilters, minPrice: Number(e.target.value)})}
              className="w-full border-gray-300 rounded-md text-sm focus:ring-eco-ocean focus:border-eco-ocean"
              placeholder="Min"
            />
            <span className="text-gray-500">-</span>
            <input 
              type="number" 
              value={localFilters.maxPrice}
              onChange={(e) => setLocalFilters({...localFilters, maxPrice: Number(e.target.value)})}
              className="w-full border-gray-300 rounded-md text-sm focus:ring-eco-ocean focus:border-eco-ocean"
              placeholder="Max"
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h4>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button 
                key={star}
                type="button"
                onClick={() => setLocalFilters({...localFilters, rating: star})}
                className="focus:outline-none"
              >
                <HiStar className={`h-6 w-6 ${star <= localFilters.rating ? 'text-amber-500' : 'text-gray-200'}`} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Sort By</h4>
          <select 
            value={localFilters.sort}
            onChange={(e) => setLocalFilters({...localFilters, sort: e.target.value})}
            className="w-full border-gray-300 rounded-md text-sm focus:ring-eco-ocean focus:border-eco-ocean"
          >
            <option value="popular">Popularity</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button 
            onClick={clear}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Clear
          </button>
          <button 
            onClick={apply}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-eco-ocean hover:bg-cyan-800 rounded-lg transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
