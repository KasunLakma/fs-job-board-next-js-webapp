import { PrismaClient } from '@prisma/client'
import { jobsData } from '../data/jobs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')
  
  for (const job of jobsData) {
    const jobData = {
      slug: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      category: job.category,
      salary: job.salary,
      postedAt: job.postedAt,
    }

    const existingJob = await prisma.job.findUnique({
      where: { slug: job.id }
    })

    if (!existingJob) {
      await prisma.job.create({ data: jobData })
      console.log(`Created job with slug: ${job.id}`)
    } else {
      console.log(`Job with slug ${job.id} already exists`)
    }
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
