import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function SubmissionsPage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/admin/login")
  }

  const pendingSubmissions = await prisma.group.findMany({
    where: {
      status: "PENDING",
      sourceType: "USER_SUBMISSION",
    },
    orderBy: { submittedAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Pending Submissions</h1>
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
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="text-sm text-gray-600">
            Total Pending Submissions: <span className="font-semibold">{pendingSubmissions.length}</span>
          </div>
        </div>

        <div className="space-y-4">
          {pendingSubmissions.map((submission) => (
            <div key={submission.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {submission.name}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Sport:</span>
                      <span className="ml-2 text-sm text-gray-900">{submission.sport}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Borough:</span>
                      <span className="ml-2 text-sm text-gray-900">{submission.borough}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Venue:</span>
                      <span className="ml-2 text-sm text-gray-900">{submission.venue}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Level:</span>
                      <span className="ml-2 text-sm text-gray-900">{submission.level}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Contact:</span>
                      <span className="ml-2 text-sm text-gray-900">{submission.contact}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Submitted:</span>
                      <span className="ml-2 text-sm text-gray-900">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-500">Description:</span>
                    <p className="mt-1 text-sm text-gray-900">{submission.description}</p>
                  </div>

                  {submission.sourceUrl && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Website:</span>
                      <a
                        href={submission.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        {submission.sourceUrl}
                      </a>
                    </div>
                  )}
                </div>

                <div className="ml-6 flex flex-col gap-2">
                  <form action={`/api/admin/groups/${submission.id}/approve`} method="POST">
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                    >
                      Approve
                    </button>
                  </form>
                  <form action={`/api/admin/groups/${submission.id}/reject`} method="POST">
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </form>
                  <a
                    href={`/admin/groups/${submission.id}`}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-center"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}

          {pendingSubmissions.length === 0 && (
            <div className="bg-white shadow rounded-lg p-12 text-center text-gray-500">
              No pending submissions to review
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
