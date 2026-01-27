import { Group } from '@/data/groups';
import JoinButton from './JoinButton';

interface GroupCardProps {
  group: Group;
}

export default function GroupCard({ group }: GroupCardProps) {
  const buttonLabel = group.isVenue ? 'Check Availability' : 'Join Group';

  return (
    <div className="group bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-blue-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
            {group.name}
          </h3>
          <p className="text-sm text-slate-600 font-medium">
            📍 {group.venue} • {group.area}
          </p>
        </div>

        <div>
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200">
            {group.level}
          </span>
        </div>

        <p className="text-slate-700 text-sm leading-relaxed">
          {group.description}
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <JoinButton
            contact={group.contact}
            label={buttonLabel}
          />
          <JoinButton
            contact={group.sourceUrl}
            label="Learn More"
            variant="secondary"
          />
        </div>
      </div>
    </div>
  );
}
