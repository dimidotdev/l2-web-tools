export default function NadDetailSkeleton() {
  return (
    <div className="min-h-screen bg-primary-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="animate-pulse">
            <div className="h-8 bg-primary-200 rounded w-1/4 mb-4"></div>
            <div className="flex gap-4">
              <div className="h-4 bg-primary-200 rounded w-32"></div>
              <div className="h-4 bg-primary-200 rounded w-32"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-primary-200 rounded w-1/4 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-primary-200 rounded"></div>
                    <div className="h-4 bg-primary-200 rounded w-5/6"></div>
                    <div className="h-4 bg-primary-200 rounded w-4/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-primary-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-primary-200 rounded w-5/6"></div>
                    <div className="h-4 bg-primary-200 rounded w-4/6"></div>
                    <div className="h-4 bg-primary-200 rounded w-3/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}