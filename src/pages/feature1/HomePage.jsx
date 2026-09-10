/**
 * HomePage component for the EcoLanka project.
 * The main landing page featuring hero section, featured destinations, categories, and campaigns.
 */
// Import React so this file can use JSX
import React from 'react';
// Link is used for navigation buttons without reloading the page
import { Link } from 'react-router-dom';
// Review data loaded from a local data file (used in the Testimonials section)
import { reviews } from '../../data/reviews';
// Reusable card components shared with other pages
import DestinationCard from '../../components/DestinationCard';
import CategoryCard from '../../components/CategoryCard';
import CampaignCard from '../../components/CampaignCard';
// Search bar component shown inside the hero section
import SearchBar from '../../components/SearchBar';
// Icons used in the "Why Travel With EcoLanka" section
import { HiOutlineGlobeAlt, HiOutlineUserGroup, HiOutlineHeart } from 'react-icons/hi2';
// Custom hooks that give access to shared destinations, categories and campaigns data from GlobalDataContext
import { useDestinations, useCategories, useCampaigns } from '../../context/GlobalDataContext';

// HomePage component - the main landing page of the website
export default function HomePage() {
  // Get the full lists of destinations, categories and campaigns from the global context
  const { destinations } = useDestinations();
  const { categories } = useCategories();
  const { campaigns } = useCampaigns();

  // Only destinations marked as featured, limited to the first 4
  const featuredDestinations = destinations.filter(d => d.isFeatured).slice(0, 4);
  // Only campaigns that are currently active, limited to the first 3
  const activeCampaigns = campaigns.filter(c => c.isActive).slice(0, 3);
  // Only reviews rated 4 stars or higher, limited to the first 3
  const topReviews = reviews.filter(r => r.rating >= 4).slice(0, 3);

  // Render the page. The outer div stacks all sections vertically on a light gray background
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* 600px tall banner with the content centered */}
      <section className="relative h-[600px] flex items-center justify-center">
        {/* Background layer: sits behind the content (z-0) and fills the whole section */}
        <div className="absolute inset-0 z-0">
          {/* Placeholder background image from picsum.photos */}
          <img 
            src="https://picsum.photos/seed/srilanka-hero/1920/800" 
            alt="Sri Lanka landscape" 
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay (dark at the bottom, clear at the top) so the white text is easy to read */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
        
        {/* Hero content: placed above the background (z-10) */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          {/* Main heading - the line break only appears on medium screens and up */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover Sri Lanka <br className="hidden md:block"/> Sustainably
          </h1>
          {/* Short description under the heading */}
          <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Experience the pristine beauty of our island while protecting its environment and empowering local communities.
          </p>
          
          {/* Frosted glass box (semi-transparent white with blur) holding the search bar */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl mb-8 max-w-3xl mx-auto border border-white/20">
             <SearchBar />
          </div>
          
          {/* Call-to-action buttons: stacked on mobile, side by side on small screens and up */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary button - goes to the destinations page */}
            <Link to="/destinations" className="bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-8 py-3.5 font-medium transition-colors text-lg shadow-lg">
              Explore Destinations
            </Link>
            {/* Secondary transparent button - goes to the campaigns page */}
            <Link to="/campaigns" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/50 text-white rounded-lg px-8 py-3.5 font-medium transition-colors text-lg">
              Join a Campaign
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        {/* Section header: title on the left, "View All" link on the right */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Eco-Destinations</h2>
            <p className="text-gray-600">Discover our carefully curated sustainable spots.</p>
          </div>
          {/* "View All" link for larger screens (hidden on mobile) */}
          <Link to="/destinations" className="text-eco-ocean font-medium hover:underline hidden sm:block">
            View All Destinations &rarr;
          </Link>
        </div>
        
        {/* Destination cards grid: 1 column on mobile, 2 on medium, 4 on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create one DestinationCard for each featured destination */}
          {featuredDestinations.map(destination => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
        {/* "View All" link for mobile only (shown under the cards, hidden on larger screens) */}
        <div className="mt-6 text-center sm:hidden">
          <Link to="/destinations" className="text-eco-ocean font-medium hover:underline">
            View All Destinations &rarr;
          </Link>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="py-20 bg-white px-4 w-full">
        {/* Centered container with a maximum width */}
        <div className="max-w-7xl mx-auto">
          {/* Section heading and description */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Explore by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find the perfect sustainable experience that matches your interests.</p>
          </div>
          
          {/* Category cards grid: 1 column on mobile, 2 on small, 3 on large screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Show only the first 6 categories, one CategoryCard each */}
            {categories.slice(0, 6).map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Why EcoLanka */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        {/* Section heading and description */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Travel With EcoLanka</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We are committed to making your journey meaningful and responsible.</p>
        </div>
        
        {/* Three feature columns: stacked on mobile, side by side on medium screens and up */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Feature 1: Sustainable Travel (globe icon) */}
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-cyan-50 rounded-full flex items-center justify-center mb-6 text-eco-ocean">
              <HiOutlineGlobeAlt className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Sustainable Travel</h3>
            <p className="text-gray-600">Every destination is vetted for strict environmental standards to minimize your carbon footprint.</p>
          </div>
          {/* Feature 2: Local Guides (group icon) */}
          <div className="flex flex-col items-center">
            <div className="h-20 w-20 bg-green-50 rounded-full flex items-center justify-center mb-6 text-eco-forest">
              <HiOutlineUserGroup className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Local Guides</h3>
            <p className="text-gray-600">Connect with knowledgeable local experts who share their culture and ensure community benefit.</p>
          </div>
          {/* Feature 3: Conservation Impact (heart icon) */}
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
      {/* Section with a very light forest-green background (5% opacity) */}
      <section className="py-20 bg-eco-forest/5 px-4 w-full">
        <div className="max-w-7xl mx-auto">
          {/* Section header: title on the left, "View All" link on the right */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Active Conservation Campaigns</h2>
              <p className="text-gray-600">Support ongoing efforts to protect Sri Lanka's natural heritage.</p>
            </div>
            {/* "View All" link (hidden on mobile) */}
            <Link to="/campaigns" className="text-eco-forest font-medium hover:underline hidden sm:block">
              View All Campaigns &rarr;
            </Link>
          </div>
          
          {/* Campaign cards grid: 1 column on mobile, 3 on medium screens and up */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Create one CampaignCard for each active campaign */}
            {activeCampaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Travelers Say</h2>
        </div>
        
        {/* Review cards grid: 1 column on mobile, 3 on medium screens and up */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Create one review card for each top review */}
          {topReviews.map(review => (
            <div key={review.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              {/* Reviewer info: round profile picture, name and visited destination */}
              <div className="flex items-center gap-4 mb-4">
                <img src={review.avatar} alt={review.userName} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-bold text-gray-800">{review.userName}</h4>
                  <p className="text-sm text-gray-500 text-xs">Visited {review.destinationName}</p>
                </div>
              </div>
              {/* Star rating row */}
              <div className="flex text-yellow-400 mb-3">
                {/* Draw 5 stars. Stars with index below the rating are filled yellow, the rest are gray */}
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {/* Review title and review text (shown in italics inside quotes) */}
              <h5 className="font-semibold text-gray-800 mb-2">{review.title}</h5>
              <p className="text-gray-600 italic">"{review.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      {/* Call-to-action banner at the bottom of the page asking visitors to sign up */}
      <section className="bg-eco-ocean py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to explore Sri Lanka sustainably?</h2>
          <p className="text-cyan-100 mb-8 text-lg">Join our community of responsible travelers and make a positive impact.</p>
          {/* Button-style link that goes to the register page */}
          <Link to="/register" className="inline-block bg-white text-eco-ocean font-bold rounded-lg px-8 py-4 hover:bg-gray-100 transition-colors shadow-lg">
            Create Your Account Today
          </Link>
        </div>
      </section>
    </div>
  );
}