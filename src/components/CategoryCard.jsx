/**
 * Category Card component
 */
import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  if (!category) return null;

  return (
    <Link 
      to={`/destinations?category=${category.slug}`}
      className="group block rounded-xl overflow-hidden relative aspect-[4/3] shadow-md hover:shadow-xl transition-all"
    >
      <img 
        src={category.image || "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=600&auto=format&fit=crop"} 
        alt={category.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <span className="text-4xl mb-3">{category.icon}</span>
        <h3 className="text-2xl font-bold text-white text-center mb-1">{category.name}</h3>
        <span className="bg-white/20 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full border border-white/30">
          {category.count} Destinations
        </span>
      </div>
    </Link>
  );
}
