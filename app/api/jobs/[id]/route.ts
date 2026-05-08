import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { jobSchema } from "@/lib/validations/job";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const job = await prisma.job.findUnique({
      where: { id: id },
    });

    if (!job) {
      // Try slug if UUID fails (for public board fallback)
      const jobBySlug = await prisma.job.findUnique({
        where: { slug: id }
      });
      if (!jobBySlug) {
        return NextResponse.json({ error: 'Job not found' }, { status: 404 });
      }
      return NextResponse.json(jobBySlug);
    }

    return NextResponse.json(job);
  } catch (error: any) {
    console.error(`Error in GET /api/jobs/[id]:`, error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Server-side validation
    const validatedData = jobSchema.parse(body);

    const updatedJob = await prisma.job.update({
      where: { id: id },
      data: {
        title: validatedData.title,
        company: validatedData.company,
        location: validatedData.location,
        type: validatedData.type,
        category: validatedData.category,
        experienceLevel: validatedData.experienceLevel,
        salary: validatedData.salary,
        salaryMin: validatedData.salaryMin,
        salaryMax: validatedData.salaryMax,
        currency: validatedData.currency,
        workArrangement: validatedData.workArrangement,
        status: validatedData.status,
        description: validatedData.description,
        skills: validatedData.skills,
        responsibilities: validatedData.responsibilities,
        requirements: validatedData.requirements,
        expirationDate: validatedData.expirationDate ? new Date(validatedData.expirationDate) : null,
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error: any) {
    console.error(`Error in PATCH /api/jobs/[id]:`, error);
    
    if (error.name === "ZodError" || error.issues) {
      const messages = error.errors 
        ? error.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(', ')
        : error.message || "Validation failed";
      return NextResponse.json({ error: messages }, { status: 400 });
    }

    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.job.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true, message: "Job deleted successfully" });
  } catch (error: any) {
    console.error(`Error in DELETE /api/jobs/[id]:`, error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
