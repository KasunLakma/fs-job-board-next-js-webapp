import prisma from "@/lib/prisma";
import DashboardNav from "../../../components/DashboardNav";
import JobsTable from "../../../components/JobsTable";
import Link from "next/link";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Manage Jobs | CCA Job Board",
};

export default async function ManageJobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 transition-theme">
      <DashboardNav />
      
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative">
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

        {/* Table Content */}
        <div className="relative z-10">
          <JobsTable data={jobs} />
        </div>
      </main>
    </div>
  );
}
