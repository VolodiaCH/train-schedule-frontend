import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type Page = number | '...';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages: Page[] = [];
  const maxPagesToShow = 3;

  if (totalPages <= maxPagesToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const showLeftEllipsis = currentPage > 3;
  const showRightEllipsis = currentPage < totalPages - 2;

  if (showLeftEllipsis) pages.push(1, '...');
  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }
  if (showRightEllipsis) pages.push('...', totalPages);

  const buttonClass =
    'px-3 py-2 border rounded-md bg-white shadow-sm hover:bg-gray-100 disabled:opacity-50';

  return (
    <div className="flex justify-center mt-4 space-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonClass}
      >
        Back
      </button>

      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={index} className="px-3 py-2 text-gray-500">
              ...
            </span>
          );
        } else {
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 border rounded-md shadow-sm transition ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          );
        }
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={buttonClass}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
