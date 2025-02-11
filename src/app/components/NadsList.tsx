'use client';

import Link from 'next/link';
import { usePagination } from '../hooks/usePagination';
import { NAD } from '../types/nad';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

function Pagination({
  currentPage,
  totalPages,
  goToPage,
  prevPage,
  nextPage,
  isFirstPage,
  isLastPage
}: {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}) {
  return (
    <div className="mt-6">
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={prevPage}
          disabled={isFirstPage}
          className={`px-4 py-2 rounded-lg border ${
            isFirstPage 
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-50'
          }`}
        >
          Previous
        </button>

        <div className="flex items-center space-x-1">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-50'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={nextPage}
          disabled={isLastPage}
          className={`px-4 py-2 rounded-lg border ${
            isLastPage
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-50'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function NadGrid({ nads }: { nads: NAD[] }) {
  const itemsPerPage = 12;
  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    startIndex,
    endIndex,
    isFirstPage,
    isLastPage
  } = usePagination({
    totalItems: nads.length,
    itemsPerPage,
    initialPage: 1
  });

  const sortedNads = [...nads].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA;
  });

  const paginatedNads = sortedNads.slice(startIndex, endIndex);

  const formatCreatedAt = (dateString?: string) => {
    if (!dateString) return 'Date not available';

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid date';

      return formatDistanceToNow(date, {
        addSuffix: true,
        locale: enUS,
      });
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return 'Date unavailable';
    }
  };

  if (nads.length === 0) {
    return (
      <div className="w-full text-center p-4">
        <p className="text-gray-500">No NAD found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {paginatedNads.map((nad: NAD) => (
          <Link 
            href={`${process.env.NEXT_PUBLIC_URL}/nads/${nad.ticketId}`} 
            key={nad.ticketId} 
            className="p-4 border bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <h3 className="font-bold text-gray-800">{nad.ticketId}</h3>
            <p className="text-sm text-gray-600">{nad.customerName}</p>
            <p className="text-blue-500 hover:text-blue-600 truncate">
              {nad.targetUrl}
            </p>
            <div className="text-sm text-gray-500">
              Created {formatCreatedAt(nad.createdAt)}
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
        prevPage={prevPage}
        nextPage={nextPage}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
      />

      <div className="text-center text-sm text-gray-500 mt-4">
        Showing {startIndex + 1} to {Math.min(endIndex, nads.length)} of {nads.length} NADs
      </div>
    </>
  );
}

export default NadGrid;