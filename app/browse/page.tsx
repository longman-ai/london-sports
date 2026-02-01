import { prisma } from "@/lib/prisma"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"

const sportEmojis: Record<string, string> = {
  Football: '⚽',
  Basketball: '🏀',
  Tennis: '🎾',
  Badminton: '🏸',
  Running: '🏃',
  Padel: '🎾',
  Cricket: '🏏',
  Rugby: '🏉',
  Cycling: '🚴',
  Swimming: '🏊',
  Yoga: '🧘',
  Climbing: '🧗',
}

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

  const hasFilters = sport || borough || search

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white w-full flex justify-center">
        <div className="w-full max-w-7xl px-6 sm:px-8 lg:px-12 py-12 md:py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Sports Groups
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Discover local sports communities across London. Filter by sport, borough, or search for specific groups.
            </p>
          </div>

          {/* Search Form */}
          <form method="GET" className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search Input */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <svg
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      name="search"
                      defaultValue={search}
                      placeholder="Search groups..."
                      className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>
                </div>

                {/* Sport Select */}
                <select
                  name="sport"
                  defaultValue={sport || ""}
                  className="px-4 py-3.5 bg-white rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium appearance-none cursor-pointer"
                >
                  <option value="">All Sports</option>
                  {allSports.map((s) => (
                    <option key={s.sport} value={s.sport}>
                      {sportEmojis[s.sport] || '🏅'} {s.sport}
                    </option>
                  ))}
                </select>

                {/* Borough Select */}
                <select
                  name="borough"
                  defaultValue={borough || ""}
                  className="px-4 py-3.5 bg-white rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium appearance-none cursor-pointer"
                >
                  <option value="">All Boroughs</option>
                  {allBoroughs.map((b) => (
                    <option key={b.borough} value={b.borough}>
                      📍 {b.borough}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3.5 text-white bg-blue-600 rounded-xl hover:bg-blue-700 font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search Groups
                </button>
                {hasFilters && (
                  <a
                    href="/browse"
                    className="px-6 py-3.5 text-white bg-white/20 rounded-xl hover:bg-white/30 font-semibold transition-colors text-center"
                  >
                    Clear Filters
                  </a>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl px-6 sm:px-8 lg:px-12 py-10 md:py-12">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <p className="text-slate-600 text-lg">
              Found <span className="font-bold text-slate-900">{groups.length}</span> {groups.length === 1 ? 'group' : 'groups'}
              {sport && <span className="text-blue-600"> in {sport}</span>}
              {borough && <span className="text-blue-600"> • {borough}</span>}
            </p>
          </div>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-blue-600 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 hover:border-blue-300 font-semibold transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Your Group
          </Link>
        </div>

        {/* Groups Grid */}
        {groups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div
                key={group.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 hover:border-blue-300 transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {group.name}
                      </h3>
                    </div>
                    <span className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full border border-blue-200">
                      <span>{sportEmojis[group.sport] || '🏅'}</span>
                      {group.sport}
                    </span>
                  </div>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="font-medium">{group.venue}, {group.borough}</span>
                    </div>

                    <div className="flex items-center text-sm text-slate-600">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <span className="font-medium">{group.level}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {group.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                  <Link
                    href={`/groups/${group.id}`}
                    className="flex-1 px-4 py-2.5 text-center text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                  >
                    View Details
                  </Link>
                  {group.sourceUrl && (
                    <a
                      href={group.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 text-sm font-semibold transition-all flex items-center gap-1.5"
                    >
                      Website
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No groups found</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              We couldn't find any groups matching your search criteria. Try adjusting your filters or browse all groups.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/browse"
                className="px-6 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 font-semibold transition-colors"
              >
                Browse All Groups
              </a>
              <Link
                href="/submit"
                className="px-6 py-3 text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:border-blue-300 font-semibold transition-colors"
              >
                Add Your Group
              </Link>
            </div>
          </div>
        )}

        {/* CTA Banner */}
        {groups.length > 0 && (
          <div className="mt-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-10 text-center shadow-xl shadow-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-3">
              Don't see your group listed?
            </h3>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Add your sports group to our directory for free and help others discover it.
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-6 py-3 text-blue-700 bg-white rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Add Your Group
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
