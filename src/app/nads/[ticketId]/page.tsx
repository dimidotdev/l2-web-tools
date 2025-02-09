import { nads } from "@/app/nads-data";
import NotFound from "@/app/not-found";

export default function NadDetail({params}: {params: {ticketId: string}}) {

  const nad = nads.find(nad => nad.ticketId === params.ticketId);

  if (!nad) return <NotFound />;

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg flex flex-col items-center w-1/2">
      <h1 className="text-4xl font-bold mb-4">{nad.ticketId}</h1>
      <p className="text-2xl font-bold mb-1">{nad.customerName}</p>
      <p className="text-2xl font-style: italic mb-1">{nad.targetUrl}</p>
      <p className="text-1xl mb-1">{nad.creationDate}</p>
    </div>
  );
}