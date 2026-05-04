import { jobsData, Job } from "@/data/jobs";

// Simulate network delay to make the API feel realistic
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface GetJobsParams {
  q?: string;
  location?: string;
  type?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export interface GetJobsResponse {
  jobs: Job[];
  total: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Get all jobs with optional filtering, search, and pagination
 */
export async function getJobs(params: GetJobsParams = {}): Promise<GetJobsResponse> {
  // Simulate database latency
  await delay(300);

  const {
    q = "",
    location = "",
    type = "",
    category = "",
    page = 1,
    limit = 6,
  } = params;

  // Filter jobs based on criteria
  const filteredJobs = jobsData.filter((job) => {
    const searchString = q.toLowerCase();
    const matchesSearch =
      !q ||
      job.title.toLowerCase().includes(searchString) ||
      job.company.toLowerCase().includes(searchString);

    const matchesLocation = !location || job.location === location;
    const matchesType = !type || job.type === type;
    const matchesCategory = !category || job.category === category;

    return matchesSearch && matchesLocation && matchesType && matchesCategory;
  });

  // Calculate pagination
  const total = filteredJobs.length;
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  return {
    jobs: paginatedJobs,
    total,
    totalPages,
    currentPage,
  };
}

/**
 * Get a single job by its ID
 */
export async function getJobById(id: string): Promise<Job | null> {
  // Simulate database latency
  await delay(200);

  const job = jobsData.find((job) => job.id === id);
  return job || null;
}

/**
 * Get unique values for filters (locations, types, categories)
 * This allows the UI to dynamically populate filter dropdowns based on available data
 */
export async function getJobFilters() {
  await delay(100);

  const locations = Array.from(new Set(jobsData.map((job) => job.location))).sort();
  const types = Array.from(new Set(jobsData.map((job) => job.type))).sort();
  const categories = Array.from(new Set(jobsData.map((job) => job.category))).sort();

  return {
    locations,
    types,
    categories,
  };
}
