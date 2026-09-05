/**
 * AboutPage component for the EcoLanka project.
 * Displays information about the platform's mission, vision, team, and sustainability commitments.
 */
import React from 'react';
import { HiOutlineGlobeEuropeAfrica, HiOutlineShieldCheck, HiOutlineUsers, HiOutlineSparkles } from 'react-icons/hi2';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-eco-ocean text-white py-24 text-center px-4">
        <div className="absolute inset-0 z-0 opacity-20">
            <img src="https://picsum.photos/seed/forest-pattern/1920/400" alt="Pattern" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About EcoLanka</h1>
            <p className="text-xl text-cyan-50">Promoting responsible travel that preserves our natural heritage and empowers local communities.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Mission Statement */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            <div className="md:w-1/2">
                <div className="h-16 w-16 bg-eco-forest-light/20 text-eco-forest rounded-full flex items-center justify-center mb-6">
                    <HiOutlineGlobeEuropeAfrica className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                    EcoLanka was founded with a single purpose: to transform tourism in Sri Lanka from a consumptive industry into a regenerative force. We bridge the gap between conscientious travelers and sustainable local initiatives, ensuring that every journey contributes positively to our island's biodiversity and cultural richness.
                </p>
            </div>
            <div className="md:w-1/2">
                <img src="https://picsum.photos/seed/mission/600/400" alt="Our Mission" className="rounded-xl shadow-md w-full h-auto" />
            </div>
        </div>

        {/* Vision & Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 h-full">
                <div className="flex items-center gap-4 mb-6">
                    <HiOutlineSparkles className="h-8 w-8 text-eco-sunset" />
                    <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
                </div>
                <p className="text-gray-600">
                    To make Sri Lanka the premier destination for sustainable eco-tourism globally, where the environment thrives, communities prosper, and travelers experience authentic, guilt-free exploration.
                </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 h-full">
                <div className="flex items-center gap-4 mb-6">
                    <HiOutlineShieldCheck className="h-8 w-8 text-eco-ocean" />
                    <h2 className="text-2xl font-bold text-gray-800">Our Values</h2>
                </div>
                <ul className="text-gray-600 space-y-3">
                    <li className="flex items-start gap-2">
                        <span className="text-eco-ocean font-bold">&bull;</span>
                        <span><strong>Conservation First:</strong> We prioritize environmental protection above profit.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-eco-ocean font-bold">&bull;</span>
                        <span><strong>Community Empowerment:</strong> Ensuring locals receive fair economic benefits.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-eco-ocean font-bold">&bull;</span>
                        <span><strong>Transparency:</strong> Clear communication about our environmental impact metrics.</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* Sustainability Stats */}
        <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Our Impact So Far</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-eco-ocean text-white p-6 rounded-xl text-center shadow-lg">
                    <div className="text-4xl font-bold mb-2">45+</div>
                    <div className="text-cyan-100">Destinations Protected</div>
                </div>
                <div className="bg-eco-forest text-white p-6 rounded-xl text-center shadow-lg">
                    <div className="text-4xl font-bold mb-2">12k+</div>
                    <div className="text-green-100">Trees Planted</div>
                </div>
                <div className="bg-eco-sunset text-white p-6 rounded-xl text-center shadow-lg">
                    <div className="text-4xl font-bold mb-2">Rs 5M</div>
                    <div className="text-amber-100">Donated to Conservation</div>
                </div>
                <div className="bg-eco-ocean-light text-white p-6 rounded-xl text-center shadow-lg">
                    <div className="text-4xl font-bold mb-2">120+</div>
                    <div className="text-cyan-50">Local Guides Trained</div>
                </div>
            </div>
        </div>

        {/* Partners */}
        <div className="text-center bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Our Partners in Conservation</h2>
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
