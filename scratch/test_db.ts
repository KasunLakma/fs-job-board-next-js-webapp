import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function test() {
  console.log('Testing database relation...')
  
  // Find a job
  const job = await prisma.job.findFirst()
  if (!job) {
    console.error('No jobs found in database. Run seed first.')
    return
  }
  
  console.log(`Found job: ${job.title} (${job.id})`)
  
  // Create an application
  try {
    const application = await prisma.application.create({
      data: {
        name: 'Test Applicant',
        email: 'test@example.com',
        resumeUrl: 'test-resume.pdf',
        jobId: job.id,
        phone: '1234567890',
        coverLetter: 'Testing relations'
      }
    })
    
    console.log('Successfully created application:', application.id)
    
    // Fetch it back with job relation
    const fetchedApp = await prisma.application.findUnique({
      where: { id: application.id },
      include: { job: true }
    })
    
    console.log('Fetched application with job:', fetchedApp?.job.title)
    
    // Clean up
    await prisma.application.delete({ where: { id: application.id } })
    console.log('Test successful and cleaned up.')
  } catch (error) {
    console.error('Database test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

test()
