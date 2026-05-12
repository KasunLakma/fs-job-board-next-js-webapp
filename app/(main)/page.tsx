import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import FeaturedJobs from "@/app/components/FeaturedJobs";
import FeaturedJobsSkeleton from "@/app/components/FeaturedJobsSkeleton";

export default function Home() {

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full bg-secondary/30 py-20 md:py-32 flex flex-col items-center">
        <div className="container mx-auto px-4 md:px-6 grid gap-8 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Launch Your <span className="text-primary">Software Engineering</span> Career
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
              Find internships, entry-level roles, and connect with top tech companies looking for students like you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-foreground/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for Job Title"
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-border bg-background text-foreground placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent "
                />
              </div>
              <button className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-md hover:bg-primary/90 transition-colors shadow-md">
                Search Jobs
              </button>
            </div>
            <div className="flex gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
              <span>Popular:</span>
              <Link href="/jobs?q=frontend" className="hover:text-primary underline">Frontend</Link>
              <Link href="/jobs?q=backend" className="hover:text-primary underline">Backend</Link>
              <Link href="/jobs?q=internship" className="hover:text-primary underline">Internship</Link>
            </div>
          </div>
          <div className="relative flex justify-center items-center h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/hero-image.png"
              alt="Technology networking and software code"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">Explore Opportunities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              { title: "Frontend Developer", jobs: "320+ Jobs", icon: "💻" },
              { title: "Backend Engineer", jobs: "450+ Jobs", icon: "⚙️" },
              { title: "Summer Internships", jobs: "120+ Jobs", icon: "☀️" },
              { title: "Data Science", jobs: "200+ Jobs", icon: "📊" },
            ].map((category, index) => (
              <Link
                key={index}
                href={`/jobs?category=${category.title.toLowerCase().replace(" ", "-")}`}
                className="group flex flex-col items-center p-8 rounded-xl bg-white dark:bg-slate-900 border dark:border-slate-800 hover:border-primary hover:shadow-lg transition-all "
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{category.title}</h3>
                <p className="text-primary font-medium mt-2">{category.jobs}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Jobs Listings */}
      <Suspense fallback={<FeaturedJobsSkeleton />}>
        <FeaturedJobs />
      </Suspense>

      {/* Call to Action */}
      <section className="w-full bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">Ready to start your journey?</h2>
          <p className="text-primary-foreground/70 dark:text-gray-400 max-w-2xl mb-8 text-lg">
            Create a profile today, upload your resume, and let top tech companies find you. It is completely free for students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/sign-up" className="bg-white text-primary font-bold px-8 py-3 rounded-md hover:bg-gray-100 transition-colors shadow-lg">
              Create Profile
            </Link>
            <Link href="/jobs" className="bg-transparent border border-white text-white font-bold px-8 py-3 rounded-md hover:bg-white/10 transition-colors">
              Browse All Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
