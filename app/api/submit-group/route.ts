import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name = formData.get("name") as string
    const sport = formData.get("sport") as string
    const borough = formData.get("borough") as string
    const venue = formData.get("venue") as string
    const area = formData.get("area") as string
    const level = formData.get("level") as string
    const description = formData.get("description") as string
    const contact = formData.get("contact") as string
    const sourceUrl = (formData.get("sourceUrl") as string) || ""

    // Validate required fields
    if (!name || !sport || !borough || !venue || !area || !level || !description || !contact) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      )
    }

    // Create the group with PENDING status
    const group = await prisma.group.create({
      data: {
        name,
        sport,
        borough,
        venue,
        area,
        level,
        description,
        contact,
        sourceUrl,
        status: "PENDING",
        sourceType: "USER_SUBMISSION",
        submittedAt: new Date(),
      },
    })

    // Redirect to success page
    return NextResponse.redirect(new URL("/submit/success", req.url))
  } catch (error) {
    console.error("Error submitting group:", error)
    return NextResponse.json(
      { error: "Failed to submit group. Please try again." },
      { status: 500 }
    )
  }
}
