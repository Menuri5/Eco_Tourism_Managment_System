/**
 * HelpPage.jsx
 * Support page for FAQs and help topics
 */
// React and the useState hook (used for the open FAQ and the search text)
import React, { useState } from 'react';
// Link is used for the "Contact Support" button without reloading the page
import { Link } from 'react-router-dom';
// Icons: magnifying glass for the search box, chevrons (arrows) for opening/closing FAQs
import { HiOutlineMagnifyingGlass, HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi2';

// List of FAQs shown on the page. Each item has an id, a question (q) and an answer (a)
const faqs = [
  { id: 1, q: "How do I book a destination?", a: "You can book a destination by navigating to the destination details page, selecting your preferred dates, and clicking the 'Book Now' button. Follow the checkout process to complete your reservation." },
  { id: 2, q: "What payment methods are accepted?", a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and selected local payment gateways depending on your region." },
  { id: 3, q: "Are all guides certified?", a: "Yes, all guides on EcoLanka undergo a strict verification process and must hold valid certifications from the Sri Lanka Tourism Development Authority (SLTDA) along with specific eco-tourism credentials." },
  { id: 4, q: "What is your cancellation policy?", a: "Cancellations made 7 days prior to the booking date are eligible for a full refund. Cancellations within 7 days may be subject to a fee. Please refer to specific destination policies for details." },
  { id: 5, q: "What safety measures are in place?", a: "Safety is our top priority. All experiences follow strict safety guidelines, and our guides are trained in first aid. We also monitor weather conditions closely." },
  { id: 6, q: "How does EcoLanka support the environment?", a: "A portion of all bookings goes directly to local conservation projects. We also strictly vet all destinations for sustainable practices and provide carbon footprint data." },
  { id: 7, q: "I can't access my account. What should I do?", a: "Click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to reset your password." },
  { id: 8, q: "Do you have a mobile app?", a: "Currently, EcoLanka is a fully responsive web application that works perfectly on all mobile devices. A dedicated mobile app is in development." }
];

// HelpPage component - searchable FAQ list with a sidebar of help links
const HelpPage = () => {
  // id of the FAQ that is currently open (null = all FAQs closed)
  const [openFaq, setOpenFaq] = useState(null);
  // Text typed in the search box
  const [search, setSearch] = useState('');

  // Opens an FAQ when clicked. If that FAQ is already open, clicking again closes it
  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // Keep only the FAQs whose question or answer contains the search text (not case-sensitive)
  // If the search box is empty, every FAQ matches, so all are shown
  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(search.toLowerCase()) || 
    faq.a.toLowerCase().includes(search.toLowerCase())
  );

  // Render the page. The outer div is a full-height light gray background with padding
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Centered content container with a maximum width */}
      <div className="max-w-4xl mx-auto">
        
        {/* Header & Search */}
        <div className="text-center mb-12">
          {/* Page title and subtitle */}
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Help Center</h1>
          <p className="mt-4 text-lg text-gray-500">How can we help you today?</p>
          
          {/* Search box wrapper - "relative" lets the icon be positioned inside the input */}
          <div className="mt-8 max-w-xl mx-auto relative">
            {/* Magnifying glass icon placed on the left inside the input (pointer-events-none so clicks go to the input) */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineMagnifyingGlass className="h-6 w-6 text-gray-400" />
            </div>
            {/* Controlled search input: updates the search state on every key press, which filters the FAQs */}
            <input
              type="text"
              placeholder="Search for answers..."
              className="block w-full pl-12 pr-3 py-4 border border-transparent rounded-lg leading-5 bg-white shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-eco-ocean focus:border-transparent sm:text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Layout grid: one column on mobile; on medium screens FAQs take 2 columns and the sidebar takes 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main FAQ Content */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            
            {/* If no FAQs match the search, show a "no results" message; otherwise show the FAQ list */}
            {filteredFaqs.length === 0 ? (
              <p className="text-gray-500">No results found for "{search}". Try checking our contact options.</p>
            ) : (
              <div className="space-y-4">
                {/* Loop through the filtered FAQs and create one card for each (key helps React track each item) */}
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    {/* Question row - clicking it opens or closes this FAQ */}
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-gray-50 focus:outline-none"
                    >
                      {/* Question text */}
                      <span className="font-medium text-gray-900 text-left">{faq.q}</span>
                      {/* Show an up arrow when this FAQ is open, a down arrow when it is closed */}
                      {openFaq === faq.id ? (
                        <HiOutlineChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <HiOutlineChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {/* Answer - only shown when this FAQ is the open one */}
                    {openFaq === faq.id && (
                      <div className="px-6 pb-4 pt-2">
                        <p className="text-gray-600">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Popular Topics card with a colored top border */}
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-eco-ocean">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Topics</h3>
              {/* Topic links - href="#" means they are placeholders and do not go to a real page yet */}
              <ul className="space-y-3">
                <li><a href="#" className="text-eco-ocean hover:underline">Booking Guide</a></li>
                <li><a href="#" className="text-eco-ocean hover:underline">Refund Policy</a></li>
                <li><a href="#" className="text-eco-ocean hover:underline">Account Settings</a></li>
                <li><a href="#" className="text-eco-ocean hover:underline">Become a Guide</a></li>
              </ul>
            </div>

            {/* Contact support card - ocean background with white text */}
            <div className="bg-eco-ocean p-6 rounded-xl shadow-md text-white">
              <h3 className="text-lg font-bold mb-2">Can't find what you're looking for?</h3>
              <p className="mb-4 text-cyan-100 text-sm">Our support team is ready to help you with any issues.</p>
              {/* Button-style link that goes to the Support page */}
              <Link to="/support" className="block text-center bg-white text-eco-ocean hover:bg-gray-10 rounded-lg px-4 py-2 font-medium transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 

// Export the component so it can be used in the routes
export default HelpPage;