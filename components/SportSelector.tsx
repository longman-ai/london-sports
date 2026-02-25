import Link from 'next/link';
import { SPORTS } from '@/data/sports';
import { BOROUGHS } from '@/data/boroughs';

const sportIcons: Record<string, string> = {
  football: '⚽',
  basketball: '🏀',
  tennis: '🎾',
  badminton: '🏸',
  running: '🏃',
  padel: '🎾',
  cricket: '🏏',
  rugby: '🏉',
  cycling: '🚴',
  swimming: '🏊',
  yoga: '🧘',
  climbing: '🧗'
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
  climbing: 'Bouldering & rope'
};

export default function SportSelector() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {SPORTS.map((sport) => (
        <Link
          key={sport.id}
          href={`/${sport.name}-${BOROUGHS[0].name}`}
          className="group relative bg-white rounded-xl border border-stone-200 p-5 sm:p-6 hover:border-emerald-400 hover:shadow-md card-hover text-center"
        >
          <div className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-200">
            {sportIcons[sport.id]}
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-stone-900 group-hover:text-emerald-700 transition-colors">
            {sport.displayName}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {sportSubtitles[sport.id]}
          </p>
        </Link>
      ))}
    </div>
  );
}
