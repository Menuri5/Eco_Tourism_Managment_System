/**
 * Modal component
 */
import React, { useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';

// Props:
// - isOpen: whether the modal is currently shown
// - onClose: function to call when modal should close (X button, backdrop click, Esc key)
// - title: text shown in the modal header
// - children: whatever content is placed INSIDE <Modal>...</Modal> when used — e.g. a form
// - size: controls modal width — 'sm' | 'md' (default) | 'lg' | 'xl'
export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  
  // Side-effect: runs whenever isOpen or onClose changes
  useEffect(() => {
    // Listen for the Escape key — if pressed, close the modal
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc); // start listening for Esc key
      document.body.style.overflow = 'hidden'; // disable page scrolling while modal is open
      // (prevents the weird effect of scrolling the page behind the modal)
    }
    
    // Cleanup function — runs when component unmounts OR before the effect re-runs
    // Removes the event listener and restores scrolling, so nothing leaks/breaks
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]); // re-run this effect if isOpen or onClose changes

  // If modal shouldn't be open, render nothing
  if (!isOpen) return null;

  // Lookup table for width sizes, same pattern as ConservationAlert's "styles" object
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    // Full-screen fixed overlay, sits on top of everything (z-50)
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        
        {/* Dark semi-transparent backdrop behind the modal box */}
        {/* Clicking anywhere on this backdrop closes the modal */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
          onClick={onClose}
          aria-hidden="true" // hidden from screen readers (it's just a visual backdrop, not real content)
        ></div>

        {/* The actual modal box, sits ABOVE the backdrop (because it comes after it in the DOM + has "relative") */}
        <div 
          className={`relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 w-full ${sizeClasses[size]} animate-in slide-in-from-bottom-4 duration-200`}
          // sizeClasses[size] -> picks the right max-width based on the "size" prop
          // NOTE: clicking INSIDE this box does NOT close the modal (no onClick here) — only the backdrop or X button do
        >
          {/* Modal header: title + close (X) button */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
            >
              <HiXMark className="h-6 w-6" />
            </button>
          </div>
          
          {/* Modal body — whatever content the parent puts inside <Modal>...</Modal> gets rendered here */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}