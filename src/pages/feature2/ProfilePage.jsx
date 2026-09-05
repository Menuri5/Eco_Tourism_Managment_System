/**
 * ProfilePage - User profile and preferences settings.
 */
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { HiOutlineUser, HiOutlineEnvelope, HiOutlinePencil, HiOutlinePhone, HiOutlineMapPin } from 'react-icons/hi2';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);


  // Form state holding editable user profile information with fallback defaults
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || 'traveler_99',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || 'Eco-travel enthusiast looking to explore the world sustainably.',
    preferences: user?.preferences || ['Wildlife', 'Nature']
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const availablePreferences = ['Wildlife', 'Nature', 'Beaches', 'Cultural', 'Adventure', 'Relaxation'];

  /**
   * Adds or removes a selected preference item from the formData state
   */

  const handlePreferenceToggle = (pref) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref) 
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref]
    }));
  };

  /**
   * Persists updated profile info (mock save) and exits edit mode
   */

  const handleSave = () => {
    // In real app, call API to save profile details and password
    setIsEditing(false);
  };

  /**
   * Translates internal role keys into friendly UI labels
   */

  const getAccountRoleLabel = () => {
    if (user?.role === 'admin') return 'Admin Account';
    if (user?.role === 'manager') return 'System Manager Account';
    return 'Tourist Account';
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>
      {/* Main Profile Card Container */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header Cover */}
        <div className="h-32 bg-gradient-to-r from-eco-ocean to-eco-forest relative">
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              <img src={user?.avatar || 'https://via.placeholder.com/150'} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white object-cover bg-white" />
             {/* Avatar edit action badge visible only in edit mode */}
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md text-gray-600 hover:text-eco-ocean border border-gray-200">
                  <HiOutlinePencil size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Edit Profile trigger button shown only when in view mode */}
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <HiOutlinePencil className="mr-2" /> Edit Profile
            </button>
          )}
        </div>

          {/* Profile Card Body */}
        <div className="pt-16 p-8">
          {isEditing ? (
            /*Edit form mode*/
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-ocean focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-ocean focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-ocean focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-ocean focus:outline-none" placeholder="+94 77 123 4567" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-ocean focus:outline-none" placeholder="123 Eco Street, Colombo" />
                </div>
              </div>

              {/* Bio Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-ocean focus:outline-none"></textarea>
              </div>
              
              {/* Change Password Section */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Current Password</label>
                    <input type="password" value={passwordData.currentPassword} onChange={e => setPasswordData({...passwordData, currentPassword: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-ocean focus:outline-none text-sm" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">New Password</label>
                    <input type="password" value={passwordData.newPassword} onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-ocean focus:outline-none text-sm" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Confirm New Password</label>
                    <input type="password" value={passwordData.confirmPassword} onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-eco-ocean focus:outline-none text-sm" placeholder="••••••••" />
                  </div>
                </div>
              </div>
              
              {/* Travel Preferences - Only for Tourists */}
              {user?.role === 'tourist' && (
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-3">Travel Preferences</h3>
                  <div className="flex flex-wrap gap-3">
                    {availablePreferences.map(pref => (
                      <label key={pref} className={`px-4 py-2 rounded-full border cursor-pointer transition-colors text-sm font-medium flex items-center ${formData.preferences.includes(pref) ? 'bg-eco-ocean text-white border-eco-ocean' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                        <input type="checkbox" className="hidden" checked={formData.preferences.includes(pref)} onChange={() => handlePreferenceToggle(pref)} />
                        {pref}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Action Controls: Cancel and Save */}
              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
                <button onClick={() => setIsEditing(false)} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
                <button onClick={handleSave} className="px-6 py-2 bg-eco-ocean text-white rounded-lg font-medium hover:bg-cyan-800">Save Changes</button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* User Bio and Primary Metadata */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  {formData.name || user?.name || 'Traveler'} 
                  <span className="text-sm font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded">@{formData.username}</span>
                </h2>

                {/* Contact and Identification Bar */}
                <div className="flex flex-wrap items-center text-gray-500 mt-2 gap-y-2 gap-x-5 text-sm">
                  <span className="flex items-center"><HiOutlineUser className="mr-1.5 h-4 w-4" /> {getAccountRoleLabel()}</span>
                  <span className="flex items-center"><HiOutlineEnvelope className="mr-1.5 h-4 w-4" /> {formData.email || user?.email}</span>
                  {formData.phone && <span className="flex items-center"><HiOutlinePhone className="mr-1.5 h-4 w-4" /> {formData.phone}</span>}
                  {formData.address && <span className="flex items-center"><HiOutlineMapPin className="mr-1.5 h-4 w-4" /> {formData.address}</span>}
                </div>
                <p className="mt-5 text-gray-600 max-w-2xl">{formData.bio}</p>
              </div>

              {/* Tourist Only Stats & Preferences */}
              {user?.role === 'tourist' && (
                <>
                {/* Tourist Activity Metric Counters */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-gray-100 py-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-eco-ocean">12</p>
                      <p className="text-sm text-gray-500">Destinations Visited</p>
                    </div>
                    <div className="text-center border-y md:border-y-0 md:border-x border-gray-100 py-4 md:py-0">
                      <p className="text-3xl font-bold text-eco-forest">4</p>
                      <p className="text-sm text-gray-500">Reviews Written</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-amber-500">$150</p>
                      <p className="text-sm text-gray-500">Donated</p>
                    </div>
                  </div>


                  {/* Configured Travel Preferences Badges */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Travel Preferences</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.preferences.map(pref => (
                        <span key={pref} className="bg-cyan-50 text-eco-ocean px-3 py-1 rounded-full text-sm font-medium">{pref}</span>
                      ))}
                      {formData.preferences.length === 0 && <p className="text-gray-500 text-sm">No preferences set.</p>}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
