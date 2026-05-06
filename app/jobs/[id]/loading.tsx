import Link from "next/link";

export default function JobDetailsLoading() {
 return (
 <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
 <div className="mb-6">
 <div className="h-4 w-32 animate-pulse rounded bg-gray-200 "></div>
 </div>

 <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
 {/* Main Content Skeleton */}
 <div className="lg:col-span-2">
 <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm ">
 <div className="mb-6 flex items-start justify-between">
 <div className="flex-1">
 {/* Title Skeleton */}
 <div className="h-10 w-3/4 animate-pulse rounded-md bg-gray-200 "></div>
 {/* Meta info Skeleton */}
 <div className="mt-4 flex flex-wrap items-center gap-3">
 <div className="h-4 w-24 animate-pulse rounded bg-gray-200 "></div>
 <div className="h-4 w-4 animate-pulse rounded-full bg-gray-100 "></div>
 <div className="h-4 w-28 animate-pulse rounded bg-gray-200 "></div>
 <div className="h-4 w-4 animate-pulse rounded-full bg-gray-100 "></div>
 <div className="h-4 w-20 animate-pulse rounded bg-gray-200 "></div>
 </div>
 </div>
 {/* Logo Skeleton */}
 <div className="hidden sm:flex h-16 w-16 shrink-0 animate-pulse rounded-xl bg-gray-100 "></div>
 </div>

 {/* Tags Skeleton */}
 <div className="mb-8 flex flex-wrap gap-2 border-b border-gray-100 pb-8 ">
 <div className="h-7 w-20 animate-pulse rounded-full bg-primary/10"></div>
 <div className="h-7 w-24 animate-pulse rounded-full bg-gray-100 "></div>
 <div className="h-7 w-28 animate-pulse rounded-full bg-gray-100 "></div>
 </div>

 <div className="space-y-8">
 {/* About Role Skeleton */}
 <section>
 <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200 "></div>
 <div className="space-y-3">
 <div className="h-4 w-full animate-pulse rounded bg-gray-200 "></div>
 <div className="h-4 w-full animate-pulse rounded bg-gray-200 "></div>
 <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 "></div>
 </div>
 </section>

 {/* Responsibilities Skeleton */}
 <section>
 <div className="mb-4 h-6 w-56 animate-pulse rounded bg-gray-200 "></div>
 <div className="space-y-3">
 {[1, 2, 3, 4, 5].map((i) => (
 <div key={i} className="flex gap-3">
 <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-200 "></div>
 <div className={`h-4 animate-pulse rounded bg-gray-200 ${i % 2 === 0 ? 'w-5/6' : 'w-full'}`}></div>
 </div>
 ))}
 </div>
 </section>

 {/* Requirements Skeleton */}
 <section>
 <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200 "></div>
 <div className="space-y-3">
 {[1, 2, 3, 4].map((i) => (
 <div key={i} className="flex gap-3">
 <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-200 "></div>
 <div className={`h-4 animate-pulse rounded bg-gray-200 ${i % 2 === 0 ? 'w-4/5' : 'w-11/12'}`}></div>
 </div>
 ))}
 </div>
 </section>
 </div>
 </div>
 </div>

 {/* Sidebar Skeleton */}
 <div className="lg:col-span-1">
 <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm ">
 <div className="mb-4 h-7 w-3/4 animate-pulse rounded bg-gray-200 "></div>
 <div className="mb-6 space-y-2">
 <div className="h-3 w-full animate-pulse rounded bg-gray-100 "></div>
 <div className="h-3 w-5/6 animate-pulse rounded bg-gray-100 "></div>
 </div>
 
 <div className="space-y-4">
 <div className="h-12 w-full animate-pulse rounded-md bg-primary/20"></div>
 <div className="h-12 w-full animate-pulse rounded-md bg-gray-100 "></div>
 </div>

 <hr className="my-6 border-gray-200 " />

 <div className="space-y-6">
 {[1, 2, 3, 4].map((i) => (
 <div key={i}>
 <div className="h-3 w-20 animate-pulse rounded bg-gray-100 "></div>
 <div className="mt-2 h-5 w-32 animate-pulse rounded bg-gray-200 "></div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
