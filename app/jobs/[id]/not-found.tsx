import Link from "next/link";

export default function JobNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center text-center">
      <div className="mb-8 p-6 rounded-full bg-primary/10 text-primary shadow-inner">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="17" x2="22" y1="8" y2="13" />
          <line x1="22" x2="17" y1="8" y2="13" />
        </svg>
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
        Job Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg mb-10">
        We couldn't find this specific opportunity. The job posting may have expired, been filled, or was removed by the employer.
      </p>
      
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 border border-primary/20 dark:border-primary/20 rounded-2xl p-8 max-w-2xl w-full mb-8 shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-foreground text-left">Don't miss out on other opportunities</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-left">
          We have hundreds of other software engineering roles, internships, and tech positions available for students.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            href="/jobs?q=frontend" 
            className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary hover:bg-primary/5 transition-all bg-white dark:bg-gray-950 shadow-sm hover:shadow-md"
          >
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Frontend Roles</span>
            <span className="text-gray-400 group-hover:text-primary transition-colors">&rarr;</span>
          </Link>
          <Link 
            href="/jobs?q=backend" 
            className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary hover:bg-primary/5 transition-all bg-white dark:bg-gray-950 shadow-sm hover:shadow-md"
          >
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Backend Roles</span>
            <span className="text-gray-400 group-hover:text-primary transition-colors">&rarr;</span>
          </Link>
          <Link 
            href="/jobs?type=Internship" 
            className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary hover:bg-primary/5 transition-all bg-white dark:bg-gray-950 shadow-sm hover:shadow-md"
          >
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Internships</span>
            <span className="text-gray-400 group-hover:text-primary transition-colors">&rarr;</span>
          </Link>
          <Link 
            href="/jobs" 
            className="group flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-semibold shadow-sm hover:shadow-md"
          >
            <span>View All Jobs</span>
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>
      </div>

      <Link 
        href="/" 
        className="text-gray-500 hover:text-primary transition-colors font-medium underline-offset-4 hover:underline"
      >
        Return to Homepage
      </Link>
    </div>
  );
}

