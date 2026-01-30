import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const group = await prisma.group.findUnique({
    where: { id },
  })

  if (!group || group.status !== "APPROVED") {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-6">
          <a
            href="/browse"
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Browse
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="border-b pb-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
              <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded">
                {group.sport}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mr-3 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">Location</div>
                  <div>{group.venue}</div>
                  <div>{group.area}, {group.borough}</div>
                </div>
              </div>

              <div className="flex items-start">
                <svg
                  className="w-5 h-5 mr-3 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">Skill Level</div>
                  <div>{group.level}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              About This Group
            </h2>
            <p className="text-gray-600 whitespace-pre-wrap">{group.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              How to Join
            </h2>
            <div className="bg-gray-50 rounded-md p-4">
              <p className="text-gray-700">{group.contact}</p>
            </div>
          </div>

          {group.sourceUrl && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                More Information
              </h2>
              <a
                href={group.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 inline-flex items-center"
              >
                Visit Website
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}

          <div className="flex gap-4 pt-6 border-t">
            <a
              href="/browse"
              className="flex-1 px-6 py-3 text-center text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 font-medium"
            >
              Browse More Groups
            </a>
            <a
              href="/submit"
              className="flex-1 px-6 py-3 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 font-medium"
            >
              Add Your Group
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
