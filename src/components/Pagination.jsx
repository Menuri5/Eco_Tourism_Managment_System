/**
 * Pagination component
 */
import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'; // left arrow, right arrow icons

// Props:
// - currentPage: which page number is currently active (e.g. 3)
// - totalPages: how many pages exist in total (e.g. 10)
// - onPageChange: function called when user clicks a page number or arrow, receives the new page number
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  
  // If there's only 1 page (or 0), no point showing pagination at all
  if (totalPages <= 1) return null;

  // This function decides WHICH page numbers to actually show as buttons
  // (you don't want to show "1 2 3 4 5 6 7 8 9 10 11 12..." if there are 50 pages — too cluttered)
  const getPageNumbers = () => {
    const pages = [];
    
    // CASE 1: few pages total (5 or less) -> just show ALL of them, no need to truncate
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } 
    else {
      // CASE 2: many pages -> need smart truncation with "..." 
      
      // Sub-case A: current page is near the START (page 1, 2, or 3)
      // Show: 1 2 3 4 ... [last page]
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } 
      // Sub-case B: current page is near the END (last 3 pages)
      // Show: 1 ... [last-3] [last-2] [last-1] [last]
      else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } 
      // Sub-case C: current page is somewhere in the MIDDLE
      // Show: 1 ... [current-1] [current] [current+1] ... [last]
      else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages; // e.g. [1, '...', 4, 5, 6, '...', 20]
  };

  return (
    <div className="flex items-center justify-center space-x-1">
      
      {/* ---- Previous arrow button ---- */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} // can't go before page 1 -> button disabled
        className="p-2 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Previous</span> {/* for screen readers, since icon alone has no text */}
        <HiChevronLeft className="h-5 w-5" />
      </button>
      
      {/* ---- Page number buttons (built from getPageNumbers()) ---- */}
      {getPageNumbers().map((page, i) => (
        <button
          key={i}
          // Only calls onPageChange if this is an actual number, NOT the '...' placeholder
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'} // "..." buttons are unclickable/disabled
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            page === currentPage
              ? 'bg-eco-ocean text-white border border-eco-ocean'   // this IS the current page -> highlighted blue
              : page === '...'
              ? 'text-gray-500 cursor-default'                       // this is a "..." -> plain gray, no hover effect
              : 'border border-gray-200 text-gray-700 hover:bg-gray-50' // regular clickable page number
          }`}
        >
          {page}
        </button>
      ))}

      {/* ---- Next arrow button ---- */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // can't go past the last page -> button disabled
        className="p-2 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Next</span>
        <HiChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}