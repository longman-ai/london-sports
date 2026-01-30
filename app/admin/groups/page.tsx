import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function GroupsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; sport?: string; borough?: string }>
}) {
  const session = await auth()
  if (!session?.user) {
    redirect("/admin/login")
  }

  const params = await searchParams
  const status = params.status || "APPROVED"
  const sport = params.sport
  const borough = params.borough

  const groups = await prisma.group.findMany({
    where: {
      ...(status && { status: status as any }),
      ...(sport && { sport }),
      ...(borough && { borough }),
    },
    orderBy: { updatedAt: "desc" },
    take: 50,
  })

  const stats = await Promise.all([
    prisma.group.count({ where: { status: "APPROVED" } }),
    prisma.group.count({ where: { status: "PENDING" } }),
    prisma.group.count({ where: { status: "NEEDS_REVIEW" } }),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Manage Groups</h1>
            <a
              href="/admin"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <a
            href="/admin/groups?status=APPROVED"
            className={`p-4 rounded-lg ${
              status === "APPROVED"
                ? "bg-green-100 border-2 border-green-500"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="text-sm font-medium text-gray-600">Approved</div>
            <div className="text-2xl font-bold text-green-600">{stats[0]}</div>
          </a>
          <a
            href="/admin/groups?status=PENDING"
            className={`p-4 rounded-lg ${
              status === "PENDING"
                ? "bg-yellow-100 border-2 border-yellow-500"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="text-sm font-medium text-gray-600">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">{stats[1]}</div>
          </a>
          <a
            href="/admin/groups?status=NEEDS_REVIEW"
            className={`p-4 rounded-lg ${
              status === "NEEDS_REVIEW"
                ? "bg-blue-100 border-2 border-blue-500"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="text-sm font-medium text-gray-600">Needs Review</div>
            <div className="text-2xl font-bold text-blue-600">{stats[2]}</div>
          </a>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {status.replace("_", " ")} Groups ({groups.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sport
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Borough
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groups.map((group) => (
                  <tr key={group.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {group.name}
                      </div>
                      <div className="text-sm text-gray-500">{group.venue}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {group.sport}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {group.borough}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {group.level}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {group.sourceType.replace("_", " ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a
                        href={`/admin/groups/${group.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </a>
                      {group.sourceUrl && (
                        <a
                          href={group.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Source
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {groups.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No groups found with status: {status}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
