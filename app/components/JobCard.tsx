import Link from "next/link";
import { Job } from "../../data/jobs";

interface JobCardProps {
 job: Job;
}

export default function JobCard({ job }: JobCardProps) {
 return (
 <Link href={`/jobs/${job.id}`} className="group block h-full">
 <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md ">
 <div>
 <div className="mb-4 flex items-start justify-between">
 <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground font-bold text-xl">
 {job.company.charAt(0)}
 </div>
 <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
 {job.type}
 </span>
 </div>
 <h3 className="mb-1 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
 {job.title}
 </h3>
 <p className="mb-4 text-sm font-medium text-foreground/70 ">
 {job.company} &bull; {job.location}
 </p>
 </div>
 
 <div className="mt-4 flex items-center justify-between border-t border-border pt-4 ">
 <span className="text-sm font-semibold text-foreground">
 {job.salary}
 </span>
 <span className="text-xs text-foreground/50 ">
 {job.postedAt}
 </span>
 </div>
 </div>
 </Link>
 );
}
