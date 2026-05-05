import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    // Basic server-side validation
    const name = formData.get("name");
    const email = formData.get("email");
    const resume = formData.get("resume") as File | null;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
        { status: 400 }
      );
    }

    if (!resume || resume.size === 0) {
      return NextResponse.json(
        { error: "A valid resume file is required." },
        { status: 400 }
      );
    }

    // Simulate backend processing latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real application, you would:
    // 1. Upload the file to S3 or similar cloud storage
    // 2. Save the application details to the database, referencing the jobId
    // 3. Send a confirmation email to the applicant
    // 4. Send a notification to the employer

    return NextResponse.json(
      { message: "Application submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your application." },
      { status: 500 }
    );
  }
}
