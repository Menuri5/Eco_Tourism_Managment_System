/**
 * GuidesPage - Directory of local certified eco-guides.
 */
import React, { useState } from 'react';
import { useGuides } from '../../context/GlobalDataContext';
import { HiStar, HiOutlineChatBubbleLeftRight, HiOutlineShieldCheck } from 'react-icons/hi2';

export default function GuidesPage() {
  const { guides } = useGuides();
  const [filter, setFilter] = useState('all');

  const filteredGuides = filter === 'all' 
    ? guides 
    : guides.filter(g => g.specialization.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-800">Local Eco-Guides</h1>
          <p className="text-gray-600 mt-2">Connect with certified local experts who are passionate about preserving their environment and sharing authentic experiences.</p>
        </div>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-ocean bg-white w-full md:w-auto"
        >
          <option value="all">All Specializations</option>
          <option value="wildlife">Wildlife</option>
          <option value="botany">Botany</option>
          <option value="history">History</option>
        </select>
      </div>

      <div className="bg-cyan-50 border border-cyan-100 rounded-xl p-4 flex items-start">
        <HiOutlineShieldCheck className="text-eco-ocean flex-shrink-0 text-2xl mr-3" />
        <p className="text-sm text-cyan-800">All guides listed here are officially certified EcoLanka partners, trained in sustainable tourism practices and local conservation protocols.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map(guide => (
          <div key={guide.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
            <div className="p-6 border-b border-gray-100 flex items-center space-x-4">
              <img src={guide.avatar} alt={guide.name} className="w-20 h-20 rounded-full object-cover border-4 border-gray-50" />
              <div>
                <h3 className="font-bold text-xl text-gray-800">{guide.name}</h3>
                <p className="text-sm text-eco-ocean font-medium">{guide.specialization}</p>
                <div className="flex items-center text-sm mt-1">
                  <HiStar className="text-amber-500 mr-1" />
                  <span className="font-bold mr-1">{guide.rating}</span>
                  <span className="text-gray-500">({guide.reviewCount})</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{guide.bio}</p>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {guide.languages.map(lang => (
                      <span key={lang} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">{lang}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Experience</p>
                  <p className="text-sm text-gray-800 font-medium">{guide.experience}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div>
                  <p className="text-2xl font-bold text-gray-800">${guide.pricePerDay}</p>
                  <p className="text-xs text-gray-500">per day</p>
                </div>
                <button className="bg-white border-2 border-eco-ocean text-eco-ocean hover:bg-cyan-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                  <HiOutlineChatBubbleLeftRight className="mr-2" /> Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
