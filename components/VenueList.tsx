import { Group } from '@/data/groups';
import GroupCard from './GroupCard';
import { SportType } from '@/data/sports';

interface VenueListProps {
  groups: Group[];
  sport: SportType;
}

export default function VenueList({ groups, sport }: VenueListProps) {
  // Separate groups from venues
  const activeGroups = groups.filter(g => !g.isVenue);
  const venues = groups.filter(g => g.isVenue);

  if (groups.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
        <p className="text-slate-600">
          No groups or venues listed yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Active Groups - People first! */}
      {activeGroups.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Active Groups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      )}

      {/* Venues & Clubs - Secondary */}
      {venues.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Venues & Clubs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {venues.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
