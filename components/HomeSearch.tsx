'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const popularSearches = [
  { label: '⚽ Football in Hackney', sport: 'Football', borough: 'Hackney' },
  { label: '🎾 Padel in Westminster', sport: 'Padel', borough: 'Westminster' },
  { label: '🏃 Running in Islington', sport: 'Running', borough: 'Islington' },
  { label: '🧘 Yoga in Camden', sport: 'Yoga', borough: 'Camden' },
];

export default function HomeSearch() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/browse?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push('/browse');
    }
  };

  const handleQuickSearch = (sport: string, borough: string) => {
    router.push(`/browse?sport=${encodeURIComponent(sport)}&borough=${encodeURIComponent(borough)}`);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="relative mb-4">
        <div className="flex bg-white rounded-xl shadow-lg shadow-stone-900/5 border border-stone-200 overflow-hidden focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/20 transition-all">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search &quot;football near me&quot; or &quot;padel Hackney&quot;..."
              className="w-full pl-12 pr-4 py-4 text-stone-900 placeholder-stone-400 focus:outline-none text-base"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-4 bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors text-sm"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-2">
        {popularSearches.map((item) => (
          <button
            key={item.label}
            onClick={() => handleQuickSearch(item.sport, item.borough)}
            className="px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-full text-xs text-stone-600 hover:border-emerald-300 hover:text-emerald-700 transition-all"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
