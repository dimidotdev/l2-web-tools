export default function NadSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {[...Array(8)].map((_, index) => (
        <div 
          key={index}
          className="p-4 border bg-white rounded-lg shadow-sm animate-pulse relative overflow-hidden"
        >
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded-full w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded-full w-full"></div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}