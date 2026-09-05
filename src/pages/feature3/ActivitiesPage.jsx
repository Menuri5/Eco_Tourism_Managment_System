/**
 * ActivitiesPage - List of activities for a specific destination.
 */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { destinations } from '../../data/destinations';

export default function ActivitiesPage() {
  const { id } = useParams();
  const dest = destinations.find(d => d.id === parseInt(id));

  if (!dest) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Destination not found</h2>
        <Link to="/destinations" className="text-eco-ocean mt-4 inline-block">Return to Destinations</Link>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-amber-100 text-amber-800';
      case 'challenging': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <Link to={`/destinations/${dest.id}`} className="text-eco-ocean hover:underline text-sm mb-4 inline-block">&larr; Back to {dest.name}</Link>
        <h1 className="text-3xl font-bold text-gray-800">Activities at {dest.name}</h1>
        <p className="text-gray-600 mt-2">Discover eco-friendly and exciting things to do during your stay.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dest.activities && dest.activities.length > 0 ? (
          dest.activities.map(activity => (
            <div key={activity.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-800">{activity.name}</h3>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <span className="bg-gray-100 px-2 py-1 rounded">{activity.duration}</span>
                  <span className={`px-2 py-1 rounded font-medium ${getDifficultyColor(activity.difficulty)}`}>{activity.difficulty}</span>
                </div>
              </div>
              <div className="text-right w-full sm:w-auto">
                <p className="text-2xl font-bold text-eco-ocean mb-3">${activity.price}</p>
                <button className="w-full sm:w-auto bg-eco-ocean hover:bg-cyan-800 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-gray-500">No activities listed for this destination yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
