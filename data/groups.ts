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

  // FOOTBALL - Southwark
  {
    id: 'football-southwark-1',
    sport: 'football',
    borough: 'southwark',
    name: 'Powerleague Southwark',
    venue: 'Colombo Centre',
    area: 'Waterloo',
    level: 'All levels',
    description: '5-a-side football leagues and pitch hire at the Colombo Centre. Weekly leagues with promotion and relegation, plus casual booking.',
    contact: 'https://powerplay.co.uk/football/London-Southwark',
    sourceUrl: 'https://powerplay.co.uk/football/London-Southwark'
  },
  {
    id: 'football-southwark-2',
    sport: 'football',
    borough: 'southwark',
    name: 'Marlborough Sports Garden 5-a-side',
    venue: 'Marlborough Sports Garden',
    area: 'Borough',
    level: 'All levels',
    description: 'Corporate and casual 5-a-side football on a newly laid 3G pitch near London Bridge. Walking distance from Borough and Southwark stations.',
    contact: 'https://playfiveaside.com/southwark-corporate-5-a-side-thursdays',
    sourceUrl: 'https://playfiveaside.com/southwark-corporate-5-a-side-thursdays'
  },

  // RUNNING - Southwark
  {
    id: 'running-southwark-1',
    sport: 'running',
    borough: 'southwark',
    name: 'Southwark parkrun',
    venue: 'Southwark Park',
    area: 'Rotherhithe',
    level: 'All levels',
    description: 'Free timed 5k every Saturday at 9am in Southwark Park. All paces welcome — just register once on the parkrun website and bring your barcode.',
    contact: 'https://www.parkrun.org.uk/southwark/',
    sourceUrl: 'https://www.parkrun.org.uk/southwark/'
  },

  // RUNNING - Wandsworth
  {
    id: 'running-wandsworth-1',
    sport: 'running',
    borough: 'wandsworth',
    name: 'Wandsworth Running Club',
    venue: 'Various locations',
    area: 'Wandsworth',
    level: 'All levels',
    description: 'Local running club meeting every Thursday at 7pm. Friendly group runs through Wandsworth\'s parks and streets, all paces welcome.',
    contact: 'https://www.wandsworthrunningclub.com/',
    sourceUrl: 'https://www.wandsworthrunningclub.com/'
  },
  {
    id: 'running-wandsworth-2',
    sport: 'running',
    borough: 'wandsworth',
    name: 'Battersea Park parkrun',
    venue: 'Battersea Park',
    area: 'Battersea',
    level: 'All levels',
    description: 'Free timed 5k every Saturday at 9am in beautiful Battersea Park. Flat, fast course along the Thames. Register on parkrun.org.uk.',
    contact: 'https://www.parkrun.org.uk/battersea/',
    sourceUrl: 'https://www.parkrun.org.uk/battersea/'
  },

  // TENNIS - Lewisham
  {
    id: 'tennis-lewisham-1',
    sport: 'tennis',
    borough: 'lewisham',
    name: 'Play Tennis Lewisham',
    venue: 'Various parks',
    area: 'Lewisham',
    level: 'All levels',
    description: 'Public tennis courts across Lewisham bookable via ClubSpark. Recently renovated courts at multiple park sites with coaching available.',
    contact: 'https://clubspark.lta.org.uk/tennisinlewisham',
    sourceUrl: 'https://clubspark.lta.org.uk/tennisinlewisham',
    isVenue: true
  },
  {
    id: 'tennis-lewisham-2',
    sport: 'tennis',
    borough: 'lewisham',
    name: 'Hilly Fields Tennis Courts',
    venue: 'Hilly Fields Park',
    area: 'Brockley',
    level: 'All levels',
    description: 'Tennis courts with stunning views over Lewisham and the City of London. Coaching from South East London Tennis available for all ages.',
    contact: 'https://southeastlondontennis.com/tennis-courts-in-lewisham-list/',
    sourceUrl: 'https://southeastlondontennis.com/tennis-courts-in-lewisham-list/',
    isVenue: true
  },

  // RUNNING - Greenwich
  {
    id: 'running-greenwich-1',
    sport: 'running',
    borough: 'greenwich',
    name: 'The Greenwich Runners',
    venue: 'Greenwich Park',
    area: 'Greenwich',
    level: 'All levels',
    description: 'The only running group based in Greenwich Park. A friendly, fully licensed Run England group training in the beautiful surroundings of the Royal Borough.',
    contact: 'https://www.greenwichrunners.co.uk/',
    sourceUrl: 'https://www.greenwichrunners.co.uk/'
  },
  {
    id: 'running-greenwich-2',
    sport: 'running',
    borough: 'greenwich',
    name: 'London Frontrunners Greenwich',
    venue: 'Greenwich Park',
    area: 'Greenwich',
    level: 'All levels',
    description: 'Inclusive LGBT+ running club. Wednesday evening runs starting at 7pm — choose 3 or 6 mile loops of Greenwich Park. Post-run social at The Pelton Arms.',
    contact: 'https://londonfrontrunners.org/wednesday-greenwich-park/',
    sourceUrl: 'https://londonfrontrunners.org/wednesday-greenwich-park/'
  },

  // FOOTBALL - Newham
  {
    id: 'football-newham-1',
    sport: 'football',
    borough: 'newham',
    name: 'Powerleague Newham',
    venue: 'Powerleague Newham',
    area: 'Beckton',
    level: 'All levels',
    description: 'Weekly 5-a-side leagues with full refereeing, multiple divisions, promotion and relegation. Also available for casual pitch hire and kids camps.',
    contact: 'https://www.powerleague.com/location/newham',
    sourceUrl: 'https://www.powerleague.com/location/newham'
  },
  {
    id: 'football-newham-2',
    sport: 'football',
    borough: 'newham',
    name: 'Newham 5-a-side Leagues',
    venue: 'Powerleague Newham',
    area: 'Beckton',
    level: 'All skill levels',
    description: '5-a-side and 6-a-side football leagues in Newham. Fully refereed matches with league tables. Join as a team or individual.',
    contact: 'https://www.powerleague.com/5-a-side-leagues-newham',
    sourceUrl: 'https://www.powerleague.com/5-a-side-leagues-newham'
  },

  // RUNNING - Barnet
  {
    id: 'running-barnet-1',
    sport: 'running',
    borough: 'barnet',
    name: 'Shaftesbury Barnet Harriers',
    venue: 'Allianz Park / Copthall Stadium',
    area: 'Hendon',
    level: 'All levels',
    description: 'Historic athletics club founded in 1890. Training in track and field, road running, and cross-country. Competitive and social running for all ages.',
    contact: 'http://sbharriers.co.uk/',
    sourceUrl: 'http://sbharriers.co.uk/'
  },

  // TENNIS - Ealing
  {
    id: 'tennis-ealing-1',
    sport: 'tennis',
    borough: 'ealing',
    name: 'Ealing Lawn Tennis Club',
    venue: 'Ealing Lawn Tennis Club',
    area: 'Ealing',
    level: 'Members & visitors',
    description: 'Large, well-established club since 1882 with 15 courts including heated indoor, grass, clay and hard courts. Social and competitive tennis.',
    contact: 'https://www.ealingtennis.com',
    sourceUrl: 'https://www.ealingtennis.com',
    isVenue: true
  },
  {
    id: 'padel-ealing-1',
    sport: 'padel',
    borough: 'ealing',
    name: 'Park Sports Lammas Park',
    venue: 'Lammas Park',
    area: 'Ealing',
    level: 'All levels',
    description: 'Padel, tennis, netball and 5-a-side football at Lammas Park. Book courts online, coaching and kids camps available.',
    contact: 'https://parksports.co.uk/venues/lammas-park',
    sourceUrl: 'https://parksports.co.uk/venues/lammas-park',
    isVenue: true
  },
  {
    id: 'tennis-ealing-2',
    sport: 'tennis',
    borough: 'ealing',
    name: 'Trailfinders Sports Club Tennis',
    venue: 'Trailfinders Sports Club',
    area: 'West Ealing',
    level: 'All levels',
    description: '4 floodlit tennis courts with coaching for all ages, social tennis sessions, and excellent on-site facilities including a licensed sports bar.',
    contact: 'https://clubspark.lta.org.uk/TrailfindersSportsClub',
    sourceUrl: 'https://clubspark.lta.org.uk/TrailfindersSportsClub',
    isVenue: true
  },

  // RUNNING - Haringey
  {
    id: 'running-haringey-1',
    sport: 'running',
    borough: 'haringey',
    name: 'Enfield & Haringey Athletic Club',
    venue: 'Lee Valley Athletics Centre',
    area: 'Picketts Lock',
    level: 'All levels',
    description: 'Established athletics club formed in 1999, training at the Lee Valley High Performance Centre. Track and field, road running, cross-country for all ages.',
    contact: 'https://enfieldandharingeyac.co.uk/',
    sourceUrl: 'https://enfieldandharingeyac.co.uk/'
  },

  // RUNNING - Enfield
  {
    id: 'running-enfield-1',
    sport: 'running',
    borough: 'enfield',
    name: 'Enfield & Haringey AC (Enfield base)',
    venue: 'QE II Stadium',
    area: 'Enfield',
    level: 'All levels',
    description: 'Athletics club with training at the Queen Elizabeth II Stadium in Enfield. Track, road running, and cross-country sessions available.',
    contact: 'https://enfieldandharingeyac.co.uk/',
    sourceUrl: 'https://enfieldandharingeyac.co.uk/'
  },

  // RUNNING - Waltham Forest
  {
    id: 'running-waltham-forest-1',
    sport: 'running',
    borough: 'waltham-forest',
    name: 'Eton Manor AC',
    venue: 'Various locations',
    area: 'Leyton / Walthamstow',
    level: 'All levels',
    description: 'The running club for Leyton, Walthamstow, Leytonstone and Hackney Wick. Friendly group with regular training sessions and races.',
    contact: 'https://www.eton-manor.com/',
    sourceUrl: 'https://www.eton-manor.com/'
  },

  // PADEL - Hammersmith and Fulham
  {
    id: 'padel-hammersmith-and-fulham-1',
    sport: 'padel',
    borough: 'hammersmith-and-fulham',
    name: 'Padel Courts Hammersmith',
    venue: 'Various venues',
    area: 'Hammersmith',
    level: 'All levels',
    description: 'Padel tennis courts available in Hammersmith and Fulham. Book via Playfinder for pay-and-play sessions at multiple venues.',
    contact: 'https://www.playfinder.com/london/results/padel-tennis/hammersmith-and-fulham',
    sourceUrl: 'https://www.playfinder.com/london/results/padel-tennis/hammersmith-and-fulham',
    isVenue: true
  },

  // FOOTBALL - Brent
  {
    id: 'football-brent-1',
    sport: 'football',
    borough: 'brent',
    name: 'Goals Wembley',
    venue: 'Goals Soccer Centre',
    area: 'Wembley',
    level: 'All levels',
    description: '5-a-side and 7-a-side football centre near Wembley Stadium. Leagues, tournaments and casual pitch hire on state-of-the-art 3G pitches.',
    contact: 'https://www.goalsfootball.co.uk/venues/wembley',
    sourceUrl: 'https://www.goalsfootball.co.uk/venues/wembley'
  },

  // TENNIS - Merton
  {
    id: 'tennis-merton-1',
    sport: 'tennis',
    borough: 'merton',
    name: 'Wimbledon Park Tennis Courts',
    venue: 'Wimbledon Park',
    area: 'Wimbledon',
    level: 'All levels',
    description: 'Public tennis courts in Wimbledon Park. Book via ClubSpark for casual play. Coaching and social sessions available through the park operator.',
    contact: 'https://clubspark.lta.org.uk/wimbledonpark',
    sourceUrl: 'https://clubspark.lta.org.uk/wimbledonpark',
    isVenue: true
  },

  // RUNNING - Croydon
  {
    id: 'running-croydon-1',
    sport: 'running',
    borough: 'croydon',
    name: 'Croydon Harriers',
    venue: 'Croydon Arena',
    area: 'South Norwood',
    level: 'All levels',
    description: 'One of London\'s oldest athletics clubs. Track and field, road running, and cross-country for all ages and abilities. Regular training sessions.',
    contact: 'https://www.croydonharriers.com/',
    sourceUrl: 'https://www.croydonharriers.com/'
  },

  // FOOTBALL - Bromley
  {
    id: 'football-bromley-1',
    sport: 'football',
    borough: 'bromley',
    name: 'Goals Beckenham',
    venue: 'Goals Soccer Centre',
    area: 'Beckenham',
    level: 'All levels',
    description: '5-a-side football leagues and casual pitch hire in Beckenham. Modern 3G pitches, floodlit, with leagues running throughout the week.',
    contact: 'https://www.goalsfootball.co.uk/venues/beckenham',
    sourceUrl: 'https://www.goalsfootball.co.uk/venues/beckenham'
  },

  // RUNNING - Redbridge
  {
    id: 'running-redbridge-1',
    sport: 'running',
    borough: 'redbridge',
    name: 'Wanstead Flats parkrun',
    venue: 'Wanstead Flats',
    area: 'Wanstead',
    level: 'All levels',
    description: 'Free timed 5k every Saturday at 9am on Wanstead Flats. Flat, friendly course. Register once on parkrun.org.uk and just turn up.',
    contact: 'https://www.parkrun.org.uk/wansteadflats/',
    sourceUrl: 'https://www.parkrun.org.uk/wansteadflats/'
  },

  // FOOTBALL - Hounslow
  {
    id: 'football-hounslow-1',
    sport: 'football',
    borough: 'hounslow',
    name: 'Goals Brentford',
    venue: 'Goals Soccer Centre',
    area: 'Brentford',
    level: 'All levels',
    description: '5-a-side and 7-a-side football at Goals Brentford. Weekly leagues, one-off tournaments, and casual pitch hire available.',
    contact: 'https://www.goalsfootball.co.uk/venues/brentford',
    sourceUrl: 'https://www.goalsfootball.co.uk/venues/brentford'
  },

  // TENNIS - Richmond upon Thames
  {
    id: 'tennis-richmond-upon-thames-1',
    sport: 'tennis',
    borough: 'richmond-upon-thames',
    name: 'Richmond Park Tennis Courts',
    venue: 'Richmond Park',
    area: 'Richmond',
    level: 'All levels',
    description: 'Public tennis courts in the beautiful setting of Richmond Park. Book online via the LTA ClubSpark platform.',
    contact: 'https://clubspark.lta.org.uk/richmondpark',
    sourceUrl: 'https://clubspark.lta.org.uk/richmondpark',
    isVenue: true
  },

  // RUNNING - Kingston upon Thames
  {
    id: 'running-kingston-upon-thames-1',
    sport: 'running',
    borough: 'kingston-upon-thames',
    name: 'Kingston parkrun',
    venue: 'Kingston upon Thames',
    area: 'Kingston',
    level: 'All levels',
    description: 'Free timed 5k every Saturday at 9am along the Thames in Kingston. Beautiful riverside route, all paces welcome.',
    contact: 'https://www.parkrun.org.uk/kingston/',
    sourceUrl: 'https://www.parkrun.org.uk/kingston/'
  },

  // FOOTBALL - Barking and Dagenham
  {
    id: 'football-barking-and-dagenham-1',
    sport: 'football',
    borough: 'barking-and-dagenham',
    name: 'Powerleague Barking',
    venue: 'Powerleague Barking',
    area: 'Barking',
    level: 'All levels',
    description: '5-a-side football leagues and pitch hire in Barking. Modern facilities with floodlit 3G pitches, open for league and casual play.',
    contact: 'https://www.powerleague.com/location/barking',
    sourceUrl: 'https://www.powerleague.com/location/barking'
  },

  // FOOTBALL - Sutton
  {
    id: 'football-sutton-1',
    sport: 'football',
    borough: 'sutton',
    name: 'Goals Sutton',
    venue: 'Goals Soccer Centre',
    area: 'Sutton',
    level: 'All levels',
    description: '5-a-side football centre in Sutton with weekly leagues, tournaments, and casual pitch hire on 3G surfaces.',
    contact: 'https://www.goalsfootball.co.uk/venues/sutton',
    sourceUrl: 'https://www.goalsfootball.co.uk/venues/sutton'
  },

  // FOOTBALL - Harrow
  {
    id: 'football-harrow-1',
    sport: 'football',
    borough: 'harrow',
    name: 'Playfinder Football Harrow',
    venue: 'Various venues',
    area: 'Harrow',
    level: 'All levels',
    description: 'Find and book 5-a-side and 7-a-side football pitches across Harrow. Multiple venues with 3G and astroturf surfaces.',
    contact: 'https://www.playfinder.com/london/results/football/harrow',
    sourceUrl: 'https://www.playfinder.com/london/results/football/harrow'
  },

  // FOOTBALL - Hillingdon
  {
    id: 'football-hillingdon-1',
    sport: 'football',
    borough: 'hillingdon',
    name: 'Powerleague Hayes',
    venue: 'Powerleague Hayes',
    area: 'Hayes',
    level: 'All levels',
    description: '5-a-side and 7-a-side football at Powerleague Hayes. Leagues, casual hire, and kids activities on floodlit pitches.',
    contact: 'https://www.powerleague.com/location/hayes',
    sourceUrl: 'https://www.powerleague.com/location/hayes'
  },

  // RUNNING - Havering
  {
    id: 'running-havering-1',
    sport: 'running',
    borough: 'havering',
    name: 'Havering parkrun',
    venue: 'Raphael Park',
    area: 'Romford',
    level: 'All levels',
    description: 'Free timed 5k every Saturday at 9am in Raphael Park. Friendly community event — walk, jog, or run. Register once on parkrun.org.uk.',
    contact: 'https://www.parkrun.org.uk/raphael/',
    sourceUrl: 'https://www.parkrun.org.uk/raphael/'
  },

  // FOOTBALL - Bexley
  {
    id: 'football-bexley-1',
    sport: 'football',
    borough: 'bexley',
    name: 'Playfinder Football Bexley',
    venue: 'Various venues',
    area: 'Bexley',
    level: 'All levels',
    description: 'Book 5-a-side and 7-a-side football pitches across Bexley via Playfinder. Multiple venues with modern facilities.',
    contact: 'https://www.playfinder.com/london/results/football/bexley',
    sourceUrl: 'https://www.playfinder.com/london/results/football/bexley'
  },

  // RUNNING - City of London
  {
    id: 'running-city-of-london-1',
    sport: 'running',
    borough: 'city-of-london',
    name: 'City of London Runners',
    venue: 'Various City locations',
    area: 'City of London',
    level: 'All levels',
    description: 'Lunchtime and after-work running groups through the historic streets of the Square Mile. Perfect for City workers looking to stay active.',
    contact: 'https://www.meetup.com/city-of-london-runners/',
    sourceUrl: 'https://www.meetup.com/city-of-london-runners/'
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
    'hackney', 'camden', 'islington', 'lambeth', 'tower-hamlets', 'westminster',
    'kensington-chelsea', 'southwark', 'wandsworth', 'lewisham', 'greenwich',
    'newham', 'barnet', 'ealing', 'brent', 'enfield', 'haringey', 'waltham-forest',
    'redbridge', 'hounslow', 'hammersmith-and-fulham', 'merton', 'croydon', 'bromley',
    'barking-and-dagenham', 'sutton', 'harrow', 'hillingdon', 'havering',
    'richmond-upon-thames', 'kingston-upon-thames', 'bexley', 'city-of-london'
  ];

  const combinations: Array<{ sport: SportType; borough: BoroughType }> = [];

  sports.forEach((sport) => {
    boroughs.forEach((borough) => {
      combinations.push({ sport, borough });
    });
  });

  return combinations;
};
