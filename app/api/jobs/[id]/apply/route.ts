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

    // Extract data from formData with explicit typing and fallbacks
    const data = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || undefined,
      linkedin: formData.get("linkedin")?.toString() || undefined,
      portfolio: formData.get("portfolio")?.toString() || undefined,
      coverLetter: formData.get("coverLetter")?.toString() || undefined,
    };

    // Validate data using safeParse
    const validation = applicationSchema.safeParse(data);

    // Robustly handle validation failure
    if (!validation.success) {
      // Use flatten() to get a cleaner error structure as requested
      const flattenedErrors = validation.error.flatten();

      // Create a readable error message from field errors
      const fieldErrors = flattenedErrors.fieldErrors;
      const errorMessages = Object.entries(fieldErrors)
        .map(([field, messages]) => `${field}: ${messages?.join(", ")}`)
        .join("; ");

      return NextResponse.json(
        {
          error: "Validation failed",
          details: fieldErrors,
          message: errorMessages
        },
        { status: 400 }
      );
    }

    // After the check above, TypeScript knows validation.success is true
    // and validation.data contains the parsed, typed data.
    const validatedData = validation.data;

    const resume = formData.get("resume") as File | null;
    if (!resume || resume.size === 0) {
      return NextResponse.json(
        { error: "A valid resume file is required." },
        { status: 400 }
      );
    }

    // Placeholder for actual file upload logic
    const resumeUrl = `uploads/resumes/${Date.now()}-${resume.name}`;

    // Save to database using the UUID from the found job record
    const application = await prisma.application.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        linkedin: validatedData.linkedin,
        portfolio: validatedData.portfolio,
        coverLetter: validatedData.coverLetter,
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
