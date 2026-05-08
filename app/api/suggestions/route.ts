import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch unique values for suggestions in parallel
    const [locations, companies, rawSkills] = await Promise.all([
      prisma.job.findMany({
        select: { location: true },
        distinct: ['location'],
        take: 50,
      }),
      prisma.job.findMany({
        select: { company: true },
        distinct: ['company'],
        take: 50,
      }),
      prisma.job.findMany({
        select: { skills: true },
        take: 100,
      }),
    ]);

    // Process skills to get unique values from arrays
    const uniqueSkills = Array.from(new Set(rawSkills.flatMap(s => s.skills))).sort().slice(0, 50);

    return NextResponse.json({
      locations: locations.map(l => l.location).sort(),
      companies: companies.map(c => c.company).sort(),
      skills: uniqueSkills,
    });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return NextResponse.json({ error: 'Failed to fetch suggestions' }, { status: 500 });
  }
}
