/**
 * Meetup API Client
 *
 * Meetup uses a GraphQL API that requires OAuth2 authentication.
 * To use this scraper, you need:
 * 1. Create an OAuth Consumer at https://www.meetup.com/api/oauth/list/
 * 2. Set MEETUP_CLIENT_ID and MEETUP_CLIENT_SECRET in your environment
 * 3. Complete the OAuth flow to get an access token
 *
 * For now, this scraper fetches publicly available group data.
 */

const MEETUP_GRAPHQL_URL = 'https://api.meetup.com/gql';

// London boroughs with their approximate coordinates for searching
const LONDON_LOCATIONS = [
  { borough: 'Camden', lat: 51.5290, lon: -0.1255 },
  { borough: 'Westminster', lat: 51.4975, lon: -0.1357 },
  { borough: 'Hackney', lat: 51.5450, lon: -0.0553 },
  { borough: 'Tower Hamlets', lat: 51.5203, lon: -0.0293 },
  { borough: 'Islington', lat: 51.5416, lon: -0.1022 },
  { borough: 'Lambeth', lat: 51.4571, lon: -0.1231 },
  { borough: 'Southwark', lat: 51.5035, lon: -0.0804 },
  { borough: 'Greenwich', lat: 51.4892, lon: 0.0648 },
  { borough: 'Lewisham', lat: 51.4415, lon: -0.0117 },
  { borough: 'Wandsworth', lat: 51.4571, lon: -0.1818 },
  { borough: 'Hammersmith and Fulham', lat: 51.4927, lon: -0.2339 },
  { borough: 'Kensington and Chelsea', lat: 51.5020, lon: -0.1947 },
];

// Sports-related categories on Meetup
const SPORTS_CATEGORIES = [
  'sports-recreation',
  'fitness',
  'outdoors-adventure',
  'health-wellbeing',
];

// Keywords to search for
const SPORTS_KEYWORDS = [
  'football',
  'soccer',
  'basketball',
  'tennis',
  'badminton',
  'running',
  'padel',
  'cricket',
  'rugby',
  'cycling',
  'swimming',
  'yoga',
  'climbing',
];

export interface MeetupGroup {
  id: string;
  name: string;
  description: string;
  urlname: string;
  link: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  memberCount: number;
  category?: string;
}

export interface ScraperResult {
  success: boolean;
  groupsFound: number;
  groupsCreated: number;
  groups: MeetupGroup[];
  errors: string[];
}

/**
 * Determines the sport type based on group name and description
 */
function detectSport(name: string, description: string): string {
  const text = `${name} ${description}`.toLowerCase();

  if (text.includes('football') || text.includes('soccer')) return 'Football';
  if (text.includes('basketball')) return 'Basketball';
  if (text.includes('tennis')) return 'Tennis';
  if (text.includes('badminton')) return 'Badminton';
  if (text.includes('running') || text.includes('run club') || text.includes('runners')) return 'Running';
  if (text.includes('padel')) return 'Padel';
  if (text.includes('cricket')) return 'Cricket';
  if (text.includes('rugby')) return 'Rugby';
  if (text.includes('cycling') || text.includes('bike') || text.includes('bicycle')) return 'Cycling';
  if (text.includes('swimming') || text.includes('swim')) return 'Swimming';
  if (text.includes('yoga')) return 'Yoga';
  if (text.includes('climbing') || text.includes('bouldering')) return 'Climbing';

  return 'Other';
}

/**
 * Determines the borough based on coordinates or city name
 */
function detectBorough(city: string, lat: number, lon: number): string {
  // First try to match city name
  const cityLower = city.toLowerCase();
  for (const loc of LONDON_LOCATIONS) {
    if (cityLower.includes(loc.borough.toLowerCase())) {
      return loc.borough;
    }
  }

  // Otherwise find nearest borough by coordinates
  let nearestBorough = 'Central London';
  let minDistance = Infinity;

  for (const loc of LONDON_LOCATIONS) {
    const distance = Math.sqrt(
      Math.pow(lat - loc.lat, 2) + Math.pow(lon - loc.lon, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      nearestBorough = loc.borough;
    }
  }

  return nearestBorough;
}

/**
 * Search Meetup for sports groups in London using the GraphQL API
 * Requires a valid access token
 */
async function searchMeetupGroups(accessToken: string): Promise<MeetupGroup[]> {
  const groups: MeetupGroup[] = [];
  const seenIds = new Set<string>();

  for (const keyword of SPORTS_KEYWORDS) {
    try {
      const query = `
        query SearchGroups($query: String!, $lat: Float!, $lon: Float!, $radius: Int!) {
          keywordSearch(
            filter: {
              query: $query
              lat: $lat
              lon: $lon
              radius: $radius
              source: GROUPS
            }
            input: { first: 50 }
          ) {
            edges {
              node {
                ... on Group {
                  id
                  name
                  description
                  urlname
                  link
                  city
                  country
                  lat
                  lon
                  memberships {
                    count
                  }
                  groupByTopic: topicCategory {
                    name
                  }
                }
              }
            }
          }
        }
      `;

      const response = await fetch(MEETUP_GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          query,
          variables: {
            query: `${keyword} London`,
            lat: 51.5074, // Central London
            lon: -0.1278,
            radius: 25, // 25 miles radius
          },
        }),
      });

      if (!response.ok) {
        console.error(`Meetup API error for keyword "${keyword}":`, response.status);
        continue;
      }

      const data = await response.json();

      if (data.errors) {
        console.error(`GraphQL errors for keyword "${keyword}":`, data.errors);
        continue;
      }

      const edges = data.data?.keywordSearch?.edges || [];

      for (const edge of edges) {
        const node = edge.node;
        if (!node || seenIds.has(node.id)) continue;

        // Only include UK groups
        if (node.country !== 'GB' && node.country !== 'United Kingdom') continue;

        seenIds.add(node.id);
        groups.push({
          id: node.id,
          name: node.name,
          description: node.description || '',
          urlname: node.urlname,
          link: node.link || `https://www.meetup.com/${node.urlname}/`,
          city: node.city || 'London',
          country: node.country,
          lat: node.lat,
          lon: node.lon,
          memberCount: node.memberships?.count || 0,
          category: node.groupByTopic?.name,
        });
      }

      // Rate limiting - wait between requests
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`Error searching for "${keyword}":`, error);
    }
  }

  return groups;
}

