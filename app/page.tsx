import SportSelector from '@/components/SportSelector';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-50 overflow-x-hidden w-full">
      <Header transparent />

      <main className="w-full flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative overflow-hidden w-full flex justify-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
          </div>

          <div className="w-full max-w-7xl px-6 sm:px-8 lg:px-12 pt-12 md:pt-20 pb-16">
            <div className="text-center mb-16">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-100/80 backdrop-blur-sm rounded-full border border-blue-200/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-sm font-semibold text-blue-700">
                  500+ active players this week
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-slate-900 tracking-tight">
                Find Your Sport
                <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  in London
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-4 text-balance">
                Join local sports groups and communities. From football to padel, connect with players near you.
              </p>
              <p className="text-sm text-slate-500">
                100+ groups across 7 boroughs • No sign-up required
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Link
                  href="/browse"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl font-semibold text-lg shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-700 hover:to-blue-800 transition-all active:scale-95"
                >
                  Browse All Groups
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-slate-700 bg-white border-2 border-slate-200 rounded-2xl font-semibold text-lg hover:border-blue-300 hover:bg-blue-50 transition-all active:scale-95"
                >
                  Add Your Group
                </Link>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mb-20 w-full">
              <p className="text-sm font-semibold text-slate-500 text-center mb-5 uppercase tracking-wide">
                Popular this week
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { emoji: '🎾', text: 'Padel in Westminster', href: '/padel-westminster' },
                  { emoji: '🏃', text: 'Running in Camden', href: '/running-camden' },
                  { emoji: '⚽', text: 'Football in Hackney', href: '/football-hackney' },
                  { emoji: '🎾', text: 'Tennis in Kensington', href: '/tennis-kensington-chelsea' },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group px-5 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200/80 rounded-full text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/10 active:scale-95 transition-all duration-200"
                  >
                    <span className="mr-2">{item.emoji}</span>
                    {item.text}
                    <svg className="inline w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sports Grid Section */}
        <section className="py-16 md:py-24 bg-white border-y border-slate-200 w-full flex justify-center">
          <div className="w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                What do you feel like playing?
              </h2>
              <p className="text-lg text-slate-600">
                Choose a sport to find groups and venues in your area
              </p>
            </div>
            <SportSelector />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 md:py-28 w-full flex justify-center">
          <div className="w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { value: '6', label: 'Sports', icon: '🏆' },
                { value: '7', label: 'Boroughs', icon: '📍' },
                { value: '100+', label: 'Active Groups', icon: '👥' },
                { value: '500+', label: 'Weekly Players', icon: '🏃' },
              ].map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white w-full flex justify-center">
          <div className="w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How it works
              </h2>
              <p className="text-lg text-slate-300">
                Getting started is simple
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  step: '01',
                  title: 'Choose your sport',
                  description: 'Browse through football, tennis, padel, running and more.',
                  icon: '🎯',
                },
                {
                  step: '02',
                  title: 'Find a group nearby',
                  description: 'Filter by borough to find groups that match your location.',
                  icon: '📍',
                },
                {
                  step: '03',
                  title: 'Join and play',
                  description: 'Contact the group directly and start playing this week.',
                  icon: '🚀',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-colors group"
                >
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-blue-400 font-bold text-sm mb-2 tracking-wide">
                    STEP {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 px-8 py-4 text-slate-900 bg-white rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-all active:scale-95"
              >
                Start Exploring
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 w-full flex justify-center">
          <div className="w-full max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 md:p-16 shadow-2xl shadow-blue-500/25">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Run a sports group?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto text-balance">
                Add your group to our directory for free and reach hundreds of players looking to join.
              </p>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-8 py-4 text-blue-700 bg-white rounded-2xl font-semibold text-lg hover:bg-blue-50 transition-all active:scale-95 shadow-xl"
              >
                Add Your Group — It's Free
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
