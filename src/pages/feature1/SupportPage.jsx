/**
 * SupportPage.jsx
 * Contact support page with form and info
 */
// React and the useState hook (used to switch between the form and the success message)
import React, { useState } from 'react';
// Icons for the contact details: envelope (email), phone and map pin (address)
import { HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin } from 'react-icons/hi2';

// SupportPage component - contact form with the support team's contact details
const SupportPage = () => {
  // false = show the contact form, true = show the "Ticket Submitted" message
  const [submitted, setSubmitted] = useState(false);

  // Runs when the Send Message button is clicked (form submit)
  const handleSubmit = (e) => {
    // Stop the browser from reloading the page on form submit
    e.preventDefault();
    // Switch to the success screen (the form data is not sent anywhere yet)
    setSubmitted(true);
  };

  // Early return: if the form was submitted, show only the success screen instead of the form
  if (submitted) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* White success card centered on the page */}
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          {/* Green circle with a check mark icon drawn with SVG */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          {/* Success title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ticket Submitted</h2>
          {/* Success message - the reference number #TK-8492 is fixed text, so it is the same for every submission */}
          <p className="text-gray-600 mb-6">Thank you for contacting us. Your reference number is <span className="font-bold text-gray-900">#TK-8492</span>. Our team will get back to you within 24 hours.</p>
          {/* Sets submitted back to false so the form is shown again */}
          <button onClick={() => setSubmitted(false)} className="bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-6 py-2.5 font-medium transition-colors w-full">
            Submit Another Query
          </button>
        </div>
      </div>
    );
  }

  // Normal view: the contact page with the form. The outer div is a full-height light gray background
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Centered content container with a maximum width */}
      <div className="max-w-5xl mx-auto">
        {/* Page title and subtitle */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900">Contact Support</h1>
          <p className="mt-4 text-lg text-gray-500">We're here to help! Fill out the form below or reach us directly.</p>
        </div>

        {/* Large white card holding the contact info and the form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Grid: stacked on mobile; on large screens info takes 1 column and the form takes 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3">
            
            {/* Contact Info (Left Sidebar) */}
            <div className="bg-eco-ocean p-10 text-white lg:col-span-1">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="text-cyan-100 mb-8">Fill out the form and our team will get back to you within 24 hours.</p>
              
              {/* List of contact methods */}
              <div className="space-y-6">
                {/* Phone number and working hours */}
                <div className="flex items-start">
                  <HiOutlinePhone className="h-6 w-6 mr-4 text-cyan-200" />
                  <div>
                    <p className="font-medium">+94 11 234 5678</p>
                    <p className="text-cyan-100 text-sm">Mon-Fri 9am to 6pm (LKT)</p>
                  </div>
                </div>
                {/* Support email address */}
                <div className="flex items-start">
                  <HiOutlineEnvelope className="h-6 w-6 mr-4 text-cyan-200" />
                  <div>
                    <p className="font-medium">support@ecolanka.lk</p>
                    <p className="text-cyan-100 text-sm">Online support</p>
                  </div>
                </div>
                {/* Office address */}
                <div className="flex items-start">
                  <HiOutlineMapPin className="h-6 w-6 mr-4 text-cyan-200" />
                  <div>
                    <p className="font-medium">123 Eco Way</p>
                    <p className="text-cyan-100 text-sm">Colombo 03, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form (Right) */}
            <div className="p-10 lg:col-span-2">
              {/* Support form - calls handleSubmit when submitted. The inputs have no state, so their values are not stored */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and email: stacked on mobile, side by side on medium screens and up */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name field (required) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input type="text" required className="w-full border border-gray-300 rounded-md p-3 focus:ring-eco-ocean focus:border-eco-ocean" placeholder="John Doe" />
                  </div>
                  {/* Email field (required, browser checks the email format) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" required className="w-full border border-gray-300 rounded-md p-3 focus:ring-eco-ocean focus:border-eco-ocean" placeholder="john@example.com" />
                  </div>
                </div>

                {/* Category dropdown - the first option has an empty value, so "required" forces the user to pick a real category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select required className="w-full border border-gray-300 rounded-md p-3 focus:ring-eco-ocean focus:border-eco-ocean bg-white">
                    <option value="">Select a category</option>
                    <option value="general">General Inquiry</option>
                    <option value="booking">Booking Issue</option>
                    <option value="technical">Technical Problem</option>
                    <option value="complaint">Guide Complaint</option>
                    <option value="billing">Billing</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Subject field (required) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input type="text" required className="w-full border border-gray-300 rounded-md p-3 focus:ring-eco-ocean focus:border-eco-ocean" placeholder="How can we help?" />
                </div>

                {/* Message field - a 4-row text area (required) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows="4" required className="w-full border border-gray-300 rounded-md p-3 focus:ring-eco-ocean focus:border-eco-ocean" placeholder="Describe your issue in detail..."></textarea>
                </div>

                {/* File attachment area (optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attachments (Optional)</label>
                  {/* Dashed upload box - the border turns ocean-colored on hover */}
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-eco-ocean transition-colors">
                    <div className="space-y-1 text-center">
                      {/* Image / upload icon drawn with SVG */}
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600 justify-center">
                        {/* "Upload a file" link - the real file input is hidden (sr-only), and clicking the label opens the file picker */}
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-eco-ocean hover:text-cyan-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-eco-ocean">
                          <span>Upload a file</span>
                          <input type="file" className="sr-only" />
                        </label>
                        {/* Text only - drag and drop is not actually handled in the code */}
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      {/* Allowed file types note (not checked in the code) */}
                      <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                    </div>
                  </div>
                </div>

                {/* Submit button aligned to the right */}
                <div className="flex justify-end">
                  <button type="submit" className="bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-8 py-3 font-medium transition-colors shadow-sm">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component so it can be used in the routes
export default SupportPage;