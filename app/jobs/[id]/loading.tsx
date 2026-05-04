export default function JobDetailsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <div className="h-5 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-6 flex items-start justify-between">
              <div className="w-full">
                <div className="mb-3 h-10 w-3/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="h-5 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="h-5 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="h-5 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                </div>
              </div>
              <div className="hidden sm:flex h-16 w-16 shrink-0 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"></div>
            </div>

            <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-100 pb-8 dark:border-gray-800">
              <div className="h-7 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800"></div>
              <div className="h-7 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800"></div>
              <div className="h-7 w-32 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800"></div>
            </div>

            <div className="space-y-8">
              {/* About Role Skeleton */}
              <section>
                <div className="mb-4 h-7 w-48 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                <div className="space-y-3">
                  <div className="h-4 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="h-4 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="h-4 w-5/6 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="h-4 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="h-4 w-4/5 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                </div>
              </section>

              {/* Responsibilities & Requirements Skeletons */}
              {[1, 2].map((section) => (
                <section key={section}>
                  <div className="mb-4 h-7 w-56 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
                        <div className={`h-4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 ${item % 2 === 0 ? 'w-5/6' : 'w-full'}`}></div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-4 h-6 w-48 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
            <div className="mb-6 space-y-2">
              <div className="h-4 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
              <div className="h-4 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
              <div className="h-4 w-2/3 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
            </div>
            
            <div className="space-y-4">
              <div className="h-12 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
              <div className="h-12 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
            </div>

            <hr className="my-6 border-gray-200 dark:border-gray-800" />

            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item}>
                  <div className="mb-1 h-3 w-20 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="h-5 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
