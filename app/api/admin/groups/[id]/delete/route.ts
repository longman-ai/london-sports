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
    const group = await prisma.group.delete({
      where: { id },
    })

    await prisma.auditLog.create({
      data: {
        action: "delete",
        entity: "group",
        entityId: id,
        userId: session.user.email!,
        changes: {
          name: group.name,
          sport: group.sport,
          borough: group.borough,
        },
      },
    })

    return NextResponse.redirect(new URL("/admin/groups", req.url))
  } catch (error) {
    console.error("Error deleting group:", error)
    return NextResponse.json(
      { error: "Failed to delete group" },
      { status: 500 }
    )
  }
}
