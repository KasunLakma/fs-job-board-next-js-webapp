import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Updating jobs with realistic data...')

  const jobs = await prisma.job.findMany()

  for (const job of jobs) {
    await prisma.job.update({
      where: { id: job.id },
      data: {
        description: `We are looking for a talented ${job.title} to join ${job.company}. You will be working in a fast-paced environment, contributing to innovative projects and helping us scale our ${job.category} solutions.`,
        skills: [
          job.category,
          "Teamwork",
          "Problem Solving",
          job.type === "Full-time" ? "Project Management" : "Quick Learning"
        ],
        responsibilities: [
          `Develop and maintain high-quality code for ${job.title} tasks`,
          "Collaborate with cross-functional teams to define and ship new features",
          "Continuously discover, evaluate, and implement new technologies",
          "Help maintain code quality, organization, and automatization"
        ],
        requirements: [
          `Proven experience as a ${job.title} or similar role`,
          `Familiarity with ${job.category} best practices`,
          "Excellent communication and teamwork skills",
          "Ability to work independently and manage multiple tasks"
        ]
      }
    })
    console.log(`Updated job: ${job.title} at ${job.company}`)
  }

  console.log('All jobs updated successfully.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
