/**
 * SearchBar component
 */
import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function SearchBar({ value, onChange, onSearch, placeholder = "Search destinations..." }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg">
      <div className="relative flex items-center">
        <HiMagnifyingGlass className="absolute left-4 h-5 w-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-24 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean focus:border-transparent text-sm"
        />
        {onSearch && (
          <button
            type="submit"
            className="absolute right-1.5 px-4 py-1.5 bg-eco-ocean hover:bg-cyan-800 text-white text-sm font-medium rounded-full transition-colors"
          >
            Search
          </button>
        )}
      </div>
    </form>
  );
}
