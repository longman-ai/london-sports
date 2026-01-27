export type BoroughType =
  | 'hackney'
  | 'camden'
  | 'islington'
  | 'lambeth'
  | 'tower-hamlets'
  | 'westminster'
  | 'kensington-chelsea';

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
  }
];

export const getBoroughByName = (name: string): Borough | undefined => {
  return BOROUGHS.find(borough => borough.name === name);
};
