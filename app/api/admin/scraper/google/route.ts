import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import {
  scrapeGoogleGroups,
  getSampleGoogleSportsGroups,
  transformGoogleGroup,
  GoogleGroup,
} from "@/lib/google"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(req.url)
  const useSeedData = url.searchParams.get("seed") === "true"

  try {
    // Create scraper run record
    const scraperRun = await prisma.scraperRun.create({
      data: {
        scraperType: useSeedData ? "Google (Seed)" : "Google",
        status: "running",
        startedAt: new Date(),
      },
    })

    let groups: GoogleGroup[] = []
    let errors: string[] = []

    if (useSeedData) {
      // Use sample data for testing/development
      groups = getSampleGoogleSportsGroups()
    } else {
      // Use live Google Custom Search API
      const result = await scrapeGoogleGroups()
      groups = result.groups
      errors = result.errors

      // If API fails and no groups found, mark as failed
      if (!result.success && groups.length === 0) {
        await prisma.scraperRun.update({
          where: { id: scraperRun.id },
          data: {
            status: "failed",
            completedAt: new Date(),
            errors: errors,
            metadata: {
              message: "API access failed. Use ?seed=true for sample data.",
              note: "Requires GOOGLE_API_KEY and GOOGLE_SEARCH_ENGINE_ID",
            },
          },
        })

        // Create audit log for failed run
        await prisma.auditLog.create({
          data: {
            action: "create",
            entity: "scraper_run",
            entityId: scraperRun.id,
            userId: session.user.email!,
            changes: {
              scraperType: "Google",
              status: "failed",
              errors,
            },
          },
        })

        return NextResponse.redirect(new URL("/admin/scraper", req.url))
      }
    }

    // Process and save groups to database
    let groupsCreated = 0
    const processedGroups: string[] = []

    for (const group of groups) {
      try {
        const groupData = transformGoogleGroup(group)

        // Check if group already exists (by externalId)
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
              sourceType: "GOOGLE_SCRAPER",
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
        errors.push(`Error processing ${group.name}: ${errorMsg}`)
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
          useSeedData,
          processedGroups,
          apiNote: useSeedData ? "Used sample data" : "Used Google Custom Search API",
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
          scraperType: useSeedData ? "Google (Seed)" : "Google",
          groupsFound: groups.length,
          groupsCreated,
        },
      },
    })

    return NextResponse.redirect(new URL("/admin/scraper", req.url))
  } catch (error) {
    console.error("Error running Google scraper:", error)
    return NextResponse.json(
      { error: "Failed to run Google scraper" },
      { status: 500 }
    )
  }
}
