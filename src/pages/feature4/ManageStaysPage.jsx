/**
 * ManageStaysPage — Admin CRUD page for Stays & Dining places.
 * Features: searchable table, add/edit modal, delete confirmation.
 */
import React, { useState } from 'react';
import { useStays } from '../../context/StaysContext';
import ImagePicker from '../../components/admin/ImagePicker';
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlinePlusCircle,
  HiOutlineMagnifyingGlass,
  HiXMark,
} from 'react-icons/hi2';

// ─── Empty form template ───
const emptyForm = {
  name: '',
  type: '',
  category: 'stay',
  location: '',
  priceRange: '$$',
  image: '',
  images: [],
  shortDescription: '',
  description: '',
  amenities: '',
  'contact.phone': '',
  'contact.email': '',
  'contact.website': '',
  'contact.address': '',
  'coordinates.lat': '',
  'coordinates.lng': '',
};

export default function ManageStaysPage() {
  const { stays, addStay, updateStay, deleteStay } = useStays();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // ─── Filtered list ───
  const filtered = stays.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase())
  );

  // ─── Show success toast ───
  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // ─── Open modal for adding ───
  const handleAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  // ─── Open modal for editing ───
  const handleEdit = (place) => {
    setEditingId(place.id);
    setForm({
      name: place.name || '',
      type: place.type || '',
      category: place.category || 'stay',
      location: place.location || '',
      priceRange: place.priceRange || '$$',
      image: place.image || '',
      images: Array.isArray(place.images) ? [...place.images] : [],
      shortDescription: place.shortDescription || '',
      description: place.description || '',
      amenities: (place.amenities || []).join(', '),
      'contact.phone': place.contact?.phone || '',
      'contact.email': place.contact?.email || '',
      'contact.website': place.contact?.website || '',
      'contact.address': place.contact?.address || '',
      'coordinates.lat': place.coordinates?.lat || '',
      'coordinates.lng': place.coordinates?.lng || '',
    });
    setModalOpen(true);
  };

  const handleImageArrayChange = (index, val) => {
    const newImages = [...form.images];
    newImages[index] = val;
    setForm({ ...form, images: newImages });
  };

  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ''] });
  };

  const removeImageField = (index) => {
    const newImages = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: newImages });
  };

  // ─── Submit add or edit ───
  const handleSubmit = (e) => {
    e.preventDefault();

    const placeData = {
      name: form.name,
      type: form.type,
      category: form.category,
      location: form.location,
      priceRange: form.priceRange,
      image: form.image || `https://picsum.photos/seed/${form.name.replace(/\s/g, '-')}/800/500`,
      images: form.images.filter(Boolean),
      shortDescription: form.shortDescription,
      description: form.description,
      amenities: form.amenities.split(',').map((a) => a.trim()).filter(Boolean),
      contact: {
        phone: form['contact.phone'],
        email: form['contact.email'],
        website: form['contact.website'],
        address: form['contact.address'],
      },
      coordinates: {
        lat: parseFloat(form['coordinates.lat']) || 7.8731,
        lng: parseFloat(form['coordinates.lng']) || 80.7718,
      },
    };

    if (editingId) {
      updateStay(editingId, placeData);
      showSuccess(`"${form.name}" updated successfully!`);
    } else {
      addStay(placeData);
      showSuccess(`"${form.name}" added successfully!`);
    }

    setModalOpen(false);
    setForm(emptyForm);
    setEditingId(null);
  };

  // ─── Delete handler ───
  const handleDelete = (id) => {
    const place = stays.find((s) => s.id === id);
    deleteStay(id);
    setDeleteConfirm(null);
    showSuccess(`"${place?.name}" deleted successfully!`);
  };

  // ─── Form field change handler ───
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Stays & Dining</h1>
          <p className="text-sm text-gray-500 mt-1">{stays.length} places total</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-eco-ocean hover:bg-cyan-800 text-white font-medium rounded-lg px-5 py-2.5 transition-colors"
        >
          <HiOutlinePlusCircle className="h-5 w-5" />
          Add New Place
        </button>
      </div>

      {/* Success message */}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm animate-fade-in">
          ✅ {successMsg}
        </div>
      )}

      {/* Search bar */}
      <div className="relative mb-6">
        <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, location, or type..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-ocean focus:border-eco-ocean text-sm"
        />
      </div>

      {/* Data table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Image</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Name</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Type</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Category</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Location</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Price</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600">Rating</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    No places found.
                  </td>
                </tr>
              ) : (
                filtered.map((place) => (
                  <tr key={place.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-14 h-10 rounded-md object-cover"
                      />
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-800">{place.name}</td>
                    <td className="px-5 py-3 text-gray-600">{place.type}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          place.category === 'dining'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {place.category === 'dining' ? 'Dining' : 'Stay'}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{place.location}</td>
                    <td className="px-5 py-3 text-gray-600">{place.priceRange}</td>
                    <td className="px-5 py-3 text-gray-600">{place.rating}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(place)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <HiOutlinePencilSquare className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(place.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <HiOutlineTrash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          DELETE CONFIRMATION MODAL
          ═══════════════════════════════════════ */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 animate-slide-up">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Place</h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete{' '}
              <strong>"{stays.find((s) => s.id === deleteConfirm)?.name}"</strong>?
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════
          ADD / EDIT MODAL
          ═══════════════════════════════════════ */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8 animate-slide-up">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800">
                {editingId ? 'Edit Place' : 'Add New Place'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <HiXMark className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Place Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                    placeholder="e.g. Cinnamon Wild Yala"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <input
                    required
                    value={form.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                    placeholder="e.g. Eco Lodge, Fine Dining Restaurant"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                  >
                    <option value="stay">Stay / Hotel</option>
                    <option value="dining">Dining / Restaurant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    required
                    value={form.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                    placeholder="e.g. Ella, Uva Province"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <select
                    value={form.priceRange}
                    onChange={(e) => handleChange('priceRange', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                  >
                    <option value="$">$ — Budget</option>
                    <option value="$$">$$ — Moderate</option>
                    <option value="$$$">$$$ — Upscale</option>
                    <option value="$$$$">$$$$ — Luxury</option>
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <ImagePicker 
                  label="Primary Stay Image (leave blank for auto-generated)" 
                  value={form.image} 
                  onChange={(val) => handleChange('image', val)} 
                />
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Additional Images (Gallery)</label>
                  <button type="button" onClick={addImageField} className="text-xs font-medium text-eco-ocean hover:text-cyan-800 flex items-center">
                    <HiOutlinePlusCircle className="inline mr-1" /> Add Image
                  </button>
                </div>
                {form.images.map((img, idx) => (
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

              {/* Descriptions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
                <input
                  required
                  value={form.shortDescription}
                  onChange={(e) => handleChange('shortDescription', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                  placeholder="Brief one-line description for listings"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description *</label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean resize-none"
                  placeholder="Detailed description of the place..."
                />
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma-separated)</label>
                <input
                  value={form.amenities}
                  onChange={(e) => handleChange('amenities', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                  placeholder="Free WiFi, Swimming Pool, Restaurant, Spa"
                />
              </div>

              {/* Contact Info */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      required
                      value={form['contact.phone']}
                      onChange={(e) => handleChange('contact.phone', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                      placeholder="+94 11 234 5678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      required
                      type="email"
                      value={form['contact.email']}
                      onChange={(e) => handleChange('contact.email', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                      placeholder="info@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      value={form['contact.website']}
                      onChange={(e) => handleChange('contact.website', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                      placeholder="https://www.example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                    <input
                      required
                      value={form['contact.address']}
                      onChange={(e) => handleChange('contact.address', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                      placeholder="Full street address"
                    />
                  </div>
                </div>
              </div>

              {/* Coordinates */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Map Coordinates (optional)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      value={form['coordinates.lat']}
                      onChange={(e) => handleChange('coordinates.lat', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                      placeholder="e.g. 7.8731"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      value={form['coordinates.lng']}
                      onChange={(e) => handleChange('coordinates.lng', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                      placeholder="e.g. 80.7718"
                    />
                  </div>
                </div>
              </div>

              {/* Form actions */}
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {editingId ? 'Save Changes' : 'Add Place'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
