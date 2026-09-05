/**
 * Category Card component
 */
import React from 'react';
import { Link } from 'react-router-dom';

// Receives one "category" object as a prop
export default function CategoryCard({ category }) {
  
  // Safety check: don't render anything if no category data given
  if (!category) return null;

  return (
    // Whole card is clickable — wrapped in a Link, not just a <div>
    // Clicking it navigates to the destinations page, filtered by this category's slug
    // e.g. /destinations?category=wildlife
    <Link 
      to={`/destinations?category=${category.slug}`}
      className="group block rounded-xl overflow-hidden relative aspect-[4/3] shadow-md hover:shadow-xl transition-all"
      // aspect-[4/3] forces a fixed width:height ratio for the card
      // "group" lets child elements react to hover on this parent (used below)
    >
      {/* Background image */}
      <img 
        src={category.image || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop"} 
        // fallback image if category has none
        alt={category.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        // group-hover:scale-110 -> image zooms in slightly when you hover the card (nice effect)
      />
      
      {/* Dark gradient overlay on top of the image, so white text is readable */}
      {/* Darker at bottom (black/80), fading to transparent at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      {/* Text content, centered on top of the image */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <span className="text-4xl mb-3">{category.icon}</span> {/* emoji or icon character, e.g. 🌊 */}
        <h3 className="text-2xl font-bold text-white text-center mb-1">{category.name}</h3> {/* e.g. "Wildlife" */}
        
        {/* small pill badge showing how many destinations are in this category */}
        <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/30">
          {category.count} Destinations
        </span>
      </div>
    </Link>
  );
}