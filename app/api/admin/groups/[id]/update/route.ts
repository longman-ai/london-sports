import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  try {
    const body = await req.json()
    const { contact, sourceUrl, name, venue, description, level } = body

    const updateData: Record<string, string> = {}
    if (contact !== undefined) updateData.contact = contact
    if (sourceUrl !== undefined) updateData.sourceUrl = sourceUrl
    if (name !== undefined) updateData.name = name
    if (venue !== undefined) updateData.venue = venue
    if (description !== undefined) updateData.description = description
    if (level !== undefined) updateData.level = level

    const group = await prisma.group.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ ok: true, group })
  } catch (error) {
    console.error("Error updating group:", error)
    return NextResponse.json(
      { error: "Failed to update group" },
      { status: 500 }
    )
  }
}
