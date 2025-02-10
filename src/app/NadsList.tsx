import Link from 'next/link';
import { Suspense } from 'react';
import { getNads } from './lib/services/nadServices';
import { NAD } from './types/nad';
import NadSkeleton from './components/NADSkeleton';

function NadGrid({ nads }: { nads: NAD[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {nads.map((nad: NAD) => (
        <Link 
          href={`/nads/${nad.ticketId}`} 
          key={nad.ticketId} 
          className="p-4 border bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
        >
          <h3 className="font-bold text-gray-800">{nad.customerName}</h3>
          <p className="text-sm text-gray-600">Ticket: {nad.ticketId}</p>
          <p className="text-blue-500 hover:text-blue-600 truncate">
            {nad.targetUrl}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Created at: {new Date(nad.creationTime).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default async function NadList() {
  const nads = await getNads();

  return (
    <div className="min-h-screen">
      <Suspense fallback={<NadSkeleton />}>
        <NadGrid nads={nads} />
      </Suspense>
    </div>
  );
}