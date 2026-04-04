import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import type { Metadata } from "next"

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const group = await prisma.group.findUnique({ where: { id } })

  if (!group || group.status !== "APPROVED") {
    return { title: "Group Not Found | London Sports Community" }
  }

  const title = `${group.name} — ${group.sport} in ${group.borough} | London Sports Community`
  const description = `${group.description.slice(0, 155)}…`

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
  }
}

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

  // Find related groups (same sport, different group)
  const relatedGroups = await prisma.group.findMany({
    where: {
      status: "APPROVED",
      sport: group.sport,
      id: { not: group.id },
    },
    take: 3,
    orderBy: { updatedAt: "desc" },
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: group.name,
    sport: group.sport,
    description: group.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: group.borough,
      addressRegion: 'London',
      addressCountry: 'GB',
    },
    ...(group.venue ? { location: { '@type': 'Place', name: group.venue } } : {}),
    ...(group.sourceUrl ? { url: group.sourceUrl } : {}),
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Hero Section */}
      <div className="bg-stone-900 text-white w-full flex justify-center">
        <div className="w-full max-w-5xl px-5 sm:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-stone-400 mb-6">
            <Link href="/browse" className="hover:text-white transition-colors">Browse</Link>
            <span>›</span>
            <Link href={`/browse?sport=${encodeURIComponent(group.sport)}`} className="hover:text-white transition-colors">{group.sport}</Link>
            <span>›</span>
            <Link href={`/browse?borough=${encodeURIComponent(group.borough)}`} className="hover:text-white transition-colors">{group.borough}</Link>
          </nav>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{sportEmojis[group.sport] || '🏅'}</span>
                <span className="px-3 py-1 text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                  {group.sport}
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-stone-700 text-stone-300 rounded-full">
                  {group.level}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{group.name}</h1>
              <p className="text-stone-400 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {group.venue}, {group.borough}
              </p>
            </div>
            <div className="flex gap-3">
              {group.sourceUrl && (
                <a
                  href={group.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-white bg-emerald-600 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
                >
                  Visit Website
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-5xl px-5 sm:px-8 py-10 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <div className="bg-white rounded-xl border border-stone-200 p-6 md:p-8">
                <h2 className="text-lg font-bold text-stone-900 mb-4">About This Group</h2>
                <p className="text-stone-600 whitespace-pre-wrap leading-relaxed">
                  {group.description}
                </p>
              </div>

              {/* How to Join */}
              <div className="bg-emerald-600 rounded-xl p-6 md:p-8 text-white">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  How to Join
                </h2>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <p className="text-emerald-50 leading-relaxed break-all">{group.contact}</p>
                </div>
                <p className="text-emerald-200 text-sm mt-3">
                  Contact the group directly using the information above to get started.
                </p>
              </div>

              {/* Related Groups */}
              {relatedGroups.length > 0 && (
                <div>
                  <h2 className="text-lg font-bold text-stone-900 mb-4">More {group.sport} Groups</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {relatedGroups.map((related) => (
                      <Link
                        key={related.id}
                        href={`/groups/${related.id}`}
                        className="bg-white rounded-xl border border-stone-200 p-4 hover:border-emerald-300 hover:shadow-md transition-all"
                      >
                        <p className="text-sm font-semibold text-stone-900 line-clamp-1">{related.name}</p>
                        <p className="text-xs text-stone-500 mt-1">📍 {related.borough}</p>
                        <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 mt-2">
                          {related.level}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-xl border border-stone-200 p-6">
                <h3 className="text-sm font-bold text-stone-900 mb-4 uppercase tracking-wider">Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">Location</p>
                      <p className="text-sm font-medium text-stone-900">{group.venue}</p>
                      <p className="text-xs text-stone-500">{group.area}, {group.borough}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">Skill Level</p>
                      <p className="text-sm font-medium text-stone-900">{group.level}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-base">{sportEmojis[group.sport] || '🏅'}</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">Sport</p>
                      <p className="text-sm font-medium text-stone-900">{group.sport}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explore */}
              <div className="bg-white rounded-xl border border-stone-200 p-6">
                <h3 className="text-sm font-bold text-stone-900 mb-4 uppercase tracking-wider">Explore More</h3>
                <div className="space-y-2">
                  <Link
                    href={`/browse?sport=${encodeURIComponent(group.sport)}`}
                    className="w-full px-4 py-3 text-center text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 font-medium text-sm transition-all block"
                  >
                    More {group.sport} Groups
                  </Link>
                  <Link
                    href={`/browse?borough=${encodeURIComponent(group.borough)}`}
                    className="w-full px-4 py-3 text-center text-stone-700 bg-stone-50 border border-stone-200 rounded-lg hover:bg-stone-100 font-medium text-sm transition-all block"
                  >
                    Groups in {group.borough}
                  </Link>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-stone-900 rounded-xl p-6 text-white">
                <h3 className="text-base font-bold mb-2">Run a sports group?</h3>
                <p className="text-stone-400 text-sm mb-4">
                  List your group for free and reach hundreds of players.
                </p>
                <Link
                  href="/submit"
                  className="w-full px-4 py-3 text-center text-stone-900 bg-white rounded-lg hover:bg-emerald-50 font-semibold text-sm transition-all block"
                >
                  Add Your Group — Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
