export type BoroughType =
  | 'hackney'
  | 'camden'
  | 'islington'
  | 'lambeth'
  | 'tower-hamlets'
  | 'westminster'
  | 'kensington-chelsea'
  | 'southwark'
  | 'wandsworth'
  | 'lewisham'
  | 'greenwich'
  | 'newham'
  | 'barnet'
  | 'ealing'
  | 'brent'
  | 'enfield'
  | 'haringey'
  | 'waltham-forest'
  | 'redbridge'
  | 'hounslow'
  | 'hammersmith-and-fulham'
  | 'merton'
  | 'croydon'
  | 'bromley'
  | 'barking-and-dagenham'
  | 'sutton'
  | 'harrow'
  | 'hillingdon'
  | 'havering'
  | 'richmond-upon-thames'
  | 'kingston-upon-thames'
  | 'bexley'
  | 'city-of-london';

export interface Borough {
  id: BoroughType;
  name: string;
  displayName: string;
  zone: string;
}

export const BOROUGHS: Borough[] = [
  {
    id: 'hackney',
    name: 'hackney',
    displayName: 'Hackney',
    zone: 'Zone 1-2'
  },
  {
    id: 'camden',
    name: 'camden',
    displayName: 'Camden',
    zone: 'Zone 1-2'
  },
  {
    id: 'islington',
    name: 'islington',
    displayName: 'Islington',
    zone: 'Zone 1-2'
  },
  {
    id: 'lambeth',
    name: 'lambeth',
    displayName: 'Lambeth',
    zone: 'Zone 1-2'
  },
  {
    id: 'tower-hamlets',
    name: 'tower-hamlets',
    displayName: 'Tower Hamlets',
    zone: 'Zone 1-2'
  },
  {
    id: 'westminster',
    name: 'westminster',
    displayName: 'Westminster',
    zone: 'Zone 1-2'
  },
  {
    id: 'kensington-chelsea',
    name: 'kensington-chelsea',
    displayName: 'Kensington & Chelsea',
    zone: 'Zone 1-2'
  },
  {
    id: 'southwark',
    name: 'southwark',
    displayName: 'Southwark',
    zone: 'Zone 1-2'
  },
  {
    id: 'wandsworth',
    name: 'wandsworth',
    displayName: 'Wandsworth',
    zone: 'Zone 1-2'
  },
  {
    id: 'hammersmith-and-fulham',
    name: 'hammersmith-and-fulham',
    displayName: 'Hammersmith and Fulham',
    zone: 'Zone 1-2'
  },
  {
    id: 'city-of-london',
    name: 'city-of-london',
    displayName: 'City of London',
    zone: 'Zone 1'
  },
  {
    id: 'lewisham',
    name: 'lewisham',
    displayName: 'Lewisham',
    zone: 'Zone 2-3'
  },
  {
    id: 'greenwich',
    name: 'greenwich',
    displayName: 'Greenwich',
    zone: 'Zone 2-3'
  },
  {
    id: 'newham',
    name: 'newham',
    displayName: 'Newham',
    zone: 'Zone 2-3'
  },
  {
    id: 'haringey',
    name: 'haringey',
    displayName: 'Haringey',
    zone: 'Zone 2-3'
  },
  {
    id: 'waltham-forest',
    name: 'waltham-forest',
    displayName: 'Waltham Forest',
    zone: 'Zone 2-3'
  },
  {
    id: 'brent',
    name: 'brent',
    displayName: 'Brent',
    zone: 'Zone 2-3'
  },
  {
    id: 'ealing',
    name: 'ealing',
    displayName: 'Ealing',
    zone: 'Zone 2-3'
  },
  {
    id: 'merton',
    name: 'merton',
    displayName: 'Merton',
    zone: 'Zone 2-3'
  },
  {
    id: 'barnet',
    name: 'barnet',
    displayName: 'Barnet',
    zone: 'Zone 3-4'
  },
  {
    id: 'enfield',
    name: 'enfield',
    displayName: 'Enfield',
    zone: 'Zone 3-4'
  },
  {
    id: 'redbridge',
    name: 'redbridge',
    displayName: 'Redbridge',
    zone: 'Zone 3-4'
  },
  {
    id: 'hounslow',
    name: 'hounslow',
    displayName: 'Hounslow',
    zone: 'Zone 3-4'
  },
  {
    id: 'croydon',
    name: 'croydon',
    displayName: 'Croydon',
    zone: 'Zone 3-4'
  },
  {
    id: 'richmond-upon-thames',
    name: 'richmond-upon-thames',
    displayName: 'Richmond upon Thames',
    zone: 'Zone 3-4'
  },
  {
    id: 'kingston-upon-thames',
    name: 'kingston-upon-thames',
    displayName: 'Kingston upon Thames',
    zone: 'Zone 3-4'
  },
  {
    id: 'bromley',
    name: 'bromley',
    displayName: 'Bromley',
    zone: 'Zone 4-6'
  },
  {
    id: 'barking-and-dagenham',
    name: 'barking-and-dagenham',
    displayName: 'Barking and Dagenham',
    zone: 'Zone 4-6'
  },
  {
    id: 'sutton',
    name: 'sutton',
    displayName: 'Sutton',
    zone: 'Zone 4-6'
  },
  {
    id: 'harrow',
    name: 'harrow',
    displayName: 'Harrow',
    zone: 'Zone 4-6'
  },
  {
    id: 'hillingdon',
    name: 'hillingdon',
    displayName: 'Hillingdon',
    zone: 'Zone 4-6'
  },
  {
    id: 'havering',
    name: 'havering',
    displayName: 'Havering',
    zone: 'Zone 4-6'
  },
  {
    id: 'bexley',
    name: 'bexley',
    displayName: 'Bexley',
    zone: 'Zone 4-6'
  }
];

export const getBoroughByName = (name: string): Borough | undefined => {
  return BOROUGHS.find(borough => borough.name === name);
};
