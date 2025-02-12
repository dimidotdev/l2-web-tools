export default function TodoBoardSkeleton() {
  const columns = [
    { id: 'backlog', title: 'Backlog', color: 'bg-gray-100' },
    { id: 'in_progress', title: 'In Progress', color: 'bg-blue-50' },
    { id: 'done', title: 'Done', color: 'bg-green-50' },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="animate-pulse h-8 w-64 bg-primary-200 rounded"></div>
        <div className="animate-pulse h-9 w-32 bg-primary-200 rounded-md"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(column => (
          <div 
            key={column.id}
            className={`${column.color} p-4 rounded-lg shadow-sm`}
          >
            <div className="animate-pulse h-6 w-24 bg-primary-200 rounded mb-3"></div>

            <div className="space-y-3">
              {[...Array(Math.floor(Math.random() * 3) + 2)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-md shadow-sm"
                >
                  <div className="animate-pulse space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="h-5 w-3/4 bg-primary-200 rounded"></div>
                      <div className="flex gap-2">
                        <div className="h-4 w-4 bg-primary-200 rounded"></div>
                        <div className="h-4 w-4 bg-primary-200 rounded"></div>
                      </div>
                    </div>

                    {Math.random() > 0.5 && (
                      <div className="h-4 w-5/6 bg-primary-200 rounded"></div>
                    )}

                    <div className="flex">
                      <div className="h-6 w-16 bg-primary-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}