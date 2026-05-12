"use client";

import { useState } from "react";
import { Job } from "../../data/jobs";
import Link from "next/link";

export default function JobListings({ jobs }: { jobs: Job[] }) {
 const [currentPage, setCurrentPage] = useState(1);
 const jobsPerPage = 6;
 const totalPages = Math.ceil(jobs.length / jobsPerPage);
 
 const startIndex = (currentPage - 1) * jobsPerPage;
 const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

 return (
 <section className="w-full py-16 bg-secondary/10 ">
 <div className="container mx-auto px-4 md:px-6">
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
 <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Recent Opportunities</h2>
 <Link href="/jobs" className="text-primary hover:underline font-medium text-sm">
 View All Jobs &rarr;
 </Link>
 </div>
 
 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
 {currentJobs.map(job => (
 <Link key={job.id} href={`/jobs/${job.id}`} className="group block">
 <div className="bg-white dark:bg-slate-900 border dark:border-slate-800 p-6 rounded-xl shadow-sm group-hover:shadow-md group-hover:border-primary/50 transition-all flex flex-col h-full">
 <div className="flex justify-between items-start mb-4">
 <div>
 <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{job.title}</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{job.company}</p>
 </div>
 <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
 {job.type}
 </span>
 </div>
 <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-6">
 <svg className="w-4 h-4 mr-1.5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
 {job.location}
 </div>
 <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
 <span className="font-medium text-foreground">{job.salary}</span>
 <span className="text-xs text-gray-600 dark:text-gray-400">{job.postedAt}</span>
 </div>
 </div>
 </Link>
 ))}
 </div>
 
 {/* Pagination */}
 {totalPages > 1 && (
 <div className="flex justify-center items-center gap-4 mt-12">
 <button 
 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
 disabled={currentPage === 1}
 className="px-4 py-2 border border-border rounded-md text-sm font-medium disabled:opacity-50 hover:bg-foreground/5 transition-colors text-foreground"
 >
 Previous
 </button>
 <span className="text-sm font-medium text-foreground/70 ">
 Page {currentPage} of {totalPages}
 </span>
 <button 
 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
 disabled={currentPage === totalPages}
 className="px-4 py-2 border border-border rounded-md text-sm font-medium disabled:opacity-50 hover:bg-foreground/5 transition-colors text-foreground"
 >
 Next
 </button>
 </div>
 )}
 </div>
 </section>
 );
}
