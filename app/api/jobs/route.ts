import { NextResponse } from 'next/server';
import { getJobs } from '@/lib/jobs';

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
  } catch (error) {
    console.error('Error in /api/jobs:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const { jobSchema } = await import("@/lib/validations/job");
    const validatedData = jobSchema.parse(body);

    const prisma = (await import("@/lib/prisma")).default;

    // Generate a unique slug
    const baseSlug = `${validatedData.title}-${validatedData.company}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.job.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const job = await prisma.job.create({
      data: {
        ...validatedData,
        slug,
        postedAt: "Just now",
        // Ensure expirationDate is a Date object if provided
        expirationDate: validatedData.expirationDate ? new Date(validatedData.expirationDate) : null,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error: any) {
    console.error('Error creating job:', error);
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
