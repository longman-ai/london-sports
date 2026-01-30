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

  // Check if user is super admin
  const currentAdmin = await prisma.admin.findUnique({
    where: { email: session.user.email! },
  })

  if (currentAdmin?.role !== "SUPER_ADMIN") {
    return NextResponse.json(
      { error: "Only super admins can delete admins" },
      { status: 403 }
    )
  }

  const { id } = await params

  try {
    const adminToDelete = await prisma.admin.findUnique({
      where: { id },
    })

    if (!adminToDelete) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 })
    }

    // Prevent deleting yourself
    if (adminToDelete.email === session.user.email) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      )
    }

    await prisma.admin.delete({
      where: { id },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "delete",
        entity: "admin",
        entityId: id,
        userId: session.user.email!,
        changes: {
          email: adminToDelete.email,
        },
      },
    })

    return NextResponse.redirect(new URL("/admin/admins", req.url))
  } catch (error) {
    console.error("Error deleting admin:", error)
    return NextResponse.json(
      { error: "Failed to delete admin" },
      { status: 500 }
    )
  }
}
