"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function JobFiltersContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchTerm) params.set("q", searchTerm);
    else params.delete("q");
    
    if (location) params.set("location", location);
    else params.delete("location");
    
    if (type) params.set("type", type);
    else params.delete("type");
    
    if (category) params.set("category", category);
    else params.delete("category");

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setLocation("");
    setType("");
    setCategory("");
    router.push(pathname);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div>
        <label htmlFor="search" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Search keywords
        </label>
        <input
          type="text"
          id="search"
          placeholder="Job title, company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900"
        />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Location
        </label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="">Any Location</option>
          <option value="Remote">Remote</option>
          <option value="New York, NY">New York, NY</option>
          <option value="San Francisco, CA">San Francisco, CA</option>
          <option value="Boston, MA">Boston, MA</option>
          <option value="Austin, TX">Austin, TX</option>
          <option value="Seattle, WA">Seattle, WA</option>
          <option value="Chicago, IL">Chicago, IL</option>
          <option value="Denver, CO">Denver, CO</option>
          <option value="Los Angeles, CA">Los Angeles, CA</option>
          <option value="Washington, D.C.">Washington, D.C.</option>
        </select>
      </div>

      {/* Job Type */}
      <div>
        <label htmlFor="type" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Job Type
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="">Any Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category / Skills
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="">Any Category</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Full Stack">Full Stack</option>
          <option value="Data Science">Data Science</option>
          <option value="Mobile">Mobile</option>
          <option value="DevOps">DevOps</option>
          <option value="QA">QA</option>
          <option value="Security">Security</option>
        </select>
      </div>

      <div className="pt-2 flex flex-col gap-2">
        <button
          onClick={applyFilters}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-950"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-offset-gray-950"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default function JobFilters() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <h2 className="mb-4 text-lg font-bold">Filter Jobs</h2>
      <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100 dark:bg-gray-900 rounded-md"></div>}>
        <JobFiltersContent />
      </Suspense>
    </div>
  );
}
