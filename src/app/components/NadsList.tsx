import Link from 'next/link';
import { Suspense } from 'react';
import { getNads } from '../lib/services/nadServices';
import { NAD } from '../types/nad';
import NadSkeleton from '../components/NADSkeleton';
import 'dotenv/config';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const dynamic = 'force-dynamic';

function Pagination({ 
  currentPage, 
  totalPages,
  totalItems 
}: { 
  currentPage: number;
  totalPages: number;
  totalItems: number;
}) {
  return (
    <div className="mt-6">
      <div className="flex justify-center items-center space-x-4 mb-4">
        {totalPages > 1 && (
          <div className="flex items-center space-x-1">
            {[...Array(totalPages)].map((_, index) => (
              <Link
                key={index}
                href={`/nads?page=${index + 1}`}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="text-center text-sm text-gray-500">
        Showing {Math.min(currentPage * 12, totalItems)} of {totalItems} NADs
      </div>
    </div>
  );
}

function NadGrid({ 
  nads,
  currentPage,
  itemsPerPage = 12 
}: { 
  nads: NAD[];
  currentPage: number;
  itemsPerPage?: number;
}) {
  const nadsArray = Array.isArray(nads) ? nads : [];
  
  const sortedNads = [...nadsArray].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNads = sortedNads.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedNads.length / itemsPerPage);

  if (nadsArray.length === 0) {
    return (
      <div className="w-full text-center p-4">
        <p className="text-gray-500">No NAD found.</p>
      </div>
    );
  }

  const formatCreatedAt = (dateString?: string) => {
    if (!dateString) {
      return 'Date not available';
    }

    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }

      return formatDistanceToNow(date, {
        addSuffix: true,
        locale: enUS,
      });
    } catch (error) {
      console.error('Error formatting date:', dateString, error);
      return 'Date unavailable';
    }
  };

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
        totalItems={sortedNads.length}
      />
    </>
  );
}

export default async function NadList({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page;
  const currentPage = typeof page === 'string' ? parseInt(page, 10) : 1;
  const itemsPerPage = 12;

  const result = await getNads();
  
  const nads = (result?.nads || [])
    .map(nad => ({
      ...nad,
      createdAt: nad.createdAt || new Date().toISOString()
    }))
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

  return (
    <div className="min-h-screen">
      <Suspense fallback={<NadSkeleton />}>
        <NadGrid 
          nads={nads}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </Suspense>
    </div>
  );
}