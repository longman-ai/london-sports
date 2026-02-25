import { Group } from '@/data/groups';
import JoinButton from './JoinButton';

interface GroupCardProps {
  group: Group;
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 hover:border-emerald-300 hover:shadow-md card-hover transition-all">
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-semibold text-stone-900 mb-1">
            {group.name}
          </h3>
          <p className="text-sm text-stone-500">
            📍 {group.venue} · {group.area}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {group.level}
          </span>
          {group.isVenue && (
            <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
              Venue
            </span>
          )}
        </div>

        <p className="text-sm text-stone-600 leading-relaxed line-clamp-2">
          {group.description}
        </p>

        <div className="flex gap-2 pt-1">
          <JoinButton
            contact={group.contact}
            label={group.isVenue ? 'Check Availability' : 'Join Group'}
          />
          <JoinButton
            contact={group.sourceUrl}
            label="More Info"
            variant="secondary"
          />
        </div>
      </div>
    </div>
  );
}
