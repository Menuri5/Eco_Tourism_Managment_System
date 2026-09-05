import React, { useState } from 'react';
import { useGuides } from '../../context/GlobalDataContext';
import { HiOutlinePencilSquare, HiOutlineTrash, HiPlus, HiXMark } from 'react-icons/hi2';
import ImagePicker from '../../components/admin/ImagePicker';

export default function ManageGuidesPage() {
  const { guides, addGuide, updateGuide, deleteGuide } = useGuides();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialFormState = { 
    name: '', specialization: '', location: '', experience: 0, 
    pricePerDay: 0, languages: '', bio: '', avatar: '' 
  };
  const [formData, setFormData] = useState(initialFormState);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const openEditModal = (guide) => {
    setEditingId(guide.id);
    setFormData({ 
      ...guide, 
      languages: Array.isArray(guide.languages) ? guide.languages.join(', ') : guide.languages 
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean)
    };
    if (editingId) updateGuide(editingId, payload);
    else addGuide(payload);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deletingId) deleteGuide(deletingId);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Guides</h1>
        <button onClick={openAddModal} className="bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-4 py-2 font-medium flex items-center">
          <HiPlus className="mr-2" /> Add Guide
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guide</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price/Day</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {guides.map((guide) => (
                <tr key={guide.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                    <img src={guide.avatar || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{guide.name}</p>
                      <p className="text-xs text-gray-500">{guide.experience} yrs exp</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guide.specialization}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{guide.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-eco-ocean">${guide.pricePerDay}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openEditModal(guide)} className="text-eco-ocean hover:text-cyan-900 mr-4">
                      <HiOutlinePencilSquare className="inline h-5 w-5" />
                    </button>
                    <button onClick={() => openDeleteModal(guide.id)} className="text-red-500 hover:text-red-700">
                      <HiOutlineTrash className="inline h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto pt-10">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setIsModalOpen(false)}>
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-medium text-gray-900">{editingId ? 'Edit Guide' : 'Add Guide'}</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500"><HiXMark className="h-6 w-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <ImagePicker 
                      label="Guide Photo" 
                      value={formData.avatar} 
                      onChange={(val) => setFormData({...formData, avatar: val})} 
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Specialization</label>
                    <input type="text" required value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
                    <input type="number" required value={formData.experience} onChange={(e) => setFormData({...formData, experience: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Price Per Day ($)</label>
                    <input type="number" required value={formData.pricePerDay} onChange={(e) => setFormData({...formData, pricePerDay: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Languages (comma separated)</label>
                    <input type="text" value={formData.languages} onChange={(e) => setFormData({...formData, languages: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" placeholder="English, Sinhala" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea rows="3" required value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"></textarea>
                  </div>
                  <div className="col-span-2 sm:flex sm:flex-row-reverse mt-4">
                    <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-eco-ocean text-base font-medium text-white hover:bg-cyan-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                      {editingId ? 'Save Changes' : 'Add Guide'}
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

      {/* Delete Modal */}
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Guide</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Are you sure you want to delete this guide?</p>
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
