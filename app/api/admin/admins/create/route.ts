import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
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
      { error: "Only super admins can add new admins" },
      { status: 403 }
    )
  }

  try {
    const formData = await req.formData()
    const email = formData.get("email") as string
    const name = formData.get("name") as string
    const role = formData.get("role") as "SUPER_ADMIN" | "MODERATOR" | "VIEWER"

    const admin = await prisma.admin.create({
      data: {
        email,
        name,
        role,
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "create",
        entity: "admin",
        entityId: admin.id,
        userId: session.user.email!,
        changes: {
          email,
          name,
          role,
        },
      },
    })

    return NextResponse.redirect(new URL("/admin/admins", req.url))
  } catch (error) {
    console.error("Error creating admin:", error)
    return NextResponse.json(
      { error: "Failed to create admin" },
      { status: 500 }
    )
  }
}