/**
 * Transform Meetup group data to our database format
 */
export function transformMeetupGroup(group: MeetupGroup): {
  sport: string;
  borough: string;
  name: string;
  venue: string;
  area: string;
  level: string;
  description: string;
  contact: string;
  sourceUrl: string;
  externalId: string;
} {
  const sport = detectSport(group.name, group.description);
  const borough = detectBorough(group.city, group.lat, group.lon);

  // Extract a short description (first 500 chars)
  const shortDescription = group.description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ')    // Normalize whitespace
    .trim()
    .substring(0, 500);

  return {
    sport,
    borough,
    name: group.name,
    venue: group.city || 'Various locations in London',
    area: borough,
    level: 'Mixed', // Meetup doesn't typically specify skill level
    description: shortDescription || `Join ${group.name} - a ${sport.toLowerCase()} group in ${borough} with ${group.memberCount} members.`,
    contact: `Join via Meetup: ${group.link}`,
    sourceUrl: group.link,
    externalId: `meetup_${group.id}`,
  };
}

/**
 * Main scraper function
 */
export async function scrapeMeetupGroups(): Promise<ScraperResult> {
  const errors: string[] = [];

  // Check for access token
  const accessToken = process.env.MEETUP_ACCESS_TOKEN;

  if (!accessToken) {
    return {
      success: false,
      groupsFound: 0,
      groupsCreated: 0,
      groups: [],
      errors: [
        'MEETUP_ACCESS_TOKEN environment variable is not set.',
        'To get an access token:',
        '1. Create an OAuth app at https://www.meetup.com/api/oauth/list/',
        '2. Complete the OAuth2 flow to get an access token',
        '3. Set MEETUP_ACCESS_TOKEN in your environment variables',
      ],
    };
  }

  try {
    const groups = await searchMeetupGroups(accessToken);

    return {
      success: true,
      groupsFound: groups.length,
      groupsCreated: 0, // Will be updated when saving to DB
      groups,
      errors,
    };
  } catch (error) {
    return {
      success: false,
      groupsFound: 0,
      groupsCreated: 0,
      groups: [],
      errors: [`Scraper error: ${error instanceof Error ? error.message : 'Unknown error'}`],
    };
  }
}

/**
 * Get sample London sports groups data for testing/seeding
 * This provides realistic data when API access isn't available
 */
