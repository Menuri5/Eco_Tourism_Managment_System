/**
 * DataTable component
 */
import React, { useState } from 'react';
import { HiPencil, HiTrash, HiMagnifyingGlass } from 'react-icons/hi2'; // edit icon, delete icon, search icon

// Props:
// - columns: array describing each column, e.g. [{ header: 'Name', accessor: 'name' }, ...]
// - data: array of row objects (the actual data to display, e.g. list of users)
// - onEdit: function called when edit button clicked, receives the row
// - onDelete: function called when delete button clicked, receives the row
// - searchable: whether to show a search box above the table (default: false)
export default function DataTable({ columns, data, onEdit, onDelete, searchable = false }) {
  
  // What the user typed in the search box
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the data based on search term (only if searchable=true AND something is typed)
  const filteredData = searchable && searchTerm
    ? data.filter(item => 
        // Object.values(item) -> gets ALL field values of one row (e.g. ["John", "john@mail.com", "Admin"])
        // .some(...) -> checks if AT LEAST ONE field contains the search term
        // This means search checks every column, not just one specific field
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data; // if not searchable or search box is empty, just show everything

  return (
    <div className="w-full bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
      
      {/* Search bar — only rendered if searchable=true */}
      {searchable && (
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div className="relative w-64">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // updates on every keystroke -> live filtering
              className="w-full pl-9 pr-3 py-1.5 text-sm border-gray-300 rounded-md focus:ring-eco-ocean focus:border-eco-ocean"
            />
          </div>
        </div>
      )}
      
      {/* overflow-x-auto: if table is too wide for screen, allow horizontal scroll instead of breaking layout */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          
          {/* ---- Table Header ---- */}
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              {/* Loop through columns config to build header cells dynamically */}
              {columns.map((col, i) => (
                <th key={i} scope="col" className="px-6 py-3 font-semibold">
                  {col.header} {/* e.g. "Name", "Email", "Role" */}
                </th>
              ))}
              {/* Only show "Actions" header if edit or delete functions were passed in */}
              {(onEdit || onDelete) && (
                <th scope="col" className="px-6 py-3 font-semibold text-right">Actions</th>
              )}
            </tr>
          </thead>
          
          {/* ---- Table Body ---- */}
          <tbody>
            {filteredData.length > 0 ? (
              // If there IS data, render one <tr> per row
              filteredData.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
                  
                  {/* One <td> per column, for this row */}
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      {/* KEY PART: 
                          - if column has a custom "render" function, use it (for custom formatting, e.g. showing a badge/image)
                          - otherwise, just show row[col.accessor] directly (e.g. row["name"] -> "John") */}
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                  
                  {/* Edit/Delete action buttons, only if those functions were provided */}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 text-right space-x-3">
                      {onEdit && (
                        <button onClick={() => onEdit(row)} className="font-medium text-cyan-600 hover:text-cyan-900">
                          <HiPencil className="h-5 w-5 inline" />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(row)} className="font-medium text-red-600 hover:text-red-900">
                          <HiTrash className="h-5 w-5 inline" />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              // If NO data (empty array or filtered to nothing), show one message row instead
              <tr>
                <td 
                  colSpan={columns.length + ((onEdit || onDelete) ? 1 : 0)} 
                  // colSpan makes this single cell stretch across ALL columns
                  // +1 extra if there's an Actions column too, so the message stays centered properly
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}