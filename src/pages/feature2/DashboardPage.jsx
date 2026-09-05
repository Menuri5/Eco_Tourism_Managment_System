/**
 * DashboardPage - Main tourist dashboard displaying welcome message, quick stats, alerts, and recommendations.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDestinations, useCampaigns } from '../../context/GlobalDataContext';
import { HiOutlineMap, HiOutlineTicket, HiOutlineHeart, HiOutlinePencilSquare, HiOutlineSun, HiOutlineCloud, HiOutlineExclamationTriangle } from 'react-icons/hi2';

export default function DashboardPage() {
  const { user } = useAuth();
  const { destinations } = useDestinations();
  const { campaigns } = useCampaigns();
  
  const featuredDestinations = destinations.filter(d => d.isFeatured).slice(0, 4);
  const activeCampaigns = campaigns.filter(c => c.isActive).slice(0, 3);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={user?.avatar || 'https://via.placeholder.com/64'} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name || 'Traveler'}!</h1>
            <p className="text-gray-600">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-cyan-100 p-3 rounded-lg text-eco-ocean"><HiOutlineMap size={24} /></div>
          <div>
            <p className="text-gray-500 text-sm">Destinations Visited</p>
            <p className="text-2xl font-bold text-gray-800">12</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-lg text-eco-forest"><HiOutlineTicket size={24} /></div>
          <div>
            <p className="text-gray-500 text-sm">Active Bookings</p>
            <p className="text-2xl font-bold text-gray-800">3</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-lg text-red-500"><HiOutlineHeart size={24} /></div>
          <div>
            <p className="text-gray-500 text-sm">Favourites</p>
            <p className="text-2xl font-bold text-gray-800">4</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <div className="bg-amber-100 p-3 rounded-lg text-amber-500"><HiOutlinePencilSquare size={24} /></div>
          <div>
            <p className="text-gray-500 text-sm">Reviews Written</p>
            <p className="text-2xl font-bold text-gray-800">4</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2 space-y-8">
          {/* Active Campaigns */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Active Campaigns — Support Conservation</h2>
              <Link to="/campaigns" className="text-eco-ocean hover:underline text-sm font-medium">View All</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCampaigns.map(campaign => (
                <div key={campaign.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                  <img src={campaign.image} alt={campaign.title} className="w-full h-32 object-cover" />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-gray-800 mb-2">{campaign.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-xs font-semibold text-eco-forest">${campaign.raised} / ${campaign.goal}</span>
                      <Link to={`/campaigns/${campaign.id}`} className="bg-eco-ocean hover:bg-cyan-800 text-white px-4 py-1.5 rounded-lg text-sm transition-colors">Donate</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended for You */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Recommended for You</h2>
              <Link to="/recommendations" className="text-eco-ocean hover:underline text-sm font-medium">See More</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredDestinations.map(dest => (
                <Link key={dest.id} to={`/destinations/${dest.id}`} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-40">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <h3 className="font-bold">{dest.name}</h3>
                      <p className="text-xs opacity-90">{dest.location}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-1 space-y-8">
          {/* Weather Alerts */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Weather Forecast</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <HiOutlineSun className="text-amber-500" size={24} />
                  <div>
                    <p className="font-medium text-gray-800">Colombo</p>
                    <p className="text-xs text-gray-500">Sunny</p>
                  </div>
                </div>
                <span className="font-bold text-gray-800">31°C</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <HiOutlineCloud className="text-gray-400" size={24} />
                  <div>
                    <p className="font-medium text-gray-800">Ella</p>
                    <p className="text-xs text-gray-500">Cloudy</p>
                  </div>
                </div>
                <span className="font-bold text-gray-800">22°C</span>
              </div>
              <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div className="flex items-center space-x-3">
                  <HiOutlineCloud className="text-blue-500" size={24} />
                  <div>
                    <p className="font-medium text-gray-800">Galle</p>
                    <p className="text-xs text-gray-500">Rain expected</p>
                  </div>
                </div>
                <span className="font-bold text-gray-800">29°C</span>
              </div>
            </div>
          </section>

          {/* Conservation Alerts */}
          <section className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <HiOutlineExclamationTriangle className="mr-2 text-amber-500" />
              Conservation Alerts
            </h2>
            <div className="space-y-4">
              <div className="bg-amber-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-amber-800">Sea turtle nesting season active in southern coast. Please maintain distance from marked nesting sites.</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-red-800">Coral bleaching watch in Trincomalee. Snorkeling in shallow reefs is temporarily restricted.</p>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <ul className="space-y-3 relative before:absolute before:inset-y-0 before:left-2 before:w-0.5 before:bg-gray-200">
              <li className="relative pl-6">
                <div className="absolute left-1 top-1.5 w-2 h-2 rounded-full bg-eco-ocean"></div>
                <p className="text-sm text-gray-800">Reviewed <strong>Yala National Park</strong></p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </li>
              <li className="relative pl-6">
                <div className="absolute left-1 top-1.5 w-2 h-2 rounded-full bg-eco-ocean"></div>
                <p className="text-sm text-gray-800">Donated to <strong>Save the Elephants</strong></p>
                <p className="text-xs text-gray-500">1 week ago</p>
              </li>
              <li className="relative pl-6">
                <div className="absolute left-1 top-1.5 w-2 h-2 rounded-full bg-eco-ocean"></div>
                <p className="text-sm text-gray-800">Visited <strong>Sigiriya Rock Fortress</strong></p>
                <p className="text-xs text-gray-500">2 weeks ago</p>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
