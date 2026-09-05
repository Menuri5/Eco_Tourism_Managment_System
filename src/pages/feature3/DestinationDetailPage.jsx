/**
 * DestinationDetailPage - Comprehensive view of a single destination.
 */
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDestinations, useGuides } from '../../context/GlobalDataContext';
import { reviews as initialReviews } from '../../data/reviews';
import { HiOutlineMapPin, HiStar, HiOutlineCheckCircle, HiOutlineShieldCheck, HiOutlineGlobeAlt, HiCheckCircle, HiOutlinePhone, HiOutlineEnvelope, HiOutlineUser } from 'react-icons/hi2';

export default function DestinationDetailPage() {
  // 1. Get destination ID from URL params and fetch data contexts
  const { id } = useParams();
  const { destinations } = useDestinations();
  const { guides } = useGuides();
  const dest = destinations.find(d => d.id === parseInt(id));

  // 2. Local state for reviews and review submission handling
  const [reviews, setReviews] = useState(
    initialReviews.filter(r => r.destinationId === parseInt(id))
  );
  const [newReview, setNewReview] = useState({ rating: 5, text: '', title: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // 3. Calculate average rating dynamically using useMemo for performance optimization
  const avgRating = useMemo(() => {
    if (!reviews.length) return dest?.rating || 0;
    return (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews, dest]);

  // 4. Fallback view if destination is not found
  if (!dest) {
    return <div className="p-12 text-center">
      <h2 className="text-2xl font-bold text-gray-800">Destination not found</h2>
      <Link to="/destinations" className="text-eco-ocean mt-4 inline-block">Return to Destinations</Link>
    </div>;
  }

  // 5. Match relevant local guides based on destination name or location keywords
  const relatedGuides = useMemo(() => {
    const destNameWords = dest.name.toLowerCase().split(' ');
    const destLocationWords = dest.location.toLowerCase().split(/[,\s]+/);
    
    const matched = guides.filter(g => {
      const gLoc = g.location.toLowerCase();
      return destNameWords.some(w => w.length > 3 && gLoc.includes(w)) || 
             destLocationWords.some(w => w.length > 3 && gLoc.includes(w));
    });
    
    // Fallback to top-rated guides if no specific match is found
    return matched.length > 0 ? matched.slice(0, 3) : guides.sort((a,b) => b.rating - a.rating).slice(0, 3);
  }, [dest]);

  // 6. Find similar destinations under the same category
  const relatedDestinations = destinations.filter(d => d.categoryId === dest.categoryId && d.id !== dest.id).slice(0, 3);

  // 7. Handler to submit a new user review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.text.trim() || !newReview.title.trim()) return;

    const review = {
      id: `new-${Date.now()}`,
      destinationId: dest.id,
      userName: 'You',
      avatar: 'https://picsum.photos/seed/current-user/100/100',
      rating: newReview.rating,
      title: newReview.title,
      text: newReview.text,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews((prev) => [review, ...prev]);
    setNewReview({ rating: 5, text: '', title: '' });
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  // 8. Generate Google Maps iframe source URL using coordinates
  const mapSrc = dest.coordinates 
    ? `https://www.google.com/maps?q=${dest.coordinates.lat},${dest.coordinates.lng}&z=14&output=embed`
    : null;

  return (
    <div className="pb-12">
      {/* Hero section: Multi-image layout grid or fallback single image */}
      {dest.images && dest.images.length >= 3 ? (
        <div className="max-w-7xl mx-auto px-6 mt-6 mb-8">
          <div className="text-gray-500 text-sm mb-4">
            <Link to="/dashboard" className="hover:text-eco-ocean">Home</Link> &gt; <Link to="/destinations" className="hover:text-eco-ocean">Destinations</Link> &gt; <span className="text-gray-800">{dest.name}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{dest.name}</h1>
              <div className="flex items-center text-gray-600 text-lg">
                <HiOutlineMapPin className="mr-2 text-eco-ocean" /> {dest.location}
              </div>
            </div>
            {/* Rating badge */}
            <div className="bg-gray-50 px-4 py-2 rounded-lg inline-flex items-center border border-gray-200">
              <HiStar className="text-amber-400 mr-2 text-xl" />
              <span className="text-gray-800 font-bold text-xl">{avgRating}</span>
              <span className="text-gray-500 text-sm ml-2">({reviews.length} reviews)</span>
            </div>
          </div>
          
          {/* Image gallery grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[40vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-sm">
            <div className="md:col-span-2 relative h-full">
              <img src={dest.images[0] || dest.image} alt={dest.name} className="w-full h-full object-cover hover:brightness-95 transition duration-300" />
            </div>
            <div className="hidden md:grid grid-rows-2 gap-2 h-full">
              <div className="relative h-full">
                <img src={dest.images[1]} alt={dest.name} className="w-full h-full object-cover hover:brightness-95 transition duration-300" />
              </div>
              <div className="relative h-full">
                <img src={dest.images[2]} alt={dest.name} className="w-full h-full object-cover hover:brightness-95 transition duration-300" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Fallback single image hero banner
        <div className="relative h-[60vh] w-full">
          <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8 max-w-7xl mx-auto">
            <div className="text-white/80 text-sm mb-4">
              <Link to="/dashboard" className="hover:text-white">Home</Link> &gt; <Link to="/destinations" className="hover:text-white">Destinations</Link> &gt; <span className="text-white">{dest.name}</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{dest.name}</h1>
                <div className="flex items-center text-white/90 text-lg">
                  <HiOutlineMapPin className="mr-2" /> {dest.location}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg inline-flex items-center border border-white/20">
                <HiStar className="text-amber-400 mr-2 text-xl" />
                <span className="text-white font-bold text-xl">{avgRating}</span>
                <span className="text-white/80 text-sm ml-2">({reviews.length} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content & Sidebar Layout */}
      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* About section */}
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed">{dest.description}</p>
          </section>

          {/* Highlights section */}
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Highlights</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dest.highlights?.map((highlight, idx) => (
                <li key={idx} className="flex items-start">
                  <HiOutlineCheckCircle className="text-eco-forest mt-1 mr-3 flex-shrink-0 text-lg" />
                  <span className="text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Activities preview section */}
          <section className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Activities</h2>
              <Link to={`/destinations/${dest.id}/activities`} className="text-eco-ocean text-sm font-medium hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {dest.activities?.slice(0, 3).map(activity => (
                <div key={activity.id} className="border border-gray-100 p-4 rounded-lg flex justify-between items-center bg-gray-50 hover:bg-cyan-50 transition-colors">
                  <div>
                    <h3 className="font-bold text-gray-800">{activity.name}</h3>
                    <p className="text-sm text-gray-500">{activity.duration} • {activity.difficulty}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-eco-ocean">${activity.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Google Map embed section */}
          {mapSrc && (
            <section className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  title={`Map of ${dest.name}`}
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
              <p className="text-sm text-gray-500 mt-3 flex items-center">
                <HiOutlineMapPin className="mr-1 text-eco-ocean" /> {dest.location}
              </p>
            </section>
          )}

          {/* Reviews section with form and review list */}
          <section className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Reviews ({reviews.length})
            </h2>

            {/* Review submission form */}
            <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
              <h3 className="font-medium text-gray-800 mb-3">Write a Review</h3>
              {reviewSubmitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-lg mb-3 text-sm flex items-center">
                  <HiCheckCircle className="h-5 w-5 mr-2" />
                  Your review has been submitted! Thank you.
                </div>
              )}
              <form onSubmit={handleSubmitReview}>
                {/* Interactive star rating picker */}
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
                {/* Review title input */}
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Review Title"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-eco-ocean focus:border-eco-ocean"
                />
                {/* Review message body */}
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

            {/* Render list of reviews */}
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <img
                          src={review.avatar || 'https://via.placeholder.com/40'}
                          alt={review.userName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-800">{review.userName}</p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <HiStar
                            key={star}
                            className={`h-4 w-4 ${star <= review.rating ? 'text-amber-400' : 'text-gray-200'}`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.title && <h4 className="font-bold text-gray-800 mt-2">{review.title}</h4>}
                    <p className="text-gray-600 text-sm mt-1">{review.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="space-y-6">
          {/* Pricing & Site Manager Contact Widget */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-4">
            <p className="text-gray-500 text-sm mb-1">Starting from</p>
            <div className="text-3xl font-bold text-gray-800 mb-5">${dest.price} <span className="text-base font-normal text-gray-500">/ person</span></div>
            
            <hr className="border-gray-100 my-5" />
            
            <h3 className="font-bold text-gray-800 mb-4">Location Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-cyan-50 p-2.5 rounded-full text-eco-ocean flex-shrink-0">
                  <HiOutlineUser className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{dest.inCharge?.name || 'Dinesh Rathnayake'}</p>
                  <p className="text-xs text-gray-500">{dest.inCharge?.role || 'Site Manager / Head Guide'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-cyan-50 p-2.5 rounded-full text-eco-ocean flex-shrink-0">
                  <HiOutlinePhone className="h-5 w-5" />
                </div>
                <a href={`tel:${dest.inCharge?.phone || '+94771234567'}`} className="text-sm font-medium text-gray-700 hover:text-eco-ocean transition-colors">
                  {dest.inCharge?.phone || '+94 77 123 4567'}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-cyan-50 p-2.5 rounded-full text-eco-ocean flex-shrink-0">
                  <HiOutlineEnvelope className="h-5 w-5" />
                </div>
                <a href={`mailto:${dest.inCharge?.email || 'contact@ecolanka.lk'}`} className="text-sm font-medium text-gray-700 hover:text-eco-ocean transition-colors truncate">
                  {dest.inCharge?.email || 'inquiries@ecolanka.lk'}
                </a>
              </div>
            </div>
          </div>

          {/* Environmental metrics / Eco Impact widget */}
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-eco-forest">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center"><HiOutlineGlobeAlt className="mr-2 text-eco-forest" /> Eco Impact</h3>
            {dest.environmentalData && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Air Quality Index</span>
                    <span className="font-medium text-eco-forest">{dest.environmentalData.airQuality} (Good)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-eco-forest h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Biodiversity Score</span>
                    <span className="font-medium text-gray-800">{dest.environmentalData.biodiversityIndex}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${dest.environmentalData.biodiversityIndex * 10}%` }}></div>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600 flex items-center"><HiOutlineShieldCheck className="mr-2 text-eco-ocean" /> {dest.environmentalData.conservationStatus}</p>
                </div>
              </div>
            )}
          </div>

          {/* Available local guides widget */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-gray-800 mb-4">Local Guides Available</h3>
            <div className="space-y-4">
              {relatedGuides.map(guide => (
                <div key={guide.id} className="flex items-center space-x-3">
                  <img src={guide.avatar} alt={guide.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">{guide.name}</h4>
                    <p className="text-xs text-gray-500">{guide.specialization}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/guides" className="block text-center text-eco-ocean text-sm font-medium mt-4 hover:underline">See all guides</Link>
          </div>
        </div>
      </div>

      {/* Similar Destinations Section */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedDestinations.map(d => (
            <Link key={d.id} to={`/destinations/${d.id}`} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <img src={d.image} alt={d.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-gray-800">{d.name}</h3>
                <p className="text-sm text-gray-500">{d.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}