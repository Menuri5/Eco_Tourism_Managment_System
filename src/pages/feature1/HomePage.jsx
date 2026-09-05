/**
 * HomePage component for the EcoLanka project.
 * The main landing page featuring hero section, featured destinations, categories, and campaigns.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { reviews } from '../../data/reviews';
import DestinationCard from '../../components/DestinationCard';
import CategoryCard from '../../components/CategoryCard';
import CampaignCard from '../../components/CampaignCard';
import SearchBar from '../../components/SearchBar';
import { HiOutlineGlobeAlt, HiOutlineUserGroup, HiOutlineHeart } from 'react-icons/hi2';
import { useDestinations, useCategories, useCampaigns } from '../../context/GlobalDataContext';

export default function HomePage() {
  const { destinations } = useDestinations();
  const { categories } = useCategories();
  const { campaigns } = useCampaigns();

  const featuredDestinations = destinations.filter(d => d.isFeatured).slice(0, 4);
  const activeCampaigns = campaigns.filter(c => c.isActive).slice(0, 3);
  const topReviews = reviews.filter(r => r.rating >= 4).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/srilanka-hero/1920/800" 
            alt="Sri Lanka landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Sri Lanka <br className="hidden md:block"/> Sustainably
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Experience the pristine beauty of our island while protecting its environment and empowering local communities.
          </p>
          
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl mb-8 max-w-3xl mx-auto border border-white/20">
             <SearchBar />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/destinations" className="bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-8 py-3.5 font-medium transition-colors text-lg shadow-lg">
              Explore Destinations
            </Link>
            <Link to="/campaigns" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/50 text-white rounded-lg px-8 py-3.5 font-medium transition-colors text-lg">
              Join a Campaign
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Eco-Destinations</h2>
            <p className="text-gray-600">Discover our carefully curated sustainable spots.</p>
          </div>
          <Link to="/destinations" className="text-eco-ocean font-medium hover:underline hidden sm:block">
            View All Destinations &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map(destination => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
        <div className="mt-6 text-center sm:hidden">
          <Link to="/destinations" className="text-eco-ocean font-medium hover:underline">
            View All Destinations &rarr;
          </Link>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="py-20 bg-white px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Explore by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find the perfect sustainable experience that matches your interests.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(0, 6).map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Why EcoLanka */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Travel With EcoLanka</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We are committed to making your journey meaningful and responsible.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-cyan-50 rounded-full flex items-center justify-center mb-6 text-eco-ocean">
              <HiOutlineGlobeAlt className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Sustainable Travel</h3>
            <p className="text-gray-600">Every destination is vetted for strict environmental standards to minimize your carbon footprint.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center mb-6 text-eco-forest">
              <HiOutlineUserGroup className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Local Guides</h3>
            <p className="text-gray-600">Connect with knowledgeable local experts who share their culture and ensure community benefit.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-amber-50 rounded-full flex items-center justify-center mb-6 text-eco-sunset">
              <HiOutlineHeart className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Conservation Impact</h3>
            <p className="text-gray-600">A portion of your booking directly funds local wildlife and habitat conservation projects.</p>
          </div>
        </div>
      </section>

      {/* Active Campaigns */}
      <section className="py-20 bg-eco-forest/5 px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Active Conservation Campaigns</h2>
              <p className="text-gray-600">Support ongoing efforts to protect Sri Lanka's natural heritage.</p>
            </div>
            <Link to="/campaigns" className="text-eco-forest font-medium hover:underline hidden sm:block">
              View All Campaigns &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeCampaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Travelers Say</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topReviews.map(review => (
            <div key={review.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <img src={review.avatar} alt={review.userName} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-bold text-gray-800">{review.userName}</h4>
                  <p className="text-sm text-gray-500 text-xs">Visited {review.destinationName}</p>
                </div>
              </div>
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">{review.title}</h5>
              <p className="text-gray-600 italic">"{review.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-eco-ocean py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to explore Sri Lanka sustainably?</h2>
          <p className="text-cyan-100 mb-8 text-lg">Join our community of responsible travelers and make a positive impact.</p>
          <Link to="/register" className="inline-block bg-white text-eco-ocean font-bold rounded-lg px-8 py-4 hover:bg-gray-100 transition-colors shadow-lg">
            Create Your Account Today
          </Link>
        </div>
      </section>
    </div>
  );
}
