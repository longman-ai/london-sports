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
  },
  cricket: {
    sport: 'cricket',
    tagline: 'Join cricket clubs and nets sessions',
    emphasis: ['Nets sessions', 'League teams', 'Indoor & outdoor', 'All skill levels'],
    groupLabel: 'Clubs & Nets',
    aboutTitle: 'Cricket in London',
    aboutText:
      'Find cricket clubs offering nets sessions, league teams, and social cricket. Whether you\'re looking to play competitively or just enjoy a casual game, there are clubs across London welcoming new members year-round.'
  },
  rugby: {
    sport: 'rugby',
    tagline: 'Find rugby clubs near you',
    emphasis: ['Social rugby', 'Touch rugby', 'All levels welcome', 'Men\'s & women\'s teams'],
    groupLabel: 'Clubs',
    aboutTitle: 'Rugby in London',
    aboutText:
      'Discover rugby clubs for all levels from complete beginners to experienced players. Many clubs offer touch rugby and social sessions alongside competitive teams. A great way to stay fit and make friends.'
  },
  cycling: {
    sport: 'cycling',
    tagline: 'Join group rides and cycling clubs',
    emphasis: ['Group rides', 'Road & gravel', 'All paces', 'Social cycling'],
    groupLabel: 'Clubs & Groups',
    aboutTitle: 'Cycling Groups in London',
    aboutText:
      'Find cycling clubs and group rides for all abilities. From gentle social spins to fast-paced road rides, there are groups heading out every weekend. A perfect way to explore London and beyond on two wheels.'
  },
  swimming: {
    sport: 'swimming',
    tagline: 'Swim clubs and coached sessions',
    emphasis: ['Masters swimming', 'Coached sessions', 'Open water', 'All abilities'],
    groupLabel: 'Clubs & Sessions',
    aboutTitle: 'Swimming in London',
    aboutText:
      'Join swimming clubs offering coached sessions for adults. Whether you\'re looking to improve technique, train for events, or enjoy social swims, there are clubs at pools across London for all abilities.'
  },
  yoga: {
    sport: 'yoga',
    tagline: 'Find yoga classes and studios',
    emphasis: ['All styles', 'Beginner friendly', 'Community classes', 'Drop-in welcome'],
    groupLabel: 'Studios & Classes',
    aboutTitle: 'Yoga in London',
    aboutText:
      'Discover yoga studios and community classes offering various styles from Vinyasa to Yin. Most classes welcome beginners and offer drop-in options. A great way to improve flexibility, strength, and wellbeing.'
  },
  climbing: {
    sport: 'climbing',
    tagline: 'Bouldering and climbing gyms',
    emphasis: ['Bouldering', 'Rope climbing', 'Beginner sessions', 'All levels'],
    groupLabel: 'Gyms & Clubs',
    aboutTitle: 'Climbing in London',
    aboutText:
      'Find bouldering and rope climbing gyms across London. Most gyms offer beginner sessions and have welcoming communities. A fun full-body workout that challenges both body and mind.'
  }
};

export const getSportContent = (sport: SportType): SportContent => {
  return SPORT_CONTENT[sport];
};
