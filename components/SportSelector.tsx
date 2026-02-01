import Link from 'next/link';
import { SPORTS } from '@/data/sports';
import { BOROUGHS } from '@/data/boroughs';

const sportIcons: Record<string, string> = {
  football: '⚽',
  basketball: '🏀',
  tennis: '🎾',
  badminton: '🏸',
  running: '🏃',
  padel: '🎾'
};

const sportCaptions: Record<string, string> = {
  football: 'Most popular',
  basketball: 'Indoor & outdoor',
  tennis: 'Premium courts',
  badminton: 'Easy drop-in',
  running: 'Beginner friendly',
  padel: 'Fastest growing'
};

const sportStatus: Record<string, { label: string; color: string }> = {
  football: { label: '🟢 Active groups', color: 'bg-green-50 text-green-700 border-green-200' },
  basketball: { label: '🟢 Active groups', color: 'bg-green-50 text-green-700 border-green-200' },
  tennis: { label: '🔥 Popular this week', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  badminton: { label: '🟢 Active groups', color: 'bg-green-50 text-green-700 border-green-200' },
  running: { label: '🔥 Popular this week', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  padel: { label: '🔥 Popular this week', color: 'bg-orange-50 text-orange-700 border-orange-200' }
};

const sportAction: Record<string, string> = {
  football: 'Games this week',
  basketball: 'Join today',
  tennis: 'Courts available',
  badminton: 'Join today',
  running: 'Groups starting soon',
  padel: 'Book now'
};

export default function SportSelector() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {SPORTS.map((sport) => (
          <Link
            key={sport.id}
            href={`/${sport.name}-${BOROUGHS[0].name}`}
            className="group relative bg-white rounded-xl border-2 border-slate-200 p-8 hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 min-h-[200px] flex flex-col justify-center items-center text-center"
          >
            {/* Status Tag */}
            <div className="absolute top-3 left-3">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${sportStatus[sport.id].color}`}>
                {sportStatus[sport.id].label}
              </span>
            </div>

            {/* Sport Icon */}
            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {sportIcons[sport.id]}
            </div>

            {/* Sport Name */}
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {sport.displayName}
            </h3>

            {/* Caption */}
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2">
              {sportCaptions[sport.id]}
            </span>

            {/* Action Text */}
            <p className="text-xs text-slate-500 font-medium mt-1">
              {sportAction[sport.id]}
            </p>

            {/* Hover indicator */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
