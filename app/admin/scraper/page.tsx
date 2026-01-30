import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"

export default async function ScraperPage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/admin/login")
  }

  const scraperRuns = await prisma.scraperRun.findMany({
    orderBy: { startedAt: "desc" },
    take: 20,
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Scraper Management</h1>
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Run New Scraper
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form action="/api/admin/scraper/meetup" method="POST">
              <button
                type="submit"
                className="w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Run Meetup Scraper
              </button>
            </form>
            <form action="/api/admin/scraper/facebook" method="POST">
              <button
                type="submit"
                className="w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Run Facebook Scraper
              </button>
            </form>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Scrapers will run in the background and create groups with "NEEDS_REVIEW" status
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Scraper Runs
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scraper Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Started
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Results
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scraperRuns.map((run) => (
                  <tr key={run.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {run.scraperType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          run.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : run.status === "running"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {run.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(run.startedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {run.completedAt
                        ? new Date(run.completedAt).toLocaleString()
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Found: {run.groupsFound} | Created: {run.groupsCreated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {scraperRuns.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No scraper runs yet
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
