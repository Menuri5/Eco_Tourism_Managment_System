/**
 * StaysPage — Main listing page for Stays & Dining.
 * Displays a responsive grid of places with category filter tabs
 * and search functionality.
 */
import React, { useState, useMemo } from 'react';
import { useStays } from '../../context/StaysContext';
import StayCard from '../../components/StayCard';
import SearchBar from '../../components/SearchBar';

export default function StaysPage() {
  const { stays } = useStays();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and search logic
  const filteredPlaces = useMemo(() => {
    return stays.filter((place) => {
      const matchesCategory =
        activeFilter === 'all' ||
        place.category === activeFilter;
      const matchesSearch =
        !searchQuery ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const filterTabs = [
    { key: 'all', label: 'All Places', count: stays.length },
    { key: 'stay', label: 'Stays & Hotels', count: stays.filter((s) => s.category === 'stay').length },
    { key: 'dining', label: 'Dining & Restaurants', count: stays.filter((s) => s.category === 'dining').length },
  ];

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Stays & Dining</h1>
        <p className="text-gray-600">
          Discover sustainable eco-lodges, boutique hotels, and authentic Sri Lankan dining experiences.
          Contact places directly to make reservations.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search stays, restaurants, or locations..."
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === tab.key
                ? 'bg-eco-ocean text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {tab.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeFilter === tab.key ? 'bg-white/20' : 'bg-gray-100'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Results Grid */}
      {filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <StayCard key={place.id} place={place} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <p className="text-5xl mb-4">🏨</p>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No places found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Info Banner */}
      <div className="mt-10 bg-cyan-50 border border-cyan-200 rounded-xl p-6">
        <h3 className="font-semibold text-cyan-800 mb-2">📌 Booking Information</h3>
        <p className="text-sm text-cyan-700">
          EcoLanka does not process bookings or payments. All reservations are made directly with the
          property or restaurant. Click on any listing to find their contact details, phone numbers,
          and website for direct booking.
        </p>
      </div>
    </div>
  );
}
