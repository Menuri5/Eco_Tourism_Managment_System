/**
 * Guide Card component
 */
import React from 'react';
import { HiMapPin, HiStar, HiLanguage } from 'react-icons/hi2';

export default function GuideCard({ guide }) {
  if (!guide) return null;

  return (
    <div className="rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white p-6 flex flex-col items-center text-center h-full">
      <img 
        src={guide.avatar || "https://ui-avatars.com/api/?name=" + guide.name} 
        alt={guide.name} 
        className="h-24 w-24 rounded-full object-cover mb-4 border-4 border-gray-50 shadow-sm"
      />
      <h3 className="text-xl font-bold text-gray-800">{guide.name}</h3>
      <p className="text-eco-ocean font-medium text-sm mb-2">{guide.specialization}</p>
      
      <div className="flex items-center text-gray-500 text-sm mb-3">
        <HiMapPin className="h-4 w-4 mr-1" />
        <span>{guide.location}</span>
      </div>
      
      <div className="flex items-center justify-center bg-gray-50 px-3 py-1.5 rounded-full mb-4">
        <HiStar className="text-amber-500 h-4 w-4 mr-1" />
        <span className="font-semibold text-gray-700 mr-1">{guide.rating}</span>
        <span className="text-gray-400 text-xs">({guide.reviewCount} reviews) • {guide.experience} yrs exp</span>
      </div>
      
      <div className="flex flex-wrap justify-center gap-1 mb-6">
        {guide.languages?.map(lang => (
          <span key={lang} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-50 text-cyan-700 border border-cyan-100">
            {lang}
          </span>
        ))}
      </div>
      
      <div className="mt-auto w-full pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="text-left">
          <p className="text-xs text-gray-500">Starting from</p>
          <p className="font-bold text-gray-900">${guide.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></p>
        </div>
        <button className="border border-eco-ocean text-eco-ocean hover:bg-cyan-50 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );
}
