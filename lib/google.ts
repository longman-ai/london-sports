/**
 * Google Custom Search API Client
 *
 * Uses Google Custom Search JSON API to find London sports clubs and groups.
 * To use this scraper, you need:
 * 1. Create a Custom Search Engine at https://programmablesearchengine.google.com/
 * 2. Enable the Custom Search API at https://console.cloud.google.com/apis/library/customsearch.googleapis.com
 * 3. Create an API key at https://console.cloud.google.com/apis/credentials
 * 4. Set GOOGLE_API_KEY and GOOGLE_SEARCH_ENGINE_ID in your environment
 */

const GOOGLE_CUSTOM_SEARCH_URL = 'https://www.googleapis.com/customsearch/v1';

// London boroughs with their approximate coordinates
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

// Interface for Google Custom Search result item
export interface GoogleSearchResult {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  pagemap?: {
    metatags?: Array<{
      'og:title'?: string;
      'og:description'?: string;
      'og:url'?: string;
    }>;
    organization?: Array<{
      name?: string;
      telephone?: string;
      email?: string;
    }>;
  };
}

// Interface for parsed group from search results
export interface GoogleGroup {
  id: string;
  name: string;
  description: string;
  link: string;
  displayLink: string;
  snippet: string;
  borough?: string;
  phone?: string;
  email?: string;
}

export interface ScraperResult {
  success: boolean;
  groupsFound: number;
  groupsCreated: number;
  groups: GoogleGroup[];
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

