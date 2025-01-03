import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-end items-center mt-4 space-x-2">
      {/* Bouton Précédent (Triangle Gauche) */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === 1}
      >
        ◀
      </button>

      {/* Numéros de Page */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 py-1 rounded-md ${
            page === currentPage
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Bouton Suivant (Triangle Droite) */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;


