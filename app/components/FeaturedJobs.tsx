import { getJobs } from "../../lib/jobs";
import JobListings from "./JobListings";

export default async function FeaturedJobs() {
  const { jobs: featuredJobs } = await getJobs({ limit: 6 });

  return <JobListings jobs={featuredJobs} />;
}
