/**
 * Review Card component
 */
import React from 'react';
import { HiStar, HiHandThumbUp } from 'react-icons/hi2';

export default function ReviewCard({ review }) {
  if (!review) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={review.avatar || "https://ui-avatars.com/api/?name=" + review.userName} 
            alt={review.userName}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h4 className="font-bold text-gray-900 text-sm">{review.userName}</h4>
            <p className="text-xs text-gray-500">{review.date}</p>
          </div>
        </div>
        <div className="flex text-amber-500">
          {[...Array(5)].map((_, i) => (
            <HiStar key={i} className={`h-4 w-4 ${i < review.rating ? 'text-amber-500' : 'text-gray-200'}`} />
          ))}
        </div>
      </div>
      
      <h5 className="font-bold text-gray-800 mb-2">{review.title}</h5>
      <p className="text-gray-600 text-sm mb-4">{review.text}</p>
      
      <div className="flex items-center text-gray-500 text-xs">
        <button className="flex items-center gap-1 hover:text-eco-ocean transition-colors">
          <HiHandThumbUp className="h-4 w-4" />
          <span>Helpful ({review.helpful})</span>
        </button>
      </div>
    </div>
  );
}
