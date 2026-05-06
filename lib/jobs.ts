import { Job } from "@/data/jobs";
import prisma from "./prisma";

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
  const {
    q = "",
    location = "",
    type = "",
    category = "",
    page = 1,
    limit = 6,
  } = params;

  // Build the where clause dynamically
  const where: any = {};

  if (q) {
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { company: { contains: q, mode: 'insensitive' } },
    ];
  }
  
  if (location) where.location = location;
  if (type) where.type = type;
  if (category) where.category = category;

  const total = await prisma.job.count({ where });
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const skip = (currentPage - 1) * limit;

  const dbJobs = await prisma.job.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });

  // Map database jobs to the UI's expected format
  const jobs: Job[] = dbJobs.map(job => ({
    id: job.slug,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type as any, // Cast string to "Full-time" | "Part-time" etc.
    category: job.category,
    salary: job.salary,
    postedAt: job.postedAt,
  }));

  return {
    jobs,
    total,
    totalPages,
    currentPage,
  };
}

/**
 * Get a single job by its ID (slug)
 */
export async function getJobById(id: string): Promise<Job | null> {
  const dbJob = await prisma.job.findUnique({
    where: { slug: id }
  });

  if (!dbJob) return null;

  return {
    id: dbJob.slug,
    title: dbJob.title,
    company: dbJob.company,
    location: dbJob.location,
    type: dbJob.type as any,
    category: dbJob.category,
    salary: dbJob.salary,
    postedAt: dbJob.postedAt,
  };
}

/**
 * Get unique values for filters (locations, types, categories)
 */
export async function getJobFilters() {
  const [locations, types, categories] = await Promise.all([
    prisma.job.findMany({
      select: { location: true },
      distinct: ['location'],
      orderBy: { location: 'asc' }
    }),
    prisma.job.findMany({
      select: { type: true },
      distinct: ['type'],
      orderBy: { type: 'asc' }
    }),
    prisma.job.findMany({
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' }
    })
  ]);

  return {
    locations: locations.map(l => l.location),
    types: types.map(t => t.type),
    categories: categories.map(c => c.category),
  };
}
