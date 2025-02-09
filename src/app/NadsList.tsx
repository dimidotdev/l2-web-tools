import Link from "next/link";
import { Nad } from "./nads-data";

export default function NadsList({ nads }: { nads: Nad[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {nads.map(nad => (
        <Link key={nad.ticketId} href={`/nads/${nad.ticketId}`}
        passHref
        className="bg-white rounded-lg p-4 hover:shadow-lg transition duration-300"
        >
          <h2 className="text-1xl font-bold">{nad.ticketId}</h2>
          <p>{nad.creationDate}</p>
        </Link>
      ))}
    </div>
  );
}