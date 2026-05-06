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