  for (const loc of LONDON_LOCATIONS) {
    if (textLower.includes(loc.borough.toLowerCase())) {
      return loc.borough;
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
  // Create a hash-like ID from the URL
  const urlHash = url
    .replace(/^https?:\/\//, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .substring(0, 50);
  return urlHash;
}

/**
 * Search Google Custom Search API for sports groups in London
 */
async function searchGoogleForGroups(apiKey: string, searchEngineId: string): Promise<GoogleGroup[]> {
  const groups: GoogleGroup[] = [];
  const seenUrls = new Set<string>();

  for (const keyword of SPORTS_KEYWORDS) {
    try {
      const searchUrl = new URL(GOOGLE_CUSTOM_SEARCH_URL);
      searchUrl.searchParams.append('key', apiKey);
      searchUrl.searchParams.append('cx', searchEngineId);
      searchUrl.searchParams.append('q', `${keyword} London`);
      searchUrl.searchParams.append('num', '10'); // Max 10 results per query
      searchUrl.searchParams.append('gl', 'uk'); // Geolocation: UK
      searchUrl.searchParams.append('cr', 'countryUK'); // Country restrict

      const response = await fetch(searchUrl.toString());

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Handle quota exceeded
        if (response.status === 429 || errorData.error?.code === 429) {
          console.error('Google API: Rate limit/quota exceeded');
          break; // Stop further requests
        }

        console.error(`Google API error for "${keyword}":`, response.status, errorData);
        continue;
      }

      const data = await response.json();
      const items: GoogleSearchResult[] = data.items || [];

      for (const item of items) {
        // Skip if already seen this URL
        if (seenUrls.has(item.link)) continue;
        seenUrls.add(item.link);

        // Skip common non-club results
        const lowerLink = item.link.toLowerCase();
        if (
          lowerLink.includes('wikipedia.org') ||
          lowerLink.includes('tripadvisor') ||
          lowerLink.includes('yelp.com') ||
          lowerLink.includes('yell.com') ||
          lowerLink.includes('timeout.com/london') ||
          lowerLink.includes('facebook.com') || // Already have Facebook scraper
          lowerLink.includes('meetup.com') // Already have Meetup scraper
        ) {
          continue;
        }

        const fullText = `${item.title} ${item.snippet}`;
        const borough = detectBoroughFromText(fullText);

        // Extract contact info from pagemap if available
        let phone: string | undefined;
        let email: string | undefined;

        if (item.pagemap?.organization?.[0]) {
          phone = item.pagemap.organization[0].telephone;
          email = item.pagemap.organization[0].email;
        }

        groups.push({
          id: generateIdFromUrl(item.link),
          name: item.title.replace(/ - .*$/, '').trim(), // Clean up title
          description: item.snippet,
          link: item.link,
          displayLink: item.displayLink,
          snippet: item.snippet,
          borough,
          phone,
          email,
        });
      }

      // Rate limiting - Google allows 100 queries/day on free tier
      // Wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`Error searching for "${keyword}":`, error);
    }
  }

  return groups;
}

/**
 * Transform Google search result to our database format
 */
export function transformGoogleGroup(group: GoogleGroup): {
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

  // Build contact string from available data
  let contact = '';
  if (group.email) {
    contact = group.email;
  } else if (group.phone) {
    contact = group.phone;
  } else {
    contact = `Visit: ${group.link}`;
  }

  // Clean up description
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
    level: 'Mixed', // Web search doesn't typically specify skill level
    description: shortDescription || `${group.name} - a ${sport.toLowerCase()} club in ${borough}.`,
    contact,
    sourceUrl: group.link,
    externalId: `google_${group.id}`,
  };
}

/**
 * Main scraper function
 */
export async function scrapeGoogleGroups(): Promise<ScraperResult> {
  const errors: string[] = [];

  // Check for required environment variables
  const apiKey = process.env.GOOGLE_API_KEY;
  const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

  if (!apiKey || !searchEngineId) {
    return {
      success: false,
      groupsFound: 0,
      groupsCreated: 0,
      groups: [],
      errors: [
        'GOOGLE_API_KEY and/or GOOGLE_SEARCH_ENGINE_ID environment variables are not set.',
        'To set up Google Custom Search:',
        '1. Create a Custom Search Engine at https://programmablesearchengine.google.com/',
        '2. Configure it to search the entire web or specific sports sites',
        '3. Enable the Custom Search API at https://console.cloud.google.com/apis/library/customsearch.googleapis.com',
        '4. Create an API key at https://console.cloud.google.com/apis/credentials',
        '5. Set GOOGLE_API_KEY and GOOGLE_SEARCH_ENGINE_ID in your environment variables',
        '',
        'Note: Free tier allows 100 queries/day. Consider upgrading for production use.',
      ],
    };
  }

  try {
    const groups = await searchGoogleForGroups(apiKey, searchEngineId);

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
export function getSampleGoogleSportsGroups(): GoogleGroup[] {
  return [
    {
      id: 'google_sample_1',
      name: 'Brixton Football Club',
      description: 'Community football club in South London offering adult and youth teams. Training sessions and friendly matches every week.',
      link: 'https://www.brixtonfootball.example.com',
      displayLink: 'brixtonfootball.example.com',
      snippet: 'Community football club in South London offering adult and youth teams...',
      borough: 'Lambeth',
    },
    {
      id: 'google_sample_2',
      name: 'Clapham Runners',
      description: 'Social running group meeting on Clapham Common. Weekly runs for all abilities from beginners to marathon trainers.',
      link: 'https://www.claphamrunners.example.com',
      displayLink: 'claphamrunners.example.com',
      snippet: 'Social running group meeting on Clapham Common...',
      borough: 'Lambeth',
    },
    {
      id: 'google_sample_3',
      name: 'Shoreditch Tennis Academy',
      description: 'Professional tennis coaching in East London. Courts available for hire and group lessons for beginners to advanced.',
      link: 'https://www.shoreditchtennis.example.com',
      displayLink: 'shoreditchtennis.example.com',
      snippet: 'Professional tennis coaching in East London...',
      borough: 'Hackney',
      phone: '020 7123 4567',
    },
    {
      id: 'google_sample_4',
      name: 'Stratford Basketball Association',
      description: 'Olympic Park basketball club with teams competing in local leagues. Open gym sessions and youth development programs.',
      link: 'https://www.stratfordbasketball.example.com',
      displayLink: 'stratfordbasketball.example.com',
      snippet: 'Olympic Park basketball club with teams competing in local leagues...',
      borough: 'Tower Hamlets',
    },
    {
      id: 'google_sample_5',
      name: 'Highbury Padel Club',
      description: 'North London premier padel destination with 6 courts. Beginner lessons and competitive leagues available.',
      link: 'https://www.highburypadel.example.com',
      displayLink: 'highburypadel.example.com',
      snippet: 'North London premier padel destination with 6 courts...',
      borough: 'Islington',
      email: 'info@highburypadel.example.com',
    },
    {
      id: 'google_sample_6',
      name: 'Peckham Cycling Club',
      description: 'Road and gravel cycling club based in South East London. Group rides every Saturday morning through Kent countryside.',
      link: 'https://www.peckhamcycling.example.com',
      displayLink: 'peckhamcycling.example.com',
      snippet: 'Road and gravel cycling club based in South East London...',
      borough: 'Southwark',
    },
    {
      id: 'google_sample_7',
      name: 'Fulham Swimming Club',
      description: 'Masters swimming for adults at Fulham Pools. Coached sessions Tuesday and Thursday evenings.',
      link: 'https://www.fulhamswimming.example.com',
      displayLink: 'fulhamswimming.example.com',
      snippet: 'Masters swimming for adults at Fulham Pools...',
      borough: 'Hammersmith and Fulham',
    },
    {
      id: 'google_sample_8',
      name: 'Notting Hill Yoga Studio',
      description: 'Boutique yoga studio offering Vinyasa, Ashtanga, and Yin classes. New student offers and monthly memberships.',
      link: 'https://www.nottinghillyoga.example.com',
      displayLink: 'nottinghillyoga.example.com',
      snippet: 'Boutique yoga studio offering Vinyasa, Ashtanga, and Yin classes...',
      borough: 'Kensington and Chelsea',
    },
    {
      id: 'google_sample_9',
      name: 'Battersea Climbing Wall',
      description: 'Indoor bouldering and rope climbing facility near Battersea Park. Day passes and memberships available.',
      link: 'https://www.batterseaclimbing.example.com',
      displayLink: 'batterseaclimbing.example.com',
      snippet: 'Indoor bouldering and rope climbing facility near Battersea Park...',
      borough: 'Wandsworth',
    },
    {
      id: 'google_sample_10',
      name: 'Woolwich Cricket Club',
      description: 'Historic cricket club in Greenwich with senior and junior teams. Summer nets and indoor winter training.',
      link: 'https://www.woolwichcricket.example.com',
      displayLink: 'woolwichcricket.example.com',
      snippet: 'Historic cricket club in Greenwich with senior and junior teams...',
      borough: 'Greenwich',
    },
  ];
}
