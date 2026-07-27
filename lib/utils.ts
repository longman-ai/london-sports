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
    'hackney', 'camden', 'islington', 'lambeth', 'tower-hamlets', 'westminster',
    'kensington-chelsea', 'southwark', 'wandsworth', 'lewisham', 'greenwich',
    'newham', 'barnet', 'ealing', 'brent', 'enfield', 'haringey', 'waltham-forest',
    'redbridge', 'hounslow', 'hammersmith-and-fulham', 'merton', 'croydon', 'bromley',
    'barking-and-dagenham', 'sutton', 'harrow', 'hillingdon', 'havering',
    'richmond-upon-thames', 'kingston-upon-thames', 'bexley', 'city-of-london'
  ];

  // Try to match sport at the beginning
  const sportMatch = slug.match(/^(football|basketball|tennis|badminton|running|padel|cricket|rugby|cycling|swimming|yoga|climbing)-/);

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

/**
 * Maps a borough's canonical displayName (from data/boroughs.ts, e.g.
 * "Kensington & Chelsea") to the exact string stored in the Group.borough
 * column in Postgres (e.g. "Kensington and Chelsea").
 *
 * Found during the 2026-07-27 NovaList audit: the homepage linked to
 * `/browse?borough=Kensington %26 Chelsea` (URL-encoded ampersand) while the
 * database stores "Kensington and Chelsea" — an exact-match filter, so that
 * link silently returned zero results despite the borough having real
 * listings. Every place that builds a `/browse?borough=...` link should run
 * the borough displayName through this first.
 */
const DISPLAY_NAME_TO_DB_BOROUGH: Record<string, string> = {
  'Kensington & Chelsea': 'Kensington and Chelsea',
};

export const toDbBoroughName = (displayName: string): string => {
  return DISPLAY_NAME_TO_DB_BOROUGH[displayName] ?? displayName;
};
