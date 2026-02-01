/**
 * Facebook Places API Client
 *
 * Note: Facebook deprecated the Groups API in April 2024 (v19.0).
 * This scraper uses the Places Search API to find sports club Pages instead.
 *
 * To use this scraper, you need:
 * 1. Create an app at https://developers.facebook.com/
 * 2. Generate a User Access Token or Page Access Token
 * 3. Set FACEBOOK_ACCESS_TOKEN in your environment variables
 */

const FACEBOOK_GRAPH_API_BASE = 'https://graph.facebook.com/v22.0';

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

export interface FacebookPage {
  id: string;
  name: string;
  about?: string;
  description?: string;
  link: string;
  location?: {
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
    street?: string;
  };
  fan_count?: number;
  category?: string;
  website?: string;
  phone?: string;
  emails?: string[];
}

export interface ScraperResult {
  success: boolean;
  groupsFound: number;
  groupsCreated: number;
  groups: FacebookPage[];
  errors: string[];
}

/**
 * Determines the sport type based on page name and description
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
 * Search Facebook Places API for sports clubs in London
 * Requires a valid access token
 */
async function searchFacebookPlaces(accessToken: string): Promise<FacebookPage[]> {
  const pages: FacebookPage[] = [];
  const seenIds = new Set<string>();

  for (const keyword of SPORTS_KEYWORDS) {
    try {
      const searchUrl = new URL(`${FACEBOOK_GRAPH_API_BASE}/search`);
      searchUrl.searchParams.append('type', 'place');
      searchUrl.searchParams.append('q', `${keyword} club London`);
      searchUrl.searchParams.append('center', '51.5074,-0.1278'); // Central London
      searchUrl.searchParams.append('distance', '40000'); // 40km radius
      searchUrl.searchParams.append('fields', 'id,name,about,description,link,location,fan_count,category,website,phone,emails');
      searchUrl.searchParams.append('access_token', accessToken);
      searchUrl.searchParams.append('limit', '50');

      const response = await fetch(searchUrl.toString());

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Handle specific Facebook API errors
        if (errorData.error?.code === 190) {
          console.error(`Facebook API: Access token expired or invalid`);
          continue;
        }
        if (errorData.error?.code === 4) {
          console.error(`Facebook API: Rate limit reached for "${keyword}"`);
          // Wait longer before next request
          await new Promise(resolve => setTimeout(resolve, 5000));
          continue;
        }

        console.error(`Facebook API error for "${keyword}":`, response.status, errorData);
        continue;
      }

      const data = await response.json();
      const results = data.data || [];

      for (const page of results) {
        if (seenIds.has(page.id)) continue;

        // Filter for UK/London only
        const country = page.location?.country?.toLowerCase();
        if (country && !['united kingdom', 'uk', 'gb', 'england'].includes(country)) {
          continue;
        }

        seenIds.add(page.id);
        pages.push({
          id: page.id,
          name: page.name,
          about: page.about,
          description: page.description,
          link: page.link || `https://www.facebook.com/${page.id}`,
          location: page.location,
          fan_count: page.fan_count,
          category: page.category,
          website: page.website,
          phone: page.phone,
          emails: page.emails,
        });
      }

      // Rate limiting - wait between requests
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`Error searching for "${keyword}":`, error);
    }
  }

  return pages;
}

/**
 * Transform Facebook page data to our database format
 */
export function transformFacebookPage(page: FacebookPage): {
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
  const description = page.about || page.description || '';
  const sport = detectSport(page.name, description);
  const borough = detectBorough(
    page.location?.city || 'London',
    page.location?.latitude || 51.5074,
    page.location?.longitude || -0.1278
  );

  // Build contact string from available data
  let contact = '';
  if (page.website) {
    contact = page.website;
  } else if (page.emails?.length) {
    contact = page.emails[0];
  } else if (page.phone) {
    contact = page.phone;
  } else {
    contact = page.link;
  }

  // Extract a short description (first 500 chars)
  const shortDescription = description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ')    // Normalize whitespace
    .trim()
    .substring(0, 500);

  return {
    sport,
    borough,
    name: page.name,
    venue: page.location?.street || page.location?.city || 'London',
    area: borough,
    level: 'Mixed', // Facebook doesn't typically specify skill level
    description: shortDescription || `${page.name} - a ${sport.toLowerCase()} club in ${borough}.`,
    contact,
    sourceUrl: page.link,
    externalId: `facebook_${page.id}`,
  };
}

/**
 * Main scraper function
 */
