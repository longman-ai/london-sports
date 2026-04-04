import SportSelector from '@/components/SportSelector';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HomeSearch from '@/components/HomeSearch';
import Link from 'next/link';
import { GROUPS } from '@/data/groups';
import { SPORTS } from '@/data/sports';
import { BOROUGHS } from '@/data/boroughs';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'London Sports Community',
  url: 'https://londonsportscommunity.co.uk',
  description: 'Find local sports groups across London. Football, tennis, padel, running, and more across all 33 boroughs.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://londonsportscommunity.co.uk/browse?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

// Compute real stats
const totalGroups = GROUPS.length;
const totalSports = SPORTS.length;
const totalBoroughs = BOROUGHS.length;

// Get unique boroughs that have groups
const activeBoroughs = [...new Set(GROUPS.map(g => g.borough))];

// Popular boroughs with group counts
const boroughCounts = GROUPS.reduce((acc, g) => {
  acc[g.borough] = (acc[g.borough] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const topBoroughs = Object.entries(boroughCounts)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 8)
  .map(([borough, count]) => {
    const b = BOROUGHS.find(br => br.name === borough);
    return { name: borough, displayName: b?.displayName || borough, count, zone: b?.zone || '' };
  });

export default function Home() {
  const featuredGroups = GROUPS.slice(0, 6);

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header transparent />

      <main className="w-full flex flex-col items-center">
        {/* Hero */}
        <section className="relative w-full flex justify-center bg-gradient-to-b from-stone-50 to-white">
          <div className="w-full max-w-6xl px-5 sm:px-8 pt-16 md:pt-24 pb-16">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700">
                  {totalGroups}+ groups across {totalBoroughs} boroughs
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-[1.1] text-stone-900 tracking-tight">
                Find people to
                <br />
                <span className="text-emerald-600">play sport with</span>
                <br />
                in London
              </h1>

              <p className="text-lg text-stone-500 max-w-lg mx-auto leading-relaxed mb-10">
                The free directory for London&apos;s sports communities. Search by sport, borough, or group name — no sign-up needed.
              </p>

              {/* Search Bar */}
              <HomeSearch />
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="w-full flex justify-center bg-white border-y border-stone-200">
          <div className="w-full max-w-6xl px-5 sm:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-emerald-600">{totalGroups}+</p>
                <p className="text-xs text-stone-500 font-medium mt-1">Active Groups</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-emerald-600">{totalSports}</p>
                <p className="text-xs text-stone-500 font-medium mt-1">Sports</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-emerald-600">{totalBoroughs}</p>
                <p className="text-xs text-stone-500 font-medium mt-1">London Boroughs</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-emerald-600">100%</p>
                <p className="text-xs text-stone-500 font-medium mt-1">Free to Use</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sports Grid */}
        <section className="py-16 md:py-20 w-full flex justify-center">
          <div className="w-full max-w-6xl px-5 sm:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                What do you want to play?
              </h2>
              <p className="text-stone-500">
                {totalSports} sports across all {totalBoroughs} London boroughs — pick one and find a group this week
              </p>
            </div>
            <SportSelector />
          </div>
        </section>

        {/* Popular Boroughs */}
        <section className="py-16 md:py-20 bg-white border-y border-stone-200 w-full flex justify-center">
          <div className="w-full max-w-6xl px-5 sm:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                Popular boroughs
              </h2>
              <p className="text-stone-500">
                Where Londoners are finding groups right now
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {topBoroughs.map((borough) => (
                <Link
                  key={borough.name}
                  href={`/browse?borough=${encodeURIComponent(borough.displayName)}`}
                  className="group bg-stone-50 rounded-xl border border-stone-200 p-5 hover:border-emerald-400 hover:bg-emerald-50/50 card-hover text-center transition-all"
                >
                  <p className="text-sm font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {borough.displayName}
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    {borough.count} {borough.count === 1 ? 'group' : 'groups'} · {borough.zone}
                  </p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/browse" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                Browse all boroughs →
              </Link>
            </div>
          </div>
        </section>

        {/* Recently Listed */}
        <section className="py-16 md:py-20 w-full flex justify-center">
          <div className="w-full max-w-6xl px-5 sm:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                Recently listed
              </h2>
              <p className="text-stone-500">
                New groups and venues added recently
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredGroups.map((group) => (
                <Link
                  key={group.id}
                  href={`/browse?sport=${encodeURIComponent(group.sport.charAt(0).toUpperCase() + group.sport.slice(1))}`}
                  className="bg-white rounded-xl border border-stone-200 p-5 hover:border-emerald-300 hover:shadow-md card-hover transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-semibold text-stone-900 line-clamp-1">{group.name}</p>
                    {group.isVenue && (
                      <span className="flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                        Venue
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 mb-2">📍 {group.venue} · {group.area}</p>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">{group.description}</p>
                  <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {group.level}
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/browse" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                View all {totalGroups}+ groups →
              </Link>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 md:py-20 bg-stone-900 text-white w-full flex justify-center">
          <div className="w-full max-w-6xl px-5 sm:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                How it works
              </h2>
              <p className="text-stone-400">Three steps, no sign-up required</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Search or browse', desc: 'Type a sport, pick a borough, or just browse — we\'ll show you what\'s near you.', icon: '🔍' },
                { step: '02', title: 'Find your group', desc: 'Every listing has location, skill level, and direct contact info.', icon: '📍' },
                { step: '03', title: 'Get playing', desc: 'Contact the group directly and start playing this week. No middleman.', icon: '🤝' },
              ].map((item) => (
                <div key={item.step} className="bg-stone-800/50 rounded-xl p-6 border border-stone-700/50">
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <div className="text-emerald-400 text-xs font-bold mb-1.5 tracking-wider">STEP {item.step}</div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest from the Blog */}
        <section className="py-16 md:py-20 bg-stone-50 w-full flex justify-center">
          <div className="w-full max-w-6xl px-5 sm:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                Latest from the blog
              </h2>
              <p className="text-stone-500">
                Guides, tips, and the latest on London&apos;s sports scene
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Best Padel Courts in London — 2026 Guide', slug: 'best-padel-courts-london', tag: 'Padel' },
                { title: 'Best Running Clubs in London for Beginners', slug: 'best-running-clubs-london-beginners', tag: 'Running' },
                { title: 'How to Find Local Sports Groups in Your Borough', slug: 'find-local-sports-groups-london-borough', tag: 'Guide' },
              ].map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-xl border border-stone-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all group"
                >
                  <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 mb-3">
                    {post.tag}
                  </span>
                  <h3 className="font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/blog" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                Read all articles →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA for group owners */}
        <section className="py-16 md:py-20 w-full flex justify-center">
          <div className="w-full max-w-3xl px-5 sm:px-8 text-center">
            <div className="bg-emerald-600 rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Run a sports group in London?
              </h2>
              <p className="text-emerald-100 mb-6 max-w-md mx-auto">
                Get your group discovered by hundreds of Londoners looking to play. Listing is free and takes 2 minutes.
              </p>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-7 py-4 text-emerald-700 bg-white rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-colors shadow-lg"
              >
                List Your Group Now — Free
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
