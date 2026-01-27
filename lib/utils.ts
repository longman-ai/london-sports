import { SportType } from '@/data/sports';
import { BoroughType } from '@/data/boroughs';

/**
 * Generates a URL slug from sport and borough
 * Example: generateSlug('padel', 'westminster') => 'padel-westminster'
 */
export const generateSlug = (sport: SportType, borough: BoroughType): string => {
  return `${sport}-${borough}`;
};

/**
 * Parses a slug into sport and borough
 * Example: parseSlug('padel-westminster') => { sport: 'padel', borough: 'westminster' }
 */
export const parseSlug = (
  slug: string
): { sport: SportType; borough: BoroughType } | null => {
  // Handle multi-word boroughs like 'kensington-chelsea' and 'tower-hamlets'
  const validBoroughs = [
    'hackney',
    'camden',
    'islington',
    'lambeth',
    'tower-hamlets',
    'westminster',
    'kensington-chelsea'
  ];

  // Try to match sport at the beginning
  const sportMatch = slug.match(/^(football|basketball|tennis|badminton|running|padel)-/);

  if (!sportMatch) {
    return null;
  }

  const sport = sportMatch[1] as SportType;
  const borough = slug.substring(sport.length + 1) as BoroughType;

  // Validate borough
  if (!validBoroughs.includes(borough)) {
    return null;
  }

  return { sport, borough };
};

/**
 * Capitalizes first letter of a string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Formats a borough name for display
 * Example: 'kensington-chelsea' => 'Kensington & Chelsea'
 */
export const formatBoroughName = (borough: BoroughType): string => {
  if (borough === 'kensington-chelsea') {
    return 'Kensington & Chelsea';
  }
  if (borough === 'tower-hamlets') {
    return 'Tower Hamlets';
  }
  return capitalize(borough);
};

/**
 * Utility for conditional class names (like clsx)
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
