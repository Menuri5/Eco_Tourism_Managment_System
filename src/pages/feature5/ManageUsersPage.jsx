
/**
 * ManageUsersPage.jsx
 * Admin page for managing users
 */

// Import React and useState hook
import React, { useState } from 'react';

// Import the users data
import { users } from '../../data/users';

// Import icons used in the page
import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineMagnifyingGlass } from 'react-icons/hi2';

// Create sample users for the users table
const mockUsers = [
  ...users,
  { id: 'u4', name: 'Alice Smith', email: 'alice@example.com', role: 'user', joinDate: '2023-05-12', status: 'active', avatar: 'https://i.pravatar.cc/150?u=4' },
  { id: 'u5', name: 'Bob Jones', email: 'bob@example.com', role: 'user', joinDate: '2023-06-20', status: 'active', avatar: 'https://i.pravatar.cc/150?u=5' },
  { id: 'u6', name: 'Charlie Brown', email: 'charlie@example.com', role: 'support', joinDate: '2023-01-15', status: 'active', avatar: 'https://i.pravatar.cc/150?u=6' },
  { id: 'u7', name: 'Diana Prince', email: 'diana@example.com', role: 'user', joinDate: '2023-08-01', status: 'banned', avatar: 'https://i.pravatar.cc/150?u=7' },
  { id: 'u8', name: 'Evan Wright', email: 'evan@example.com', role: 'user', joinDate: '2023-09-10', status: 'active', avatar: 'https://i.pravatar.cc/150?u=8' }
];

// Create the Manage Users page component
const ManageUsersPage = () => {

  // Store the current list of users
  const [items, setItems] = useState(mockUsers);

  // Store the text entered in the search box
  const [searchTerm, setSearchTerm] = useState('');

  // Store the selected role filter
  const [roleFilter, setRoleFilter] = useState('all');

  // Filter users based on search text and selected role
  const filteredItems = items.filter(u => {

    // Check if the name or email matches the search text
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if the user role matches the selected role
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;

    // Return users that match both conditions
    return matchesSearch && matchesRole;
  });

  return (
    // Main page container
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h1>

      {/* Main users management card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        {/* Search and role filter section */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">

          {/* Search input container */}
          <div className="relative flex-1">

            {/* Search icon */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineMagnifyingGlass className="h-5 w-5 text-gray-400" />
            </div>

            {/* Search input */}
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm py-2 border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Role filter dropdown */}
          <select 
            className="border-gray-300 rounded-md shadow-sm py-2 px-3 border focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >

            {/* Show all user roles */}
            <option value="all">All Roles</option>

            {/* Admin role option */}
            <option value="admin">Admin</option>

            {/* Manager role option */}
            <option value="manager">Manager</option>

            {/* Support role option */}
            <option value="support">Support</option>

            {/* Normal user role option */}
            <option value="user">User</option>
          </select>
        </div>
        
        {/* Users table section */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">

            {/* Table header */}
            <thead className="bg-gray-50">
              <tr>

                {/* User column */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>

                {/* Role column */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>

                {/* Join date column */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>

                {/* Status column */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>

                {/* Actions column */}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody className="bg-white divide-y divide-gray-200">

              {/* Display each filtered user */}
              {filteredItems.map((user) => (
                <tr key={user.id}>

                  {/* User information */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">

                      {/* User avatar */}
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-full object-cover" src={user.avatar || 'https://via.placeholder.com/150'} alt="" />
                      </div>

                      {/* User name and email */}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* User role */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'manager' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'}`}>
                      {user.role}
                    </span>
                  </td>

                  {/* User join date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>

                  {/* User status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status || 'active'}
                    </span>
                  </td>

                  {/* Edit and delete actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">

                    {/* Edit user button */}
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      <HiOutlinePencilSquare className="h-5 w-5" />
                    </button>

                    {/* Delete user button */}
                    <button className="text-red-600 hover:text-red-900">
                      <HiOutlineTrash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Export the Manage Users page
export default ManageUsersPage;
