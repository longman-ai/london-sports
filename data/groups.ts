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
  contact: string; // Website, booking page, or social link
  sourceUrl: string; // Original page where info was found
  isVenue?: boolean; // True for padel/tennis/badminton venues
}

// Real group data - verified London sports groups and venues
export const GROUPS: Group[] = [
  // PADEL - Westminster
  {
    id: 'padel-westminster-1',
    sport: 'padel',
    borough: 'westminster',
    name: 'Regent\'s Park Padel Courts',
    venue: 'The Regent\'s Park (Park Sports)',
    area: 'Regent\'s Park',
    level: 'All levels welcome',
    description: 'Two floodlit outdoor padel courts in the heart of Regent\'s Park. Book up to 7 days in advance via Park Sports. Rental rackets available.',
    contact: 'https://parksports.co.uk/activities/pay-and-play-padel/regents-park',
    sourceUrl: 'https://parksports.co.uk/activities/pay-and-play-padel/regents-park',
    isVenue: true
  },
  {
    id: 'padel-westminster-2',
    sport: 'padel',
    borough: 'westminster',
    name: 'Padel Social Club',
    venue: 'Padel Social Club',
    area: 'Central London',
    level: 'Beginners to Advanced',
    description: 'Stylishly designed padel club with best-in-class courts and facilities. Social sessions and coaching available for all levels.',
    contact: 'https://padelsocial.club/',
    sourceUrl: 'https://padelsocial.club/',
    isVenue: true
  },

  // FOOTBALL - Hackney
  {
    id: 'football-hackney-1',
    sport: 'football',
    borough: 'hackney',
    name: 'FC Urban Haggerston',
    venue: 'Haggerston Park',
    area: 'Haggerston',
    level: 'Casual, all abilities',
    description: 'Organised 5-a-side and 7-a-side social football games in Hackney. Book individual spots online — no need to organise a full team.',
    contact: 'https://www.fcurban.com/london',
    sourceUrl: 'https://www.fcurban.com/blog/play-5-a-side-and-7-a-side-football-at-haggerston-join-social-football-in-hackney'
  },
  {
    id: 'football-hackney-2',
    sport: 'football',
    borough: 'hackney',
    name: 'Powerleague Shoreditch',
    venue: 'Powerleague Shoreditch',
    area: 'Shoreditch',
    level: 'All levels',
    description: 'Indoor and outdoor 5-a-side football pitches with floodlights. Pay-as-you-play booking system, open all year round.',
    contact: 'https://www.playfinder.com/london/venue/powerleague-shoreditch',
    sourceUrl: 'https://www.playfinder.com/london/venue/powerleague-shoreditch'
  },

  // BASKETBALL - Hackney
  {
    id: 'basketball-hackney-1',
    sport: 'basketball',
    borough: 'hackney',
    name: 'GO Mammoth Basketball Hackney',
    venue: 'Hackney Downs',
    area: 'Hackney Downs',
    level: 'Open to all',
    description: 'Social basketball leagues in Hackney with GO Mammoth. Great sports hall with refs and organised games in East London.',
    contact: 'https://www.gomammoth.co.uk/basketball/hackney-downs/',
    sourceUrl: 'https://www.gomammoth.co.uk/basketball/hackney-downs/'
  },
  {
    id: 'basketball-hackney-2',
    sport: 'basketball',
    borough: 'hackney',
    name: 'Kings Hall Basketball',
    venue: 'Kings Hall Leisure Centre',
    area: 'Hackney',
    level: 'All levels',
    description: 'Indoor basketball court within Kings Hall Leisure Centre sports hall. Book in advance through Better leisure.',
    contact: 'https://www.better.org.uk/leisure-centre/london/hackney/kings-hall-leisure-centre/33d8f473-2756-472b-9708-4d07a188a744',
    sourceUrl: 'https://www.better.org.uk/leisure-centre/london/hackney/basketball'
  },

  // TENNIS - Kensington & Chelsea
  {
    id: 'tennis-kensington-chelsea-1',
    sport: 'tennis',
    borough: 'kensington-chelsea',
    name: 'Holland Park Lawn Tennis Club',
    venue: 'Holland Park',
    area: 'Holland Park',
    level: 'Members & guests',
    description: 'Friendly, relaxed tennis club combining social and competitive tennis. Floodlit courts available until 9:30pm. Doubles play takes priority during busy periods.',
    contact: 'https://hollandparkltc.co.uk/',
    sourceUrl: 'https://hollandparkltc.co.uk/',
    isVenue: true
  },
  {
    id: 'tennis-kensington-chelsea-2',
    sport: 'tennis',
    borough: 'kensington-chelsea',
    name: 'Holland Park Public Tennis Courts',
    venue: 'Holland Park',
    area: 'Kensington',
    level: 'All levels',
    description: 'Public tennis courts bookable online via ClubSpark. Floodlit courts available in the evening. Contact the Sports Office for enquiries.',
    contact: 'https://clubspark.lta.org.uk/hollandpark2',
    sourceUrl: 'https://www.rbkc.gov.uk/parks-leisure-and-culture/sports-and-leisure/sports-facilities-parks',
    isVenue: true
  },

  // BADMINTON - Camden
  {
    id: 'badminton-camden-1',
    sport: 'badminton',
    borough: 'camden',
    name: 'Camden Community Badminton Club',
    venue: 'Church Street Community Leisure Centre',
    area: 'Church Street',
    level: 'Intermediate+',
    description: 'Community badminton group playing every Monday from 7pm-10pm. Recruiting players for league matches.',
    contact: 'https://www.meetup.com/camden-community-badminton-club/',
    sourceUrl: 'https://www.meetup.com/camden-community-badminton-club/',
    isVenue: true
  },
  {
    id: 'badminton-camden-2',
    sport: 'badminton',
    borough: 'camden',
    name: 'Swiss Cottage Leisure Centre Badminton',
    venue: 'Swiss Cottage Leisure Centre',
    area: 'Swiss Cottage',
    level: 'All levels welcome',
    description: 'Badminton sessions at Swiss Cottage Leisure Centre run by Better. Equipment provided. Great way to socialise and improve your skills.',
    contact: 'https://www.better.org.uk/leisure-centre/london/camden/swiss-cottage-leisure-centre/5d56b2dc-623c-44ed-a7f8-7a5bebd12261',
    sourceUrl: 'https://www.better.org.uk/leisure-centre/london/camden/swiss-cottage-leisure-centre/5d56b2dc-623c-44ed-a7f8-7a5bebd12261',
    isVenue: true
  },

  // RUNNING - Islington
  {
    id: 'running-islington-1',
    sport: 'running',
    borough: 'islington',
    name: 'Islington Running and Social Group',
    venue: 'The Horatia pub',
    area: 'Highbury',
    level: 'Beginner friendly',
    description: 'Free weekly run and social — a great way to meet new people! Meet at 7pm outside The Horatia and run to Highbury Fields together. All paces welcome.',
    contact: 'https://www.meetup.com/islington-running-and-social/',
    sourceUrl: 'https://www.meetup.com/islington-running-and-social/'
  },
  {
    id: 'running-islington-2',
    sport: 'running',
    borough: 'islington',
    name: 'GoodGym Islington',
    venue: 'Arsenal Community Hub',
    area: 'Islington',
    level: 'All levels',
    description: 'Weekly group runs from Arsenal Community Hub every Monday. Combine running with helping local community projects, all within 90 minutes.',
    contact: 'https://www.goodgym.org/areas/islington/group-runs',
    sourceUrl: 'https://www.goodgym.org/areas/islington/group-runs'
  },

  // PADEL - Lambeth
  {
    id: 'padel-lambeth-1',
    sport: 'padel',
    borough: 'lambeth',
    name: 'Playtime Padel Club Battersea',
    venue: 'Playtime Padel Battersea',
    area: 'Battersea',
    level: 'All levels',
    description: 'Local padel club with pay-and-play courts. Social sessions, private coaching, and match play available to book.',
    contact: 'https://www.playtimepadelclub.com',
    sourceUrl: 'https://www.playtimepadelclub.com',
    isVenue: true
  },

  // FOOTBALL - Westminster
  {
    id: 'football-westminster-1',
    sport: 'football',
    borough: 'westminster',
    name: 'Footy Addicts Regent\'s Park',
    venue: 'Regent\'s Park (The Hub)',
    area: 'Regent\'s Park',
    level: 'All abilities',
    description: 'Regular football games at The Hub in Regent\'s Park. Book individual spots for casual games. Mixed ability, friendly atmosphere.',
    contact: 'https://footyaddicts.com/football-venues/9-regents-park-the-hub-london',
    sourceUrl: 'https://footyaddicts.com/football-venues/9-regents-park-the-hub-london'
  },
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
  const sports: SportType[] = [
    'football', 'basketball', 'tennis', 'badminton', 'running', 'padel',
    'cricket', 'rugby', 'cycling', 'swimming', 'yoga', 'climbing'
  ];
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
