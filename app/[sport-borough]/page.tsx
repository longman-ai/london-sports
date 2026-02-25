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

  const title = `${sport.displayName} in ${borough.displayName} | London Sports Community`;
  const description = `Find ${sport.displayName.toLowerCase()} groups, clubs, and venues in ${borough.displayName}. ${sport.description}. Join your local sports community today.`;

  return { title, description, openGraph: { title, description, type: 'website' } };
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

  return (
    <div className="min-h-screen bg-stone-50">
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

            {/* Borough switcher */}
            <div>
              <p className="text-xs font-medium text-stone-400 mb-3 uppercase tracking-wider">Other boroughs</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {BOROUGHS.map((b) => (
                  <Link
                    key={b.id}
                    href={`/${sport.name}-${b.name}`}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      b.name === parsed.borough
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-stone-600 border border-stone-200 hover:border-emerald-300'
                    }`}
                  >
                    {b.displayName}
                  </Link>
                ))}
              </div>
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
