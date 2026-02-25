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
      className={`inline-flex items-center justify-center text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-200 ${
        isPrimary
          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
      }`}
    >
      {label}
    </a>
  );
}
