import ProtectedRoute from "./components/ProtectedRoute";
import { RecentNADs } from "./components/RecentNADs";
import SuggestionBoard from "./components/SuggestoionBoard";

export default function Home() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-primary-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-accent-800 to-accent-900 pt-20 pb-8">
          <div className="container mx-auto px-4">
            <div className="text-primary-50 mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Welcome to NAD Dashboard
              </h1>
              <p className="text-primary-300">
                Track, manage, and create NADs efficiently
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-accent-800/50 backdrop-blur-lg rounded-lg p-6 text-primary-50 border border-accent-700/30">
                {/* ... conteúdo dos cards */}
              </div>
              {/* ... outros cards */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 -mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-primary-200">
                <RecentNADs />
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-primary-200">
                  <SuggestionBoard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}


// <div className="bg-primary-100 text-accent-800">
// <div className="shadow-soft">
// <div className="animate-fade-in"></div>