import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  // Get stats
  const [totalGroups, pendingGroups, approvedGroups, rejectedGroups] = await Promise.all([
    prisma.group.count(),
    prisma.group.count({ where: { status: "PENDING" } }),
    prisma.group.count({ where: { status: "APPROVED" } }),
    prisma.group.count({ where: { status: "REJECTED" } }),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {session.user.email}
            </span>
            <form action={async () => {
              "use server"
              const { signOut } = await import("@/auth")
              await signOut()
            }}>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Total Groups</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{totalGroups}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Pending Review</div>
            <div className="mt-2 text-3xl font-bold text-yellow-600">{pendingGroups}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Approved</div>
            <div className="mt-2 text-3xl font-bold text-green-600">{approvedGroups}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-600">Rejected</div>
            <div className="mt-2 text-3xl font-bold text-red-600">{rejectedGroups}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <a
            href="/admin/groups"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Manage Groups
            </h2>
            <p className="text-sm text-gray-600">
              Review, approve, and manage sports groups
            </p>
          </a>

          <a
            href="/admin/submissions"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Pending Submissions
            </h2>
            <p className="text-sm text-gray-600">
              Review new group submissions from users
            </p>
          </a>

          <a
            href="/admin/scraper"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Scraper Runs
            </h2>
            <p className="text-sm text-gray-600">
              View scraper history and run new scrapes
            </p>
          </a>

          <a
            href="/admin/admins"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Admin Users
            </h2>
            <p className="text-sm text-gray-600">
              Manage admin users and permissions
            </p>
          </a>
        </div>
      </main>
    </div>
  )
}
