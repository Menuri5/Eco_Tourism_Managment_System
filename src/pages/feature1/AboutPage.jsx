/**
 * AboutPage component for the EcoLanka project.
 * Displays information about the platform's mission, vision, team, and sustainability commitments.
 */
// Import React so this file can use JSX
import React from 'react';
// Import outline icons (Heroicons v2) from react-icons, used in the Mission, Vision and Values sections
import { HiOutlineGlobeEuropeAfrica, HiOutlineShieldCheck, HiOutlineUsers, HiOutlineSparkles } from 'react-icons/hi2';

// AboutPage is a static page: it has no state or props and only displays content
export default function AboutPage() {
  // Render the page. The outer div gives a light gray background that covers at least the full screen height
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      {/* Ocean-colored banner at the top of the page with the page title */}
      <div className="relative bg-eco-ocean text-white py-24 text-center px-4">
        {/* Background image layer: covers the whole banner, sits behind the text (z-0) and is faded to 20% opacity */}
        <div className="absolute inset-0 z-0 opacity-20">
            {/* Placeholder background image from picsum.photos */}
            <img src="https://picsum.photos/seed/forest-pattern/1920/400" alt="Pattern" className="w-full h-full object-cover" />
        </div>
        {/* Banner text: placed above the background image (z-10) and centered with a max width */}
        <div className="relative z-10 max-w-3xl mx-auto">
            {/* Page title - larger text on medium screens and up */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About EcoLanka</h1>
            {/* Short tagline under the title */}
            <p className="text-xl text-cyan-50">Promoting responsible travel that preserves our natural heritage and empowers local communities.</p>
        </div>
      </div>

      {/* Main content container: centered on the page with a maximum width and padding */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Mission Statement */}
        {/* White card: items stack vertically on mobile and sit side by side (text left, image right) on medium screens and up */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            {/* Left column: icon, heading and mission text (half width on medium screens) */}
            <div className="md:w-1/2">
                {/* Round light-green circle holding the globe icon */}
                <div className="h-16 w-16 bg-eco-forest-light/20 text-eco-forest rounded-full flex items-center justify-center mb-6">
                    <HiOutlineGlobeEuropeAfrica className="h-8 w-8" />
                </div>
                {/* Mission heading */}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                {/* Mission description paragraph */}
                <p className="text-gray-600 text-lg leading-relaxed">
                    EcoLanka was founded with a single purpose: to transform tourism in Sri Lanka from a consumptive industry into a regenerative force. We bridge the gap between conscientious travelers and sustainable local initiatives, ensuring that every journey contributes positively to our island's biodiversity and cultural richness.
                </p>
            </div>
            {/* Right column: mission image (half width on medium screens) */}
            <div className="md:w-1/2">
                {/* Placeholder image from picsum.photos with rounded corners and a shadow */}
                <img src="https://picsum.photos/seed/mission/600/400" alt="Our Mission" className="rounded-xl shadow-md w-full h-auto" />
            </div>
        </div>

        {/* Vision & Values */}
        {/* Grid: one column on mobile, two cards side by side on medium screens and up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Vision card */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 h-full">
                {/* Card header: sparkles icon next to the heading */}
                <div className="flex items-center gap-4 mb-6">
                    <HiOutlineSparkles className="h-8 w-8 text-eco-sunset" />
                    <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
                </div>
                {/* Vision description */}
                <p className="text-gray-600">
                    To make Sri Lanka the premier destination for sustainable eco-tourism globally, where the environment thrives, communities prosper, and travelers experience authentic, guilt-free exploration.
                </p>
            </div>
            {/* Values card */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 h-full">
                {/* Card header: shield icon next to the heading */}
                <div className="flex items-center gap-4 mb-6">
                    <HiOutlineShieldCheck className="h-8 w-8 text-eco-ocean" />
                    <h2 className="text-2xl font-bold text-gray-800">Our Values</h2>
                </div>
                {/* List of core values - each item has a colored bullet and a short description */}
                <ul className="text-gray-600 space-y-3">
                    {/* Value 1: Conservation First */}
                    <li className="flex items-start gap-2">
                        <span className="text-eco-ocean font-bold">&bull;</span>
                        <span><strong>Conservation First:</strong> We prioritize environmental protection above profit.</span>
                    </li>
                    {/* Value 2: Community Empowerment */}
                    <li className="flex items-start gap-2">
                        <span className="text-eco-ocean font-bold">&bull;</span>
                        <span><strong>Community Empowerment:</strong> Ensuring locals receive fair economic benefits.</span>
                    </li>
                    {/* Value 3: Transparency */}
                    <li className="flex items-start gap-2">
                        <span className="text-eco-ocean font-bold">&bull;</span>
                        <span><strong>Transparency:</strong> Clear communication about our environmental impact metrics.</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* Sustainability Stats */}
        <div className="mb-20">
            {/* Section heading */}
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Our Impact So Far</h2>
            {/* Stats grid: 2 columns on mobile, 4 columns on medium screens and up. The numbers are hardcoded values */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Stat 1: destinations protected (ocean color) */}
                <div className="bg-eco-ocean text-white p-6 rounded-xl text-center shadow-lg">
                    <div className="text-4xl font-bold mb-2">45+</div>
                    <div className="text-cyan-100">Destinations Protected</div>
                </div>
                {/* Stat 2: trees planted (forest color) */}
                <div className="bg-eco-forest text-white p-6 rounded-xl text-center shadow-lg">
                    <div className="text-4xl font-bold mb-2">12k+</div>
                    <div className="text-green-100">Trees Planted</div>
                </div>
                {/* Stat 3: money donated (sunset color) */}
                <div className="bg-eco-sunset text-white p-6 rounded-xl text-center shadow-lg">
                    <div className="text-4xl font-bold mb-2">Rs 5M</div>
                    <div className="text-amber-100">Donated to Conservation</div>
                </div>
                {/* Stat 4: local guides trained (light ocean color) */}
                <div className="bg-eco-ocean-light text-white p-6 rounded-xl text-center shadow-lg">
                    <div className="text-4xl font-bold mb-2">120+</div>
                    <div className="text-cyan-50">Local Guides Trained</div>
                </div>
            </div>
        </div>

        {/* Partners */}
        <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
            {/* Section heading */}
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Our Partners in Conservation</h2>
            {/* Partner names shown as faded gray text (60% opacity) that wraps onto new lines on small screens */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
                <div className="text-xl font-bold text-gray-400 uppercase tracking-widest">Wildlife Trust</div>
                <div className="text-xl font-bold text-gray-400 uppercase tracking-widest">Green Earth Org</div>
                <div className="text-xl font-bold text-gray-400 uppercase tracking-widest">OceanCare LK</div>
                <div className="text-xl font-bold text-gray-400 uppercase tracking-widest">Eco Hotels</div>
            </div>
        </div>
      </div>
    </div>
  );
}