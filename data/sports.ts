export type SportType =
  | 'football'
  | 'basketball'
  | 'tennis'
  | 'badminton'
  | 'running'
  | 'padel';

export interface Sport {
  id: SportType;
  name: string;
  displayName: string;
  description: string;
}

export const SPORTS: Sport[] = [
  {
    id: 'football',
    name: 'football',
    displayName: 'Football',
    description: '5-a-side, 7-a-side, and casual play across London'
  },
  {
    id: 'basketball',
    name: 'basketball',
    displayName: 'Basketball',
    description: 'Indoor and outdoor basketball courts and pickup games'
  },
  {
    id: 'tennis',
    name: 'tennis',
    displayName: 'Tennis',
    description: 'Premium tennis courts and clubs in central London'
  },
  {
    id: 'badminton',
    name: 'badminton',
    displayName: 'Badminton',
    description: 'Indoor badminton courts and community hall sessions'
  },
  {
    id: 'running',
    name: 'running',
    displayName: 'Running',
    description: 'Social running groups and pace groups for all levels'
  },
  {
    id: 'padel',
    name: 'padel',
    displayName: 'Padel',
    description: 'Premium padel courts and matchmaking opportunities'
  }
];

export const getSportByName = (name: string): Sport | undefined => {
  return SPORTS.find(sport => sport.name === name);
};