export function getSampleLondonSportsGroups(): MeetupGroup[] {
  return [
    {
      id: 'sample_1',
      name: 'London Fields Football',
      description: 'Casual 5-a-side and 7-a-side football games in Hackney. All skill levels welcome. We play every Saturday morning and Wednesday evening.',
      urlname: 'london-fields-football',
      link: 'https://www.meetup.com/london-fields-football/',
      city: 'Hackney',
      country: 'GB',
      lat: 51.5410,
      lon: -0.0613,
      memberCount: 234,
      category: 'Sports & Recreation',
    },
    {
      id: 'sample_2',
      name: 'Camden Running Collective',
      description: 'Weekly group runs around Regent\'s Park and Hampstead Heath. Perfect for beginners and experienced runners alike. We meet every Tuesday at 7pm.',
      urlname: 'camden-running-collective',
      link: 'https://www.meetup.com/camden-running-collective/',
      city: 'Camden',
      country: 'GB',
      lat: 51.5390,
      lon: -0.1426,
      memberCount: 567,
      category: 'Fitness',
    },
    {
      id: 'sample_3',
      name: 'Westminster Padel Club',
      description: 'The fastest growing racket sport! We organize regular padel sessions at Will to Win in Hyde Park. Beginners welcome, equipment provided.',
      urlname: 'westminster-padel',
      link: 'https://www.meetup.com/westminster-padel/',
      city: 'Westminster',
      country: 'GB',
      lat: 51.5074,
      lon: -0.1657,
      memberCount: 189,
      category: 'Sports & Recreation',
    },
    {
      id: 'sample_4',
      name: 'Islington Tennis Social',
      description: 'Social tennis for intermediate players. We book courts at Highbury Fields every weekend. Great way to meet people and improve your game.',
      urlname: 'islington-tennis-social',
      link: 'https://www.meetup.com/islington-tennis-social/',
      city: 'Islington',
      country: 'GB',
      lat: 51.5465,
      lon: -0.1058,
      memberCount: 312,
      category: 'Sports & Recreation',
    },
    {
      id: 'sample_5',
      name: 'South London Basketball',
      description: 'Basketball pick-up games and organized sessions in Lambeth and Southwark. Indoor courts in winter, outdoor in summer. All levels welcome.',
      urlname: 'south-london-basketball',
      link: 'https://www.meetup.com/south-london-basketball/',
      city: 'Lambeth',
      country: 'GB',
      lat: 51.4613,
      lon: -0.1156,
      memberCount: 445,
      category: 'Sports & Recreation',
    },
    {
      id: 'sample_6',
      name: 'Greenwich Park Runners',
      description: 'Free weekly 5K runs in beautiful Greenwich Park. Part of the parkrun community. Every Saturday at 9am, rain or shine!',
      urlname: 'greenwich-park-runners',
      link: 'https://www.meetup.com/greenwich-park-runners/',
      city: 'Greenwich',
      country: 'GB',
      lat: 51.4769,
      lon: -0.0005,
      memberCount: 892,
      category: 'Fitness',
    },
    {
      id: 'sample_7',
      name: 'East London Badminton Club',
      description: 'Regular badminton sessions in Tower Hamlets. We have courts booked every Thursday evening. Rackets available for beginners.',
      urlname: 'east-london-badminton',
      link: 'https://www.meetup.com/east-london-badminton/',
      city: 'Tower Hamlets',
      country: 'GB',
      lat: 51.5150,
      lon: -0.0172,
      memberCount: 178,
      category: 'Sports & Recreation',
    },
    {
      id: 'sample_8',
      name: 'Kensington Yoga in the Park',
      description: 'Free outdoor yoga sessions in Hyde Park and Kensington Gardens. Bring your own mat. All levels from complete beginners to advanced.',
      urlname: 'kensington-yoga',
      link: 'https://www.meetup.com/kensington-yoga/',
      city: 'Kensington and Chelsea',
      country: 'GB',
      lat: 51.5073,
      lon: -0.1877,
      memberCount: 1243,
      category: 'Health & Wellbeing',
    },
    {
      id: 'sample_9',
      name: 'Wandsworth Cycling Club',
      description: 'Road cycling group exploring Surrey Hills and beyond. Weekend rides of varying distances. Social coffee stops included!',
      urlname: 'wandsworth-cycling',
      link: 'https://www.meetup.com/wandsworth-cycling/',
      city: 'Wandsworth',
      country: 'GB',
      lat: 51.4567,
      lon: -0.1910,
      memberCount: 367,
      category: 'Outdoors & Adventure',
    },
    {
      id: 'sample_10',
      name: 'Lewisham Swimming Squad',
      description: 'Masters swimming sessions at the Lewisham Leisure Centre. Coached sessions for improvers and fitness swimmers. Lane swimming every Tuesday.',
      urlname: 'lewisham-swimming',
      link: 'https://www.meetup.com/lewisham-swimming/',
      city: 'Lewisham',
      country: 'GB',
      lat: 51.4535,
      lon: -0.0205,
      memberCount: 156,
      category: 'Fitness',
    },
    {
      id: 'sample_11',
      name: 'Hackney Climbing Crew',
      description: 'Indoor bouldering sessions at the Castle Climbing Centre. Beginners welcome - we\'ll show you the ropes (literally). Social climbs every Friday.',
      urlname: 'hackney-climbing',
      link: 'https://www.meetup.com/hackney-climbing/',
      city: 'Hackney',
      country: 'GB',
      lat: 51.5574,
      lon: -0.0756,
      memberCount: 289,
      category: 'Sports & Recreation',
    },
    {
      id: 'sample_12',
      name: 'Hammersmith 5-a-side',
      description: 'Weekly 5-a-side football at Goals Hammersmith. Mixed ability games, great for after-work exercise. We play every Monday and Thursday.',
      urlname: 'hammersmith-5aside',
      link: 'https://www.meetup.com/hammersmith-5aside/',
      city: 'Hammersmith and Fulham',
      country: 'GB',
      lat: 51.4928,
      lon: -0.2298,
      memberCount: 412,
      category: 'Sports & Recreation',
    },
  ];
}
