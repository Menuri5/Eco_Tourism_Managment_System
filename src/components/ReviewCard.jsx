/**
 * Review Card component
 */
import React from 'react';
import { HiStar, HiHandThumbUp } from 'react-icons/hi2'; // star icon (rating), thumbs-up icon (helpful button)

// Receives one "review" object as a prop
export default function ReviewCard({ review }) {
  
  // Safety check: don't render if no review data given
  if (!review) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      
      {/* ---- Top row: reviewer avatar + name + date (left) vs star rating (right) ---- */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={review.avatar || "https://ui-avatars.com/api/?name=" + review.userName} 
            // same avatar fallback trick as GuideCard/Header — auto-generates one from the name if none provided
            alt={review.userName}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{review.userName}</h4>
            <p className="text-xs text-gray-500">{review.date}</p>
          </div>
        </div>
        
        {/* Star rating display (read-only, unlike FilterPanel's clickable stars) */}
        <div className="flex text-amber-500">
          {/* [...Array(5)] creates an array of 5 empty slots: [undefined, undefined, undefined, undefined, undefined] */}
          {/* just a trick to loop exactly 5 times without needing real data */}
          {[...Array(5)].map((_, i) => (
            <HiStar 
              key={i} 
              // i is 0,1,2,3,4 -> compare against review.rating (e.g. rating=4 means stars at index 0,1,2,3 are filled)
              className={`h-4 w-4 ${i < review.rating ? 'text-amber-500' : 'text-gray-200'}`} 
            />
          ))}
        </div>
      </div>
      
      {/* ---- Review content ---- */}
      <h5 className="font-bold text-gray-800 mb-2">{review.title}</h5>
      <p className="text-gray-600 text-sm mb-4">{review.text}</p>
      
      {/* ---- "Helpful" button with count ---- */}
      <div className="flex items-center text-gray-500 text-xs">
        <button className="flex items-center gap-1 hover:text-eco-ocean transition-colors">
          <HiHandThumbUp className="h-4 w-4" />
          <span>Helpful ({review.helpful})</span>
        </button>
      </div>
    </div>
  );
}