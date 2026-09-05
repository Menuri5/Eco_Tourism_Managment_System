import React, { useState } from 'react';
import { useCampaigns } from '../../context/GlobalDataContext';
import { HiOutlinePencilSquare, HiOutlineTrash, HiPlus, HiXMark } from 'react-icons/hi2';
import ImagePicker from '../../components/admin/ImagePicker';

export default function ManageCampaignsPage() {
  const { campaigns, addCampaign, updateCampaign, deleteCampaign } = useCampaigns();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialFormState = { 
    title: '', location: '', shortDescription: '', description: '',
    goal: 0, daysLeft: 30, category: 'ACTIVE CAMPAIGN', image: '', images: []
  };
  const [formData, setFormData] = useState(initialFormState);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const openEditModal = (campaign) => {
    setEditingId(campaign.id);
    setFormData({
      title: campaign.title || '',
      location: campaign.location || '',
      shortDescription: campaign.shortDescription || '',
      description: campaign.description || '',
      goal: campaign.goal || 0,
      daysLeft: campaign.daysLeft || 0,
      category: campaign.category || 'ACTIVE CAMPAIGN',
      image: campaign.image || '',
      images: Array.isArray(campaign.images) ? [...campaign.images] : []
    });
    setIsModalOpen(true);
  };

  const handleImageArrayChange = (index, val) => {
    const newImages = [...formData.images];
    newImages[index] = val;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const openDeleteModal = (id) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData, images: formData.images.filter(Boolean) };
    if (editingId) updateCampaign(editingId, payload);
    else addCampaign(payload);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    if (deletingId) deleteCampaign(deletingId);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Campaigns</h1>
        <button onClick={openAddModal} className="bg-eco-ocean hover:bg-cyan-800 text-white rounded-lg px-4 py-2 font-medium flex items-center">
          <HiPlus className="mr-2" /> Add Campaign
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Goal / Raised</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                    <img src={camp.image || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded-md object-cover" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{camp.title}</p>
                      <p className="text-xs text-gray-500">{camp.category}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{camp.location || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(camp.raised || 0).toLocaleString()} / ${(camp.goal || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${camp.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {camp.isActive ? 'Active' : 'Completed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openEditModal(camp)} className="text-eco-ocean hover:text-cyan-900 mr-4">
                      <HiOutlinePencilSquare className="inline h-5 w-5" />
                    </button>
                    <button onClick={() => openDeleteModal(camp.id)} className="text-red-500 hover:text-red-700">
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
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-medium text-gray-900">{editingId ? 'Edit Campaign' : 'Add Campaign'}</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500"><HiXMark className="h-6 w-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Goal ($)</label>
                    <input type="number" required value={formData.goal} onChange={(e) => setFormData({...formData, goal: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Days Left</label>
                    <input type="number" required value={formData.daysLeft} onChange={(e) => setFormData({...formData, daysLeft: Number(e.target.value)})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm" />
                  </div>
                  <div className="col-span-2">
                    <ImagePicker 
                      label="Primary Campaign Image" 
                      value={formData.image} 
                      onChange={(val) => setFormData({...formData, image: val})} 
                    />
                  </div>
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
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Short Description</label>
                    <textarea rows="2" required value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"></textarea>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Full Description</label>
                    <textarea rows="4" required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"></textarea>
                  </div>
                  <div className="col-span-2 sm:flex sm:flex-row-reverse mt-4">
                    <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-eco-ocean text-base font-medium text-white hover:bg-cyan-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                      {editingId ? 'Save Changes' : 'Add Campaign'}
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Campaign</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Are you sure you want to delete this campaign?</p>
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
