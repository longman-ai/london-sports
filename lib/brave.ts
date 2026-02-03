/**
 * Brave Search API Client
 *
 * Uses Brave Search API to find London sports clubs and groups.
 * To use this scraper, you need:
 * 1. Go to https://api-dashboard.search.brave.com/
 * 2. Create account and subscribe to free plan (2,000 queries/month)
 * 3. Copy your API key from the dashboard
 * 4. Set BRAVE_API_KEY in your environment
 */

const BRAVE_SEARCH_URL = 'https://api.search.brave.com/res/v1/web/search';

// Sports keywords to search for
const SPORTS_KEYWORDS = [
  'football club',
  'basketball club',
  'tennis club',
  'badminton club',
  'running club',
  'padel club',
  'cricket club',
  'rugby club',
  'cycling club',
  'swimming club',
  'yoga studio',
  'climbing gym',
];

// London boroughs for text detection
const LONDON_BOROUGHS = [
  'Camden', 'Westminster', 'Hackney', 'Tower Hamlets', 'Islington',
  'Lambeth', 'Southwark', 'Greenwich', 'Lewisham', 'Wandsworth',
  'Hammersmith and Fulham', 'Kensington and Chelsea',
];

// Interface for Brave Search result
export interface BraveSearchResult {
  title: string;
  url: string;
  description: string;
  profile?: {
    name: string;
    url: string;
  };
}

// Interface for parsed group from search results
export interface BraveGroup {
  id: string;
  name: string;
  description: string;
  link: string;
  displayLink: string;
  snippet: string;
  borough?: string;
}

export interface ScraperResult {
  success: boolean;
  groupsFound: number;
  groupsCreated: number;
  groups: BraveGroup[];
  errors: string[];
}

/**
 * Determines the sport type based on name and description
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
 * Determines the borough from text content
 */
function detectBoroughFromText(text: string): string {
  const textLower = text.toLowerCase();

  for (const borough of LONDON_BOROUGHS) {
    if (textLower.includes(borough.toLowerCase())) {
      return borough;
    }
  }

  // Common area names mapping to boroughs
  const areaMapping: Record<string, string> = {
    'brixton': 'Lambeth',
    'clapham': 'Lambeth',
    'shoreditch': 'Hackney',
    'dalston': 'Hackney',
    'stratford': 'Tower Hamlets',
    'mile end': 'Tower Hamlets',
    'angel': 'Islington',
    'highbury': 'Islington',
    'peckham': 'Southwark',
    'bermondsey': 'Southwark',
    'fulham': 'Hammersmith and Fulham',
    'shepherds bush': 'Hammersmith and Fulham',
    'chelsea': 'Kensington and Chelsea',
    'notting hill': 'Kensington and Chelsea',
    'battersea': 'Wandsworth',
    'putney': 'Wandsworth',
    'deptford': 'Lewisham',
    'catford': 'Lewisham',
    'woolwich': 'Greenwich',
    'blackheath': 'Greenwich',
    'kings cross': 'Camden',
    'hampstead': 'Camden',
  };

  for (const [area, borough] of Object.entries(areaMapping)) {
    if (textLower.includes(area)) {
      return borough;
    }
  }

  return 'Central London';
}

/**
 * Generate a unique ID from URL
 */
