import Link from 'next/link';
import { getNads } from './lib/services/nadServices';
import { NAD } from './types/nad';

export default async function NadList() {
  const nads = await getNads();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {nads.map((nad: NAD) => (
        <Link href={`/nads/${nad.ticketId}`} 
          key={nad.ticketId} 
          className="p-4 border bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <h3 className="font-bold">{nad.customerName}</h3>
          <p className="text-sm text-gray-600">Ticket: {nad.ticketId}</p>
          <p 
            className="text-blue-500"
          >
            {nad.targetUrl}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Created at: {new Date(nad.creationTime).toLocaleString()}
          </p>
        </Link>
      ))}
    </div>
  );
}