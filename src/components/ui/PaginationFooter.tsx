import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationFooterProps {
  currentPage: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const PaginationFooter: React.FC<PaginationFooterProps> = ({
  currentPage,
  totalCount,
  limit,
  onPageChange,
  loading = false,
}) => {
  const totalPages = Math.ceil(totalCount / limit);
  
  if (totalPages <= 1 && totalCount > 0) return null;
  if (totalCount === 0) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          disabled={loading}
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-[13px] font-semibold transition-all ${
            currentPage === i
              ? 'bg-[#2D5A53] text-white shadow-md'
              : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200'
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4">
      {/* Result stats */}
      <div className="flex-1">
        <p className="text-[13px] text-gray-400">
          Showing <span className="font-semibold text-gray-700">{(currentPage - 1) * limit + 1}</span> to{' '}
          <span className="font-semibold text-gray-700">{Math.min(currentPage * limit, totalCount)}</span> of{' '}
          <span className="font-semibold text-gray-700">{totalCount}</span> results
        </p>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1 || loading}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-all hover:bg-gray-50 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1.5">
          {renderPageNumbers()}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || loading}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition-all hover:bg-gray-50 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PaginationFooter;
