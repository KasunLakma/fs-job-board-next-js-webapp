export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  category: string;
  postedAt: string;
  salary: string;
  description?: string;
  skills?: string[];
  responsibilities?: string[];
  requirements?: string[];
}

const rawJobs: Omit<Job, 'id'>[] = [
  {
    title: "Frontend Developer Intern",
    company: "TechNova",
    location: "Remote",
    type: "Internship",
    category: "Frontend",
    postedAt: "2 days ago",
    salary: "$3,000/mo",
    description: "We are looking for a motivated Frontend Developer Intern to join our team and help build amazing web experiences using React and modern CSS techniques.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Figma"],
    responsibilities: [
      "Collaborate with senior developers to implement UI components",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and team meetings",
      "Stay up-to-date with emerging frontend technologies"
    ],
    requirements: [
      "Basic understanding of HTML, CSS, and JavaScript",
      "Experience with React or another modern frontend framework",
      "Strong problem-solving skills and attention to detail",
      "Currently pursuing or recently completed a degree in Computer Science or a related field"
    ]
  },
  {
    title: "Junior Backend Engineer",
    company: "DataStream Systems",
    location: "New York, NY",
    type: "Full-time",
    category: "Backend",
    postedAt: "1 day ago",
    salary: "$85,000 - $105,000",
  },
  {
    title: "Full Stack Software Engineer",
    company: "CloudScale",
    location: "San Francisco, CA",
    type: "Full-time",
    category: "Full Stack",
    postedAt: "3 days ago",
    salary: "$110,000 - $130,000",
  },
  {
    title: "Data Science Intern",
    company: "AI Innovations",
    location: "Boston, MA",
    type: "Internship",
    category: "Data Science",
    postedAt: "5 hours ago",
    salary: "$4,000/mo",
  },
  {
    title: "React Developer",
    company: "WebWorks",
    location: "Remote",
    type: "Contract",
    category: "Frontend",
    postedAt: "4 days ago",
    salary: "$60/hr",
  },
  {
    title: "Entry Level Node.js Developer",
    company: "ServerLogic",
    location: "Austin, TX",
    type: "Full-time",
    category: "Backend",
    postedAt: "1 week ago",
    salary: "$75,000 - $90,000",
  },
  {
    title: "Mobile App Developer Intern",
    company: "AppStudio",
    location: "Remote",
    type: "Internship",
    category: "Mobile",
    postedAt: "2 weeks ago",
    salary: "$2,500/mo",
  },
  {
    title: "DevOps Engineer (Junior)",
    company: "Infrastructure Inc",
    location: "Seattle, WA",
    type: "Full-time",
    category: "DevOps",
    postedAt: "3 days ago",
    salary: "$95,000 - $115,000",
  },
  {
    title: "Software Engineer in Test",
    company: "QualityFirst",
    location: "Chicago, IL",
    type: "Full-time",
    category: "QA",
    postedAt: "1 day ago",
    salary: "$80,000 - $100,000",
  },
  {
    title: "Machine Learning Intern",
    company: "Visionary AI",
    location: "Remote",
    type: "Internship",
    category: "Data Science",
    postedAt: "6 days ago",
    salary: "$5,000/mo",
  },
  {
    title: "Vue.js Frontend Engineer",
    company: "Creative Digital",
    location: "Denver, CO",
    type: "Full-time",
    category: "Frontend",
    postedAt: "1 week ago",
    salary: "$90,000 - $110,000",
  },
  {
    title: "Backend API Developer",
    company: "Connective",
    location: "Remote",
    type: "Contract",
    category: "Backend",
    postedAt: "2 days ago",
    salary: "$55/hr",
  },
  {
    title: "UI/UX Developer Intern",
    company: "Design Systems",
    location: "Los Angeles, CA",
    type: "Internship",
    category: "Frontend",
    postedAt: "4 days ago",
    salary: "$3,500/mo",
  },
  {
    title: "Security Analyst (Entry)",
    company: "CyberDefend",
    location: "Washington, D.C.",
    type: "Full-time",
    category: "Security",
    postedAt: "1 week ago",
    salary: "$85,000 - $100,000",
  },
  {
    title: "Cloud Infrastructure Engineer",
    company: "SkyNet Services",
    location: "Remote",
    type: "Full-time",
    category: "DevOps",
    postedAt: "3 hours ago",
    salary: "$105,000 - $125,000",
  }
];

function generateSlug(title: string, company: string, existingIds: Set<string>): string {
  const baseSlug = `${title}-${company}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/(^-|-$)/g, '');    // Remove leading/trailing hyphens
    
  let slug = baseSlug;
  let counter = 1;
  
  // Handle duplicates by appending an incremental number
  while (existingIds.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  existingIds.add(slug);
  return slug;
}

const existingIds = new Set<string>();

export const jobsData: Job[] = rawJobs.map((job) => ({
  ...job,
  id: generateSlug(job.title, job.company, existingIds),
}));
