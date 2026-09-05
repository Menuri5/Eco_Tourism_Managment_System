/**
 * StayDetailPage — Detail page for a Stays & Dining place.
 *
 * Includes:
 * - Image gallery
 * - Full description & amenities
 * - Interactive map (Google Maps iframe)
 * - Contact for Booking section (NO internal booking/payment)
 * - Reviews list + add review form
 */
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStays } from '../../context/StaysContext';
import {
  HiMapPin,
  HiStar,
  HiPhone,
  HiEnvelope,
  HiGlobeAlt,
  HiChevronLeft,
  HiCheckCircle,
} from 'react-icons/hi2';

export default function StayDetailPage() {
  const { id } = useParams();
  const { getStay } = useStays();
  const place = getStay(id);

  // Local state for the image gallery
  const [activeImage, setActiveImage] = useState(0);

  // Local state for reviews (start with existing + allow adding new ones)
  const [reviews, setReviews] = useState(place?.reviews || []);
  const [newReview, setNewReview] = useState({ rating: 5, text: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Calculate average rating from reviews
  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  // ─── 404 state ───
  if (!place) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <p className="text-6xl mb-4">🏨</p>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Place Not Found</h2>
        <p className="text-gray-500 mb-6">The listing you're looking for doesn't exist.</p>
        <Link to="/stays" className="text-eco-ocean hover:underline font-medium">
          ← Back to Stays & Dining
        </Link>
      </div>
    );
  }

  const allImages = (place.images && place.images.length > 0) 
    ? [place.image, ...place.images.filter(img => img !== place.image)]
    : [place.image];

  // ─── Submit a new review ───
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.text.trim()) return;

    const review = {
      id: `new-${Date.now()}`,
      userName: 'You',
      avatar: 'https://picsum.photos/seed/current-user/100/100',
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews((prev) => [review, ...prev]);
    setNewReview({ rating: 5, text: '' });
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  // Google Maps embed URL from coordinates
  const mapSrc = `https://www.google.com/maps?q=${place.coordinates.lat},${place.coordinates.lng}&z=14&output=embed`;

  return (
    <div className="animate-fade-in max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/stays" className="hover:text-eco-ocean transition-colors flex items-center">
          <HiChevronLeft className="h-4 w-4 mr-1" />
          Stays & Dining
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">{place.name}</span>
      </div>

      {/* ═══════════════════════════════════════════
          IMAGE GALLERY
          ═══════════════════════════════════════════ */}
      <div className="mb-8">
        {/* Main image */}
        <div className="relative rounded-xl overflow-hidden mb-3">
          <img
            src={allImages[activeImage]}
            alt={`${place.name} - image ${activeImage + 1}`}
            className="w-full h-80 md:h-[28rem] object-cover"
          />
          {/* Overlay badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`${place.category === 'dining' ? 'bg-amber-500' : 'bg-eco-forest-light'} text-white text-sm font-semibold px-3 py-1.5 rounded-full`}>
              {place.type}
            </span>
            <span className="bg-white/90 text-gray-800 text-sm font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
              {place.priceRange}
            </span>
          </div>
        </div>
        {/* Thumbnail strip */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                activeImage === idx ? 'border-eco-ocean shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumb ${idx + 1}`} className="w-20 h-14 object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT — 2-column layout
          ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column — Details (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title + meta */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{place.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <HiMapPin className="h-4 w-4 mr-1" />
                {place.location}
              </span>
              <span className="flex items-center">
                <HiStar className="h-4 w-4 mr-1 text-amber-400" />
                <span className="font-semibold text-gray-700">{avgRating}</span>
                <span className="ml-1">({reviews.length} reviews)</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">{place.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Amenities & Features</h2>
            <div className="flex flex-wrap gap-2">
              {place.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="inline-flex items-center bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full"
                >
                  <HiCheckCircle className="h-4 w-4 mr-1.5 text-eco-forest-light" />
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* ─── Interactive Map ─── */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Location</h2>
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <iframe
                title={`Map of ${place.name}`}
                src={mapSrc}
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              📍 {place.contact.address}
            </p>
          </div>

          {/* ─── Reviews Section ─── */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Reviews ({reviews.length})
            </h2>

            {/* Review submission form */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100">
              <h3 className="font-medium text-gray-800 mb-3">Write a Review</h3>
              {reviewSubmitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-lg mb-3 text-sm flex items-center">
                  <HiCheckCircle className="h-5 w-5 mr-2" />
                  Your review has been submitted! Thank you.
                </div>
              )}
              <form onSubmit={handleSubmitReview}>
                {/* Star rating selector */}
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-sm text-gray-600 mr-2">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                      className="focus:outline-none"
                    >
                      <HiStar
                        className={`h-6 w-6 transition-colors ${
                          star <= newReview.rating ? 'text-amber-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-sm text-gray-500 ml-2">{newReview.rating}/5</span>
                </div>
                {/* Review text */}
                <textarea
                  value={newReview.text}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, text: e.target.value }))}
                  placeholder="Share your experience..."
                  rows={3}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean focus:border-eco-ocean resize-none"
                />
                <button
                  type="submit"
                  className="mt-3 bg-eco-ocean hover:bg-cyan-800 text-white text-sm font-medium rounded-lg px-6 py-2.5 transition-colors"
                >
                  Submit Review
                </button>
              </form>
            </div>

            {/* Existing reviews list */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <img
                      src={review.avatar}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-800 text-sm">{review.userName}</h4>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <HiStar
                            key={star}
                            className={`h-4 w-4 ${star <= review.rating ? 'text-amber-400' : 'text-gray-200'}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            Right column — Contact & Booking (1/3 width)
            ═══════════════════════════════════════════ */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* ─── CONTACT FOR BOOKING ─── */}
            <div className="bg-white rounded-xl shadow-md border-2 border-eco-ocean p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-1">Contact for Booking</h2>
              <p className="text-xs text-gray-500 mb-5">
                Reach out directly to make reservations — EcoLanka does not handle bookings or payments.
              </p>

              <div className="space-y-4">
                {/* Phone */}
                <a
                  href={`tel:${place.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                >
                  <div className="bg-green-500 p-2 rounded-full">
                    <HiPhone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Call Directly</p>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-green-700">
                      {place.contact.phone}
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${place.contact.email}`}
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                >
                  <div className="bg-blue-500 p-2 rounded-full">
                    <HiEnvelope className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Send Email</p>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 break-all">
                      {place.contact.email}
                    </p>
                  </div>
                </a>

                {/* Website */}
                <a
                  href={place.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
                >
                  <div className="bg-purple-500 p-2 rounded-full">
                    <HiGlobeAlt className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Visit Website</p>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 truncate">
                      {place.contact.website.replace('https://', '')}
                    </p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-gray-500 p-2 rounded-full">
                    <HiMapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm text-gray-800">{place.contact.address}</p>
                  </div>
                </div>
              </div>

              {/* Prominent CTA disclaimer */}
              <div className="mt-5 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-800 leading-relaxed">
                  ⚠️ <strong>No online booking available.</strong> Please contact the property
                  directly using the details above to check availability and make reservations.
                </p>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-3">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-800">{place.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Price Range</span>
                  <span className="font-medium text-gray-800">{place.priceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Rating</span>
                  <span className="font-medium text-gray-800 flex items-center">
                    <HiStar className="h-4 w-4 text-amber-400 mr-1" />
                    {avgRating} / 5
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Reviews</span>
                  <span className="font-medium text-gray-800">{reviews.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-gray-800 capitalize">{place.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
