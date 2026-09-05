/**
 * Campaign Card component
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { HiUsers, HiClock } from 'react-icons/hi2';

export default function CampaignCard({ campaign }) {
  if (!campaign) return null;

  const progress = Math.min(100, Math.round((campaign.raised / campaign.goal) * 100));

  return (
    <div className="rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        <img 
          src={campaign.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop"} 
          alt={campaign.title} 
          className="w-full h-full object-cover"
        />
        {!campaign.isActive && (
          <div className="absolute top-4 right-4 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
            Completed
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-eco-forest/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded shadow-sm">
            {campaign.category || 'Conservation'}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-xs text-gray-500 mb-1">Organized by {campaign.organizer}</p>
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2 mb-3" title={campaign.title}>
          {campaign.title}
        </h3>
        
        <div className="mt-auto">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-semibold text-gray-800">${campaign.raised.toLocaleString()} raised</span>
            <span className="text-gray-500">of ${campaign.goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-eco-forest h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          
          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <HiUsers className="h-4 w-4 mr-1" />
              <span>{campaign.donors} Donors</span>
            </div>
            {campaign.isActive && (
              <div className="flex items-center">
                <HiClock className="h-4 w-4 mr-1" />
                <span>{campaign.daysLeft} days left</span>
              </div>
            )}
          </div>
          
          <Link 
            to={`/campaigns/${campaign.id}`}
            className={`block w-full text-center rounded-lg px-6 py-2.5 font-medium transition-colors ${
              campaign.isActive 
                ? 'bg-eco-ocean hover:bg-cyan-800 text-white' 
                : 'bg-gray-100 text-gray-500 cursor-default'
            }`}
          >
            {campaign.isActive ? 'Donate Now' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
}
