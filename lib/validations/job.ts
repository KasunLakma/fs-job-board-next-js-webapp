import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  company: z.string().min(2, "Company name is required").max(100),
  location: z.string().min(2, "Location is required").max(100),
  
  type: z.enum(["Full-time", "Part-time", "Contract", "Internship"]),
  workArrangement: z.enum(["On-site", "Remote", "Hybrid"]),
  category: z.enum(["Frontend", "Backend", "Full Stack", "DevOps", "Design", "Marketing", "Data Science", "Mobile", "Security", "Other"]),
  experienceLevel: z.enum(["Entry Level", "Mid Level", "Senior", "Lead"]),
  
  // Compensation
  salaryMin: z.coerce.number().min(0, "Salary must be a positive number").optional(),
  salaryMax: z.coerce.number().min(0, "Salary must be a positive number").optional(),
  currency: z.string().default("USD"),
  salary: z.string().optional(), // Legacy support or display string

  // Listing Details
  expirationDate: z.string().nullable().optional().or(z.literal("")).refine((val) => {
    if (!val) return true;
    return new Date(val) > new Date();
  }, {
    message: "Expiration date must be in the future",
  }),
  status: z.enum(["Published", "Draft", "Closed"]).default("Published"),
  
  description: z.string().min(50, "Description must be at least 50 characters"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
  requirements: z.array(z.string()).min(1, "At least one requirement is required"),
});

export type JobInput = z.infer<typeof jobSchema>;
