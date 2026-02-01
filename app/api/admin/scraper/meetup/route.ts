import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import {
  scrapeMeetupGroups,
  getSampleLondonSportsGroups,
  transformMeetupGroup,
  MeetupGroup,
} from "@/lib/meetup"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Check for seed mode (uses sample data instead of API)
  const url = new URL(req.url)
  const useSeedData = url.searchParams.get("seed") === "true"

  try {
    // Create scraper run record
    const scraperRun = await prisma.scraperRun.create({
      data: {
        scraperType: useSeedData ? "Meetup (Seed)" : "Meetup",
        status: "running",
        startedAt: new Date(),
      },
    })

    let groups: MeetupGroup[] = []
    let errors: string[] = []

    if (useSeedData) {
      // Use sample data for seeding
      groups = getSampleLondonSportsGroups()
    } else {
      // Try to use the actual Meetup API
      const result = await scrapeMeetupGroups()
      groups = result.groups
      errors = result.errors

      if (!result.success && groups.length === 0) {
        // Update scraper run with error
        await prisma.scraperRun.update({
          where: { id: scraperRun.id },
          data: {
            status: "failed",
            completedAt: new Date(),
            errors: errors,
            metadata: {
              message: "No API access token. Use ?seed=true to seed sample data.",
            },
          },
        })

        // Create audit log
        await prisma.auditLog.create({
          data: {
            action: "create",
            entity: "scraper_run",
            entityId: scraperRun.id,
            userId: session.user.email!,
            changes: {
              scraperType: "Meetup",
              status: "failed",
              errors,
            },
          },
        })

        return NextResponse.redirect(new URL("/admin/scraper", req.url))
      }
    }

    // Process and save groups
    let groupsCreated = 0
    const processedGroups: string[] = []

    for (const meetupGroup of groups) {
      try {
        const groupData = transformMeetupGroup(meetupGroup)

        // Check if group already exists by externalId
        const existing = await prisma.group.findUnique({
          where: { externalId: groupData.externalId },
        })

        if (existing) {
          // Update existing group
          await prisma.group.update({
            where: { id: existing.id },
            data: {
              ...groupData,
              scrapedAt: new Date(),
              scraperVersion: "1.0.0",
            },
          })
          processedGroups.push(`Updated: ${groupData.name}`)
        } else {
          // Create new group
          await prisma.group.create({
            data: {
              ...groupData,
              sourceType: "MEETUP_SCRAPER",
              status: "NEEDS_REVIEW",
              scrapedAt: new Date(),
              scraperVersion: "1.0.0",
            },
          })
          groupsCreated++
          processedGroups.push(`Created: ${groupData.name}`)
        }
      } catch (groupError) {
        const errorMsg = groupError instanceof Error ? groupError.message : 'Unknown error'
        errors.push(`Error processing ${meetupGroup.name}: ${errorMsg}`)
      }
    }

    // Update scraper run with results
    await prisma.scraperRun.update({
      where: { id: scraperRun.id },
      data: {
        status: "completed",
        completedAt: new Date(),
        groupsFound: groups.length,
        groupsCreated,
        errors: errors.length > 0 ? errors : undefined,
        metadata: {
          usedSeedData: useSeedData,
          processedGroups,
        },
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "create",
        entity: "scraper_run",
        entityId: scraperRun.id,
        userId: session.user.email!,
        changes: {
          scraperType: useSeedData ? "Meetup (Seed)" : "Meetup",
          groupsFound: groups.length,
          groupsCreated,
        },
      },
    })

    return NextResponse.redirect(new URL("/admin/scraper", req.url))
  } catch (error) {
    console.error("Error running Meetup scraper:", error)
    return NextResponse.json(
      { error: "Failed to run Meetup scraper" },
      { status: 500 }
    )
  }
}
