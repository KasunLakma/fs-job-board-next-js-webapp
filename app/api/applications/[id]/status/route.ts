import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const statusSchema = z.object({
  status: z.enum(["Pending", "In-Review", "Accepted", "Rejected"]),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validation = statusSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const application = await prisma.application.update({
      where: { id },
      data: { status: validation.data.status },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      { error: "Failed to update application status" },
      { status: 500 }
    );
  }
}
