import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { parseSlug, formatBoroughName } from '@/lib/utils';
import { getSportByName } from '@/data/sports';
import { getBoroughByName, BOROUGHS } from '@/data/boroughs';
import { getSportContent } from '@/data/content';
import { getGroupsBySportAndBorough, getAllSportBoroughCombinations } from '@/data/groups';
import VenueList from '@/components/VenueList';
import Footer from '@/components/Footer';
import JoinButton from '@/components/JoinButton';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ 'sport-borough': string }>;
}

export async function generateStaticParams() {
  const combinations = getAllSportBoroughCombinations();
  return combinations.map((combo) => ({
    'sport-borough': `${combo.sport}-${combo.borough}`
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams['sport-borough'];
  const parsed = parseSlug(slug);

  if (!parsed) return { title: 'Page Not Found' };

  const sport = getSportByName(parsed.sport);
  const borough = getBoroughByName(parsed.borough);

  if (!sport || !borough) return { title: 'Page Not Found' };

  const groups = getGroupsBySportAndBorough(parsed.sport, parsed.borough);
  const title = `${sport.displayName} in ${borough.displayName} | London Sports Community`;
  const description = groups.length > 0
    ? `Find ${groups.length} ${sport.displayName.toLowerCase()} ${groups.length === 1 ? 'group' : 'groups'} in ${borough.displayName}, London. Browse clubs, venues, and pickup games. Join a group this week — free directory.`
    : `Find ${sport.displayName.toLowerCase()} groups in ${borough.displayName}, London. Browse clubs, venues, and pickup games. Join a group this week — free directory.`;
  const url = `https://londonsportscommunity.co.uk/${parsed.sport}-${parsed.borough}`;

  return {
    title,
    description,
    openGraph: { title, description, type: 'website', url },
    twitter: { card: 'summary', title, description },
    alternates: { canonical: url },
  };
}

export default async function SportBoroughPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams['sport-borough'];
  const parsed = parseSlug(slug);

  if (!parsed) notFound();

  const sport = getSportByName(parsed.sport);
  const borough = getBoroughByName(parsed.borough);

  if (!sport || !borough) notFound();

  const content = getSportContent(parsed.sport);
  const groups = getGroupsBySportAndBorough(parsed.sport, parsed.borough);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${sport.displayName} in ${borough.displayName}`,
    description: `Find ${sport.displayName.toLowerCase()} groups in ${borough.displayName}, London.`,
    url: `https://londonsportscommunity.co.uk/${slug}`,
    mainEntity: groups.map((group) => ({
      '@type': 'SportsActivityLocation',
      name: group.name,
      sport: sport.displayName,
      description: group.description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: borough.displayName,
        addressRegion: 'London',
        addressCountry: 'GB',
      },
      ...(group.venue ? { location: { '@type': 'Place', name: group.venue } } : {}),
      ...(group.contact ? { url: group.contact } : {}),
    })),
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95 w-full flex justify-center">
        <div className="w-full max-w-6xl px-5 sm:px-8 py-3.5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All sports
          </Link>
          <Link href="/submit" className="text-sm font-medium text-stone-500 hover:text-stone-700 transition-colors">
            + Add group
          </Link>
        </div>
      </header>

      <main className="w-full flex justify-center">
        <div className="w-full max-w-6xl px-5 sm:px-8 py-10 md:py-14">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                📍 {formatBoroughName(parsed.borough)}
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {groups.length} {groups.length === 1 ? 'listing' : 'listings'}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-900 mb-3">
              {sport.displayName} in {borough.displayName}
            </h1>
            <p className="text-base text-stone-500 max-w-lg mx-auto mb-6">
              {content.tagline}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {content.emphasis.map((item, idx) => (
                <span key={idx} className="text-xs font-medium px-3 py-1.5 rounded-full bg-white text-stone-600 border border-stone-200">
                  {item}
                </span>
              ))}
            </div>

            {/* Borough switcher — grouped by area */}
            <div>
              <p className="text-xs font-medium text-stone-400 mb-3 uppercase tracking-wider">Other boroughs</p>
              {[
                { area: 'Central', boroughs: ['westminster', 'city-of-london', 'camden', 'islington', 'kensington-chelsea', 'southwark', 'lambeth'] },
                { area: 'East', boroughs: ['hackney', 'tower-hamlets', 'newham', 'waltham-forest', 'redbridge', 'barking-and-dagenham', 'havering'] },
                { area: 'South', boroughs: ['lewisham', 'greenwich', 'wandsworth', 'merton', 'croydon', 'bromley', 'sutton', 'bexley'] },
                { area: 'West', boroughs: ['hammersmith-and-fulham', 'ealing', 'hounslow', 'hillingdon', 'richmond-upon-thames', 'kingston-upon-thames'] },
                { area: 'North', boroughs: ['haringey', 'barnet', 'enfield', 'brent', 'harrow'] },
              ].map((group) => (
                <div key={group.area} className="mb-3">
                  <p className="text-xs font-semibold text-stone-400 mb-1.5">{group.area} London</p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {group.boroughs.map((bName) => {
                      const b = BOROUGHS.find((br) => br.name === bName);
                      if (!b) return null;
                      return (
                        <Link
                          key={b.id}
                          href={`/${sport.name}-${b.name}`}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            b.name === parsed.borough
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white text-stone-600 border border-stone-200 hover:border-emerald-300'
                          }`}
                        >
                          {b.displayName}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured group */}
          {groups.length > 0 && (
            <div className="bg-emerald-600 rounded-xl p-6 md:p-8 mb-12 text-center">
              <p className="text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-2">Featured</p>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{groups[0].name}</h2>
              <p className="text-emerald-100 text-sm mb-5 max-w-lg mx-auto">{groups[0].description}</p>
              <JoinButton
                contact={groups[0].contact}
                label={groups[0].isVenue ? 'Check Availability' : 'Join Now'}
                variant="secondary"
              />
            </div>
          )}

          {/* Groups list */}
          <div className="mb-12">
            <VenueList groups={groups} sport={parsed.sport} />
          </div>

          {/* Sport-specific tips */}
          {parsed.sport === 'running' && (
            <div className="bg-white border border-stone-200 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-xl">🏃</span>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900 mb-1">New to running?</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    All our running groups welcome beginners. Look for &quot;all paces&quot; groups — most have leaders who make sure nobody gets left behind.
                  </p>
                </div>
              </div>
            </div>
          )}

          {(parsed.sport === 'padel' || parsed.sport === 'tennis') && (
            <div className="bg-white border border-stone-200 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-xl">🎾</span>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900 mb-1">Court availability</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Most venues offer both membership and pay-as-you-play. Contact them directly for booking and pricing — many have off-peak discounts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {parsed.sport === 'badminton' && (
            <div className="bg-white border border-stone-200 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-xl">🏸</span>
                <div>
                  <h3 className="text-sm font-semibold text-stone-900 mb-1">Drop-in sessions</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Many community halls and leisure centres offer drop-in badminton — just turn up and play. Check times directly with venues.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* About */}
          <details className="bg-white border border-stone-200 rounded-xl p-5">
            <summary className="text-sm font-semibold text-stone-900 cursor-pointer hover:text-emerald-700 transition-colors">
              {content.aboutTitle}
            </summary>
            <p className="text-sm text-stone-600 mt-3 leading-relaxed">
              {content.aboutText}
            </p>
          </details>
        </div>
      </main>

      <Footer />
    </div>
  );
}
