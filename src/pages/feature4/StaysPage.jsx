/**
 * StaysPage — Main listing page for Stays & Dining.
 * This page displays all available stays and dining places.
 * Users can search for places and filter them by category.
 */

import React, { useState, useMemo } from 'react';

// Import the Stays Context.
// This gives us access to the stays data from the application.
import { useStays } from '../../context/StaysContext';

// Import the StayCard component.
// This component is used to display each stay or restaurant.
import StayCard from '../../components/StayCard';

// Import the SearchBar component.
// This component is used to search for stays, restaurants, or locations.
import SearchBar from '../../components/SearchBar';


// Main StaysPage component
export default function StaysPage() {

  // Get the stays data from StaysContext.
  // "stays" contains all available stays and dining places.
  const { stays } = useStays();

  // Store the currently selected category filter.
  // "all" means no category filter is selected.
  const [activeFilter, setActiveFilter] = useState('all');

  // Store the text entered in the search box.
  const [searchQuery, setSearchQuery] = useState('');


  // Filter the places according to category and search text.
  // useMemo helps to calculate the filtered list only when
  // activeFilter or searchQuery changes.
  const filteredPlaces = useMemo(() => {

    // Go through every place in the stays array.
    return stays.filter((place) => {

      // Check whether the place belongs to the selected category.
      // If "all" is selected, every category is accepted.
      const matchesCategory =
        activeFilter === 'all' ||
        place.category === activeFilter;


      // Check whether the place matches the search text.
      // The search checks:
      // 1. Place name
      // 2. Location
      // 3. Type
      const matchesSearch =
        !searchQuery ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.type.toLowerCase().includes(searchQuery.toLowerCase());


      // A place will be displayed only if it matches
      // both the category and search conditions.
      return matchesCategory && matchesSearch;
    });

  // Recalculate the filtered places when these values change.
  }, [activeFilter, searchQuery]);


  // Create the filter buttons used at the top of the page.
  // Each button also shows the number of places in that category.
  const filterTabs = [

    // Show all places.
    { key: 'all', label: 'All Places', count: stays.length },

    // Show only stays and hotels.
    {
      key: 'stay',
      label: 'Stays & Hotels',
      count: stays.filter((s) => s.category === 'stay').length
    },

    // Show only dining places and restaurants.
    {
      key: 'dining',
      label: 'Dining & Restaurants',
      count: stays.filter((s) => s.category === 'dining').length
    },
  ];


  // Return the page UI.
  return (
    <div className="animate-fade-in">

      {/* Page Header
          Displays the main title and a short description. */}
      <div className="mb-8">

        {/* Main page title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Stays & Dining
        </h1>

        {/* Short description about the page */}
        <p className="text-gray-600">
          Discover sustainable eco-lodges, boutique hotels, and authentic Sri Lankan dining experiences.
          Contact places directly to make reservations.
        </p>

      </div>


      {/* Search Bar
          Allows users to search for a place by name, location, or type. */}
      <div className="mb-6">

        <SearchBar
          // Current search value
          value={searchQuery}

          // Update searchQuery when the user types something.
          onChange={(e) => setSearchQuery(e.target.value)}

          // Text displayed inside the search box.
          placeholder="Search stays, restaurants, or locations..."
        />

      </div>


      {/* Filter Tabs
          These buttons allow users to filter places by category. */}
      <div className="flex flex-wrap gap-2 mb-8">

        {/* Create one button for each filter tab. */}
        {filterTabs.map((tab) => (

          <button
            // React needs a unique key for each button.
            key={tab.key}

            // Change the active filter when the button is clicked.
            onClick={() => setActiveFilter(tab.key)}

            // Change the button style depending on whether
            // it is currently selected or not.
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              activeFilter === tab.key
                ? 'bg-eco-ocean text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >

            {/* Display the filter name. */}
            {tab.label}

            {/* Display the number of places in this category. */}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeFilter === tab.key ? 'bg-white/20' : 'bg-gray-100'
            }`}>
              {tab.count}
            </span>

          </button>
        ))}

      </div>


      {/* Results Grid
          If places are found, display them in a responsive grid.
          If no places are found, display a "No places found" message. */}

      {filteredPlaces.length > 0 ? (

        // Display the filtered places.
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Create a StayCard for every filtered place. */}
          {filteredPlaces.map((place) => (

            <StayCard
              // Use the place ID as the unique React key.
              key={place.id}

              // Send the place information to StayCard.
              place={place}
            />

          ))}

        </div>

      ) : (

        // This section is displayed when there are no matching places.
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">

          {/* Hotel emoji used as a visual icon. */}
          <p className="text-5xl mb-4">🏨</p>

          {/* Message shown when no places are found. */}
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No places found
          </h3>

          {/* Helpful message for the user. */}
          <p className="text-gray-500">
            Try adjusting your search or filter criteria.
          </p>

        </div>
      )}


      {/* Info Banner
          Gives users important information about the booking system. */}
      <div className="mt-10 bg-cyan-50 border border-cyan-200 rounded-xl p-6">

        {/* Banner title */}
        <h3 className="font-semibold text-cyan-800 mb-2">
          📌 Booking Information
        </h3>

        {/* Booking information message */}
        <p className="text-sm text-cyan-700">
          EcoLanka does not process bookings or payments. All reservations are made directly with the
          property or restaurant. Click on any listing to find their contact details, phone numbers,
          and website for direct booking.
        </p>

      </div>

    </div>
  );
}