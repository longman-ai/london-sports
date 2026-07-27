import { Metadata } from "next"
import { prisma } from "@/lib/prisma"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Browse Sports Groups | London Sports Community",
  description: "Browse 150+ sports groups across all 33 London boroughs. Filter by sport, area, or skill level. Free directory, no sign-up required.",
  openGraph: {
    title: "Browse Sports Groups Across London",
    description: "Find football, padel, running, tennis, yoga and more across every London borough. Free directory.",
  },
}

const sportEmojis: Record<string, string> = {
  Football: '⚽', Basketball: '🏀', Tennis: '🎾', Badminton: '🏸',
  Running: '🏃', Padel: '🎾', Cricket: '🏏', Rugby: '🏉',
  Cycling: '🚴', Swimming: '🏊', Yoga: '🧘', Climbing: '🧗',
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

  // Deduplicate: keep the most recently updated entry when name + borough match
  const seen = new Map<string, typeof groups[0]>()
  for (const group of groups) {
    const key = `${group.name.toLowerCase().trim()}::${group.borough.toLowerCase().trim()}`
    const existing = seen.get(key)
    if (!existing || group.updatedAt > existing.updatedAt) {
      seen.set(key, group)
    }
  }
  const dedupedGroups = Array.from(seen.values())

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
    <div className="min-h-screen bg-stone-50">
      <Header />

      {/* Hero / Search */}
      <div className="bg-stone-900 text-white w-full flex justify-center">
        <div className="w-full max-w-6xl px-5 sm:px-8 py-10 md:py-14">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Groups</h1>
            <p className="text-stone-400">
              Find sports communities across London
            </p>
          </div>

          <form method="GET" className="max-w-3xl mx-auto">
            <div className="bg-stone-800 rounded-xl p-4 border border-stone-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-2 relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    name="search"
                    defaultValue={search}
                    placeholder="Search groups..."
                    className="w-full pl-10 pr-3 py-3 bg-white rounded-lg text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  />
                </div>
                <select
                  name="sport"
                  defaultValue={sport || ""}
                  className="px-3 py-3 bg-white rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm appearance-none cursor-pointer"
                >
                  <option value="">All Sports</option>
                  {allSports.map((s) => (
                    <option key={s.sport} value={s.sport}>
                      {sportEmojis[s.sport] || '🏅'} {s.sport}
                    </option>
                  ))}
                </select>
                <select
                  name="borough"
                  defaultValue={borough || ""}
                  className="px-3 py-3 bg-white rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm appearance-none cursor-pointer"
                >
                  <option value="">All Boroughs</option>
                  {allBoroughs.map((b) => (
                    <option key={b.borough} value={b.borough}>
                      {b.borough}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 text-sm font-semibold transition-colors"
                >
                  Search
                </button>
                {hasFilters && (
                  <a href="/browse" className="px-4 py-3 text-stone-300 bg-stone-700 rounded-lg hover:bg-stone-600 text-sm font-medium transition-colors text-center">
                    Clear
                  </a>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl px-5 sm:px-8 py-8 md:py-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <p className="text-sm text-stone-600">
              <span className="font-semibold text-stone-900">{dedupedGroups.length}</span> {dedupedGroups.length === 1 ? 'group' : 'groups'} found
              {sport && <span className="text-emerald-600"> · {sport}</span>}
              {borough && <span className="text-emerald-600"> · {borough}</span>}
            </p>
            <Link href="/submit" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
              + Add Your Group
            </Link>
          </div>

          {dedupedGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dedupedGroups.map((group) => (
                <div key={group.id} className="bg-white rounded-xl border border-stone-200 hover:border-emerald-300 hover:shadow-md card-hover transition-all overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-base font-semibold text-stone-900 line-clamp-1">
                        {group.name}
                      </h3>
                      <span className="flex-shrink-0 text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                        {sportEmojis[group.sport] || '🏅'} {group.sport}
                      </span>
                    </div>

                    <div className="space-y-1.5 mb-3 text-sm text-stone-500">
                      <p>📍 {group.venue}, {group.borough}</p>
                      <p>📊 {group.level}</p>
                    </div>

                    <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed mb-4">
                      {group.description}
                    </p>
                  </div>

                  <div className="px-5 py-3 bg-stone-50 border-t border-stone-100 flex gap-2">
                    <Link
                      href={`/groups/${group.id}`}
                      className="flex-1 px-3 py-2 text-center text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 text-sm font-medium transition-colors"
                    >
                      View Details
                    </Link>
                    {/* Was linking to sourceUrl (internal scrape-provenance field,
                        sometimes a Reddit thread/blog listicle) instead of contact
                        (the club's real site) — fixed 2026-07-27 NovaList audit.
                        Guard against non-URL contact values (email/WhatsApp on
                        pending user submissions) so we never render a broken link. */}
                    {group.contact && /^https?:\/\//i.test(group.contact) && (
                      <a
                        href={group.contact}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 text-stone-600 bg-white border border-stone-200 rounded-lg hover:bg-stone-50 text-sm font-medium transition-colors"
                      >
                        Website ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-1">No groups found</h3>
              <p className="text-stone-500 text-sm mb-6 max-w-sm mx-auto">
                We&apos;re still growing our directory. Try different filters or help us by adding a group you know about.
              </p>
              <div className="flex gap-3 justify-center">
                <a href="/browse" className="px-4 py-2.5 text-white bg-emerald-600 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors">
                  Browse All
                </a>
                <Link href="/submit" className="px-4 py-2.5 text-stone-700 bg-white border border-stone-200 rounded-lg text-sm font-semibold hover:bg-stone-50 transition-colors">
                  Add a Group
                </Link>
              </div>
            </div>
          )}

          {dedupedGroups.length > 0 && (
            <div className="mt-12 bg-emerald-600 rounded-xl p-6 md:p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Know a group that&apos;s not listed?</h3>
              <p className="text-emerald-100 text-sm mb-4">Help us grow the directory — it&apos;s free to add.</p>
              <Link href="/submit" className="inline-flex items-center gap-1.5 px-5 py-2.5 text-emerald-700 bg-white rounded-lg text-sm font-semibold hover:bg-emerald-50 transition-colors">
                Add a Group →
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
