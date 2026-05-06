import { NextResponse } from 'next/server';
import { getJobById } from '@/lib/jobs';

export async function GET(
 request: Request,
 { params }: { params: Promise<{ id: string }> }
) {
 try {
 const resolvedParams = await params;
 const id = resolvedParams.id;
 
 if (!id) {
 return NextResponse.json(
 { error: 'Job ID is required' },
 { status: 400 }
 );
 }

 const job = await getJobById(id);

 if (!job) {
 return NextResponse.json(
 { error: 'Job not found' },
 { status: 404 }
 );
 }

 return NextResponse.json(job);
 } catch (error) {
 console.error(`Error in /api/jobs/[id]:`, error);
 return NextResponse.json(
 { error: 'Internal Server Error' },
 { status: 500 }
 );
 }
}
