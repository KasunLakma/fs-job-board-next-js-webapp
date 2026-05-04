import { getJobs, getJobFilters } from "@/lib/jobs";
import JobCard from "../components/JobCard";
import JobFilters from "../components/JobFilters";
import Pagination from "../components/Pagination";

export const metadata = {
  title: "Search Jobs | CCA Job Board",
  description: "Find the best software and technology jobs for students.",
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : undefined;
  const location = typeof resolvedParams.location === "string" ? resolvedParams.location : undefined;
  const type = typeof resolvedParams.type === "string" ? resolvedParams.type : undefined;
  const category = typeof resolvedParams.category === "string" ? resolvedParams.category : undefined;
  
  const pageParam = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page, 10) : 1;
  const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  // Fetch jobs and filters in parallel for optimal performance
  const [
    { jobs: paginatedJobs, total, totalPages, currentPage },
    { locations, types, categories }
  ] = await Promise.all([
    getJobs({ q, location, type, category, page, limit: 6 }),
    getJobFilters()
  ]);

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Explore Job Opportunities</h1>
        <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
          Find the perfect software internship or entry-level role to kickstart your career.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <JobFilters locations={locations} types={types} categories={categories} />
          </div>
        </aside>

        {/* Job Listings */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Showing <span className="font-bold text-foreground">{paginatedJobs.length}</span> of <span className="font-bold text-foreground">{total}</span> jobs
            </p>
          </div>

          {paginatedJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
              {paginatedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-950/50">
              <h3 className="text-lg font-bold">No jobs found</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400 text-center max-w-md">
                We couldn't find any jobs matching your current filters. Try adjusting your search criteria or clearing filters.
              </p>
            </div>
          )}

          {totalPages > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          )}
        </div>
      </div>
    </div>
  );
}
