/**
 * ModerationPage.jsx
 * Admin page for moderating reviews
 */
import React, { useState } from 'react';
import { reviews } from '../../data/reviews';

const ModerationPage = () => {
  const [pendingReviews, setPendingReviews] = useState(
    reviews.filter(r => r.status === 'pending')
  );
  
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  const handleApprove = (id) => {
    setPendingReviews(pendingReviews.filter(r => r.id !== id));
    setApprovedCount(c => c + 1);
  };

  const handleReject = (id) => {
    setPendingReviews(pendingReviews.filter(r => r.id !== id));
    setRejectedCount(c => c + 1);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Review Moderation</h1>

      <div className="flex space-x-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold">{pendingReviews.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500">Approved Session</p>
          <p className="text-2xl font-bold">{approvedCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500">
          <p className="text-sm text-gray-500">Rejected Session</p>
          <p className="text-2xl font-bold">{rejectedCount}</p>
        </div>
      </div>

      {pendingReviews.length === 0 ? (
        <div className="bg-white p-12 rounded-xl shadow-md text-center">
          <p className="text-gray-500 text-lg">Hooray! The moderation queue is clear.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingReviews.map(review => (
            <div key={review.id} className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <img src={review.avatar} alt={review.userName} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{review.userName}</h3>
                    <p className="text-sm text-gray-500">for <span className="font-medium text-eco-ocean">{review.destinationName}</span> • {review.date}</p>
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-yellow-400">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{review.title}</h4>
                <p className="text-gray-600 text-sm">{review.text}</p>
              </div>
              <div className="flex md:flex-col justify-end space-x-3 md:space-x-0 md:space-y-3">
                <button 
                  onClick={() => handleApprove(review.id)}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
                >
                  Approve
                </button>
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

export default ModerationPage;
