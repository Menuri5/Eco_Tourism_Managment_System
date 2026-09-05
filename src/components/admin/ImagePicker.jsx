import React, { useState, useEffect } from 'react';
import { localImages } from '../../data/localImages';

export default function ImagePicker({ value, onChange, label }) {
  // Determine initial mode based on whether the value starts with /images/
  // (Empty values default to local mode)
  const isLocalValue = !value || value.startsWith('/images/');
  const [mode, setMode] = useState(isLocalValue ? 'local' : 'external');

  // Keep mode in sync if value changes externally (e.g. editing a different item)
  useEffect(() => {
    if (value && !value.startsWith('/images/')) {
      setMode('external');
    } else if (value && value.startsWith('/images/')) {
      setMode('local');
    }
  }, [value]);

  const currentFilename = (value && value.startsWith('/images/')) ? value.replace('/images/', '') : '';

  const handleLocalChange = (e) => {
    const val = e.target.value;
    onChange(val ? `/images/${val}` : '');
  };

  const handleExternalChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-end mb-1">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="text-xs space-x-2">
          <button 
            type="button" 
            onClick={() => setMode('local')}
            className={`font-medium transition-colors ${mode === 'local' ? 'text-eco-ocean' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Local Image
          </button>
          <span className="text-gray-300">|</span>
          <button 
            type="button" 
            onClick={() => setMode('external')}
            className={`font-medium transition-colors ${mode === 'external' ? 'text-eco-ocean' : 'text-gray-400 hover:text-gray-600'}`}
          >
            External URL
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 items-start">
        {/* Preview Thumbnail */}
        <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-md border border-gray-200 overflow-hidden flex items-center justify-center shadow-sm">
          {value ? (
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-[10px] text-center px-1">No image</span>
          )}
        </div>
        
        {/* Input Area */}
        <div className="flex-grow relative mt-1">
          {mode === 'local' ? (
            <>
              <input
                type="text"
                list="local-images-list"
                value={currentFilename}
                onChange={handleLocalChange}
                placeholder="Search or select from public/images/..."
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"
              />
              <datalist id="local-images-list">
                {localImages.map(img => (
                  <option key={img} value={img} />
                ))}
              </datalist>
            </>
          ) : (
            <input
              type="text"
              value={value || ''}
              onChange={handleExternalChange}
              placeholder="https://example.com/image.jpg"
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-eco-ocean focus:border-eco-ocean sm:text-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
}
