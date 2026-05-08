import { PrismaClient } from '@prisma/client'
import { jobsData } from '../data/jobs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  
  for (const [index, job] of jobsData.entries()) {
    const jobData = {
      slug: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      category: job.category,
      salary: job.salary,
      postedAt: job.postedAt,
      status: index % 3 === 0 ? "Published" : index % 3 === 1 ? "Draft" : "Closed",
      description: job.description || "No description provided.",
      skills: job.skills || [],
      responsibilities: job.responsibilities || [],
      requirements: job.requirements || [],
    }

    await prisma.job.upsert({
      where: { slug: job.id },
      update: jobData,
      create: jobData,
    })
    console.log(`Upserted job with slug: ${job.id}`)
  }
  
  console.log('Seeding finished.')
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
