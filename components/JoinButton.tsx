interface JoinButtonProps {
  contact: string;
  label?: string;
  variant?: 'primary' | 'secondary';
}

export default function JoinButton({ contact, label = 'Join Group', variant = 'primary' }: JoinButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <a
      href={contact}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center font-semibold px-6 py-3 rounded-lg transition-all duration-200 min-w-[140px] text-center touch-manipulation ${
        isPrimary
          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
          : 'bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 hover:border-blue-400'
      }`}
      style={{ minHeight: '44px', minWidth: '44px' }}
    >
      {label}
    </a>
  );
}
