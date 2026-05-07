import { notFound } from "next/navigation";
import Link from "next/link";
import { getJobById } from "@/lib/jobs";
import ApplyJobModal from "@/app/components/ApplyJobModal";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) return { title: "Job Not Found | CCA Job Board" };
  
  return {
    title: `${job.title} at ${job.company} | CCA Job Board`,
    description: `Apply for the ${job.title} position at ${job.company} in ${job.location}.`,
  };
}

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  // Mocking extended data that isn't in jobs.ts
  const jobDescription = `We are looking for an enthusiastic and motivated ${job.title} to join our dynamic team at ${job.company}. In this role, you will have the opportunity to work on cutting-edge technologies, collaborate with experienced professionals, and make a significant impact on our core products. If you are passionate about software development and eager to learn, we would love to hear from you.`;

  const responsibilities = [
    "Collaborate with cross-functional teams to define, design, and ship new features.",
    "Write clean, maintainable, and efficient code following best practices.",
    "Identify and resolve performance and scalability issues.",
    "Participate in code reviews and provide constructive feedback.",
    "Stay up-to-date with emerging technologies and industry trends."
  ];

  const requirements = [
    "Currently pursuing or recently completed a degree in Computer Science, Software Engineering, or a related field.",
    "Strong understanding of object-oriented programming and software design patterns.",
    "Familiarity with modern programming languages and frameworks relevant to the role.",
    "Excellent problem-solving skills and attention to detail.",
    "Strong communication and teamwork abilities."
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <Link href="/jobs" className="inline-flex items-center text-sm font-medium text-primary hover:underline transition-all">
          &larr; Back to all jobs
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm ">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground group-hover:text-primary transition-colors">{job.title}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-900 ">
                  <span className="font-bold text-primary">{job.company}</span>
                  <span>&bull;</span>
                  <span>{job.location}</span>
                  <span>&bull;</span>
                  <span>Posted {job.postedAt}</span>
                </div>
              </div>
              <div className="hidden sm:flex h-16 w-16 items-center justify-center rounded-xl bg-secondary text-secondary-foreground font-bold text-3xl shrink-0 shadow-inner">
                {job.company.charAt(0)}
              </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-100 pb-8 ">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {job.type}
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 ">
                {job.category}
              </span>
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 ">
                {job.salary}
              </span>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="mb-4 text-xl font-bold text-foreground">About the Role</h2>
                <p className="leading-relaxed text-gray-900 ">
                  {jobDescription}
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold text-foreground">Key Responsibilities</h2>
                <ul className="list-inside list-disc space-y-2 text-gray-900 ">
                  {responsibilities.map((req, idx) => (
                    <li key={idx} className="leading-relaxed">{req}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold text-foreground">Requirements</h2>
                <ul className="list-inside list-disc space-y-2 text-gray-900 ">
                  {requirements.map((req, idx) => (
                    <li key={idx} className="leading-relaxed">{req}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm ">
            <h3 className="mb-4 text-lg font-bold text-foreground">Apply for this position</h3>
            <p className="mb-6 text-sm text-gray-900 ">
              Submit your application today. Our hiring team will review it and get back to you within a few business days.
            </p>
            
            <div className="space-y-4">
              <ApplyJobModal jobId={job.id} jobTitle={job.title} company={job.company} />
              <button className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-foreground transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ">
                Save for Later
              </button>
            </div>

            <hr className="my-6 border-gray-200 " />

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 ">Job Type</h4>
                <p className="mt-1 font-medium text-foreground">{job.type}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 ">Location</h4>
                <p className="mt-1 font-medium text-foreground">{job.location}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 ">Salary Range</h4>
                <p className="mt-1 font-medium text-foreground">{job.salary}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 ">Date Posted</h4>
                <p className="mt-1 font-medium text-foreground">{job.postedAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
