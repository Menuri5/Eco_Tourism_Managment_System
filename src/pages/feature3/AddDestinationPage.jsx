/**
 * AddDestinationPage.jsx
 * Admin page for adding a new destination
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';

const AddDestinationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Destination saved successfully!');
    navigate('/admin/manage-destinations');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Destination</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-3xl">
        <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean focus:border-eco-ocean" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean focus:border-eco-ocean">
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean focus:border-eco-ocean" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean focus:border-eco-ocean"></textarea>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">Environmental Data (Mock)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Air Quality Index</label>
            <input type="number" className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean focus:border-eco-ocean" />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Biodiversity Index</label>
            <input type="number" step="0.1" className="w-full border border-gray-300 rounded-md p-2 focus:ring-eco-ocean focus:border-eco-ocean" />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8 pt-4 border-t border-gray-200">
          <button type="button" onClick={() => navigate('/admin/manage-destinations')} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-6 py-2 bg-eco-ocean text-white rounded-md hover:bg-cyan-800">Save Destination</button>
        </div>
      </form>
    </div>
  );
};

export default AddDestinationPage;
