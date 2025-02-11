import NotFound from "@/app/not-found";

export default async function NadDetail(props: {params: Promise<{ticketId: string}>}) {
  const params = await props.params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/nads/${params.ticketId}`);
  const nad = await response.json();

  if (!nad.ticketId) return <NotFound />;

  return (
    <>
      <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg flex flex-col items-center w-1/2">
        <h1 className="text-4xl font-bold mb-4">{nad.ticketId}</h1>
        <p className="text-2xl font-bold mb-1">{nad.customerName}</p>
        <p className="text-2xl font-style: italic mb-1">{nad.targetUrl}</p>
        <p className="text-1xl mb-1">{nad.creationDate}</p>
      </div>
      <div>
        <h2>Feature currently in development</h2>
      </div>
    </>
  );
}