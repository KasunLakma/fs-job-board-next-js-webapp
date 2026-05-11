import prisma from "../lib/prisma";

async function main() {
  try {
    const jobs = await prisma.job.count();
    console.log("Job count:", jobs);
    const apps = await prisma.application.count();
    console.log("Application count:", apps);
  } catch (error) {
    console.error("Connection error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
