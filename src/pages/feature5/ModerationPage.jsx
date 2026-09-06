
/**
 * ModerationPage.jsx
 * Admin page for moderating reviews
 */

// Import React and useState hook
import React, { useState } from 'react';

// Import review data
import { reviews } from '../../data/reviews';

// Create the Moderation page component
const ModerationPage = () => {

  // Store only the reviews that are waiting for moderation
  const [pendingReviews, setPendingReviews] = useState(
    reviews.filter(r => r.status === 'pending')
  );
  
  // Store the number of approved reviews
  const [approvedCount, setApprovedCount] = useState(0);

  // Store the number of rejected reviews
  const [rejectedCount, setRejectedCount] = useState(0);

  // Approve a review
  const handleApprove = (id) => {

    // Remove the approved review from the pending list
    setPendingReviews(pendingReviews.filter(r => r.id !== id));

    // Increase the approved count by one
    setApprovedCount(c => c + 1);
  };

  // Reject a review
  const handleReject = (id) => {

    // Remove the rejected review from the pending list
    setPendingReviews(pendingReviews.filter(r => r.id !== id));

    // Increase the rejected count by one
    setRejectedCount(c => c + 1);
  };

  return (
    // Main page container
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Review Moderation</h1>

      {/* Summary cards for review counts */}
      <div className="flex space-x-4 mb-6">

        {/* Pending reviews count */}
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold">{pendingReviews.length}</p>
        </div>

        {/* Approved reviews count */}
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Approved Session</p>
          <p className="text-2xl font-bold">{approvedCount}</p>
        </div>

        {/* Rejected reviews count */}
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Rejected Session</p>
          <p className="text-2xl font-bold">{rejectedCount}</p>
        </div>
      </div>

      {/* Check if there are no pending reviews */}
      {pendingReviews.length === 0 ? (

        // Show message when the moderation queue is empty
        <div className="bg-white p-12 rounded-xl shadow-md text-center">
          <p className="text-gray-500 text-lg">Hooray! The moderation queue is clear.</p>
        </div>
      ) : (

        // Display all pending reviews
        <div className="space-y-4">
          {pendingReviews.map(review => (

            // Review card
            <div key={review.id} className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6">

              {/* Review information section */}
              <div className="flex-1">

                {/* User information */}
                <div className="flex items-center mb-2">

                  {/* User avatar */}
                  <img src={review.avatar} alt={review.userName} className="w-10 h-10 rounded-full mr-3" />

                  {/* User name and review details */}
                  <div>
                    <h3 className="font-semibold text-gray-800">{review.userName}</h3>
                    <p className="text-sm text-gray-500">for <span className="font-medium text-eco-ocean">{review.destinationName}</span> • {review.date}</p>
                  </div>
                </div>

                {/* Display the review rating */}
                <div className="mb-2">
                  <span className="text-yellow-400">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                </div>

                {/* Display review title */}
                <h4 className="font-semibold text-gray-800 mb-1">{review.title}</h4>

                {/* Display review text */}
                <p className="text-gray-600 text-sm">{review.text}</p>
              </div>

              {/* Approve and reject buttons */}
              <div className="flex md:flex-col justify-end space-x-3 md:space-x-0 md:space-y-3">

                {/* Approve review button */}
                <button 
                  onClick={() => handleApprove(review.id)}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
                >
                  Approve
                </button>

                {/* Reject review button */}
                <button 
                  onClick={() => handleReject(review.id)}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Export the Moderation page component
export default ModerationPage;
