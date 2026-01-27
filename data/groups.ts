import { SportType } from './sports';
import { BoroughType } from './boroughs';

export interface Group {
  id: string;
  sport: SportType;
  borough: BoroughType;
  name: string;
  venue: string;
  area: string;
  level: string;
  description: string;
  contact: string; // WhatsApp link or placeholder
  isVenue?: boolean; // True for padel/tennis/badminton venues
}

// Sample group data - 2-3 groups per sport-borough combination
export const GROUPS: Group[] = [
  // PADEL - Westminster (Master template)
  {
    id: 'padel-westminster-1',
    sport: 'padel',
    borough: 'westminster',
    name: 'Paddington Padel Club',
    venue: 'Paddington Recreation Ground',
    area: 'Paddington',
    level: 'All levels welcome',
    description: 'Premium indoor padel courts available for booking. Regular social sessions and tournaments.',
    contact: 'https://chat.whatsapp.com/placeholder',
    isVenue: true
  },
  {
    id: 'padel-westminster-2',
    sport: 'padel',
    borough: 'westminster',
    name: 'Victoria Padel & Social',
    venue: 'Westminster Sports Centre',
    area: 'Victoria',
    level: 'Beginners to Advanced',
    description: 'Weekly social padel sessions. Great for meeting new players and improving your game.',
    contact: 'https://chat.whatsapp.com/placeholder',
    isVenue: true
  },

  // FOOTBALL - Hackney
  {
    id: 'football-hackney-1',
    sport: 'football',
    borough: 'hackney',
    name: 'Hackney 5-a-side Fridays',
    venue: 'Hackney Downs Studios',
    area: 'Hackney Downs',
    level: 'Casual, all abilities',
    description: 'Friendly 5-a-side every Friday evening. Just turn up and play!',
    contact: 'https://chat.whatsapp.com/placeholder'
  },
  {
    id: 'football-hackney-2',
    sport: 'football',
    borough: 'hackney',
    name: 'Shoreditch Sunday League',
    venue: 'Shoreditch Park',
    area: 'Shoreditch',
    level: 'Intermediate',
    description: 'Competitive 7-a-side league on Sunday mornings. Looking for regular players.',
    contact: 'https://chat.whatsapp.com/placeholder'
  },

  // BASKETBALL - Hackney
  {
    id: 'basketball-hackney-1',
    sport: 'basketball',
    borough: 'hackney',
    name: 'Clissold Park Pickup',
    venue: 'Clissold Park Courts',
    area: 'Stoke Newington',
    level: 'Open to all',
    description: 'Outdoor pickup games every Saturday and Sunday morning. All skill levels welcome.',
    contact: 'https://chat.whatsapp.com/placeholder'
  },
  {
    id: 'basketball-hackney-2',
    sport: 'basketball',
    borough: 'hackney',
    name: 'Hackney Hoops Indoor',
    venue: 'Hackney Community College',
    area: 'Shoreditch',
    level: 'All levels',
    description: 'Indoor basketball sessions Wednesday evenings. Organized games and drills.',
    contact: 'https://chat.whatsapp.com/placeholder'
  },

  // TENNIS - Kensington & Chelsea
  {
    id: 'tennis-kensington-chelsea-1',
    sport: 'tennis',
    borough: 'kensington-chelsea',
    name: 'Holland Park Tennis Club',
    venue: 'Holland Park',
    area: 'Holland Park',
    level: 'Members & non-members',
    description: 'Premium tennis courts available for hire. Coaching and social sessions available.',
    contact: 'https://chat.whatsapp.com/placeholder',
    isVenue: true
  },
  {
    id: 'tennis-kensington-chelsea-2',
    sport: 'tennis',
    borough: 'kensington-chelsea',
    name: 'Chelsea Tennis Social',
    venue: 'Chelsea Sports Centre',
    area: 'Chelsea',
    level: 'Intermediate to Advanced',
    description: 'Weekly social tennis sessions. Meet new players and improve your game.',
    contact: 'https://chat.whatsapp.com/placeholder',
    isVenue: true
  },

  // BADMINTON - Camden
  {
    id: 'badminton-camden-1',
    sport: 'badminton',
    borough: 'camden',
    name: 'Camden Badminton Drop-in',
    venue: 'Camden Centre',
    area: 'King\'s Cross',
    level: 'All levels',
    description: 'Drop-in badminton sessions every Tuesday and Thursday evening. No booking required.',
    contact: 'https://chat.whatsapp.com/placeholder',
    isVenue: true
  },
  {
    id: 'badminton-camden-2',
    sport: 'badminton',
    borough: 'camden',
    name: 'Swiss Cottage Community Badminton',
    venue: 'Swiss Cottage Leisure Centre',
    area: 'Swiss Cottage',
    level: 'Beginners welcome',
    description: 'Friendly community badminton sessions on weekends. Equipment provided.',
    contact: 'https://chat.whatsapp.com/placeholder',
    isVenue: true
  },

  // RUNNING - Islington
  {
    id: 'running-islington-1',
    sport: 'running',
    borough: 'islington',
    name: 'Highbury Fields Runners',
    venue: 'Highbury Fields',
    area: 'Highbury',
    level: 'Beginner friendly',
    description: 'Social running group meeting every Wednesday at 6:30pm. All paces welcome, we run in groups.',
    contact: 'https://chat.whatsapp.com/placeholder'
  },
  {
    id: 'running-islington-2',
    sport: 'running',
    borough: 'islington',
    name: 'Angel Pace Group',
    venue: 'The Angel',
    area: 'Angel',
    level: '5-6 min/km pace',
    description: 'Pace-focused running group for those looking to improve speed. Tuesdays and Saturdays.',
    contact: 'https://chat.whatsapp.com/placeholder'
  },

  // PADEL - Lambeth
  {
    id: 'padel-lambeth-1',
    sport: 'padel',
    borough: 'lambeth',
    name: 'Clapham Padel Club',
    venue: 'Clapham Common',
    area: 'Clapham',
    level: 'All levels',
    description: 'New padel facility with 4 courts. Book online or join our regular social sessions.',
    contact: 'https://chat.whatsapp.com/placeholder',
    isVenue: true
  },

  // FOOTBALL - Westminster
  {
    id: 'football-westminster-1',
    sport: 'football',
    borough: 'westminster',
    name: 'Regent\'s Park 5-a-side',
    venue: 'Regent\'s Park',
    area: 'Regent\'s Park',
    level: 'All abilities',
    description: 'Casual 5-a-side games every weekday evening. Mixed ability, friendly atmosphere.',
    contact: 'https://chat.whatsapp.com/placeholder'
  },

  // Add more groups to ensure all sport-borough combinations have data
  // This is a sample - in production you'd have 2-3 per combination
];

export const getGroupsBySportAndBorough = (
  sport: SportType,
  borough: BoroughType
): Group[] => {
  return GROUPS.filter(
    (group) => group.sport === sport && group.borough === borough
  );
};

export const getAllSportBoroughCombinations = (): Array<{
  sport: SportType;
  borough: BoroughType;
}> => {
  const sports: SportType[] = ['football', 'basketball', 'tennis', 'badminton', 'running', 'padel'];
  const boroughs: BoroughType[] = [
    'hackney',
    'camden',
    'islington',
    'lambeth',
    'tower-hamlets',
    'westminster',
    'kensington-chelsea'
  ];

  const combinations: Array<{ sport: SportType; borough: BoroughType }> = [];

  sports.forEach((sport) => {
    boroughs.forEach((borough) => {
      combinations.push({ sport, borough });
    });
  });

  return combinations;
};
