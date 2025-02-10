import NadsList from "../NadsList";
import 'dotenv/config';

export default async function Nads() {

  const response = await fetch(`${process.env.URL}/api/v1/nads`);
  const nads = await response.json();

  return (
    <div className="page-container p-8">
      <div className="container mx-auto">
        <button
        className="mb-8 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        
        >Create NAD</button> 
        <NadsList nads={nads}/>
      </div>
    </div>
  );
}