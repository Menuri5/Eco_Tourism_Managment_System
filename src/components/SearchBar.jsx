/**
 * SearchBar component
 */
import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2'; // search/magnifying glass icon

// Props:
// - value: current text in the search box (controlled from PARENT, not internal state here)
// - onChange: function called every time the user types — updates parent's state
// - onSearch: OPTIONAL function called when the form is submitted (Enter key or Search button click)
// - placeholder: customizable placeholder text, defaults to "Search destinations..."
export default function SearchBar({ value, onChange, onSearch, placeholder = "Search destinations..." }) {
  
  // Called when the form is submitted (pressing Enter, or clicking the Search button)
  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page from reloading (default browser form behavior)
    if (onSearch) onSearch(value); // only call onSearch if it was actually provided as a prop
  };

  return (
    // Using a <form> (not just a <div>) means pressing Enter while typing also triggers search — free functionality
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg">
      <div className="relative flex items-center">
        
        {/* Search icon, positioned inside the input on the left */}
        <HiMagnifyingGlass className="absolute left-4 h-5 w-5 text-gray-400 pointer-events-none" />
        {/* pointer-events-none = icon doesn't block clicks/typing into the input behind it */}
        
        <input
          type="text"
          value={value} // controlled input — parent owns the actual text state
          onChange={(e) => onChange(e.target.value)} // every keystroke bubbles up to parent via onChange
          placeholder={placeholder}
          className="w-full pl-11 pr-24 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean focus:border-transparent text-sm"
          // pl-11 = left padding, makes room for the icon
          // pr-24 = right padding, makes room for the Search button (so text doesn't go under it)
        />
        
        {/* Search button — ONLY shown if onSearch was actually passed as a prop */}
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