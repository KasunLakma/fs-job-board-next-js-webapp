import Link from "next/link";

export default function JobDetailsLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-primary hover:underline transition-all opacity-50 pointer-events-none">
          &larr; Back to all jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-6 flex items-start justify-between">
              <div className="w-full">
                <div className="mb-3 h-10 w-3/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="h-5 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <span>&bull;</span>
                  <div className="h-5 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <span>&bull;</span>
                  <div className="h-5 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                </div>
              </div>
              <div className="hidden sm:flex h-16 w-16 shrink-0 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800"></div>
            </div>

            <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-100 pb-8 dark:border-gray-800">
              <div className="h-7 w-20 animate-pulse rounded-full bg-primary/20"></div>
              <div className="h-7 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800"></div>
              <div className="h-7 w-32 animate-pulse rounded-full bg-green-100 dark:bg-green-900/40"></div>
            </div>

            <div className="space-y-8">
              {/* About Role Skeleton */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-foreground">About the Role</h2>
                <div className="space-y-3">
                  <div className="h-4 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="h-4 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="h-4 w-5/6 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="h-4 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                  <div className="h-4 w-4/5 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
                </div>
              </section>

              {/* Responsibilities Skeleton */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-foreground">Key Responsibilities</h2>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
                      <div className={`h-4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 ${item % 2 === 0 ? 'w-5/6' : 'w-full'}`}></div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Requirements Skeleton */}
              <section>
                <h2 className="mb-4 text-xl font-bold text-foreground">Requirements</h2>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
                      <div className={`h-4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 ${item % 2 === 0 ? 'w-5/6' : 'w-full'}`}></div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="mb-4 text-lg font-bold text-foreground">Apply for this position</h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Submit your application today. Our hiring team will review it and get back to you within a few business days.
            </p>
            
            <div className="space-y-4">
              <button disabled className="w-full rounded-md bg-primary/70 px-4 py-3 text-sm font-bold text-primary-foreground/70 transition-all cursor-not-allowed">
                Apply Now
              </button>
              <button disabled className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-sm font-bold text-foreground/50 transition-all dark:border-gray-700 dark:bg-gray-900 cursor-not-allowed">
                Save for Later
              </button>
            </div>

            <hr className="my-6 border-gray-200 dark:border-gray-800" />

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Job Type</h4>
                <div className="mt-1 h-5 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Location</h4>
                <div className="mt-1 h-5 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Salary Range</h4>
                <div className="mt-1 h-5 w-28 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Date Posted</h4>
                <div className="mt-1 h-5 w-20 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
