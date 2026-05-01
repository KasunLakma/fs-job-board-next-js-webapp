import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-background py-12">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-4 md:px-6">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-xs">
              C
            </div>
            <span className="text-lg font-bold text-primary">CCA Job Board</span>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Empowering the next generation of software engineers to find their dream careers.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-foreground">For Students</h3>
          <Link href="/jobs" className="text-sm text-gray-500 hover:text-primary transition-colors dark:text-gray-400">Browse Jobs</Link>
          <Link href="/internships" className="text-sm text-gray-500 hover:text-primary transition-colors dark:text-gray-400">Internships</Link>
          <Link href="/resources" className="text-sm text-gray-500 hover:text-primary transition-colors dark:text-gray-400">Career Resources</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-foreground">For Employers</h3>
          <Link href="/post-job" className="text-sm text-gray-500 hover:text-primary transition-colors dark:text-gray-400">Post a Job</Link>
          <Link href="/pricing" className="text-sm text-gray-500 hover:text-primary transition-colors dark:text-gray-400">Pricing</Link>
          <Link href="/talents" className="text-sm text-gray-500 hover:text-primary transition-colors dark:text-gray-400">Browse Talents</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-foreground">Company</h3>
          <Link href="/about" className="text-sm text-gray-500 hover:text-primary transition-colors dark:text-gray-400">About Us</Link>
          <Link href="/contact" className="text-sm text-gray-500 hover:text-primary transition-colors dark:text-gray-400">Contact</Link>
          <Link href="/privacy" className="text-sm text-gray-500 hover:text-primary transition-colors dark:text-gray-400">Privacy Policy</Link>
        </div>
      </div>
      <div className="container mx-auto mt-12 flex flex-col items-center justify-between gap-4 px-4 pt-8 border-t border-gray-100 md:flex-row md:px-6 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} CCA Job Board. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-gray-500 hover:text-primary transition-colors dark:text-gray-400">
            <span className="sr-only">Twitter</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </Link>
          <Link href="#" className="text-gray-500 hover:text-primary transition-colors dark:text-gray-400">
            <span className="sr-only">LinkedIn</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
