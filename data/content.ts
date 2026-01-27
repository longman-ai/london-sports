import { SportType } from './sports';

export interface SportContent {
  sport: SportType;
  tagline: string;
  emphasis: string[];
  groupLabel: string; // "Groups" or "Clubs" or "Venues"
  aboutTitle: string;
  aboutText: string;
}

export const SPORT_CONTENT: Record<SportType, SportContent> = {
  running: {
    sport: 'running',
    tagline: 'Join friendly running groups near you',
    emphasis: ['Beginner friendly', 'Pace groups', 'Social runs', 'All fitness levels'],
    groupLabel: 'Groups',
    aboutTitle: 'Why Join a Running Group?',
    aboutText:
      'Running groups are perfect for beginners and experienced runners alike. Join a pace group that matches your fitness level, meet like-minded people, and explore London while staying fit. Most groups are free and welcome runners of all abilities.'
  },
  padel: {
    sport: 'padel',
    tagline: 'Find padel courts and players',
    emphasis: ['Premium venues', 'Court availability', 'Matchmaking', 'All skill levels'],
    groupLabel: 'Venues & Clubs',
    aboutTitle: 'Padel in London',
    aboutText:
      'Padel is one of the fastest-growing sports in London. Find premium courts, book sessions, and connect with players of your level. Whether you\'re new to the sport or an experienced player, there are venues and clubs ready to welcome you.'
  },
  tennis: {
    sport: 'tennis',
    tagline: 'Premium tennis courts and clubs',
    emphasis: ['Court bookings', 'Coaching available', 'Premium facilities', 'Members & non-members'],
    groupLabel: 'Venues & Clubs',
    aboutTitle: 'Tennis in Central London',
    aboutText:
      'Discover tennis clubs and courts across central London. From public parks to premium facilities, find the right venue for your game. Many clubs offer coaching, social sessions, and court hire for both members and non-members.'
  },
  badminton: {
    sport: 'badminton',
    tagline: 'Indoor badminton sessions near you',
    emphasis: ['Indoor venues', 'Drop-in sessions', 'Community halls', 'Leisure centres'],
    groupLabel: 'Venues & Sessions',
    aboutTitle: 'Badminton Sessions',
    aboutText:
      'Find badminton courts at community halls and leisure centres. Most venues offer drop-in sessions where you can play casually without booking. Perfect for staying active during the week or meeting new people who share your interest in badminton.'
  },
  football: {
    sport: 'football',
    tagline: 'Join local football games',
    emphasis: ['5-a-side', '7-a-side', 'Casual play', 'All skill levels'],
    groupLabel: 'Groups & Games',
    aboutTitle: 'Football in Your Borough',
    aboutText:
      'Find regular 5-a-side and 7-a-side football games in your area. Whether you\'re looking for competitive matches or casual kickabouts, there are groups playing throughout the week. Most games welcome new players of all abilities.'
  },
  basketball: {
    sport: 'basketball',
    tagline: 'Find pickup games and courts',
    emphasis: ['Pickup games', 'Indoor & outdoor courts', 'All skill levels', 'Regular sessions'],
    groupLabel: 'Courts & Games',
    aboutTitle: 'Basketball in London',
    aboutText:
      'Discover basketball courts and pickup games across central London. From outdoor parks to indoor facilities, find regular sessions and connect with other players. Most games are casual and welcome players of all levels.'
  }
};

export const getSportContent = (sport: SportType): SportContent => {
  return SPORT_CONTENT[sport];
};
