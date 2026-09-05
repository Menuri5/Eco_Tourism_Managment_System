/**
 * CampaignsPage - List of conservation campaigns.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCampaigns } from '../../context/GlobalDataContext';

export default function CampaignsPage() {
  const { campaigns } = useCampaigns();
  const [activeTab, setActiveTab] = useState('active');

  const filteredCampaigns = campaigns.filter(c => 
    activeTab === 'active' ? c.isActive : !c.isActive
  );

  const totalRaised = campaigns.reduce((acc, curr) => acc + curr.raised, 0);
  const totalDonors = campaigns.reduce((acc, curr) => acc + curr.donors, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Conservation Campaigns</h1>
        <p className="text-gray-600 mt-2">Support local initiatives to protect biodiversity and natural habitats.</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-eco-forest text-white rounded-2xl p-8 shadow-lg">
        <div className="text-center">
          <p className="text-eco-forest-light font-medium mb-1">Total Raised</p>
          <p className="text-4xl font-bold">${totalRaised.toLocaleString()}</p>
        </div>
        <div className="text-center border-y md:border-y-0 md:border-x border-white/20 py-4 md:py-0">
          <p className="text-eco-forest-light font-medium mb-1">Supporters</p>
          <p className="text-4xl font-bold">{totalDonors.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-eco-forest-light font-medium mb-1">Active Projects</p>
          <p className="text-4xl font-bold">{campaigns.filter(c => c.isActive).length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('active')}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === 'active' ? 'text-eco-ocean' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Active Campaigns
          {activeTab === 'active' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-eco-ocean"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('completed')}
          className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === 'completed' ? 'text-eco-ocean' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Completed
          {activeTab === 'completed' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-eco-ocean"></div>}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map(campaign => (
          <div key={campaign.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
            <Link to={`/campaigns/${campaign.id}`} className="relative h-48 overflow-hidden block">
              <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded text-xs font-bold text-gray-800">
                {campaign.category}
              </div>
            </Link>
            <div className="p-5 flex flex-col flex-grow">
              <Link to={`/campaigns/${campaign.id}`}>
                <h3 className="font-bold text-xl text-gray-800 mb-2 hover:text-eco-ocean transition-colors">{campaign.title}</h3>
              </Link>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">{campaign.description}</p>
              
              <div className="mt-auto space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-bold text-eco-forest">${campaign.raised.toLocaleString()} raised</span>
                    <span className="text-gray-500">of ${campaign.goal.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-eco-forest h-2 rounded-full" style={{ width: `${Math.min(100, (campaign.raised / campaign.goal) * 100)}%` }}></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    <span className="font-bold text-gray-800">{campaign.donors}</span> donors
                  </div>
                  {campaign.isActive && (
                    <div className="text-xs text-gray-500">
                      <span className="font-bold text-gray-800">{campaign.daysLeft}</span> days left
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredCampaigns.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No campaigns found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
