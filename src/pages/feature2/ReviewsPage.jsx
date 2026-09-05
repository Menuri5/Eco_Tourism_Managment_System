/**
 * ReviewsPage - Displays a user's past reviews.
 */
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { reviews } from '../../data/reviews';
import { HiStar, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';

export default function ReviewsPage() {
  const { user } = useAuth();
  
  // In a real app we'd filter by user.id, using mock logic here
  const myReviews = reviews.slice(0, 3); // Just grabbing first 3 as mock user's reviews

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Page Header: Title, subtitle description, and call-to-action to write a new review */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Reviews</h1>
          <p className="text-gray-600 mt-2">Manage your feedback and past experiences.</p>
        </div>
        {/* Create Review trigger button */}
        <button className="bg-eco-ocean hover:bg-cyan-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
          Write a Review
        </button>
      </div>

      {/* Reviews List / Empty State Container */}
      <div className="space-y-4">
        {myReviews.length > 0 ? (
          myReviews.map(review => (
            <div key={review.id} className="bg-white rounded-xl shadow-md p-6">
              {/* Review Card Header: Destination name, date, publication badge, and star rating */}
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{review.destinationName}</h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${review.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                    {review.status === 'published' ? 'Published' : 'Pending'}
                  </span>
                  {/* 5-star rating display:*/}
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <HiStar key={i} className={i < review.rating ? 'text-amber-400' : 'text-gray-200'} size={20} />)}
                  </div>
                </div>
              </div>
              
              {/* Review Title and Feedback Body Text */}
              <h4 className="font-bold text-gray-800 mb-2">{review.title}</h4>
              <p className="text-gray-600 mb-4">{review.text}</p>
              
              {/* Card Actions: Edit and Delete controls */}
              <div className="flex justify-end space-x-3 border-t border-gray-100 pt-4">
                <button className="flex items-center text-sm font-medium text-gray-600 hover:text-eco-ocean transition-colors">
                  <HiOutlinePencilSquare className="mr-1" /> Edit
                </button>
                <button className="flex items-center text-sm font-medium text-red-500 hover:text-red-700 transition-colors">
                  <HiOutlineTrash className="mr-1" /> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Empty State:*/
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-500 mb-4">You haven't written any reviews yet.</p>
            <button className="bg-eco-ocean hover:bg-cyan-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
              Review a recent trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
