import { getNads } from './lib/services/nadServices';
import { NAD } from './types/nad';

export default async function NadList() {
  const nads = await getNads();

  return (
    <div className="grid gap-4">
      {nads.map((nad: NAD) => (
        <div 
          key={nad.ticketId} 
          className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="font-bold">{nad.customerName}</h3>
          <p className="text-sm text-gray-600">Ticket: {nad.ticketId}</p>
          <a 
            href={nad.targetUrl} 
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Target URL
          </a>
          <p className="text-xs text-gray-500 mt-2">
            Criado em: {new Date(nad.creationTime).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}