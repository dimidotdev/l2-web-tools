import { RecentNADs } from "./components/RecentNADs";
import SuggestionBoard from "./components/SuggestoionBoard";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600 mb-6">
                Here we will be able to see the last NADs created.
              </p>
              <div className="divide-y divide-gray-200">
                <RecentNADs />
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="sticky top-4">
              <SuggestionBoard />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
