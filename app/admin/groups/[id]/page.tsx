import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function AdminGroupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user) {
    redirect("/admin/login")
  }

  const { id } = await params

  const group = await prisma.group.findUnique({
    where: { id },
  })

  if (!group) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Group Details</h1>
            <a
              href="/admin/groups"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back to Groups
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Banner */}
        <div
          className={`mb-6 p-4 rounded-lg ${
            group.status === "APPROVED"
              ? "bg-green-50 border border-green-200"
              : group.status === "NEEDS_REVIEW"
              ? "bg-blue-50 border border-blue-200"
              : group.status === "PENDING"
              ? "bg-yellow-50 border border-yellow-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-600">Status: </span>
              <span
                className={`font-semibold ${
                  group.status === "APPROVED"
                    ? "text-green-700"
                    : group.status === "NEEDS_REVIEW"
                    ? "text-blue-700"
                    : group.status === "PENDING"
                    ? "text-yellow-700"
                    : "text-red-700"
                }`}
              >
                {group.status.replace("_", " ")}
              </span>
            </div>
            {(group.status === "NEEDS_REVIEW" || group.status === "PENDING") && (
              <div className="flex gap-2">
                <form action={`/api/admin/groups/${group.id}/approve`} method="POST">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                  >
                    Approve
                  </button>
                </form>
                <form action={`/api/admin/groups/${group.id}/reject`} method="POST">
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Reject
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Group Info */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{group.name}</h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Sport</label>
                <p className="mt-1 text-gray-900">{group.sport}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Borough</label>
                <p className="mt-1 text-gray-900">{group.borough}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Area</label>
                <p className="mt-1 text-gray-900">{group.area}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Level</label>
                <p className="mt-1 text-gray-900">{group.level}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Venue</label>
                <p className="mt-1 text-gray-900">{group.venue}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Source Type</label>
                <p className="mt-1 text-gray-900">{group.sourceType.replace("_", " ")}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Description</label>
              <p className="mt-1 text-gray-900 whitespace-pre-wrap">{group.description}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Contact</label>
              <p className="mt-1 text-gray-900 whitespace-pre-wrap">{group.contact}</p>
            </div>

            {group.sourceUrl && (
              <div>
                <label className="block text-sm font-medium text-gray-500">Source URL</label>
                <a
                  href={group.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-blue-600 hover:text-blue-800 break-all"
                >
                  {group.sourceUrl}
                </a>
              </div>
            )}

            {group.externalId && (
              <div>
                <label className="block text-sm font-medium text-gray-500">External ID</label>
                <p className="mt-1 text-gray-500 text-sm font-mono">{group.externalId}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-500">Created</label>
                <p className="mt-1 text-gray-900 text-sm">
                  {new Date(group.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Updated</label>
                <p className="mt-1 text-gray-900 text-sm">
                  {new Date(group.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
