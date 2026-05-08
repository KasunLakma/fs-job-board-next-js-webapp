import prisma from "@/lib/prisma";
import DashboardNav from "../../components/DashboardNav";
import SummaryCard from "../../components/SummaryCard";
import Link from "next/link";
import Image from "next/image";
import ClientOnly from "../../components/ClientOnly";

export const metadata = {
  title: "Recruiter Dashboard | CCA Job Board",
};

export default async function RecruiterDashboard() {
  // Fetch real-time metrics and data from the database
  const [jobCount, applicationCount, recentApplications] = await Promise.all([
    prisma.job.count(),
    prisma.application.count(),
    prisma.application.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        job: {
          select: { title: true, company: true }
        }
      }
    })
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 transition-theme">
      <DashboardNav />
      
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Welcome Section */}
        <div className="mb-12 relative">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[120px]"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              Dashboard <span className="text-primary">Overview</span>
            </h1>
            <p className="mt-3 text-lg text-foreground/60 max-w-2xl">
              Manage your hiring process and monitor candidate engagement in real-time.
            </p>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
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

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Recent Applications List (Left - 2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                Recent <span className="text-primary">Applications</span>
                <span className="text-xs font-bold bg-foreground/10 text-foreground/40 px-2 py-1 rounded-full">{recentApplications.length}</span>
              </h2>
              <Link href="/recruiter-dashboard/applications" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                View all applications &rarr;
              </Link>
            </div>

            <div className="rounded-3xl border border-border bg-card overflow-hidden backdrop-blur-sm shadow-xl dark:shadow-2xl">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentApplications.length > 0 ? (
                  recentApplications.map((app) => (
                    <div key={app.id} className="p-6 flex items-center justify-between hover:bg-foreground/5 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                          <Image src={`https://api.dicebear.com/7.x/initials/svg?seed=${app.name}`} alt={app.name} width={40} height={40} className="rounded-lg" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground group-hover:text-primary transition-colors">{app.name}</p>
                          <p className="text-xs text-foreground/50 mt-0.5">Applied for <span className="text-foreground/80 font-medium">{app.job.title}</span></p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-6">
                        <div className="hidden sm:block">
                          <ClientOnly fallback={<div className="h-4 w-16 bg-foreground/5 rounded animate-pulse" />}>
                            <p className="text-xs font-bold text-foreground/50">{new Date(app.createdAt).toLocaleDateString()}</p>
                          </ClientOnly>
                          <p className="text-[10px] text-foreground/40 mt-0.5 uppercase tracking-wider">Submitted</p>
                        </div>
                        <button className="p-2.5 rounded-xl border border-border bg-background text-foreground/60 hover:text-foreground hover:border-border/80 hover:bg-foreground/5 transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-foreground/5 text-foreground/40 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">No applications yet</h3>
                    <p className="text-sm text-foreground/50 mt-1">Your recent applications will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Box (Right - 1/3 width) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground px-2">Quick <span className="text-primary">Actions</span></h2>
            
            <div className="group relative rounded-3xl border border-primary/20 bg-primary/5 p-8 overflow-hidden transition-all hover:bg-primary/10 hover:border-primary/40">
              <div className="relative z-10">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </div>
                <h3 className="text-2xl font-black text-foreground leading-tight">Ready to expand<br />your team?</h3>
                <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                  Post a new job opening and find the perfect candidate from our community of professionals.
                </p>
                <Link 
                  href="/recruiter-dashboard/jobs/new" 
                  className="mt-8 inline-flex items-center justify-center w-full rounded-2xl bg-primary px-6 py-4 text-sm font-black text-white shadow-xl transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Post a Job Listing
                </Link>
              </div>
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-[60px] transition-all group-hover:bg-primary/20"></div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8">
              <h4 className="font-bold text-foreground mb-4">Dashboard Tips</h4>
              <ul className="space-y-4">
                {[
                  "Personalize your company profile",
                  "Enable email notifications",
                  "Use filters to manage candidates"
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/50">
                    <div className="h-5 w-5 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
