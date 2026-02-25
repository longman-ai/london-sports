import { Group } from '@/data/groups';
import GroupCard from './GroupCard';
import { SportType } from '@/data/sports';

interface VenueListProps {
  groups: Group[];
  sport: SportType;
}

export default function VenueList({ groups, sport }: VenueListProps) {
  const activeGroups = groups.filter(g => !g.isVenue);
  const venues = groups.filter(g => g.isVenue);

  if (groups.length === 0) {
    return (
      <div className="bg-white border border-stone-200 rounded-xl p-8 text-center">
        <span className="text-2xl block mb-3">🔍</span>
        <p className="text-sm text-stone-600 mb-1 font-medium">No groups listed here yet</p>
        <p className="text-xs text-stone-400">Know one? Help us grow the directory.</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {activeGroups.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-4">Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      )}

      {venues.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-stone-900 mb-4">Venues & Clubs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {venues.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