function generateIdFromUrl(url: string): string {
  const urlHash = url
    .replace(/^https?:\/\//, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .substring(0, 50);
  return urlHash;
}

/**
 * Search Brave Search API for sports groups in London
 */
async function searchBraveForGroups(apiKey: string): Promise<BraveGroup[]> {
  const groups: BraveGroup[] = [];
  const seenUrls = new Set<string>();

  for (const keyword of SPORTS_KEYWORDS) {
    try {
      const searchUrl = new URL(BRAVE_SEARCH_URL);
      searchUrl.searchParams.append('q', `${keyword} London UK`);
      searchUrl.searchParams.append('count', '20');
      searchUrl.searchParams.append('country', 'GB');

      const response = await fetch(searchUrl.toString(), {
        headers: {
          'Accept': 'application/json',
          'X-Subscription-Token': apiKey,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();

        // Handle rate limit
        if (response.status === 429) {
          console.error('Brave API: Rate limit exceeded');
          break;
        }

        console.error(`Brave API error for "${keyword}":`, response.status, errorText);
        continue;
      }

      const data = await response.json();
      const items: BraveSearchResult[] = data.web?.results || [];

      for (const item of items) {
        // Skip if already seen this URL
        if (seenUrls.has(item.url)) continue;
        seenUrls.add(item.url);

        // Skip common non-club results
        const lowerUrl = item.url.toLowerCase();
        if (
          lowerUrl.includes('wikipedia.org') ||
          lowerUrl.includes('tripadvisor') ||
          lowerUrl.includes('yelp.com') ||
          lowerUrl.includes('yell.com') ||
          lowerUrl.includes('timeout.com') ||
          lowerUrl.includes('facebook.com') ||
          lowerUrl.includes('meetup.com') ||
          lowerUrl.includes('linkedin.com') ||
          lowerUrl.includes('twitter.com') ||
          lowerUrl.includes('instagram.com')
        ) {
          continue;
        }

        const fullText = `${item.title} ${item.description || ''}`;
        const borough = detectBoroughFromText(fullText);

        // Extract display link from profile or URL
        const displayLink = item.profile?.name || new URL(item.url).hostname;

        groups.push({
          id: generateIdFromUrl(item.url),
          name: item.title.replace(/ - .*$/, '').replace(/ \| .*$/, '').trim(),
          description: item.description || '',
          link: item.url,
          displayLink,
          snippet: item.description || '',
          borough,
        });
      }

      // Rate limiting - be respectful of API limits
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`Error searching for "${keyword}":`, error);
    }
  }

  return groups;
}

/**
 * Transform Brave search result to our database format
 */
export function transformBraveGroup(group: BraveGroup): {
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
  const borough = group.borough || 'Central London';

  const shortDescription = group.snippet
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 500);

  return {
    sport,
    borough,
    name: group.name,
    venue: 'See website for location',
    area: borough,
    level: 'Mixed',
    description: shortDescription || `${group.name} - a ${sport.toLowerCase()} club in ${borough}.`,
    contact: `Visit: ${group.link}`,
    sourceUrl: group.link,
    externalId: `brave_${group.id}`,
  };
}

/**
 * Main scraper function
 */
export async function scrapeBraveGroups(): Promise<ScraperResult> {
  const errors: string[] = [];

  const apiKey = process.env.BRAVE_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      groupsFound: 0,
      groupsCreated: 0,
      groups: [],
      errors: [
        'BRAVE_API_KEY environment variable is not set.',
        'To set up Brave Search API:',
        '1. Go to https://api-dashboard.search.brave.com/',
        '2. Create account and subscribe to free plan',
        '3. Free tier: 2,000 queries/month',
        '4. Copy your API key from the dashboard',
        '5. Set BRAVE_API_KEY in your environment variables',
      ],
    };
  }

  try {
    const groups = await searchBraveForGroups(apiKey);

    return {
      success: true,
      groupsFound: groups.length,
      groupsCreated: 0,
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
 */
export function getSampleBraveSportsGroups(): BraveGroup[] {
  return [
    {
      id: 'brave_sample_1',
      name: 'Brixton Football Club',
      description: 'Community football club in South London offering adult and youth teams. Training sessions and friendly matches every week.',
      link: 'https://www.brixtonfootball.example.com',
      displayLink: 'brixtonfootball.example.com',
      snippet: 'Community football club in South London offering adult and youth teams...',
      borough: 'Lambeth',
    },
    {
      id: 'brave_sample_2',
      name: 'Clapham Runners',
      description: 'Social running group meeting on Clapham Common. Weekly runs for all abilities from beginners to marathon trainers.',
      link: 'https://www.claphamrunners.example.com',
      displayLink: 'claphamrunners.example.com',
      snippet: 'Social running group meeting on Clapham Common...',
      borough: 'Lambeth',
    },
    {
      id: 'brave_sample_3',
      name: 'Shoreditch Tennis Academy',
      description: 'Professional tennis coaching in East London. Courts available for hire and group lessons for beginners to advanced.',
      link: 'https://www.shoreditchtennis.example.com',
      displayLink: 'shoreditchtennis.example.com',
      snippet: 'Professional tennis coaching in East London...',
      borough: 'Hackney',
    },
    {
      id: 'brave_sample_4',
      name: 'Stratford Basketball Association',
      description: 'Olympic Park basketball club with teams competing in local leagues. Open gym sessions and youth development programs.',
      link: 'https://www.stratfordbasketball.example.com',
      displayLink: 'stratfordbasketball.example.com',
      snippet: 'Olympic Park basketball club with teams competing in local leagues...',
      borough: 'Tower Hamlets',
    },
    {
      id: 'brave_sample_5',
      name: 'Highbury Padel Club',
      description: 'North London premier padel destination with 6 courts. Beginner lessons and competitive leagues available.',
      link: 'https://www.highburypadel.example.com',
      displayLink: 'highburypadel.example.com',
      snippet: 'North London premier padel destination with 6 courts...',
      borough: 'Islington',
    },
    {
      id: 'brave_sample_6',
      name: 'Peckham Cycling Club',
      description: 'Road and gravel cycling club based in South East London. Group rides every Saturday morning through Kent countryside.',
      link: 'https://www.peckhamcycling.example.com',
      displayLink: 'peckhamcycling.example.com',
      snippet: 'Road and gravel cycling club based in South East London...',
      borough: 'Southwark',
    },
    {
      id: 'brave_sample_7',
      name: 'Fulham Swimming Club',
      description: 'Masters swimming for adults at Fulham Pools. Coached sessions Tuesday and Thursday evenings.',
      link: 'https://www.fulhamswimming.example.com',
      displayLink: 'fulhamswimming.example.com',
      snippet: 'Masters swimming for adults at Fulham Pools...',
      borough: 'Hammersmith and Fulham',
    },
    {
      id: 'brave_sample_8',
      name: 'Notting Hill Yoga Studio',
      description: 'Boutique yoga studio offering Vinyasa, Ashtanga, and Yin classes. New student offers and monthly memberships.',
      link: 'https://www.nottinghillyoga.example.com',
      displayLink: 'nottinghillyoga.example.com',
      snippet: 'Boutique yoga studio offering Vinyasa, Ashtanga, and Yin classes...',
      borough: 'Kensington and Chelsea',
    },
    {
      id: 'brave_sample_9',
      name: 'Battersea Climbing Wall',
      description: 'Indoor bouldering and rope climbing facility near Battersea Park. Day passes and memberships available.',
      link: 'https://www.batterseaclimbing.example.com',
      displayLink: 'batterseaclimbing.example.com',
      snippet: 'Indoor bouldering and rope climbing facility near Battersea Park...',
      borough: 'Wandsworth',
    },
    {
      id: 'brave_sample_10',
      name: 'Woolwich Cricket Club',
      description: 'Historic cricket club in Greenwich with senior and junior teams. Summer nets and indoor winter training.',
      link: 'https://www.woolwichcricket.example.com',
      displayLink: 'woolwichcricket.example.com',
      snippet: 'Historic cricket club in Greenwich with senior and junior teams...',
      borough: 'Greenwich',
    },
  ];
}
