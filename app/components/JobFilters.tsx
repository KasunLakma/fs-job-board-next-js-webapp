"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

interface JobFiltersProps {
 locations?: string[];
 types?: string[];
 categories?: string[];
}

function JobFiltersContent({ locations = [], types = [], categories = [] }: JobFiltersProps) {
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
 <label htmlFor="search" className="mb-1 block text-sm font-medium text-gray-700 ">
 Search keywords
 </label>
 <input
 type="text"
 id="search"
 placeholder="Job title, company..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
 className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary "
 />
 </div>

 {/* Location */}
 <div>
 <label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-700 ">
 Location
 </label>
 <select
 id="location"
 value={location}
 onChange={(e) => setLocation(e.target.value)}
 className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary "
 >
 <option value="">Any Location</option>
 {locations.map((loc) => (
 <option key={loc} value={loc}>{loc}</option>
 ))}
 </select>
 </div>

 {/* Job Type */}
 <div>
 <label htmlFor="type" className="mb-1 block text-sm font-medium text-gray-700 ">
 Job Type
 </label>
 <select
 id="type"
 value={type}
 onChange={(e) => setType(e.target.value)}
 className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary "
 >
 <option value="">Any Type</option>
 {types.map((t) => (
 <option key={t} value={t}>{t}</option>
 ))}
 </select>
 </div>

 {/* Category */}
 <div>
 <label htmlFor="category" className="mb-1 block text-sm font-medium text-gray-700 ">
 Category / Skills
 </label>
 <select
 id="category"
 value={category}
 onChange={(e) => setCategory(e.target.value)}
 className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary "
 >
 <option value="">Any Category</option>
 {categories.map((cat) => (
 <option key={cat} value={cat}>{cat}</option>
 ))}
 </select>
 </div>

 <div className="pt-2 flex flex-col gap-2">
 <button
 onClick={applyFilters}
 className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 "
 >
 Apply Filters
 </button>
 <button
 onClick={clearFilters}
 className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 "
 >
 Clear Filters
 </button>
 </div>
 </div>
 );
}

export default function JobFilters(props: JobFiltersProps) {
 return (
 <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm ">
 <h2 className="mb-4 text-lg font-bold">Filter Jobs</h2>
 <Suspense fallback={<div className="h-64 animate-pulse bg-gray-100 rounded-md"></div>}>
 <JobFiltersContent {...props} />
 </Suspense>
 </div>
 );
}
