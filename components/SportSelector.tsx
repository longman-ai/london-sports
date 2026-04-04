import Link from 'next/link';
import Image from 'next/image';
import { SPORTS } from '@/data/sports';
import { GROUPS } from '@/data/groups';

const sportImages: Record<string, string> = {
  football: '/images/sports/football.png',
  basketball: '/images/sports/basketball.png',
  tennis: '/images/sports/tennis.png',
  badminton: '/images/sports/badminton.png',
  running: '/images/sports/running.png',
  padel: '/images/sports/padel.png',
  cricket: '/images/sports/cricket.png',
  rugby: '/images/sports/rugby.png',
  cycling: '/images/sports/cycling.png',
  swimming: '/images/sports/swimming.png',
  yoga: '/images/sports/yoga.png',
  climbing: '/images/sports/climbing.png',
};

const sportSubtitles: Record<string, string> = {
  football: '5-a-side & casual',
  basketball: 'Pickup games',
  tennis: 'Courts & clubs',
  badminton: 'Drop-in sessions',
  running: 'All paces',
  padel: 'Book & play',
  cricket: 'Nets & leagues',
  rugby: 'Social & competitive',
  cycling: 'Group rides',
  swimming: 'Coached sessions',
  yoga: 'All styles',
  climbing: 'Bouldering & rope',
};

// Count groups per sport
const sportGroupCounts = GROUPS.reduce((acc, g) => {
  acc[g.sport] = (acc[g.sport] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

export default function SportSelector() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {SPORTS.map((sport) => {
        const count = sportGroupCounts[sport.id] || 0;
        return (
          <Link
            key={sport.id}
            href={`/browse?sport=${encodeURIComponent(sport.displayName)}`}
            className="group relative bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-emerald-400 hover:shadow-md card-hover"
          >
            {/* Sport Image */}
            <div className="relative h-28 sm:h-32 w-full overflow-hidden">
              <Image
                src={sportImages[sport.id]}
                alt={`${sport.displayName} in London`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <h3 className="absolute bottom-2 left-3 text-sm sm:text-base font-semibold text-white drop-shadow-sm">
                {sport.displayName}
              </h3>
            </div>

            {/* Info */}
            <div className="p-3 sm:p-4">
              <p className="text-xs text-stone-500">
                {sportSubtitles[sport.id]}
              </p>
              {count > 0 && (
                <p className="text-xs text-emerald-600 font-medium mt-1">
                  {count} {count === 1 ? 'group' : 'groups'}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
