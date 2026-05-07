import Link from "next/link";

export default function NotFound() {
 return (
 <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
 <div className="mb-8 p-6 rounded-full bg-primary/10 text-primary">
 <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
 <path d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"/>
 <path d="M12 17h.01"/>
 </svg>
 </div>
 <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
 Page Not Found
 </h1>
 <p className="text-lg text-gray-900 max-w-md mb-8">
 We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps the URL is incorrect.
 </p>
 <div className="flex flex-col sm:flex-row gap-4">
 <Link 
 href="/" 
 className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-md hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-2"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
 Return Home
 </Link>
 <Link 
 href="/jobs" 
 className="bg-white border border-gray-300 text-foreground font-semibold px-8 py-3 rounded-md hover:bg-gray-50 transition-colors shadow-sm flex items-center justify-center gap-2"
 >
 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
 Browse Jobs
 </Link>
 </div>
 </div>
 );
}
