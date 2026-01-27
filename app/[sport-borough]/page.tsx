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

// Generate static params for all 42 sport-borough combinations
export async function generateStaticParams() {
  const combinations = getAllSportBoroughCombinations();

  return combinations.map((combo) => ({
    'sport-borough': `${combo.sport}-${combo.borough}`
  }));
}

// Generate SEO metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams['sport-borough'];
  const parsed = parseSlug(slug);

  if (!parsed) {
    return {
      title: 'Page Not Found'
    };
  }

  const sport = getSportByName(parsed.sport);
  const borough = getBoroughByName(parsed.borough);

  if (!sport || !borough) {
    return {
      title: 'Page Not Found'
    };
  }

  const title = `${sport.displayName} in ${borough.displayName} | London Sports Community`;
  const description = `Find ${sport.displayName.toLowerCase()} groups, clubs, and venues in ${borough.displayName}. ${sport.description}. Join your local sports community today.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website'
    }
  };
}

export default async function SportBoroughPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams['sport-borough'];
  const parsed = parseSlug(slug);

  // Handle invalid slugs
  if (!parsed) {
    notFound();
  }

  const sport = getSportByName(parsed.sport);
  const borough = getBoroughByName(parsed.borough);

  if (!sport || !borough) {
    notFound();
  }

  // Get sport-specific content and groups
  const content = getSportContent(parsed.sport);
  const groups = getGroupsBySportAndBorough(parsed.sport, parsed.borough);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Header with back link - optimized for mobile thumb zone */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors touch-manipulation min-h-[44px]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to all sports</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16">
        {/* Hero Section - Enhanced for mobile */}
        <div className="text-center mb-16">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
              📍 {formatBoroughName(parsed.borough)}
            </span>
            <span className="text-sm font-semibold text-green-700 bg-green-50 px-4 py-2 rounded-full border border-green-200">
              🟢 {groups.length} Active {groups.length === 1 ? 'Group' : 'Groups'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 px-4">
            {sport.displayName} <span className="text-blue-600">in London</span>
          </h1>
          <div className="flex justify-center">
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl px-4 text-center">
              {content.tagline}
            </p>
          </div>

          {/* Sport-specific emphasis tags */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {content.emphasis.map((item, idx) => (
              <span
                key={idx}
                className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full border border-blue-200"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Available Locations - Mobile optimized */}
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-sm font-semibold text-slate-700 mb-4">Switch location:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {BOROUGHS.map((borough) => (
                <Link
                  key={borough.id}
                  href={`/${sport.name}-${borough.name}`}
                  className={`px-5 py-3 rounded-lg text-sm font-medium transition-all touch-manipulation min-h-[44px] flex items-center ${
                    borough.name === parsed.borough
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-400 hover:shadow-md active:scale-95'
                  }`}
                >
                  {borough.displayName}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Primary CTA - Featured Group */}
        {groups.length > 0 && (
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 md:p-12 mb-16 text-center shadow-xl">
            <div className="inline-block mb-3 px-3 py-1 bg-white/20 rounded-full">
              <span className="text-xs font-bold text-white">FEATURED</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join {groups[0].name}
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              {groups[0].description}
            </p>
            <JoinButton
              contact={groups[0].contact}
              label={groups[0].isVenue ? 'Check Availability' : 'Join Now'}
              variant="secondary"
            />
          </div>
        )}

        {/* Groups/Venues List */}
        <div className="mb-16">
          <VenueList groups={groups} sport={parsed.sport} />
        </div>

        {/* Sport-specific conditional content */}
        {parsed.sport === 'running' && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 mb-8 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏃</span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  New to running?
                </h3>
                <p className="text-slate-700 text-base leading-relaxed">
                  All of our running groups welcome beginners! Look for groups labeled "beginner
                  friendly" or "all paces" to find the perfect fit. Most groups have leaders who
                  ensure no one gets left behind.
                </p>
              </div>
            </div>
          </div>
        )}

        {(parsed.sport === 'padel' || parsed.sport === 'tennis') && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 mb-8 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎾</span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Court Availability
                </h3>
                <p className="text-slate-700 text-base leading-relaxed">
                  Most venues offer both membership and pay-as-you-play options. Contact venues
                  directly for court availability, booking systems, and pricing. Many offer
                  off-peak discounts.
                </p>
              </div>
            </div>
          </div>
        )}

        {parsed.sport === 'badminton' && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 mb-8 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏸</span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Drop-in Sessions
                </h3>
                <p className="text-slate-700 text-base leading-relaxed">
                  Many community halls and leisure centres offer drop-in badminton sessions where
                  you can just turn up and play. Check session times directly with venues as they
                  may vary week to week.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* About Section - Collapsed for brevity */}
        <details className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
          <summary className="text-lg font-bold text-slate-900 cursor-pointer hover:text-blue-600 transition-colors">
            {content.aboutTitle}
          </summary>
          <p className="text-slate-700 mt-4 leading-relaxed">
            {content.aboutText}
          </p>
        </details>
      </main>

      <Footer />
    </div>
  );
}
