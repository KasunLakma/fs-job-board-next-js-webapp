import { notFound } from "next/navigation";
import Link from "next/link";
import { jobsData } from "../../../data/jobs";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = jobsData.find((j) => j.id === id);
  if (!job) return { title: "Job Not Found | CCA Job Board" };
  
  return {
    title: `${job.title} at ${job.company} | CCA Job Board`,
    description: `Apply for the ${job.title} position at ${job.company} in ${job.location}.`,
  };
}

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = jobsData.find((j) => j.id === id);

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
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground group-hover:text-primary transition-colors">{job.title}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
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

            <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-100 pb-8 dark:border-gray-800">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {job.type}
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                {job.category}
              </span>
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                {job.salary}
              </span>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="mb-4 text-xl font-bold text-foreground">About the Role</h2>
                <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                  {jobDescription}
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold text-foreground">Key Responsibilities</h2>
                <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
                  {responsibilities.map((req, idx) => (
                    <li key={idx} className="leading-relaxed">{req}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-bold text-foreground">Requirements</h2>
                <ul className="list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
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
          <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="mb-4 text-lg font-bold text-foreground">Apply for this position</h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Submit your application today. Our hiring team will review it and get back to you within a few business days.
            </p>
            
            <div className="space-y-4">
              <button className="w-full rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-950">
                Apply Now
              </button>
              <button className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-bold text-foreground transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-offset-gray-950">
                Save for Later
              </button>
            </div>

            <hr className="my-6 border-gray-200 dark:border-gray-800" />

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Job Type</h4>
                <p className="mt-1 font-medium text-foreground">{job.type}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Location</h4>
                <p className="mt-1 font-medium text-foreground">{job.location}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Salary Range</h4>
                <p className="mt-1 font-medium text-foreground">{job.salary}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Date Posted</h4>
                <p className="mt-1 font-medium text-foreground">{job.postedAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
