/**
 * ManageDestinationsPage - Admin component for creating, editing, and deleting destinations.
 */
import React, { useState } from 'react';
import { useDestinations } from '../../context/GlobalDataContext';
import { HiOutlinePencilSquare, HiOutlineTrash, HiPlus, HiXMark } from 'react-icons/hi2';
import ImagePicker from '../../components/admin/ImagePicker';

export default function ManageDestinationsPage() {
  // 1. Fetch destination management hooks and context data
  const { destinations, addDestination, updateDestination, deleteDestination } = useDestinations();
  
  // 2. State configuration for managing the add/edit form modal and active item ID
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // 3. Initial state template for destination form fields
  const initialFormState = { 
    name: '', category: '', location: '', price: 0, 
    image: '', images: [], description: '', highlights: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  
  // 4. State variables for controlling the delete confirmation dialog
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // 5. Opens the modal for adding a new destination with clean/default fields
  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  // 6. Opens the modal for editing an existing destination, mapping arrays to comma-separated strings/copies
  const openEditModal = (dest) => {
    setEditingId(dest.id);
    setFormData({
      name: dest.name || '',
      category: dest.category || '',
      location: dest.location || '',
      price: dest.price || 0,
      image: dest.image || '',
      images: Array.isArray(dest.images) ? [...dest.images] : [],
      description: dest.description || '',
      highlights: Array.isArray(dest.highlights) ? dest.highlights.join(', ') : dest.highlights || ''
    });
    setIsModalOpen(true);
  };

  // 7. Updates a specific index within the gallery images array state
  const handleImageArrayChange = (index, val) => {
    const newImages = [...formData.images];
    newImages[index] = val;
    setFormData({ ...formData, images: newImages });
  };

  // 8. Appends a new blank input field to the gallery images array
  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  // 9. Removes a specific image entry field by index from the gallery array
  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  // 10. Triggers the delete verification modal for a targeted destination ID
  const openDeleteModal = (id) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  // 11. Handles form submission: formats highlights and images arrays before sending payload to context
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      highlights: formData.highlights.split(',').map(h => h.trim()).filter(Boolean),
      images: formData.images.filter(Boolean)
    };
    if (editingId) updateDestination(editingId, payload);
    else addDestination(payload);
    setIsModalOpen(false);
  };

  // 12. Executes deletion and closes confirmation dialog
  const confirmDelete = () => {
    if (deletingId) deleteDestination(deletingId);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Page Header and Add Destination Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Destinations</h1>
        <button onClick={openAddModal} className="bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-4 py-2 font-medium flex items-center">
          <HiPlus className="mr-2" /> Add Destination
        </button>
      </div>

      {/* Destinations Data Table Container */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {destinations.map((dest) => (
                <tr key={dest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                    <img src={dest.image || (dest.images && dest.images[0]) || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded-md object-cover" />
                    <span className="text-sm font-medium text-gray-900">{dest.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dest.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dest.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-eco-ocean">${dest.price}</td>
                  {/* Action Buttons to Edit or Delete */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openEditModal(dest)} className="text-eco-ocean hover:text-cyan-900 mr-4">
                      <HiOutlinePencilSquare className="inline h-5 w-5" />
                    </button>
                    <button onClick={() => openDeleteModal(dest.id)} className="text-red-500 hover:text-red-700">
                      <HiOutlineTrash className="inline h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Destination Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto pt-10">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setIsModalOpen(false)}>
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-medium text-gray-900">{editingId ? 'Edit Destination' : 'Add Destination'}</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500"><HiXMark className="h-6 w-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-4">
                  {/* Destination Name */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  {/* Category Field */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input type="text" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  {/* Location Field */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  {/* Price Field */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                    <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  {/* Primary Thumbnail Image Picker */}
                  <div className="col-span-2">
                    <ImagePicker 
                      label="Primary Image URL (Thumbnail)" 
                      value={formData.image} 
                      onChange={(val) => setFormData({...formData, image: val})} 
                    />
                  </div>
                  {/* Dynamic Gallery Images Array Manager */}
                  <div className="col-span-2 space-y-4">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">Additional Images (Gallery)</label>
                      <button type="button" onClick={addImageField} className="text-xs font-medium text-eco-ocean hover:text-cyan-800 flex items-center">
                        <HiPlus className="inline mr-1" /> Add Image
                      </button>
                    </div>
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <ImagePicker 
                          label={`Gallery Image ${idx + 1}`} 
                          value={img} 
                          onChange={(val) => handleImageArrayChange(idx, val)} 
                        />
                        <button type="button" onClick={() => removeImageField(idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600">
                          <HiOutlineTrash className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* Highlights Input */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Highlights (comma separated)</label>
                    <input type="text" required value={formData.highlights} onChange={(e) => setFormData({...formData, highlights: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  {/* Description Textarea */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea rows="4" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"></textarea>
                  </div>
                  {/* Form Action Buttons */}
                  <div className="col-span-2 sm:flex sm:flex-row-reverse mt-4">
                    <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-eco-ocean text-base font-medium text-white hover:bg-cyan-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                      {editingId ? 'Save Changes' : 'Add Destination'}
                    </button>
                    <button type="button" onClick={() => setIsModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal Dialog */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setIsDeleteModalOpen(false)}>
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <HiOutlineTrash className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Destination</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Are you sure you want to delete this destination?</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                <button type="button" onClick={confirmDelete} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">Delete</button>
                <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}