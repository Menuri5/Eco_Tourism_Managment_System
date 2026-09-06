/**
 * Footer component for the application
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { HiEnvelope } from 'react-icons/hi2'; // email icon
import logo from '../assets/logo.svg';

export default function Footer() {
  return (
    // aria-labelledby links this <footer> to the hidden heading below,
    // so screen readers announce "Footer" when entering this section
    <footer className="bg-gray-900 text-gray-300" aria-labelledby="footer-heading">
      
      {/* sr-only = visually hidden, but still read by screen readers (accessibility only, not visible on page) */}
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        {/* Grid: 3 columns on large screens (xl breakpoint), stacked on smaller screens */}
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* ---- Column 1: Logo + description (takes 1 of 3 columns) ---- */}
          <div className="space-y-8 xl:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img 
                className="h-10" 
                src={logo} 
                alt="EcoLanka" 
                style={{ filter: 'brightness(0) invert(1)' }} // same white-logo trick as the sidebar
              />
              <span className="text-2xl font-bold text-white">EcoLanka</span>
            </Link>
            <p className="text-sm leading-6">
              Serendib Eco Tourism. Discover the natural beauty of Sri Lanka while preserving its unique ecosystems for future generations.
            </p>
          </div>
          
          {/* ---- Columns 2-3: Link sections (takes remaining 2 of 3 columns) ---- */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            
            {/* Nested grid: Quick Links + Support side by side */}
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Quick Links</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link to="/" className="text-sm leading-6 hover:text-white">Home</Link></li>
                  <li><Link to="/destinations" className="text-sm leading-6 hover:text-white">Destinations</Link></li>
                  <li><Link to="/campaigns" className="text-sm leading-6 hover:text-white">Campaigns</Link></li>
                  <li><Link to="/about" className="text-sm leading-6 hover:text-white">About</Link></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li><Link to="/help" className="text-sm leading-6 hover:text-white">Help Center</Link></li>
                  <li><Link to="/contact" className="text-sm leading-6 hover:text-white">Contact</Link></li>
                  <li><Link to="/faqs" className="text-sm leading-6 hover:text-white">FAQs</Link></li>
                </ul>
              </div>
            </div>
            
            {/* Connect / Contact info section */}
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Connect</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a href="mailto:info@ecolanka.com" className="flex items-center gap-2 text-sm leading-6 hover:text-white">
                      <HiEnvelope className="h-5 w-5" /> info@ecolanka.com
                    </a>
                  </li>
                  {/* Social links could go here — placeholder comment left by dev for later */}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* ---- Bottom copyright bar ---- */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5">&copy; 2026 EcoLanka. Serendib Eco Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}