export async function scrapeFacebookPages(): Promise<ScraperResult> {
  const errors: string[] = [];

  // Check for access token
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!accessToken) {
    return {
      success: false,
      groupsFound: 0,
      groupsCreated: 0,
      groups: [],
      errors: [
        'FACEBOOK_ACCESS_TOKEN environment variable is not set.',
        'To get an access token:',
        '1. Create an app at https://developers.facebook.com/',
        '2. Generate a User Access Token with pages_read_engagement permission',
        '3. Set FACEBOOK_ACCESS_TOKEN in your environment variables',
        '',
        'Note: Facebook Groups API was deprecated in April 2024.',
        'This scraper uses the Places Search API for Pages instead.',
      ],
    };
  }

  try {
    const pages = await searchFacebookPlaces(accessToken);

    return {
      success: true,
      groupsFound: pages.length,
      groupsCreated: 0, // Will be updated when saving to DB
      groups: pages,
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
 * Get sample London sports pages data for testing/seeding
 * This provides realistic data when API access isn't available
 */
export function getSampleFacebookSportsPages(): FacebookPage[] {
  return [
    {
      id: 'fb_sample_1',
      name: 'South London Football Academy',
      about: 'Premier football coaching and weekly matches in Lambeth. Training for all ages and skill levels. Sunday league teams available.',
      link: 'https://www.facebook.com/southlondonfootball',
      location: {
        city: 'Lambeth',
        country: 'United Kingdom',
        latitude: 51.4571,
        longitude: -0.1231,
        street: 'Brockwell Park',
      },
      fan_count: 2340,
      category: 'Sports Club',
    },
    {
      id: 'fb_sample_2',
      name: 'Camden Basketball Community',
      about: 'Weekly basketball sessions at Talacre Sports Centre. Open runs and organized leagues for intermediate to advanced players.',
      link: 'https://www.facebook.com/camdenbasketball',
      location: {
        city: 'Camden',
        country: 'United Kingdom',
        latitude: 51.5390,
        longitude: -0.1426,
        street: 'Talacre Sports Centre',
      },
      fan_count: 1567,
      category: 'Sports Club',
    },
    {
      id: 'fb_sample_3',
      name: 'Westminster Tennis Club',
      about: 'Historic tennis club in Paddington Recreation Ground. Members enjoy year-round play on our 6 courts. Coaching available for all levels.',
      link: 'https://www.facebook.com/westminstertennisclub',
      location: {
        city: 'Westminster',
        country: 'United Kingdom',
        latitude: 51.5220,
        longitude: -0.1780,
        street: 'Paddington Recreation Ground',
      },
      fan_count: 890,
      category: 'Sports Club',
    },
    {
      id: 'fb_sample_4',
      name: 'Hackney Running Crew',
      about: 'Free social running group meeting every Tuesday and Saturday. All paces welcome. Routes through Victoria Park and London Fields.',
      link: 'https://www.facebook.com/hackneyrunningcrew',
      location: {
        city: 'Hackney',
        country: 'United Kingdom',
        latitude: 51.5450,
        longitude: -0.0553,
        street: 'Victoria Park',
      },
      fan_count: 3421,
      category: 'Sports & Recreation',
    },
    {
      id: 'fb_sample_5',
      name: 'Tower Hamlets Badminton Club',
      about: 'Friendly badminton sessions every Thursday at Mile End Leisure Centre. Courts for casual play and competitive matches.',
      link: 'https://www.facebook.com/thbadminton',
      location: {
        city: 'Tower Hamlets',
        country: 'United Kingdom',
        latitude: 51.5203,
        longitude: -0.0293,
        street: 'Mile End Leisure Centre',
      },
      fan_count: 678,
      category: 'Sports Club',
    },
    {
      id: 'fb_sample_6',
      name: 'Islington Padel Hub',
      about: "London's newest padel venue with 4 indoor courts. Beginner clinics every Sunday. Book courts or join our social sessions.",
      link: 'https://www.facebook.com/islingtonpadel',
      location: {
        city: 'Islington',
        country: 'United Kingdom',
        latitude: 51.5416,
        longitude: -0.1022,
        street: 'Highbury Fields',
      },
      fan_count: 1234,
      category: 'Sports & Recreation Venue',
    },
    {
      id: 'fb_sample_7',
      name: 'Kensington Cycling Club',
      about: 'Road cycling club for all levels. Weekend rides to Surrey Hills. Midweek evening spins through Hyde Park. Social events monthly.',
      link: 'https://www.facebook.com/kensingtoncycling',
      location: {
        city: 'Kensington and Chelsea',
        country: 'United Kingdom',
        latitude: 51.5020,
        longitude: -0.1947,
        street: 'Hyde Park',
      },
      fan_count: 2156,
      category: 'Sports Club',
    },
    {
      id: 'fb_sample_8',
      name: 'Lambeth Yoga Collective',
      about: 'Community yoga classes in Brixton and Clapham. Vinyasa, Hatha, and Yin styles. Pay-what-you-can sessions available.',
      link: 'https://www.facebook.com/lambethyoga',
      location: {
        city: 'Lambeth',
        country: 'United Kingdom',
        latitude: 51.4571,
        longitude: -0.1156,
        street: 'Brixton Recreation Centre',
      },
      fan_count: 4567,
      category: 'Yoga Studio',
    },
    {
      id: 'fb_sample_9',
      name: 'East London Swimming Masters',
      about: 'Masters swimming for adults 18+. Coached sessions at London Fields Lido and York Hall. Training for fitness and competition.',
      link: 'https://www.facebook.com/eastlondonswimming',
      location: {
        city: 'Hackney',
        country: 'United Kingdom',
        latitude: 51.5370,
        longitude: -0.0610,
        street: 'London Fields Lido',
      },
      fan_count: 890,
      category: 'Sports Club',
    },
    {
      id: 'fb_sample_10',
      name: 'Camden Climbing Collective',
      about: 'Indoor bouldering and climbing community. Weekly sessions at local walls. Outdoor trips to Portland and the Peak District.',
      link: 'https://www.facebook.com/camdenclimbing',
      location: {
        city: 'Camden',
        country: 'United Kingdom',
        latitude: 51.5450,
        longitude: -0.1340,
        street: 'The Castle Climbing Centre',
      },
      fan_count: 1789,
      category: 'Sports Club',
    },
  ];
}
