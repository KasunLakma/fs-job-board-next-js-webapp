import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import PostJobForm from "@/app/components/PostJobForm";
import DashboardNav from "@/app/components/DashboardNav";

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    notFound();
  }

  // Format data for the form
  const initialData = {
    ...job,
    expirationDate: job.expirationDate ? job.expirationDate.toISOString().split('T')[0] : "",
    salaryMin: job.salaryMin || undefined,
    salaryMax: job.salaryMax || undefined,
    type: job.type as any,
    workArrangement: job.workArrangement as any,
    category: job.category as any,
    experienceLevel: job.experienceLevel as any,
    status: job.status as any,
  };

  return (
    <div className="min-h-screen bg-background transition-theme">
      <DashboardNav />
      <main className="container mx-auto px-4 py-12">
        <PostJobForm initialData={initialData} isEdit={true} />
      </main>
    </div>
  );
}
