import prisma from "@/lib/prisma";
import DashboardNav from "../../../components/DashboardNav";
import JobsTable from "../../../components/JobsTable";
import DashboardStats from "../../../components/DashboardStats";
import Link from "next/link";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Manage Jobs | CCA Job Board",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ManageJobsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  // Parse query parameters
  const page = Number(params.page) || 1;
  const pageSize = 8;
  const search = (params.search as string) || "";
  const status = (params.status as string) || "";
  const type = (params.type as string) || "";

  // Build Prisma filter
  const where: any = {};
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { company: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (status && status !== "All") {
    where.status = status;
  }
  if (type && type !== "All") {
    where.type = type;
  }

  // Fetch data in parallel
  const [jobs, totalFilteredJobs, allStats] = await Promise.all([
    // paginated and filtered jobs
    prisma.job.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    // total count for current filters (for pagination)
    prisma.job.count({ where }),
    // global stats (all jobs)
    prisma.job.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    })
  ]);

  // Process global stats
  const statsMap = allStats.reduce((acc, curr) => {
    acc[curr.status] = curr._count.id;
    return acc;
  }, {} as Record<string, number>);

  const totalCount = Object.values(statsMap).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 transition-theme">
      <DashboardNav />
      
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-[120px]"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              Manage <span className="text-primary">Jobs</span>
            </h1>
            <p className="mt-3 text-lg text-foreground/60 max-w-2xl">
              Post new roles, track active listings, and manage your hiring pipeline.
            </p>
          </div>

          <div className="relative z-10">
            <Link 
              href="/recruiter-dashboard/jobs/new" 
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 text-sm font-black text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus size={20} strokeWidth={3} />
              Add New Job
            </Link>
          </div>
        </div>

        {/* Stats Overview (Global) */}
        <div className="relative z-10">
          <DashboardStats 
            total={totalCount} 
            published={statsMap["Published"] || 0} 
            drafts={statsMap["Draft"] || 0} 
            closed={statsMap["Closed"] || 0} 
          />
        </div>

        {/* Table Content */}
        <div className="relative z-10">
          <JobsTable 
            data={jobs} 
            totalRows={totalFilteredJobs}
            currentPage={page}
            pageSize={pageSize}
            initialFilters={{ search, status, type }}
          />
        </div>
      </main>
    </div>
  );
}
