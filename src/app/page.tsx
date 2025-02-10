import { RecentNADs } from "./components/RecentNADs";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </div>
      <div className="my-6 px-4 py-6 bg-white shadow-md rounded-lg border border-gray-100 space-y-4 max-w-md">
        <RecentNADs />
      </div>
    </div>
  );
}
