import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  company: z.string().min(2, "Company name is required").max(100),
  location: z.string().min(2, "Location is required").max(100),
  type: z.enum(["Full-time", "Part-time", "Contract", "Internship", "Remote"]),
  category: z.string().min(2, "Category is required"),
  salary: z.string().min(2, "Salary information is required"),
  status: z.enum(["Published", "Draft", "Closed"]).default("Published"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  responsibilities: z.array(z.string()).min(1, "At least one responsibility is required"),
  requirements: z.array(z.string()).min(1, "At least one requirement is required"),
});

export type JobInput = z.infer<typeof jobSchema>;
