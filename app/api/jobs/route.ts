import { NextResponse } from 'next/server';
import { getJobs } from '@/lib/jobs';
import prisma from "@/lib/prisma";
import { jobSchema } from "@/lib/validations/job";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const q = searchParams.get('q') || undefined;
    const location = searchParams.get('location') || undefined;
    const type = searchParams.get('type') || undefined;
    const category = searchParams.get('category') || undefined;
    
    // Parse pagination parameters
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    
    const page = pageParam ? parseInt(pageParam, 10) : undefined;
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    // Fetch jobs using our data access layer
    const result = await getJobs({
      q,
      location,
      type,
      category,
      page: isNaN(page as number) ? undefined : page,
      limit: isNaN(limit as number) ? undefined : limit,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('GET Jobs Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  console.log("POST /api/jobs: Starting request processing");
  try {
    const body = await request.json();
    console.log("POST /api/jobs: Received body:", JSON.stringify(body, null, 2));
    
    // Server-side validation
    const validatedData = jobSchema.parse(body);
    console.log("POST /api/jobs: Validation successful");

    // Generate a unique slug
    const baseSlug = `${validatedData.title}-${validatedData.company}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    let slug = baseSlug;
    let counter = 1;
    
    // Check for existing slug
    const existing = await prisma.job.findUnique({ where: { slug } });
    if (existing) {
      slug = `${baseSlug}-${Date.now()}`; // Simpler unique slug generation
    }

    console.log("POST /api/jobs: Creating job with slug:", slug);

    const job = await prisma.job.create({
      data: {
        title: validatedData.title,
        company: validatedData.company,
        location: validatedData.location,
        type: validatedData.type,
        category: validatedData.category,
        experienceLevel: validatedData.experienceLevel || "Entry Level",
        salary: validatedData.salary || "Competitive",
        salaryMin: validatedData.salaryMin,
        salaryMax: validatedData.salaryMax,
        currency: validatedData.currency || "USD",
        workArrangement: validatedData.workArrangement || "Remote",
        status: validatedData.status || "Published",
        description: validatedData.description,
        skills: validatedData.skills || [],
        responsibilities: validatedData.responsibilities || [],
        requirements: validatedData.requirements || [],
        slug,
        postedAt: "Just now",
        expirationDate: validatedData.expirationDate ? new Date(validatedData.expirationDate) : null,
      },
    });

    console.log("POST /api/jobs: Job created successfully:", job.id);
    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    console.error('CRITICAL ERROR in POST /api/jobs:', error);
    
    if (error.name === "ZodError" || error.issues) {
      const messages = error.errors 
        ? error.errors.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(', ')
        : error.message || "Validation failed";
      return NextResponse.json({ error: messages }, { status: 400 });
    }
    
    return NextResponse.json(
      { error: error.message || 'An unexpected database error occurred.' },
      { status: 500 }
    );
  }
}
