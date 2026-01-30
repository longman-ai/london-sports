import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  accelerateUrl: process.env.POSTGRES_PRISMA_URL,
})

async function main() {
  console.log('Seeding database...')

  // Get admin emails from environment variable
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || []

  // Create admin users
  for (const email of adminEmails) {
    if (!email) continue

    const admin = await prisma.admin.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: email.split('@')[0], // Use email prefix as name
        role: 'SUPER_ADMIN', // Change to MODERATOR or VIEWER as needed
      },
    })
    console.log(`✓ Created/updated admin: ${admin.email}`)
  }

  // Optionally add sample groups
  const sampleGroup = await prisma.group.upsert({
    where: {
      externalId: 'sample-football-group-1'
    },
    update: {},
    create: {
      sport: 'Football',
      borough: 'Camden',
      name: 'Camden FC Sunday League',
      venue: 'Camden Sports Centre',
      area: 'North London',
      level: 'Intermediate',
      description: 'Friendly Sunday league football for intermediate players. All levels welcome!',
      contact: 'contact@camdenfc.example.com',
      sourceUrl: 'https://example.com/camden-fc',
      status: 'APPROVED',
      sourceType: 'MANUAL_ENTRY',
      externalId: 'sample-football-group-1',
    },
  })
  console.log(`✓ Created sample group: ${sampleGroup.name}`)

  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
