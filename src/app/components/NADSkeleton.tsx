export default function NadSkeleton() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        
        <div className="flex justify-between items-center">
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded w-24"></div>
        </div>
        
        <div className="grid grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
        
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, j) => (
              <div key={j} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}