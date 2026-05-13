import prisma from "@/lib/prisma";
import AdminDashboardClient from "./AdminDashboardClient";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Super Admin Dashboard | CCA Job Board",
  description: "Manage system-wide settings, users, and job postings.",
};

export default async function AdminDashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Admin role check using Clerk metadata
  const role = user.publicMetadata?.role as string;
  if (role !== "admin" && role !== "ADMIN") {
    console.log(`User ${user.id} attempted to access admin page without admin role. Role: ${role}`);
    redirect("/");
  }

  // Sync current user to DB if they don't exist to ensure real data exists
  if (user) {
    try {
      await prisma.user.upsert({
        where: { clerkId: user.id },
        update: {
          email: user.emailAddresses[0].emailAddress,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || null,
          role: (user.publicMetadata?.role as string)?.toUpperCase() === "ADMIN" ? "ADMIN" : "USER",
        },
        create: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || null,
          role: (user.publicMetadata?.role as string)?.toUpperCase() === "ADMIN" ? "ADMIN" : "USER",
        },
      });
    } catch (err) {
      console.error("Failed to sync user to database:", err);
    }
  }

  // Fetch real-time data from the database
  let userCount = 0;
  let jobCount = 0;
  let users: any[] = [];
  let jobs: any[] = [];
  let recentActivities: any[] = [];
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

    // Combine users and jobs into a single activity list
    const userActivities = uList.slice(0, 5).map((u) => ({
      id: u.id,
      type: "New User Registered",
      description: `${u.name || u.email.split('@')[0]} joined the platform`,
      date: u.createdAt,
    }));

    const jobActivities = jList.slice(0, 5).map((j) => ({
      id: j.id,
      type: "New Job Posted",
      description: `"${j.title}" was posted by ${j.company}`,
      date: j.createdAt,
    }));

    recentActivities = [...userActivities, ...jobActivities]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

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
      recentActivities={recentActivities}
      error={error}
    />
  );
}
