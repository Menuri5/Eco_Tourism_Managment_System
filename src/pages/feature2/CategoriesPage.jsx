/**
 * CategoriesPage - Browse destinations by categories.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../context/GlobalDataContext';
// Icon library import (HeroIcons can be used for UI enhancement)
import * as HeroIcons from 'react-icons/hi2';

export default function CategoriesPage() {
  // Retrieve the categories list from global state
  const { categories } = useCategories();
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Section: Main title and brief introduction */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Explore by Category</h1>
        <p className="text-gray-600">Discover eco-friendly travel experiences tailored to your interests. From dense jungles to pristine beaches, find your perfect getaway.</p>
      </div>
      {/* Categories Grid: Responsive grid layout*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <Link key={category.id} to={`/destinations?category=${category.id}`} className="group relative rounded-xl overflow-hidden shadow-md block h-64">
            {/* Category Background Image with smooth zoom effect on hover */}
            <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {/* Dark Gradient Overlay for text contrast and readability */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
            {/* Card Content: Category details placed at the bottom */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h2 className="text-2xl font-bold text-white mb-2">{category.name}</h2>
              <p className="text-white/90 text-sm mb-3 line-clamp-2">{category.description}</p>
              {/* Destination counter with an animated directional arrow */}
              <div className="flex items-center text-white/80 text-sm font-medium">
                <span>{category.count} Destinations</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
