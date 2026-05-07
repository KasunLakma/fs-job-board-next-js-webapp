import prisma from "@/lib/prisma";
import DashboardNav from "../components/DashboardNav";
import SummaryCard from "../components/SummaryCard";
import Link from "next/link";

export const metadata = {
  title: "Recruiter Dashboard | CCA Job Board",
};

export default async function RecruiterDashboard() {
  // Fetch real-time metrics from the database
  const [jobCount, applicationCount] = await Promise.all([
    prisma.job.count(),
    prisma.application.count()
  ]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardNav />
      
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Welcome back, Recruiter</h1>
          <p className="mt-2 text-gray-900">Here is what's happening with your job listings today.</p>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard 
            title="Total Job Listings" 
            value={jobCount} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
            description="Active job posts on the platform"
            trend={{ value: "+12%", isPositive: true }}
          />
          <SummaryCard 
            title="Total Applications" 
            value={applicationCount} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
            description="Candidates who applied for your roles"
            trend={{ value: "+24%", isPositive: true }}
          />
          <SummaryCard 
            title="Active Listings" 
            value={jobCount} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
            description="Currently visible to applicants"
          />
        </div>

        {/* Quick Actions / Recent Activity Placeholder */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-foreground">Quick Actions</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link 
                href="/recruiter-dashboard/jobs/new" 
                className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-primary transition-all hover:bg-primary/10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </div>
                <span className="font-semibold">Post a New Job</span>
              </Link>
              <Link 
                href="/recruiter-dashboard/applications" 
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-gray-900 transition-all hover:bg-gray-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
                <span className="font-semibold">View Applications</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Performance Insights</h2>
              <span className="text-xs font-medium text-gray-900 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded">Beta</span>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center text-center py-4">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <h3 className="font-semibold text-foreground">Advanced Analytics coming soon</h3>
              <p className="mt-2 max-w-xs text-sm text-gray-900">We're building powerful insights to help you hire faster and smarter.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
