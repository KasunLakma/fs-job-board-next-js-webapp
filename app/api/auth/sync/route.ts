import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { origin } = new URL(request.url);
  
  try {
    const user = await currentUser();

    if (!user) {
      console.log("[Sync] No user found, redirecting to sign-in");
      return NextResponse.redirect(`${origin}/sign-in`);
    }

    const email = user.emailAddresses[0].emailAddress;
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    console.log(`[Sync] Syncing user: ${email} (${user.id})`);

    // Upsert the user into our Prisma database
    const dbUser = await prisma.user.upsert({
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

    console.log(`[Sync] User ${dbUser.email} synced successfully with role ${dbUser.role}`);
  } catch (error) {
    console.error("[Sync] Critical error during synchronization:", error);
  }

  // Final fallback redirect to home page
  // We place this at the very end to ensure the browser moves even if logic above fails
  console.log("[Sync] Redirecting to home page");
  return NextResponse.redirect(`${origin}/`);
}
