import prisma from "@/lib/prisma";
import DashboardNav from "../../../components/DashboardNav";
import ApplicationsTable from "../../../components/ApplicationsTable";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export const metadata = {
  title: "Manage Applications | CCA Job Board",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ManageApplicationsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  // Parse query parameters
  const page = Number(params.page) || 1;
  const pageSize = 8;
  const search = (params.search as string) || "";
  const status = (params.status as string) || "";
  const sort = (params.sort as string) || "createdAt";
  const order = (params.order as "asc" | "desc") || "desc";

  // Build Prisma filter
  const where: any = {};
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      {
        job: {
          title: { contains: search, mode: 'insensitive' },
        },
      },
    ];
  }
  if (status && status !== "All") {
    where.status = status;
  }

  // Fetch data in parallel with error handling
  let applications = [];
  let totalFilteredApplications = 0;
  let stats: any[] = [];
  let error: string | null = null;

  try {
    const results = await Promise.all([
      // paginated and filtered applications with sorting
      prisma.application.findMany({
        where,
        include: {
          job: {
            select: {
              title: true,
            },
          },
        },
        orderBy: { [sort]: order },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      // total count for current filters (for pagination)
      prisma.application.count({ where }),
      // global stats for applications
      prisma.application.groupBy({
        by: ['status'],
        _count: {
          id: true
        }
      })
    ]);
    
    applications = results[0];
    totalFilteredApplications = results[1];
    stats = results[2];
  } catch (err) {
    console.error("Database connection error in ManageApplicationsPage:", err);
    error = "Could not reach the database. Please check your connection and try again.";
  }

  // Process stats
  const statsMap = stats.reduce((acc, curr) => {
    acc[curr.status] = curr._count.id;
    return acc;
  }, {} as Record<string, number>);

  const totalCount = Object.values(statsMap).reduce((a, b) => a + b, 0);

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 transition-theme">
        <DashboardNav />
        <main className="container mx-auto px-4 pt-28 pb-8 md:px-6 md:pt-32 md:pb-12 text-center">
          <div className="p-12 rounded-[2rem] bg-rose-500/10 border border-rose-500/20 max-w-2xl mx-auto">
            <h1 className="text-2xl font-black text-rose-500 mb-4">Database Connection Error</h1>
            <p className="text-foreground/60 mb-8">{error}</p>
            <Link 
              href="/recruiter-dashboard" 
              className="inline-flex items-center gap-2 rounded-2xl bg-foreground/5 px-6 py-3 text-sm font-bold text-foreground border border-border hover:bg-foreground/10 transition-all"
            >
              Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 transition-theme">
      <DashboardNav />
      
      <main className="container mx-auto px-4 pt-28 pb-8 md:px-6 md:pt-32 md:pb-12">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-[120px]"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              Manage <span className="text-primary">Applications</span>
            </h1>
            <p className="mt-3 text-lg text-foreground/60 max-w-2xl">
              Review candidate profiles, track hiring progress, and manage your talent pipeline.
            </p>
          </div>

          <div className="relative z-10">
            <Link 
              href="/recruiter-dashboard/jobs" 
              className="inline-flex items-center gap-2 rounded-2xl bg-foreground/5 px-6 py-3 text-sm font-bold text-foreground border border-border hover:bg-foreground/10 transition-all"
            >
              <Briefcase size={18} />
              View Jobs
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 relative z-10">
          {[
            { label: "Total Applications", value: totalCount, color: "primary" },
            { label: "In Review", value: statsMap["In-Review"] || 0, color: "blue" },
            { label: "Accepted", value: statsMap["Accepted"] || 0, color: "emerald" },
            { label: "Rejected", value: statsMap["Rejected"] || 0, color: "rose" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-[2rem] bg-card border border-border shadow-xl">
              <p className="text-[10px] uppercase font-black text-foreground/40 mb-1">{stat.label}</p>
              <p className={`text-3xl font-black text-${stat.color === 'primary' ? 'primary' : stat.color + '-500'}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Table Content */}
        <div className="relative z-10">
          <ApplicationsTable 
            data={applications} 
            totalRows={totalFilteredApplications}
            currentPage={page}
            pageSize={pageSize}
            initialFilters={{ search, status, sort, order }}
          />
        </div>
      </main>
    </div>
  );
}
