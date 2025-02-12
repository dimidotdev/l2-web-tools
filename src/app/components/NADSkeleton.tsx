export default function NadSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
      <div className="px-4 py-5 border-b border-primary-200 sm:px-6">
        <div className="h-6 bg-primary-200 rounded w-1/4"></div>
      </div>
      
      {[1, 2, 3].map((n) => (
        <div key={n} className="px-4 py-4 sm:px-6 border-b border-primary-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-5 w-5 bg-primary-200 rounded"></div>
              <div className="h-4 bg-primary-200 rounded w-24"></div>
            </div>
            <div className="h-5 w-5 bg-primary-200 rounded-full"></div>
          </div>
          <div className="mt-2 sm:flex sm:justify-between">
            <div className="h-4 bg-primary-200 rounded w-32"></div>
            <div className="h-4 bg-primary-200 rounded w-48"></div>
          </div>
          <div className="mt-2">
            <div className="h-4 bg-primary-200 rounded w-full max-w-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
}