/**
 * StayDetailPage
 * This page displays full details about one Stay or Dining place.
 *
 * Main features:
 * - Display image gallery
 * - Display place description
 * - Display amenities
 * - Display location on Google Maps
 * - Display reviews
 * - Allow users to add reviews
 * - Display contact information for booking
 *
 * Note:
 * There is no internal booking or payment system here.
 */

import React, { useState, useMemo } from 'react';

// useParams gets the place ID from the URL.
// Link is used to move between pages.
import { useParams, Link } from 'react-router-dom';

// Import stay data functions from the context.
import { useStays } from '../../context/StaysContext';

// Import icons used in the page.
import {
  HiMapPin,
  HiStar,
  HiPhone,
  HiEnvelope,
  HiGlobeAlt,
  HiChevronLeft,
  HiCheckCircle,
} from 'react-icons/hi2';


// Main component
export default function StayDetailPage() {

  // Get the ID from the current URL.
  // Example: /stays/123
  // Here, id will be 123.
  const { id } = useParams();

  // Get the function used to find a stay.
  const { getStay } = useStays();

  // Find the selected place using its ID.
  const place = getStay(id);


  // ─────────────────────────────────────────────
  // Image Gallery State
  // ─────────────────────────────────────────────

  // Store which image is currently selected.
  // 0 means the first image.
  const [activeImage, setActiveImage] = useState(0);


  // ─────────────────────────────────────────────
  // Review State
  // ─────────────────────────────────────────────

  // Store existing reviews.
  // If there are no reviews, use an empty array.
  const [reviews, setReviews] = useState(place?.reviews || []);

  // Store the review currently being written.
  // Default rating is 5 stars.
  const [newReview, setNewReview] = useState({
    rating: 5,
    text: ''
  });

  // Store whether the review was successfully submitted.
  const [reviewSubmitted, setReviewSubmitted] = useState(false);


  // ─────────────────────────────────────────────
  // Calculate Average Rating
  // ─────────────────────────────────────────────

  // useMemo calculates the average rating.
  // It recalculates when the reviews array changes.
  const avgRating = useMemo(() => {

    // If there are no reviews, return 0.
    if (!reviews.length) return 0;

    // Add all review ratings together,
    // divide by the number of reviews,
    // and keep one decimal place.
    return (
      reviews.reduce((sum, r) => sum + r.rating, 0) /
      reviews.length
    ).toFixed(1);

  }, [reviews]);


  // ─────────────────────────────────────────────
  // Place Not Found
  // ─────────────────────────────────────────────

  // If the place does not exist,
  // show a "Place Not Found" message.
  if (!place) {

    return (
      <div className="text-center py-20 animate-fade-in">

        {/* Hotel icon */}
        <p className="text-6xl mb-4">🏨</p>

        {/* Error title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Place Not Found
        </h2>

        {/* Error message */}
        <p className="text-gray-500 mb-6">
          The listing you're looking for doesn't exist.
        </p>

        {/* Link to go back to Stays & Dining */}
        <Link
          to="/stays"
          className="text-eco-ocean hover:underline font-medium"
        >
          ← Back to Stays & Dining
        </Link>

      </div>
    );
  }


  // ─────────────────────────────────────────────
  // Create Image List
  // ─────────────────────────────────────────────

  // Create one list containing the main image
  // and all additional gallery images.
  //
  // The main image is placed first.
  const allImages =
    (place.images && place.images.length > 0)
      ? [
          place.image,
          ...place.images.filter(
            img => img !== place.image
          )
        ]
      : [place.image];


  // ─────────────────────────────────────────────
  // Submit New Review
  // ─────────────────────────────────────────────

  // This function runs when the user submits a review.
  const handleSubmitReview = (e) => {

    // Stop the browser from refreshing the page.
    e.preventDefault();

    // Do not submit if the review text is empty.
    if (!newReview.text.trim()) return;


    // Create a new review object.
    const review = {

      // Create a unique ID using the current time.
      id: `new-${Date.now()}`,

      // Name shown for the current user.
      userName: 'You',

      // Default avatar image.
      avatar:
        'https://picsum.photos/seed/current-user/100/100',

      // Selected rating.
      rating: newReview.rating,

      // Review text.
      text: newReview.text,

      // Store today's date.
      date: new Date().toISOString().split('T')[0],
    };


    // Add the new review to the beginning of the reviews list.
    setReviews((prev) => [review, ...prev]);

    // Reset the review form.
    setNewReview({
      rating: 5,
      text: ''
    });

    // Show the success message.
    setReviewSubmitted(true);

    // Hide the success message after 3 seconds.
    setTimeout(
      () => setReviewSubmitted(false),
      3000
    );
  };


  // ─────────────────────────────────────────────
  // Google Maps URL
  // ─────────────────────────────────────────────

  // Create the Google Maps embed URL
  // using the latitude and longitude of the place.
  const mapSrc =
    `https://www.google.com/maps?q=${place.coordinates.lat},${place.coordinates.lng}&z=14&output=embed`;


  // ─────────────────────────────────────────────
  // Page UI
  // ─────────────────────────────────────────────

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">


      {/* ═══════════════════════════════════════════
          BREADCRUMB
          ═══════════════════════════════════════════ */}

      {/* Shows the current page location */}
      <div className="flex items-center text-sm text-gray-500 mb-6">

        {/* Back link */}
        <Link
          to="/stays"
          className="hover:text-eco-ocean transition-colors flex items-center"
        >

          {/* Back arrow */}
          <HiChevronLeft className="h-4 w-4 mr-1" />

          {/* Page name */}
          Stays & Dining

        </Link>

        {/* Separator */}
        <span className="mx-2">/</span>

        {/* Current place name */}
        <span className="text-gray-800 font-medium">
          {place.name}
        </span>

      </div>


      {/* ═══════════════════════════════════════════
          IMAGE GALLERY
          ═══════════════════════════════════════════ */}

      <div className="mb-8">

        {/* Main image container */}
        <div className="relative rounded-xl overflow-hidden mb-3">

          {/* Display the currently selected image */}
          <img
            src={allImages[activeImage]}
            alt={`${place.name} - image ${activeImage + 1}`}
            className="w-full h-80 md:h-[28rem] object-cover"
          />


          {/* Image badges */}
          <div className="absolute top-4 left-4 flex gap-2">

            {/* Place type badge */}
            <span
              className={`${
                place.category === 'dining'
                  ? 'bg-amber-500'
                  : 'bg-eco-forest-light'
              } text-white text-sm font-semibold px-3 py-1.5 rounded-full`}
            >
              {place.type}
            </span>


            {/* Price badge */}
            <span className="bg-white/90 text-gray-800 text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
              {place.priceRange}
            </span>

          </div>

        </div>


        {/* ─────────────────────────────────────────
            Thumbnail Images
            ───────────────────────────────────────── */}

        <div className="flex gap-2 overflow-x-auto pb-2">

          {/* Display every image as a thumbnail */}
          {allImages.map((img, idx) => (

            <button
              key={idx}

              // Change the active image when clicked.
              onClick={() => setActiveImage(idx)}

              // Highlight the currently selected thumbnail.
              className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                activeImage === idx
                  ? 'border-eco-ocean shadow-md'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >

              {/* Thumbnail image */}
              <img
                src={img}
                alt={`Thumb ${idx + 1}`}
                className="w-20 h-14 object-cover"
              />

            </button>

          ))}

        </div>

      </div>


      {/* ═══════════════════════════════════════════
          MAIN CONTENT
          2 COLUMN LAYOUT
          ═══════════════════════════════════════════ */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


        {/* ═════════════════════════════════════════
            LEFT COLUMN
            Takes 2/3 of the screen.
            ═════════════════════════════════════════ */}

        <div className="lg:col-span-2 space-y-8">


          {/* ─────────────────────────────────────
              Place Title and Basic Information
              ───────────────────────────────────── */}

          <div>

            {/* Place name */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {place.name}
            </h1>


            {/* Location and rating */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">

              {/* Location */}
              <span className="flex items-center">

                <HiMapPin className="h-4 w-4 mr-1" />

                {place.location}

              </span>


              {/* Rating */}
              <span className="flex items-center">

                <HiStar className="h-4 w-4 mr-1 text-amber-400" />

                {/* Average rating */}
                <span className="font-semibold text-gray-700">
                  {avgRating}
                </span>

                {/* Number of reviews */}
                <span className="ml-1">
                  ({reviews.length} reviews)
                </span>

              </span>

            </div>

          </div>


          {/* ─────────────────────────────────────
              Description
              ───────────────────────────────────── */}

          <div>

            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              About
            </h2>

            {/* Full place description */}
            <p className="text-gray-600 leading-relaxed">
              {place.description}
            </p>

          </div>


          {/* ─────────────────────────────────────
              Amenities
              ───────────────────────────────────── */}

          <div>

            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Amenities & Features
            </h2>


            <div className="flex flex-wrap gap-2">

              {/* Display every amenity */}
              {place.amenities.map((amenity) => (

                <span
                  key={amenity}
                  className="inline-flex items-center bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full"
                >

                  {/* Check icon */}
                  <HiCheckCircle className="h-4 w-4 mr-1.5 text-eco-forest-light" />

                  {/* Amenity name */}
                  {amenity}

                </span>

              ))}

            </div>

          </div>


          {/* ═════════════════════════════════════════
              INTERACTIVE MAP
              ═════════════════════════════════════════ */}

          <div>

            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Location
            </h2>


            {/* Google Maps container */}
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">

              <iframe

                // Title for accessibility
                title={`Map of ${place.name}`}

                // Google Maps URL
                src={mapSrc}

                width="100%"
                height="350"

                // Remove iframe border
                style={{ border: 0 }}

                // Allow full screen map
                allowFullScreen

                // Load map only when needed
                loading="lazy"

                // Security/referrer setting
                referrerPolicy="no-referrer-when-downgrade"

                className="w-full"
              />

            </div>


            {/* Display full address below the map */}
            <p className="text-xs text-gray-400 mt-2">
              📍 {place.contact.address}
            </p>

          </div>


          {/* ═════════════════════════════════════════
              REVIEWS SECTION
              ═════════════════════════════════════════ */}

          <div>

            {/* Review section title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Reviews ({reviews.length})
            </h2>


            {/* ─────────────────────────────────────
                Review Submission Form
                ───────────────────────────────────── */}

            <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100">

              <h3 className="font-medium text-gray-800 mb-3">
                Write a Review
              </h3>


              {/* Show success message after review submission */}
              {reviewSubmitted && (

                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-lg mb-3 text-sm flex items-center">

                  <HiCheckCircle className="h-5 w-5 mr-2" />

                  Your review has been submitted! Thank you.

                </div>

              )}


              {/* Review form */}
              <form onSubmit={handleSubmitReview}>


                {/* ───────────────────────────────
                    Star Rating Selector
                    ─────────────────────────────── */}

                <div className="flex items-center gap-1 mb-3">

                  <span className="text-sm text-gray-600 mr-2">
                    Rating:
                  </span>


                  {/* Create 5 star buttons */}
                  {[1, 2, 3, 4, 5].map((star) => (

                    <button
                      key={star}
                      type="button"

                      // Set the selected rating.
                      onClick={() =>
                        setNewReview((prev) => ({
                          ...prev,
                          rating: star
                        }))
                      }

                      className="focus:outline-none"
                    >

                      {/* Display selected/unselected star */}
                      <HiStar
                        className={`h-6 w-6 transition-colors ${
                          star <= newReview.rating
                            ? 'text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />

                    </button>

                  ))}


                  {/* Display selected rating */}
                  <span className="text-sm text-gray-500 ml-2">
                    {newReview.rating}/5
                  </span>

                </div>


                {/* ───────────────────────────────
                    Review Text
                    ─────────────────────────────── */}

                <textarea

                  // Show current review text.
                  value={newReview.text}

                  // Update review text when user types.
                  onChange={(e) =>
                    setNewReview((prev) => ({
                      ...prev,
                      text: e.target.value
                    }))
                  }

                  placeholder="Share your experience..."

                  rows={3}

                  // Review text is required.
                  required

                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean focus:border-eco-ocean resize-none"
                />


                {/* Submit review button */}
                <button
                  type="submit"
                  className="mt-3 bg-eco-ocean hover:bg-cyan-800 text-white text-sm font-medium rounded-lg px-6 py-2.5 transition-colors"
                >
                  Submit Review
                </button>

              </form>

            </div>


            {/* ═════════════════════════════════════
                Existing Reviews List
                ═════════════════════════════════════ */}

            <div className="space-y-4">

              {/* Display all reviews */}
              {reviews.map((review) => (

                <div
                  key={review.id}
                  className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                >

                  <div className="flex items-start gap-3">


                    {/* User avatar */}
                    <img
                      src={review.avatar}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />


                    <div className="flex-1">


                      {/* User name and review date */}
                      <div className="flex items-center justify-between mb-1">

                        <h4 className="font-semibold text-gray-800 text-sm">
                          {review.userName}
                        </h4>

                        <span className="text-xs text-gray-400">
                          {review.date}
                        </span>

                      </div>


                      {/* Review stars */}
                      <div className="flex items-center gap-0.5 mb-2">

                        {/* Display 5 stars */}
                        {[1, 2, 3, 4, 5].map((star) => (

                          <HiStar
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? 'text-amber-400'
                                : 'text-gray-200'
                            }`}
                          />

                        ))}

                      </div>


                      {/* Review text */}
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {review.text}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* ═══════════════════════════════════════════
            RIGHT COLUMN
            Contact and Booking section.
            Takes 1/3 of the screen.
            ═══════════════════════════════════════════ */}

        <div className="lg:col-span-1">

          {/* Keep this column visible while scrolling */}
          <div className="sticky top-24 space-y-6">


            {/* ═════════════════════════════════════════
                CONTACT FOR BOOKING
                ═════════════════════════════════════════ */}

            <div className="bg-white rounded-xl shadow-md border-2 border-eco-ocean p-6">

              <h2 className="text-lg font-bold text-gray-800 mb-1">
                Contact for Booking
              </h2>


              {/* Important booking information */}
              <p className="text-xs text-gray-500 mb-5">
                Reach out directly to make reservations —
                EcoLanka does not handle bookings or payments.
              </p>


              <div className="space-y-4">


                {/* ─────────────────────────────────
                    Phone
                    ───────────────────────────────── */}

                <a
                  href={`tel:${place.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                >

                  {/* Phone icon */}
                  <div className="bg-green-500 p-2 rounded-full">

                    <HiPhone className="h-5 w-5 text-white" />

                  </div>


                  <div>

                    <p className="text-xs text-gray-500">
                      Call Directly
                    </p>

                    <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700">
                      {place.contact.phone}
                    </p>

                  </div>

                </a>


                {/* ─────────────────────────────────
                    Email
                    ───────────────────────────────── */}

                <a
                  href={`mailto:${place.contact.email}`}
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                >

                  {/* Email icon */}
                  <div className="bg-blue-500 p-2 rounded-full">

                    <HiEnvelope className="h-5 w-5 text-white" />

                  </div>


                  <div>

                    <p className="text-xs text-gray-500">
                      Send Email
                    </p>

                    <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 break-all">
                      {place.contact.email}
                    </p>

                  </div>

                </a>


                {/* ─────────────────────────────────
                    Website
                    ───────────────────────────────── */}

                <a
                  href={place.contact.website}

                  // Open website in a new browser tab.
                  target="_blank"

                  // Security setting for external links.
                  rel="noopener noreferrer"

                  className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
                >

                  {/* Website icon */}
                  <div className="bg-purple-500 p-2 rounded-full">

                    <HiGlobeAlt className="h-5 w-5 text-white" />

                  </div>


                  <div>

                    <p className="text-xs text-gray-500">
                      Visit Website
                    </p>

                    {/* Remove https:// from displayed website text */}
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 truncate">
                      {place.contact.website.replace('https://', '')}
                    </p>

                  </div>

                </a>


                {/* ─────────────────────────────────
                    Address
                    ───────────────────────────────── */}

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">

                  {/* Location icon */}
                  <div className="bg-gray-500 p-2 rounded-full">

                    <HiMapPin className="h-5 w-5 text-white" />

                  </div>


                  <div>

                    <p className="text-xs text-gray-500">
                      Address
                    </p>

                    {/* Display place address */}
                    <p className="text-sm text-gray-800">
                      {place.contact.address}
                    </p>

                  </div>

                </div>

              </div>


              {/* ─────────────────────────────────
                  Booking Disclaimer
                  ───────────────────────────────── */}

              <div className="mt-5 bg-amber-50 border border-amber-200 rounded-lg p-3">

                <p className="text-xs text-amber-800 leading-relaxed">

                  ⚠️ <strong>No online booking available.</strong>

                  Please contact the property directly using
                  the details above to check availability and
                  make reservations.

                </p>

              </div>

            </div>


            {/* ═════════════════════════════════════════
                QUICK INFORMATION CARD
                ═════════════════════════════════════════ */}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

              <h3 className="font-semibold text-gray-800 mb-3">
                Quick Info
              </h3>


              <div className="space-y-3 text-sm">


                {/* Type */}
                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Type
                  </span>

                  <span className="font-medium text-gray-800">
                    {place.type}
                  </span>

                </div>


                {/* Price range */}
                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Price Range
                  </span>

                  <span className="font-medium text-gray-800">
                    {place.priceRange}
                  </span>

                </div>


                {/* Rating */}
                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Rating
                  </span>

                  <span className="font-medium text-gray-800 flex items-center">

                    <HiStar className="h-4 w-4 text-amber-400 mr-1" />

                    {avgRating} / 5

                  </span>

                </div>


                {/* Number of reviews */}
                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Reviews
                  </span>

                  <span className="font-medium text-gray-800">
                    {reviews.length}
                  </span>

                </div>


                {/* Category */}
                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Category
                  </span>

                  <span className="font-medium text-gray-800 capitalize">
                    {place.category}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}