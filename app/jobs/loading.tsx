export default function JobsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <div className="h-10 w-64 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
        <div className="mt-4 h-6 w-96 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Filters Skeleton */}
        <aside className="lg:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-4 h-6 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="mb-2 h-4 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="h-10 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                </div>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <div className="h-10 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                <div className="h-10 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
              </div>
            </div>
          </div>
        </aside>

        {/* Job Listings Skeleton */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-5 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <div>
                  <div className="mb-4 flex items-start justify-between">
                    <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"></div>
                    <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800"></div>
                  </div>
                  <div className="mb-2 h-6 w-3/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="mb-4 flex gap-2">
                    <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                    <div className="h-4 w-4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                    <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                  <div className="h-5 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="h-4 w-16 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
