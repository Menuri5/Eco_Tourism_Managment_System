/**
 * Guide Card component
 */
import React from 'react';
import { HiMapPin, HiStar, HiLanguage } from 'react-icons/hi2';
// location icon, star icon, language icon (note: HiLanguage is imported but not actually used below — unused import)

// Receives one "guide" object as a prop
export default function GuideCard({ guide }) {
  
  // Safety check: don't render if no guide data given
  if (!guide) return null;

  return (
    // NOTE: unlike CampaignCard/DestinationCard, this is a plain <div>, NOT a <Link>
    // So this whole card is NOT clickable by itself — only the "View Profile" button would need its own onClick/Link (currently missing, see note below)
    <div className="rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white p-6 flex flex-col items-center text-center h-full">
      
      {/* Avatar photo, circular */}
      <img 
        src={guide.avatar || "https://ui-avatars.com/api/?name=" + guide.name} 
        // fallback: if guide has no avatar image, auto-generate one using their name
        // (ui-avatars.com creates a letter-based avatar, e.g. "JD" for John Doe)
        alt={guide.name} 
        className="h-24 w-24 rounded-full object-cover mb-4 border-4 border-gray-50 shadow-sm"
      />
      
      <h3 className="text-xl font-bold text-gray-800">{guide.name}</h3>
      <p className="text-eco-ocean font-medium text-sm mb-2">{guide.specialization}</p>
      {/* e.g. specialization = "Wildlife Photography Tours" */}
      
      {/* Location row with pin icon */}
      <div className="flex items-center text-gray-500 text-sm mb-3">
        <HiMapPin className="h-4 w-4 mr-1" />
        <span>{guide.location}</span>
      </div>
      
      {/* Rating pill: star + rating number + review count + years of experience, all in one row */}
      <div className="flex items-center justify-center bg-gray-50 px-3 py-1.5 rounded-full mb-4">
        <HiStar className="text-amber-500 h-4 w-4 mr-1" />
        <span className="font-semibold text-gray-700 mr-1">{guide.rating}</span>
        <span className="text-gray-400 text-xs">({guide.reviewCount} reviews) • {guide.experience} yrs exp</span>
      </div>
      
      {/* Language tags — small pills, one per language the guide speaks */}
      <div className="flex flex-wrap justify-center gap-1 mb-6">
        {guide.languages?.map(lang => (
          // "?." (optional chaining) = if guide.languages is undefined/null, skip mapping instead of crashing
          <span key={lang} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-50 text-cyan-700 border border-cyan-100">
            {lang} {/* e.g. "English", "Sinhala", "Tamil" */}
          </span>
        ))}
      </div>
      
      {/* Bottom row: price + "View Profile" button, pushed to bottom via mt-auto */}
      <div className="mt-auto w-full pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="text-left">
          <p className="text-xs text-gray-500">Starting from</p>
          <p className="font-bold text-gray-900">
            ${guide.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span>
          </p>
        </div>
        <button className="border border-eco-ocean text-eco-ocean hover:bg-cyan-50 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
          View Profile
        </button>
      </div>
    </div>
  );
}