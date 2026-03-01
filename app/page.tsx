import SportSelector from '@/components/SportSelector';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import { GROUPS } from '@/data/groups';

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

export default function Home() {
  // Show a few groups as "recently listed"
  const featuredGroups = GROUPS.slice(0, 4);

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header transparent />

      <main className="w-full flex flex-col items-center">
        {/* Hero */}
        <section className="relative w-full flex justify-center">
          <div className="w-full max-w-6xl px-5 sm:px-8 pt-16 md:pt-24 pb-20">
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-emerald-700">
                  Now live — and growing every week
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-[1.1] text-stone-900 tracking-tight">
                Find people to
                <br />
                <span className="text-emerald-600">play sport with</span>
                <br />
                in London
              </h1>

              <p className="text-lg text-stone-500 max-w-lg mx-auto leading-relaxed mb-8">
                Browse 150+ local sports groups across all 33 London boroughs — from five-a-side to padel, running clubs to yoga. Free to use, no sign-up needed.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/browse"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 text-white bg-emerald-600 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
                >
                  Find Groups Near You
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/submit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 text-emerald-700 bg-emerald-50 border-2 border-emerald-200 rounded-xl font-semibold text-lg hover:border-emerald-400 hover:bg-emerald-100 transition-all"
                >
                  List Your Group — Free
                </Link>
              </div>
            </div>

            {/* Quick links */}
            <div className="mt-14">
              <p className="text-xs font-semibold text-stone-400 text-center mb-4 uppercase tracking-wider">
                Jump straight in
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { emoji: '🎾', text: 'Padel in Westminster', href: '/padel-westminster' },
                  { emoji: '🏃', text: 'Running in Islington', href: '/running-islington' },
                  { emoji: '⚽', text: 'Football in Hackney', href: '/football-hackney' },
                  { emoji: '🎾', text: 'Tennis in Kensington', href: '/tennis-kensington-chelsea' },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2.5 bg-white border border-stone-200 rounded-full text-sm text-stone-600 hover:border-emerald-300 hover:text-emerald-700 transition-all"
                  >
                    <span className="mr-1.5">{item.emoji}</span>
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sports Grid */}
        <section className="py-16 md:py-20 bg-white border-y border-stone-200 w-full flex justify-center">
          <div className="w-full max-w-6xl px-5 sm:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
                What do you want to play?
              </h2>
              <p className="text-stone-500">
                12 sports across every London borough — pick one and start exploring
              </p>
            </div>
            <SportSelector />
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
                Groups and venues added to the directory
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredGroups.map((group) => (
                <Link
                  key={group.id}
                  href={`/${group.sport}-${group.borough}`}
                  className="bg-white rounded-xl border border-stone-200 p-5 hover:border-emerald-300 hover:shadow-md card-hover transition-all"
                >
                  <p className="text-sm font-semibold text-stone-900 mb-1">{group.name}</p>
                  <p className="text-xs text-stone-500 mb-2">📍 {group.venue} · {group.area}</p>
                  <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {group.level}
                  </span>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/browse" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                View all groups →
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
                { step: '01', title: 'Pick a sport', desc: 'Choose from 12 sports — football, padel, running, and more.', icon: '🎯' },
                { step: '02', title: 'Find your area', desc: 'Filter by borough to find groups near you.', icon: '📍' },
                { step: '03', title: 'Get in touch', desc: 'Contact the group directly and start playing this week.', icon: '🤝' },
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
                { title: 'The Best Padel Courts in London: 2026 Guide', slug: 'best-padel-courts-london-2026', tag: 'Padel' },
                { title: 'Why Padel Is Taking Over London', slug: 'why-padel-taking-over-london', tag: 'Padel' },
                { title: 'How to Find a Sports Group in London', slug: 'how-to-find-sports-group-london', tag: 'Guide' },
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
