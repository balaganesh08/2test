/**
 * Pagination component - A reusable pagination component with accessibility features
 * Following the Single Responsibility Principle - handles only pagination
 */
import React from 'react';
import { cn } from '@/utilities/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  // Generate array of page numbers to display
  const getPageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Add ellipsis if not showing first few pages
    if (currentPage > 4) {
      pageNumbers.push('...');
    }
    
    // Add pages around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Ensure at least 3 pages are shown (if available)
    if (startPage === 2) endPage = Math.min(totalPages - 1, 4);
    if (endPage === totalPages - 1) startPage = Math.max(2, totalPages - 3);
    
    // Add the page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    // Add ellipsis if not showing last few pages
    if (currentPage < totalPages - 3) {
      pageNumbers.push('...');
    }
    
    // Always show last page if more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex justify-center items-center space-x-2 mt-8", className)}
    >
      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "px-3 py-1 rounded-md border text-sm font-medium",
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50"
        )}
        aria-label="Go to previous page"
      >
        Previous
      </button>
      
      {/* Page Numbers */}
      <div className="flex space-x-1">
        {getPageNumbers().map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-9 h-9 rounded-md flex items-center justify-center text-sm font-medium",
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-white border text-gray-700 hover:bg-gray-50"
              )}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ) : (
            <span
              key={index}
              className="w-9 h-9 flex items-center justify-center text-gray-500"
              aria-hidden="true"
            >
              {page}
            </span>
          )
        ))}
      </div>
      
      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "px-3 py-1 rounded-md border text-sm font-medium",
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50"
        )}
        aria-label="Go to next page"
      >
        Next
      </button>
    </nav>
  );
};
