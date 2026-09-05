/**
 * DataTable component
 */
import React, { useState } from 'react';
import { HiPencil, HiTrash, HiMagnifyingGlass } from 'react-icons/hi2';

export default function DataTable({ columns, data, onEdit, onDelete, searchable = false }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = searchable && searchTerm
    ? data.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : data;

  return (
    <div className="w-full bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
      {searchable && (
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div className="relative w-64">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm border-gray-300 rounded-md focus:ring-eco-ocean focus:border-eco-ocean"
            />
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              {columns.map((col, i) => (
                <th key={i} scope="col" className="px-6 py-3 font-semibold">
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th scope="col" className="px-6 py-3 font-semibold text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
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
              <tr>
                <td colSpan={columns.length + ((onEdit || onDelete) ? 1 : 0)} className="px-6 py-8 text-center text-gray-500">
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
