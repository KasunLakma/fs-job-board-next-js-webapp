export default function FeaturedJobsSkeleton() {
  return (
    <section className="w-full py-16 bg-gray-50 dark:bg-gray-950/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div className="h-9 w-64 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
          <div className="h-5 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div>
                <div className="mb-4 flex items-start justify-between">
                  <div className="h-6 w-2/3 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 mb-2"></div>
                  <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800"></div>
                </div>
                <div className="h-4 w-1/3 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 mb-6"></div>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <div className="h-5 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                <div className="h-4 w-16 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
