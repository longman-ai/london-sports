import { prisma } from "@/lib/prisma"

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ sport?: string; borough?: string; search?: string }>
}) {
  const params = await searchParams
  const sport = params.sport
  const borough = params.borough
  const search = params.search

  const groups = await prisma.group.findMany({
    where: {
      status: "APPROVED",
      ...(sport && { sport }),
      ...(borough && { borough }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: { updatedAt: "desc" },
  })

  const allSports = await prisma.group.findMany({
    where: { status: "APPROVED" },
    select: { sport: true },
    distinct: ["sport"],
    orderBy: { sport: "asc" },
  })

  const allBoroughs = await prisma.group.findMany({
    where: { status: "APPROVED" },
    select: { borough: true },
    distinct: ["borough"],
    orderBy: { borough: "asc" },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Find Sports Groups in London
          </h1>

          <form method="GET" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search groups..."
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                name="sport"
                defaultValue={sport || ""}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Sports</option>
                {allSports.map((s) => (
                  <option key={s.sport} value={s.sport}>
                    {s.sport}
                  </option>
                ))}
              </select>

              <select
                name="borough"
                defaultValue={borough || ""}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Boroughs</option>
                {allBoroughs.map((b) => (
                  <option key={b.borough} value={b.borough}>
                    {b.borough}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 font-medium"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold">{groups.length}</span> groups
          </p>
          <a
            href="/submit"
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 font-medium"
          >
            + Add Your Group
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 flex-1">
                  {group.name}
                </h3>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                  {group.sport}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {group.venue}, {group.borough}
                </div>

                <div className="flex items-center text-sm text-gray-600">
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
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  {group.level}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {group.description}
              </p>

              <div className="flex gap-2">
                <a
                  href={`/groups/${group.id}`}
                  className="flex-1 px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 text-sm font-medium"
                >
                  View Details
                </a>
                {group.sourceUrl && (
                  <a
                    href={group.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 text-sm font-medium"
                  >
                    Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {groups.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No groups found matching your search criteria
            </p>
            <a
              href="/browse"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear filters
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
