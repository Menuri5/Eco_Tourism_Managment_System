/**
 * ManageStaysPage
 * This page is used by the admin to manage Stays and Dining places.
 * Admin can:
 * - View places
 * - Search places
 * - Add a new place
 * - Edit an existing place
 * - Delete a place
 */

import React, { useState } from 'react';

// Import the custom context that manages stay data
import { useStays } from '../../context/StaysContext';

// Import the image picker component
import ImagePicker from '../../components/admin/ImagePicker';

// Import icons used in the page
import {
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlinePlusCircle,
  HiOutlineMagnifyingGlass,
  HiXMark,
} from 'react-icons/hi2';


// ─────────────────────────────────────────────
// Empty Form Template
// ─────────────────────────────────────────────

// This object contains the default values for the form.
// It is used when adding a new place.
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


// Main component
export default function ManageStaysPage() {

  // Get stay data and functions from StaysContext
  // stays = list of places
  // addStay = add a new place
  // updateStay = update an existing place
  // deleteStay = delete a place
  const { stays, addStay, updateStay, deleteStay } = useStays();


  // Store the search text
  const [search, setSearch] = useState('');

  // Store whether the add/edit modal is open
  const [modalOpen, setModalOpen] = useState(false);

  // Store the ID of the place currently being edited
  // null means no place is being edited
  const [editingId, setEditingId] = useState(null);

  // Store all form input values
  const [form, setForm] = useState(emptyForm);

  // Store the ID of the place waiting for delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Store the success message shown after add, edit, or delete
  const [successMsg, setSuccessMsg] = useState('');


  // ─────────────────────────────────────────────
  // Filter Places
  // ─────────────────────────────────────────────

  // Filter the places according to the search text.
  // Search works with:
  // - Place name
  // - Location
  // - Type
  const filtered = stays.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase()) ||
      s.type.toLowerCase().includes(search.toLowerCase())
  );


  // ─────────────────────────────────────────────
  // Show Success Message
  // ─────────────────────────────────────────────

  // This function displays a success message.
  // The message disappears automatically after 3 seconds.
  const showSuccess = (msg) => {
    setSuccessMsg(msg);

    // Remove the message after 3000 milliseconds
    setTimeout(() => setSuccessMsg(''), 3000);
  };


  // ─────────────────────────────────────────────
  // Open Add Modal
  // ─────────────────────────────────────────────

  // This function opens the form for adding a new place.
  const handleAdd = () => {

    // No place is being edited
    setEditingId(null);

    // Reset the form to empty values
    setForm(emptyForm);

    // Open the modal
    setModalOpen(true);
  };


  // ─────────────────────────────────────────────
  // Open Edit Modal
  // ─────────────────────────────────────────────

  // This function opens the form with the selected
  // place's existing information.
  const handleEdit = (place) => {

    // Save the ID of the selected place
    setEditingId(place.id);

    // Load the selected place data into the form
    setForm({
      name: place.name || '',
      type: place.type || '',
      category: place.category || 'stay',
      location: place.location || '',
      priceRange: place.priceRange || '$$',
      image: place.image || '',

      // Check whether images is an array.
      // If it is an array, create a copy of it.
      images: Array.isArray(place.images) ? [...place.images] : [],

      shortDescription: place.shortDescription || '',
      description: place.description || '',

      // Convert the amenities array into a text string.
      // Example:
      // ['WiFi', 'Pool'] becomes "WiFi, Pool"
      amenities: (place.amenities || []).join(', '),

      // Load contact information
      'contact.phone': place.contact?.phone || '',
      'contact.email': place.contact?.email || '',
      'contact.website': place.contact?.website || '',
      'contact.address': place.contact?.address || '',

      // Load map coordinates
      'coordinates.lat': place.coordinates?.lat || '',
      'coordinates.lng': place.coordinates?.lng || '',
    });

    // Open the edit modal
    setModalOpen(true);
  };


  // ─────────────────────────────────────────────
  // Change Gallery Image
  // ─────────────────────────────────────────────

  // Update one image inside the gallery.
  // index = image number
  // val = new image value
  const handleImageArrayChange = (index, val) => {

    // Create a copy of the current image list
    const newImages = [...form.images];

    // Replace the selected image
    newImages[index] = val;

    // Update the form
    setForm({ ...form, images: newImages });
  };


  // ─────────────────────────────────────────────
  // Add Image Field
  // ─────────────────────────────────────────────

  // Add a new empty image field to the gallery.
  const addImageField = () => {
    setForm({
      ...form,
      images: [...form.images, '']
    });
  };


  // ─────────────────────────────────────────────
  // Remove Image Field
  // ─────────────────────────────────────────────

  // Remove an image field from the gallery.
  const removeImageField = (index) => {

    // Create a new array without the selected image
    const newImages = form.images.filter((_, i) => i !== index);

    // Update the form
    setForm({ ...form, images: newImages });
  };


  // ─────────────────────────────────────────────
  // Submit Add or Edit Form
  // ─────────────────────────────────────────────

  // This function runs when the form is submitted.
  const handleSubmit = (e) => {

    // Stop the browser from refreshing the page
    e.preventDefault();


    // Create the final data object for the place.
    // This data will be sent to the context.
    const placeData = {

      // Basic information
      name: form.name,
      type: form.type,
      category: form.category,
      location: form.location,
      priceRange: form.priceRange,

      // Use the entered image.
      // If no image is entered, automatically create an image URL.
      image:
        form.image ||
        `https://picsum.photos/seed/${form.name.replace(/\s/g, '-')}/800/500`,

      // Remove empty gallery image values
      images: form.images.filter(Boolean),

      // Description information
      shortDescription: form.shortDescription,
      description: form.description,

      // Convert the comma-separated amenities string
      // into an array.
      amenities: form.amenities
        .split(',')
        .map((a) => a.trim())
        .filter(Boolean),

      // Contact information
      contact: {
        phone: form['contact.phone'],
        email: form['contact.email'],
        website: form['contact.website'],
        address: form['contact.address'],
      },

      // Location coordinates
      coordinates: {
        // Convert latitude to a number.
        // Use the default value if no valid value is provided.
        lat: parseFloat(form['coordinates.lat']) || 7.8731,

        // Convert longitude to a number.
        // Use the default value if no valid value is provided.
        lng: parseFloat(form['coordinates.lng']) || 80.7718,
      },
    };


    // Check whether we are editing an existing place
    if (editingId) {

      // Update the existing place
      updateStay(editingId, placeData);

      // Show update success message
      showSuccess(`"${form.name}" updated successfully!`);

    } else {

      // Add a new place
      addStay(placeData);

      // Show add success message
      showSuccess(`"${form.name}" added successfully!`);
    }


    // Close the modal
    setModalOpen(false);

    // Reset the form
    setForm(emptyForm);

    // Clear the editing ID
    setEditingId(null);
  };


  // ─────────────────────────────────────────────
  // Delete Place
  // ─────────────────────────────────────────────

  // This function deletes a selected place.
  const handleDelete = (id) => {

    // Find the place using its ID
    const place = stays.find((s) => s.id === id);

    // Delete the place
    deleteStay(id);

    // Close the delete confirmation
    setDeleteConfirm(null);

    // Show success message
    showSuccess(`"${place?.name}" deleted successfully!`);
  };


  // ─────────────────────────────────────────────
  // Form Input Change Handler
  // ─────────────────────────────────────────────

  // This function updates a form field when the user types
  // or selects a new value.
  const handleChange = (field, value) => {

    // Keep the existing form values and update
    // only the selected field.
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };


  // ─────────────────────────────────────────────
  // Page UI
  // ─────────────────────────────────────────────

  return (
    <div className="animate-fade-in">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">

        <div>

          {/* Page title */}
          <h1 className="text-2xl font-bold text-gray-800">
            Manage Stays & Dining
          </h1>

          {/* Display total number of places */}
          <p className="text-sm text-gray-500 mt-1">
            {stays.length} places total
          </p>

        </div>


        {/* Button to add a new place */}
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

          {/* Display the success message */}
          ✅ {successMsg}

        </div>
      )}


      {/* Search bar */}
      <div className="relative mb-6">

        {/* Search icon */}
        <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

        {/* Search input */}
        <input
          type="text"
          value={search}

          // Update search text when user types
          onChange={(e) => setSearch(e.target.value)}

          placeholder="Search by name, location, or type..."

          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-ocean focus:border-eco-ocean text-sm"
        />

      </div>


      {/* Data table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Allow horizontal scrolling on small screens */}
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            {/* Table header */}
            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>

                <th className="text-left px-5 py-3 font-semibold text-gray-600">
                  Image
                </th>

                <th className="text-left px-5 py-3 font-semibold text-gray-600">
                  Name
                </th>

                <th className="text-left px-5 py-3 font-semibold text-gray-600">
                  Type
                </th>

                <th className="text-left px-5 py-3 font-semibold text-gray-600">
                  Category
                </th>

                <th className="text-left px-5 py-3 font-semibold text-gray-600">
                  Location
                </th>

                <th className="text-left px-5 py-3 font-semibold text-gray-600">
                  Price
                </th>

                <th className="text-left px-5 py-3 font-semibold text-gray-600">
                  Rating
                </th>

                <th className="text-right px-5 py-3 font-semibold text-gray-600">
                  Actions
                </th>

              </tr>

            </thead>


            {/* Table body */}
            <tbody className="divide-y divide-gray-100">

              {/* Show message when there are no matching places */}
              {filtered.length === 0 ? (

                <tr>

                  <td
                    colSpan={8}
                    className="text-center py-12 text-gray-400"
                  >
                    No places found.
                  </td>

                </tr>

              ) : (

                // Display every filtered place
                filtered.map((place) => (

                  <tr
                    key={place.id}
                    className="hover:bg-gray-50 transition-colors"
                  >

                    {/* Place image */}
                    <td className="px-5 py-3">

                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-14 h-10 rounded-md object-cover"
                      />

                    </td>


                    {/* Place name */}
                    <td className="px-5 py-3 font-medium text-gray-800">
                      {place.name}
                    </td>


                    {/* Place type */}
                    <td className="px-5 py-3 text-gray-600">
                      {place.type}
                    </td>


                    {/* Category */}
                    <td className="px-5 py-3">

                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          place.category === 'dining'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >

                        {/* Display Dining or Stay */}
                        {place.category === 'dining'
                          ? 'Dining'
                          : 'Stay'}

                      </span>

                    </td>


                    {/* Location */}
                    <td className="px-5 py-3 text-gray-600">
                      {place.location}
                    </td>


                    {/* Price */}
                    <td className="px-5 py-3 text-gray-600">
                      {place.priceRange}
                    </td>


                    {/* Rating */}
                    <td className="px-5 py-3 text-gray-600">
                      {place.rating}
                    </td>


                    {/* Action buttons */}
                    <td className="px-5 py-3">

                      <div className="flex items-center justify-end gap-2">

                        {/* Edit button */}
                        <button
                          onClick={() => handleEdit(place)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <HiOutlinePencilSquare className="h-5 w-5" />
                        </button>


                        {/* Delete button */}
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

      {/* Show this modal only when a delete is waiting for confirmation */}
      {deleteConfirm && (

        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 animate-slide-up">

            {/* Modal title */}
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Delete Place
            </h3>


            {/* Confirmation message */}
            <p className="text-sm text-gray-600 mb-6">

              Are you sure you want to delete{' '}

              {/* Display the selected place name */}
              <strong>
                "{stays.find((s) => s.id === deleteConfirm)?.name}"
              </strong>?

              This action cannot be undone.

            </p>


            {/* Modal buttons */}
            <div className="flex gap-3 justify-end">

              {/* Cancel delete */}
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>


              {/* Confirm delete */}
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

      {/* Show this modal when adding or editing a place */}
      {modalOpen && (

        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">

          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8 animate-slide-up">

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">

              {/* Change title depending on add or edit mode */}
              <h3 className="text-lg font-bold text-gray-800">
                {editingId ? 'Edit Place' : 'Add New Place'}
              </h3>


              {/* Close modal button */}
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <HiXMark className="h-5 w-5 text-gray-500" />
              </button>

            </div>


            {/* Modal form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* Basic information section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Place name */}
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Place Name *
                  </label>

                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      handleChange('name', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                    placeholder="e.g. Cinnamon Wild Yala"
                  />

                </div>


                {/* Place type */}
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type *
                  </label>

                  <input
                    required
                    value={form.type}
                    onChange={(e) =>
                      handleChange('type', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                    placeholder="e.g. Eco Lodge, Fine Dining Restaurant"
                  />

                </div>

              </div>


              {/* Category, Location and Price section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Category */}
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>

                  <select
                    value={form.category}
                    onChange={(e) =>
                      handleChange('category', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                  >

                    <option value="stay">
                      Stay / Hotel
                    </option>

                    <option value="dining">
                      Dining / Restaurant
                    </option>

                  </select>

                </div>


                {/* Location */}
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>

                  <input
                    required
                    value={form.location}
                    onChange={(e) =>
                      handleChange('location', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                    placeholder="e.g. Ella, Uva Province"
                  />

                </div>


                {/* Price range */}
                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </label>

                  <select
                    value={form.priceRange}
                    onChange={(e) =>
                      handleChange('priceRange', e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                  >

                    <option value="$">
                      $ — Budget
                    </option>

                    <option value="$$">
                      $$ — Moderate
                    </option>

                    <option value="$$$">
                      $$$ — Upscale
                    </option>

                    <option value="$$$$">
                      $$$$ — Luxury
                    </option>

                  </select>

                </div>

              </div>


              {/* Primary image section */}
              <div>

                <ImagePicker
                  label="Primary Stay Image (leave blank for auto-generated)"
                  value={form.image}
                  onChange={(val) =>
                    handleChange('image', val)
                  }
                />

              </div>


              {/* Additional gallery images */}
              <div className="space-y-4 pt-2">

                {/* Gallery title and add image button */}
                <div className="flex justify-between items-center mb-1">

                  <label className="block text-sm font-medium text-gray-700">
                    Additional Images (Gallery)
                  </label>

                  {/* Add another image field */}
                  <button
                    type="button"
                    onClick={addImageField}
                    className="text-xs font-medium text-eco-ocean hover:text-cyan-800 flex items-center"
                  >
                    <HiOutlinePlusCircle className="inline mr-1" />
                    Add Image
                  </button>

                </div>


                {/* Display all gallery image fields */}
                {form.images.map((img, idx) => (

                  <div
                    key={idx}
                    className="relative bg-gray-50 p-3 rounded-lg border border-gray-100"
                  >

                    {/* Image picker */}
                    <ImagePicker
                      label={`Gallery Image ${idx + 1}`}
                      value={img}
                      onChange={(val) =>
                        handleImageArrayChange(idx, val)
                      }
                    />


                    {/* Remove gallery image */}
                    <button
                      type="button"
                      onClick={() => removeImageField(idx)}
                      className="absolute top-3 right-3 text-red-400 hover:text-red-600"
                    >
                      <HiOutlineTrash className="h-4 w-4" />
                    </button>

                  </div>

                ))}

              </div>


              {/* Description section */}

              {/* Short description */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description *
                </label>

                <input
                  required
                  value={form.shortDescription}
                  onChange={(e) =>
                    handleChange('shortDescription', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                  placeholder="Brief one-line description for listings"
                />

              </div>


              {/* Full description */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Description *
                </label>

                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    handleChange('description', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean resize-none"
                  placeholder="Detailed description of the place..."
                />

              </div>


              {/* Amenities section */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amenities (comma-separated)
                </label>

                <input
                  value={form.amenities}
                  onChange={(e) =>
                    handleChange('amenities', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                  placeholder="Free WiFi, Swimming Pool, Restaurant, Spa"
                />

              </div>


              {/* Contact information section */}
              <div className="border-t border-gray-200 pt-4">

                <h4 className="text-sm font-semibold text-gray-800 mb-3">
                  Contact Information
                </h4>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Phone */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>

                    <input
                      required
                      value={form['contact.phone']}
                      onChange={(e) =>
                        handleChange('contact.phone', e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                      placeholder="+94 11 234 5678"
                    />

                  </div>


                  {/* Email */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>

                    <input
                      required
                      type="email"
                      value={form['contact.email']}
                      onChange={(e) =>
                        handleChange('contact.email', e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                      placeholder="info@example.com"
                    />

                  </div>


                  {/* Website */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Website
                    </label>

                    <input
                      value={form['contact.website']}
                      onChange={(e) =>
                        handleChange('contact.website', e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                      placeholder="https://www.example.com"
                    />

                  </div>


                  {/* Address */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>

                    <input
                      required
                      value={form['contact.address']}
                      onChange={(e) =>
                        handleChange('contact.address', e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                      placeholder="Full street address"
                    />

                  </div>

                </div>

              </div>


              {/* Map coordinates section */}
              <div className="border-t border-gray-200 pt-4">

                <h4 className="text-sm font-semibold text-gray-800 mb-3">
                  Map Coordinates (optional)
                </h4>


                <div className="grid grid-cols-2 gap-4">

                  {/* Latitude */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Latitude
                    </label>

                    <input
                      type="number"
                      step="any"
                      value={form['coordinates.lat']}
                      onChange={(e) =>
                        handleChange(
                          'coordinates.lat',
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                      placeholder="e.g. 7.8731"
                    />

                  </div>


                  {/* Longitude */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Longitude
                    </label>

                    <input
                      type="number"
                      step="any"
                      value={form['coordinates.lng']}
                      onChange={(e) =>
                        handleChange(
                          'coordinates.lng',
                          e.target.value
                        )
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eco-ocean"
                      placeholder="e.g. 80.7718"
                    />

                  </div>

                </div>

              </div>


              {/* Form action buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">

                {/* Cancel button */}
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>


                {/* Submit button */}
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg text-sm font-medium transition-colors"
                >

                  {/* Show different text for Add and Edit */}
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