import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const email = user.emailAddresses[0].emailAddress;
  const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  try {
    // Upsert the user into our Prisma database
    await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {
        email,
        name,
      },
      create: {
        clerkId: user.id,
        email,
        name,
        role: "USER", // Default role
      },
    });
  } catch (error) {
    console.error("Error syncing user with database:", error);
    // Even if sync fails, we might want to redirect to home with an error, 
    // or show an error page. For now, redirect home.
  }

  // Redirect back to home page after sync
  redirect("/");
}
