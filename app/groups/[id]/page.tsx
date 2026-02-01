import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white w-full flex justify-center">
        <div className="w-full max-w-5xl px-6 sm:px-8 lg:px-12 py-8 md:py-12">
          {/* Breadcrumb */}
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Browse
          </Link>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{sportEmojis[group.sport] || '🏅'}</span>
                <span className="px-3 py-1 text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full">
                  {group.sport}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{group.name}</h1>
              <p className="text-slate-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  className="px-5 py-2.5 text-white bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-colors flex items-center gap-2"
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
        <div className="w-full max-w-5xl px-6 sm:px-8 lg:px-12 py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                About This Group
              </h2>
              <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">
                {group.description}
              </p>
            </div>

            {/* How to Join */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-xl shadow-blue-500/20 p-6 md:p-8 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </span>
                How to Join
              </h2>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <p className="text-blue-50 leading-relaxed">{group.contact}</p>
              </div>
              <p className="text-blue-200 text-sm mt-4">
                Contact the group directly using the information above to get started.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Location</div>
                    <div className="text-slate-900 font-medium">{group.venue}</div>
                    <div className="text-slate-600 text-sm">{group.area}, {group.borough}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Skill Level</div>
                    <div className="text-slate-900 font-medium">{group.level}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{sportEmojis[group.sport] || '🏅'}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Sport</div>
                    <div className="text-slate-900 font-medium">{group.sport}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Explore More</h3>
              <div className="space-y-3">
                <Link
                  href={`/browse?sport=${encodeURIComponent(group.sport)}`}
                  className="w-full px-4 py-3 text-center text-blue-600 bg-blue-50 border-2 border-blue-200 rounded-xl hover:bg-blue-100 hover:border-blue-300 font-semibold transition-all block"
                >
                  More {group.sport} Groups
                </Link>
                <Link
                  href={`/browse?borough=${encodeURIComponent(group.borough)}`}
                  className="w-full px-4 py-3 text-center text-slate-700 bg-slate-100 border-2 border-slate-200 rounded-xl hover:bg-slate-200 font-semibold transition-all block"
                >
                  Groups in {group.borough}
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Run a sports group?</h3>
              <p className="text-slate-300 text-sm mb-4">
                List your group for free and reach hundreds of players.
              </p>
              <Link
                href="/submit"
                className="w-full px-4 py-3 text-center text-slate-900 bg-white rounded-xl hover:bg-blue-50 font-semibold transition-all block"
              >
                Add Your Group
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
