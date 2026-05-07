import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  linkedin: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
  portfolio: z.string().url("Invalid Portfolio URL").optional().or(z.literal("")),
  coverLetter: z.string().optional(),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: jobIdOrSlug } = await params;
    
    // Check if job exists - jobIdOrSlug from URL is actually the slug
    const job = await prisma.job.findUnique({
      where: { slug: jobIdOrSlug },
    });

    if (!job) {
      return NextResponse.json(
        { error: "Job not found." },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    
    // Extract data from formData
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string || undefined,
      linkedin: formData.get("linkedin") as string || undefined,
      portfolio: formData.get("portfolio") as string || undefined,
      coverLetter: formData.get("coverLetter") as string || undefined,
    };

    // Validate data
    const validation = applicationSchema.safeParse(data);
    if (!validation.success) {
      const errorMessages = validation.error.errors.map(err => err.message).join(", ");
      return NextResponse.json(
        { error: errorMessages },
        { status: 400 }
      );
    }

    const resume = formData.get("resume") as File | null;
    if (!resume || resume.size === 0) {
      return NextResponse.json(
        { error: "A valid resume file is required." },
        { status: 400 }
      );
    }

    // In a production environment, we would upload the file to S3/Cloudinary/etc.
    // For now, we'll store the filename or a placeholder URL.
    const resumeUrl = `uploads/resumes/${Date.now()}-${resume.name}`;

    // Save to database
    const application = await prisma.application.create({
      data: {
        ...validation.data,
        resumeUrl,
        jobId: job.id,
      },
    });

    return NextResponse.json(
      { 
        message: "Application submitted successfully.",
        applicationId: application.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your application." },
      { status: 500 }
    );
  }
}
