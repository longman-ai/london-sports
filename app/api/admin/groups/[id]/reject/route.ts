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
    const group = await prisma.group.update({
      where: { id },
      data: {
        status: "REJECTED",
        reviewedBy: session.user.email!,
        reviewedAt: new Date(),
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "reject",
        entity: "group",
        entityId: id,
        userId: session.user.email!,
        changes: {
          status: "REJECTED",
        },
      },
    })

    return NextResponse.redirect(new URL("/admin/submissions", req.url))
  } catch (error) {
    console.error("Error rejecting group:", error)
    return NextResponse.json(
      { error: "Failed to reject group" },
      { status: 500 }
    )
  }
}
