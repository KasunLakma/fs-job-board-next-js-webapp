import prisma from "@/lib/prisma";
import AdminDashboardClient from "./AdminDashboardClient";

export const metadata = {
  title: "Super Admin Dashboard | CCA Job Board",
  description: "Manage system-wide settings, users, and job postings.",
};

export default async function AdminDashboardPage() {
  // --- SECURITY CHECK (TEMPORARILY DISABLED FOR TESTING) ---
  // In a real app, replace this with your actual authentication logic
  // ------------------------------------

  // Fetch real-time data from the database
  let userCount = 0;
  let jobCount = 0;
  let users: any[] = [];
  let jobs: any[] = [];
  let error = null;

  try {
    const [uCount, jCount, uList, jList] = await Promise.all([
      prisma.user.count(),
      prisma.job.count(),
      prisma.user.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.job.findMany({ orderBy: { createdAt: 'desc' } }),
    ]);

    userCount = uCount;
    jobCount = jCount;
    users = uList;
    jobs = jList;
  } catch (err) {
    console.error("Failed to fetch admin stats:", err);
    error = "Database connection error. Please ensure migrations are applied (npx prisma db push).";
  }

  return (
    <AdminDashboardClient 
      userCount={userCount}
      jobCount={jobCount}
      initialUsers={users}
      initialJobs={jobs}
      error={error}
    />
  );
}
