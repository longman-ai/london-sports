import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config({ path: ".env.local" });
config({ path: ".env" });

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
});

const groups = [
  // ===================== FOOTBALL =====================
  {
    externalId: "football-hackney-wick-fc",
    sport: "Football",
    borough: "Hackney",
    name: "Hackney Wick FC",
    venue: "Mabley Green & Hackney Marshes",
    area: "Hackney Wick",
    level: "All levels",
    description:
      "Community football club offering free coaching and training sessions. Runs women's beginners training, youth programmes and community wellbeing initiatives across Hackney.",
    contact: "https://www.hackneywickfc.com/",
    sourceUrl: "https://www.hackneywickfc.com/",
    isVenue: false,
  },
  {
    externalId: "football-los-campos-fc",
    sport: "Football",
    borough: "Hackney",
    name: "Los Campos Youth FC",
    venue: "London Fields",
    area: "London Fields",
    level: "All levels",
    description:
      "Community youth football club born in London Fields in 2015. Teams competing from U8 to U17 with a focus on developing young players in the local area.",
    contact: "https://www.loscamposfc.com",
    sourceUrl: "https://www.loscamposfc.com",
    isVenue: false,
  },
  {
    externalId: "football-hackney-marshes",
    sport: "Football",
    borough: "Hackney",
    name: "Hackney Marshes Centre",
    venue: "Hackney Marshes",
    area: "Hackney Marshes",
    level: "All levels",
    description:
      "Iconic London football venue with over 80 grass football, rugby and cricket pitches. Includes 26 modern changing rooms, meeting rooms and bar. Available for casual bookings, leagues, teams and clubs.",
    contact: "https://hackney.gov.uk/hackney-marshes",
    sourceUrl: "https://www.11aside.org/venues/255/Hackney-Marshes",
    isVenue: true,
  },
  {
    externalId: "football-millfields-park-fc",
    sport: "Football",
    borough: "Hackney",
    name: "Millfields Park FC",
    venue: "Millfields Park",
    area: "Hackney Central",
    level: "All levels",
    description:
      "Community club providing children in and around Hackney a chance to belong and express themselves within football and sport. Free youth coaching sessions.",
    contact: "https://millfieldsparkfc.com/",
    sourceUrl: "https://millfieldsparkfc.com/",
    isVenue: false,
  },
  {
    externalId: "football-fc-urban-haggerston",
    sport: "Football",
    borough: "Hackney",
    name: "FC Urban Haggerston",
    venue: "Haggerston Park",
    area: "Haggerston",
    level: "All levels",
    description:
      "Social 5-a-side and 7-a-side football sessions in Haggerston. No team needed - just sign up as an individual and get matched into games. Casual and competitive options available.",
    contact: "https://www.fcurban.com/",
    sourceUrl:
      "https://www.fcurban.com/blog/play-5-a-side-and-7-a-side-football-at-haggerston-join-social-football-in-hackney",
    isVenue: false,
  },
  {
    externalId: "football-playfootball-islington",
    sport: "Football",
    borough: "Islington",
    name: "PlayFootball Islington Market Road",
    venue: "Market Road Football Pitches",
    area: "Caledonian Road",
    level: "All levels",
    description:
      "5-a-side and 7-a-side football leagues at a dedicated football venue in Islington. Social and competitive leagues available for teams and individuals.",
    contact: "https://www.playfootball.net/venues/islington-market-road",
    sourceUrl:
      "https://www.playfootball.net/venues/islington-market-road/join-a-league",
    isVenue: true,
  },
  {
    externalId: "football-powerleague-shoreditch",
    sport: "Football",
    borough: "Tower Hamlets",
    name: "Powerleague Shoreditch",
    venue: "Powerleague Shoreditch",
    area: "Shoreditch",
    level: "All levels",
    description:
      "One of the UK's most iconic 5-a-side football venues, located near Shoreditch High Street station. Also features padel courts added in 2024. Hosts social leagues and individual bookings.",
    contact: "https://www.powerleague.com/padel-shoreditch",
    sourceUrl: "https://www.powerleague.com/padel-shoreditch",
    isVenue: true,
  },
  // ===================== RUNNING =====================
  {
    externalId: "running-outrunners",
    sport: "Running",
    borough: "Hackney",
    name: "The Outrunners",
    venue: "Victoria Park & Hackney Wick",
    area: "Hackney Wick",
    level: "All levels",
    description:
      "Youth charity and adult running club based in Hackney Wick. Combines social mentoring for young people aged 8-18 with an adult running community. Regular group runs around Victoria Park.",
    contact: "https://www.theoutrunners.org/",
    sourceUrl:
      "https://www.timeout.com/london/sport-and-fitness/running-groups-in-london",
    isVenue: false,
  },
  {
    externalId: "running-london-city-runners",
    sport: "Running",
    borough: "Islington",
    name: "London City Runners",
    venue: "Various locations across London",
    area: "Angel",
    level: "All levels",
    description:
      "London's largest free running club, not funded or affiliated to any brand. Regular group runs across central London with a welcoming community for all paces.",
    contact: "https://www.londoncityrunners.com/",
    sourceUrl: "https://www.londoncityrunners.com/",
    isVenue: false,
  },
  {
    externalId: "running-london-heathside",
    sport: "Running",
    borough: "Camden",
    name: "London Heathside",
    venue: "Parliament Hill Athletics Track",
    area: "Hampstead Heath",
    level: "All levels",
    description:
      "Friendly community athletics club welcoming runners and athletes of all standards and ages. Promotes participation and excellence in road running, track and field athletics and cross country running.",
    contact: "https://www.londonheathside.org.uk/",
    sourceUrl:
      "https://www.runandbecome.com/london-running-clubs/london-heathside",
    isVenue: false,
  },
  {
    externalId: "running-parkrun-hackney-marshes",
    sport: "Running",
    borough: "Hackney",
    name: "Hackney Marshes parkrun",
    venue: "Hackney Marshes",
    area: "Hackney Marshes",
    level: "All levels",
    description:
      "Free, weekly, community 5km run every Saturday at 9am. Open to all - walkers, joggers and runners. Part of the global parkrun movement.",
    contact: "https://www.parkrun.org.uk/hackneymarshes/",
    sourceUrl: "https://www.parkrun.org.uk/hackneymarshes/",
    isVenue: false,
  },
  {
    externalId: "running-camden-runners",
    sport: "Running",
    borough: "Camden",
    name: "Camden Runners",
    venue: "Regent's Park",
    area: "Regent's Park",
    level: "All levels",
    description:
      "Friendly running club based in Camden with regular sessions around Regent's Park. Caters to all abilities from beginners to experienced marathon runners.",
    contact: "https://www.runningclubslondon.co.uk/",
    sourceUrl: "https://www.runningclubslondon.co.uk/",
    isVenue: false,
  },
  {
    externalId: "running-puresport-shoreditch",
    sport: "Running",
    borough: "Tower Hamlets",
    name: "Puresport Run Club",
    venue: "Shoreditch & Victoria Park",
    area: "Shoreditch",
    level: "Intermediate",
    description:
      "Social running events across east London including Hackney and Shoreditch. Equal parts cordial and competitive with regular group runs and post-run socials.",
    contact: "https://www.puresport.co/",
    sourceUrl:
      "https://www.jenkaarlo.com/blog/best-under-the-radar-running-clubs-in-london",
    isVenue: false,
  },
  // ===================== TENNIS =====================
  {
    externalId: "tennis-hackney-tennis",
    sport: "Tennis",
    borough: "Hackney",
    name: "Hackney Tennis",
    venue: "Various Hackney Parks",
    area: "Hackney",
    level: "All levels",
    description:
      "Tennis for all across 28 park tennis courts in Hackney. Offers community tennis, leagues, coaching, social tennis and fitness sessions across London's East End.",
    contact: "https://www.hackneytennis.co.uk/",
    sourceUrl: "https://www.hackneytennis.co.uk/",
    isVenue: false,
  },
  {
    externalId: "tennis-britannia-rooftop",
    sport: "Tennis",
    borough: "Hackney",
    name: "Britannia Leisure Centre Tennis Courts",
    venue: "Britannia Leisure Centre",
    area: "Shoreditch",
    level: "All levels",
    description:
      "Two rooftop tennis courts with panoramic London views at the modern Britannia Leisure Centre. Available to book for public use through Better.",
    contact:
      "https://www.better.org.uk/leisure-centre/london/hackney/britannia-leisure-centre",
    sourceUrl:
      "https://www.better.org.uk/leisure-centre/london/hackney/britannia-leisure-centre/tennis-britannia-leisure-centre",
    isVenue: true,
  },
  {
    externalId: "tennis-islington-tennis-centre",
    sport: "Tennis",
    borough: "Islington",
    name: "Islington Tennis Centre",
    venue: "Islington Tennis Centre",
    area: "Highbury",
    level: "All levels",
    description:
      "Major indoor and outdoor tennis facility in North London offering coaching, court hire, leagues and social tennis sessions for all ages and abilities.",
    contact: "https://www.better.org.uk/leisure-centre/london/islington/islington-tennis-centre",
    sourceUrl:
      "https://www.padelandtennis.co.uk/blog/outdoor-tennis-courts-london-a-comprehensive-guide/",
    isVenue: true,
  },
  {
    externalId: "tennis-parliament-hill",
    sport: "Tennis",
    borough: "Camden",
    name: "Parliament Hill Tennis Courts",
    venue: "Parliament Hill",
    area: "Hampstead Heath",
    level: "All levels",
    description:
      "Outdoor public tennis courts set in the beautiful surroundings of Hampstead Heath. Courts available to book for casual play with stunning views across London.",
    contact: "https://www.better.org.uk/",
    sourceUrl:
      "https://www.padelandtennis.co.uk/blog/outdoor-tennis-courts-london-a-comprehensive-guide/",
    isVenue: true,
  },
  {
    externalId: "tennis-hyde-park",
    sport: "Tennis",
    borough: "Westminster",
    name: "Park Sports Hyde Park Tennis",
    venue: "Hyde Park Sports Centre",
    area: "Hyde Park",
    level: "All levels",
    description:
      "Six tennis courts in the heart of Hyde Park available on a pay & play basis. LTA qualified coaching, school holiday camps and a sociable café in beautiful Royal Park surroundings.",
    contact: "https://parksports.co.uk/venues/hyde-park",
    sourceUrl: "https://parksports.co.uk/venues/hyde-park",
    isVenue: true,
  },
  // ===================== PADEL =====================
  {
    externalId: "padel-hyde-park",
    sport: "Padel",
    borough: "Westminster",
    name: "Park Sports Hyde Park Padel",
    venue: "Hyde Park Sports Centre",
    area: "Hyde Park",
    level: "All levels",
    description:
      "Floodlit outdoor padel court in Hyde Park, bookable up to 7 days in advance on a pay & play basis. No membership required. Great for first-time padel players in a central London park setting.",
    contact: "https://parksports.co.uk/activities/pay-and-play-padel/hyde-park",
    sourceUrl:
      "https://parksports.co.uk/activities/pay-and-play-padel/hyde-park",
    isVenue: true,
  },
  {
    externalId: "padel-powerleague-shoreditch",
    sport: "Padel",
    borough: "Tower Hamlets",
    name: "Powerleague Shoreditch Padel",
    venue: "Powerleague Shoreditch",
    area: "Shoreditch",
    level: "All levels",
    description:
      "Padel courts added in July 2024 to one of London's most iconic sports venues. Located steps from Shoreditch High Street Rail Station, welcoming thousands of players weekly.",
    contact: "https://www.powerleague.com/padel-shoreditch",
    sourceUrl: "https://www.powerleague.com/padel-shoreditch",
    isVenue: true,
  },
  {
    externalId: "padel-stratford-padel-club",
    sport: "Padel",
    borough: "Tower Hamlets",
    name: "Stratford Padel Club",
    venue: "221 High St, London E15 2AE",
    area: "Stratford",
    level: "All levels",
    description:
      "Dedicated padel club in Stratford with multiple courts. London's largest padel venue offering coaching, social play and competitive matches for all levels.",
    contact: "https://stratfordpadelclub.com/",
    sourceUrl: "https://www.thehandbook.com/best-padel-court-london/",
    isVenue: true,
  },
  {
    externalId: "padel-harbour-club-chelsea",
    sport: "Padel",
    borough: "Kensington and Chelsea",
    name: "The Harbour Club Chelsea Padel",
    venue: "The Harbour Club",
    area: "Chelsea",
    level: "Intermediate",
    description:
      "Three indoor padel courts at Chelsea's premium Harbour Club. Offers group and private padel lessons guided by skilled professional coaches. Membership required.",
    contact: "https://www.harbourclub.com/",
    sourceUrl:
      "https://www.padelpadelpadel.com/3-of-the-best-padel-clubs-in-london/",
    isVenue: true,
  },
  {
    externalId: "padel-social-club-earls-court",
    sport: "Padel",
    borough: "Kensington and Chelsea",
    name: "Padel Social Club Earls Court",
    venue: "Empress Place, SW6 1TT",
    area: "Earls Court",
    level: "All levels",
    description:
      "Outdoor padel courts in Earls Court with a strong social community. Regular sessions, leagues and coaching available for all abilities.",
    contact: "https://padelsocialclub.com/",
    sourceUrl:
      "https://theglossarymagazine.com/arts-culture/best-padel-courts-london/",
    isVenue: true,
  },
  // ===================== BASKETBALL =====================
  {
    externalId: "basketball-play-basketball-london",
    sport: "Basketball",
    borough: "Hackney",
    name: "PlayBasketballLondon",
    venue: "Various courts across London",
    area: "Hackney & citywide",
    level: "All levels",
    description:
      "London's largest pickup basketball community connecting 1000+ active players across 50+ courts. Find free and paid games at Finsbury Park, Clapham Common, Canary Wharf, Hackney and more daily.",
    contact: "https://playbasketballlondon.com/",
    sourceUrl: "https://playbasketballlondon.com/",
    isVenue: false,
  },
  {
    externalId: "basketball-basketble-kings-cross",
    sport: "Basketball",
    borough: "Camden",
    name: "Basketble Kings Cross",
    venue: "Kings Cross Sports Hall",
    area: "Kings Cross",
    level: "All levels",
    description:
      "Weekly Saturday pickup basketball games at Kings Cross. Part of the Basketble network organising social basketball sessions across London. Pay per session, all welcome.",
    contact: "https://basketble.com/",
    sourceUrl: "https://basketble.com/social-pickup-games/",
    isVenue: false,
  },
  {
    externalId: "basketball-the-regal-lambeth",
    sport: "Basketball",
    borough: "Lambeth",
    name: "The Regal Basketball Court",
    venue: "Black Prince Community Hub",
    area: "Lambeth",
    level: "All levels",
    description:
      "One of London's finest indoor basketball courts, transformed by Nike from a basic facility into a showpiece with Junckers beech wood flooring. Located inside the Black Prince Community Hub.",
    contact: "https://www.gomammoth.co.uk/basketball/courts-london/",
    sourceUrl: "https://www.gomammoth.co.uk/basketball/courts-london/",
    isVenue: true,
  },
  {
    externalId: "basketball-finsbury-leisure",
    sport: "Basketball",
    borough: "Islington",
    name: "Finsbury Leisure Centre Basketball",
    venue: "Finsbury Leisure Centre",
    area: "Old Street",
    level: "All levels",
    description:
      "Indoor basketball court hire near Old Street station. Popular venue for pickup games and league basketball in central London.",
    contact: "https://www.playfinder.com/london/basketball",
    sourceUrl: "https://www.playfinder.com/london/basketball",
    isVenue: true,
  },
  {
    externalId: "basketball-go-mammoth-london",
    sport: "Basketball",
    borough: "Lambeth",
    name: "GO Mammoth Basketball League",
    venue: "Various London venues",
    area: "Lambeth & citywide",
    level: "All levels",
    description:
      "London's biggest recreational basketball leagues. Join as a team or individual. Men's and co-ed mixed leagues available across multiple London venues.",
    contact: "https://www.gomammoth.co.uk/basketball/london/",
    sourceUrl: "https://www.gomammoth.co.uk/basketball/london/",
    isVenue: false,
  },
  {
    externalId: "basketball-meetup-canary-wharf",
    sport: "Basketball",
    borough: "Tower Hamlets",
    name: "Play Basketball London Meetup",
    venue: "Canary Wharf Sports Centre",
    area: "Canary Wharf",
    level: "Intermediate",
    description:
      "Regular Tuesday evening pickup basketball games 18:00-20:00 at Canary Wharf. Community-organised through Meetup with a strong regular player base.",
    contact: "https://www.meetup.com/play-basketball-in-london-and-athens/",
    sourceUrl:
      "https://www.meetup.com/play-basketball-in-london-and-athens/",
    isVenue: false,
  },
  // ===================== BADMINTON =====================
  {
    externalId: "badminton-tower-hamlets-bc",
    sport: "Badminton",
    borough: "Tower Hamlets",
    name: "Tower Hamlets Badminton Club",
    venue: "Various Tower Hamlets venues",
    area: "Tower Hamlets",
    level: "All levels",
    description:
      "One of the oldest badminton clubs in London, founded over 30 years ago. Caters for under 18s and adults with regular sessions across the borough.",
    contact: "https://www.towerhamletsbadmintonclub.co.uk/",
    sourceUrl: "https://www.towerhamletsbadmintonclub.co.uk/",
    isVenue: false,
  },
  {
    externalId: "badminton-black-arrows",
    sport: "Badminton",
    borough: "Hackney",
    name: "Black Arrows Badminton Club",
    venue: "Various Hackney venues",
    area: "Hackney",
    level: "All levels",
    description:
      "Established in 1984 with a tremendous history of achievement. Strong emphasis on coaching and providing young people of Hackney and surrounding boroughs opportunities in badminton.",
    contact: "https://www.blackarrowsbc.com/",
    sourceUrl: "https://www.blackarrowsbc.com/",
    isVenue: false,
  },
  {
    externalId: "badminton-tower-hamlets-meetup",
    sport: "Badminton",
    borough: "Tower Hamlets",
    name: "Tower Hamlets Badminton Meetup",
    venue: "George Green's School & Mulberry Sports Centre",
    area: "Isle of Dogs & Whitechapel",
    level: "Intermediate",
    description:
      "Friendly badminton club running regular sessions in Isle of Dogs and Whitechapel. Players from low-intermediate upwards welcome. Social and competitive play.",
    contact: "https://www.meetup.com/tower-hamlets-badminton-meetup/",
    sourceUrl: "https://www.meetup.com/tower-hamlets-badminton-meetup/",
    isVenue: false,
  },
  // ===================== CRICKET =====================
  {
    externalId: "cricket-hackney-cc",
    sport: "Cricket",
    borough: "Hackney",
    name: "Hackney Cricket Club",
    venue: "Hackney Marshes",
    area: "Hackney Marshes",
    level: "Intermediate",
    description:
      "Local community cricket club based in Hackney. Plays in the North East London Cricket League and friendlies on most weekends throughout the summer.",
    contact: "https://hackneycc.hitscricket.com/",
    sourceUrl: "https://hackneycc.hitscricket.com/",
    isVenue: false,
  },
  {
    externalId: "cricket-london-fields-cc",
    sport: "Cricket",
    borough: "Hackney",
    name: "London Fields Cricket Club",
    venue: "London Fields",
    area: "London Fields",
    level: "All levels",
    description:
      "Community-focused cricket club drawing membership from the local community in and around Hackney and East London. Members of the North East London Cricket League with friendlies across summer months.",
    contact: "https://www.londonfields.net/",
    sourceUrl: "https://www.londonfields.net/",
    isVenue: false,
  },
  {
    externalId: "cricket-pacific-cc",
    sport: "Cricket",
    borough: "Islington",
    name: "Pacific Cricket Club",
    venue: "Various North London grounds",
    area: "Islington & Hackney",
    level: "All levels",
    description:
      "Diverse cricket club playing in Islington, Hackney and other areas of north London. Saturday league cricket, Sunday friendlies and midweek evening matches in the Victoria Park Community Cricket League.",
    contact: "https://www.pacificcc.co.uk/",
    sourceUrl: "https://www.pacificcc.co.uk/",
    isVenue: false,
  },
  // ===================== RUGBY =====================
  {
    externalId: "rugby-hackney-rfc",
    sport: "Rugby",
    borough: "Hackney",
    name: "Hackney RFC",
    venue: "Hackney Marshes & Springfield Park",
    area: "Hackney",
    level: "All levels",
    description:
      "Inclusive, vibrant and friendly rugby club in East London. Community is the heart and soul of the club. Welcomes players of all abilities and backgrounds.",
    contact: "https://www.hackneyrfc.co.uk/",
    sourceUrl: "https://www.hackneyrfc.co.uk/",
    isVenue: false,
  },
  {
    externalId: "rugby-hampstead-rfc",
    sport: "Rugby",
    borough: "Camden",
    name: "Hampstead Rugby Club",
    venue: "Hampstead Heath Extension",
    area: "Hampstead",
    level: "All levels",
    description:
      "The oldest and one of the biggest rugby clubs in central and north London. Multiple teams catering for all abilities from social to competitive rugby.",
    contact: "https://www.hampsteadrugbyclub.co.uk/",
    sourceUrl: "https://www.hampsteadrugbyclub.co.uk/",
    isVenue: false,
  },
  {
    externalId: "rugby-hac-rfc",
    sport: "Rugby",
    borough: "Islington",
    name: "HAC RFC",
    venue: "Honourable Artillery Company grounds",
    area: "City Road",
    level: "Intermediate",
    description:
      "Central London rugby club that's a community, not simply a sports team. Raises funds for partner charities, provides wellbeing support, runs professional networking events.",
    contact: "http://hacrfc.com/the-club",
    sourceUrl: "http://hacrfc.com/the-club",
    isVenue: false,
  },
  // ===================== CYCLING =====================
  {
    externalId: "cycling-camden-cyclists",
    sport: "Cycling",
    borough: "Camden",
    name: "Camden Cyclists",
    venue: "Various Camden locations",
    area: "Camden",
    level: "All levels",
    description:
      "The Camden branch of the London Cycling Campaign. Organises friendly community bike rides including Kentish Town Pedals, campaigns for cycling infrastructure and builds cycling confidence.",
    contact: "https://camdencyclists.org.uk/",
    sourceUrl: "https://camdencyclists.org.uk/",
    isVenue: false,
  },
  {
    externalId: "cycling-lambeth-cyclists",
    sport: "Cycling",
    borough: "Lambeth",
    name: "Lambeth Cyclists",
    venue: "Various Lambeth locations",
    area: "Lambeth",
    level: "All levels",
    description:
      "The Lambeth group of the London Cycling Campaign. Regular local meetings, group rides and cycling advocacy across the borough.",
    contact: "https://lambethcyclists.org.uk/",
    sourceUrl: "https://lambethcyclists.org.uk/",
    isVenue: false,
  },
  {
    externalId: "cycling-giant-camden-team-liv",
    sport: "Cycling",
    borough: "Camden",
    name: "Giant Camden Team Liv",
    venue: "Giant Camden Store",
    area: "Camden Town",
    level: "All levels",
    description:
      "Club for all women cyclists, from beginners to professionals. Promotes personal growth and success through cycling with regular group rides from the Camden store.",
    contact: "https://www.giantcamdenteamliv.com/",
    sourceUrl: "https://www.giantcamdenteamliv.com/",
    isVenue: false,
  },
  {
    externalId: "cycling-london-clarion",
    sport: "Cycling",
    borough: "Lambeth",
    name: "London Clarion Cycling Club",
    venue: "Various South London locations",
    area: "Lambeth & South London",
    level: "All levels",
    description:
      "Historic London cycling club offering friendly, non-competitive social rides for all abilities. Regular weekend rides with a strong community focus.",
    contact: "https://www.londonclarion.org.uk/",
    sourceUrl: "https://www.londonclarion.org.uk/",
    isVenue: false,
  },
  // ===================== SWIMMING =====================
  {
    externalId: "swimming-hackney-aquatics",
    sport: "Swimming",
    borough: "Hackney",
    name: "Hackney Aquatics Club",
    venue: "London Aquatics Centre",
    area: "Queen Elizabeth Olympic Park",
    level: "Intermediate",
    description:
      "Swimming club for competitive swimmers aged 6-65+ with a focus on inclusivity and fun. Based at the London Aquatics Centre in the Olympic Park.",
    contact: "https://londonaquaticscentre.org/clubs-and-partners/swimming-lac/",
    sourceUrl:
      "https://londonaquaticscentre.org/clubs-and-partners/swimming-lac/",
    isVenue: false,
  },
  {
    externalId: "swimming-hackney-anaconda",
    sport: "Swimming",
    borough: "Hackney",
    name: "Hackney Anaconda Swimming Club",
    venue: "Clissold Leisure Centre",
    area: "Stoke Newington",
    level: "All levels",
    description:
      "Inclusive, encouraging and enjoyable competitive swimming club committed to delivering a high-quality aquatics programme from baby swim to national level.",
    contact: "https://www.hackneyanaconda.org/",
    sourceUrl: "https://www.hackneyanaconda.org/",
    isVenue: false,
  },
  {
    externalId: "swimming-london-fields-lido",
    sport: "Swimming",
    borough: "Hackney",
    name: "London Fields Lido",
    venue: "London Fields Lido",
    area: "London Fields",
    level: "All levels",
    description:
      "Iconic heated outdoor 50m swimming pool in Hackney. Open year-round for lane swimming, recreational swimming and community sessions. One of London's few remaining lidos.",
    contact: "https://www.better.org.uk/leisure-centre/london/hackney/london-fields-lido",
    sourceUrl:
      "https://www.playfinder.com/london/results/swimming/hackney",
    isVenue: true,
  },
  {
    externalId: "swimming-poplar-baths",
    sport: "Swimming",
    borough: "Tower Hamlets",
    name: "Poplar Baths Leisure Centre",
    venue: "Poplar Baths",
    area: "Poplar",
    level: "All levels",
    description:
      "Historic swimming pool near All Saints DLR with a 25-metre pool and smaller teaching pool. Offers lane swimming, casual sessions and club activities for all ages and abilities.",
    contact: "https://www.better.org.uk/leisure-centre/london/tower-hamlets/poplar-baths",
    sourceUrl:
      "https://www.hackneygazette.co.uk/news/23657692.five-east-london-swimming-pools-spots-visit-summer/",
    isVenue: true,
  },
  // ===================== YOGA =====================
  {
    externalId: "yoga-triyoga-camden",
    sport: "Yoga",
    borough: "Camden",
    name: "triyoga Camden",
    venue: "triyoga Camden",
    area: "Camden Town",
    level: "All levels",
    description:
      "London's leading yoga and Pilates centre offering 500+ classes per week. Founded in 2000 with a focus on creating high-quality yoga sanctuaries and wellbeing.",
    contact: "https://triyoga.co.uk/",
    sourceUrl: "https://triyoga.co.uk/",
    isVenue: true,
  },
  {
    externalId: "yoga-the-yoga-studio-islington",
    sport: "Yoga",
    borough: "Islington",
    name: "The Yoga Studio London",
    venue: "The Yoga Studio London",
    area: "Islington",
    level: "All levels",
    description:
      "Beautiful community of well-trained and experienced teachers, students and friends. Small class sizes (max 9) for personalised attention and genuine connection.",
    contact: "https://www.theyogastudiolondon.com/",
    sourceUrl: "https://www.theyogastudiolondon.com/",
    isVenue: true,
  },
  {
    externalId: "yoga-samya-studios-islington",
    sport: "Yoga",
    borough: "Islington",
    name: "Sāmya Studios",
    venue: "Sāmya Studios",
    area: "Islington",
    level: "All levels",
    description:
      "Neighbourhood studio in the heart of Islington for movement, mindfulness, community and care. Offers yoga, pilates and breathwork classes and treatments.",
    contact: "https://samyastudios.com/",
    sourceUrl: "https://samyastudios.com/",
    isVenue: true,
  },
  {
    externalId: "yoga-moreyoga-london",
    sport: "Yoga",
    borough: "Westminster",
    name: "MoreYoga",
    venue: "30+ studios across London",
    area: "Westminster & citywide",
    level: "All levels",
    description:
      "London's most affordable yoga with 30+ studios. From beginners to advanced, rated 4.7/5 stars. Multiple locations including Soho and central London.",
    contact: "https://www.moreyoga.co.uk/",
    sourceUrl: "https://www.moreyoga.co.uk/",
    isVenue: true,
  },
  // ===================== CLIMBING =====================
  {
    externalId: "climbing-district-london-fields",
    sport: "Climbing",
    borough: "Hackney",
    name: "Climbing District London Fields",
    venue: "Unit 30, Canal Place, Andrews Road, E8 4FX",
    area: "London Fields",
    level: "All levels",
    description:
      "Modern, inclusive bouldering centre near Cambridge Heath Overground. One of three Climbing District centres offering the most affordable climbing prices in London. Coworking included with membership.",
    contact: "https://climbingdistrict.uk/climbing-gym/london-fields/",
    sourceUrl: "https://climbingdistrict.uk/climbing-gym/london-fields/",
    isVenue: true,
  },
  {
    externalId: "climbing-mile-end-wall",
    sport: "Climbing",
    borough: "Tower Hamlets",
    name: "Mile End Climbing Wall",
    venue: "Mile End Climbing Wall, Haverfield Road",
    area: "Mile End",
    level: "All levels",
    description:
      "Community climbing wall focused on development through challenge. Prioritises safeguarding and provides a safe environment for climbers of all levels including children and beginners.",
    contact: "https://www.mileendwall.org.uk/",
    sourceUrl: "https://www.mileendwall.org.uk/",
    isVenue: true,
  },
  {
    externalId: "climbing-castle-climbing",
    sport: "Climbing",
    borough: "Islington",
    name: "The Castle Climbing Centre",
    venue: "Green Lanes, N4 2HA",
    area: "Manor House",
    level: "All levels",
    description:
      "Iconic climbing centre housed in a former Victorian water pumping station. Over 30 years of climbing history with top rope, lead climbing and bouldering walls, gym, café, shop and garden.",
    contact: "https://www.castle-climbing.co.uk/",
    sourceUrl: "https://www.castle-climbing.co.uk/",
    isVenue: true,
  },
  {
    externalId: "climbing-gym-sen-lambeth",
    sport: "Climbing",
    borough: "Lambeth",
    name: "Climbing Gym Sen",
    venue: "Railway Arch 210, Newnham Terrace, SE1 7DR",
    area: "Lambeth North",
    level: "All levels",
    description:
      "Bouldering gym in a railway arch, 3 minutes from Lambeth North station and 9 minutes from Waterloo. Open weekdays 11am-10pm, weekends 9am-8pm.",
    contact: "https://www.climbinggymsen.co.uk/",
    sourceUrl: "https://www.climbinggymsen.co.uk/",
    isVenue: true,
  },
  {
    externalId: "climbing-stronghold-hackney",
    sport: "Climbing",
    borough: "Hackney",
    name: "Stronghold Climbing Centre Hackney",
    venue: "Stronghold, Hackney",
    area: "Tottenham & Hackney",
    level: "All levels",
    description:
      "Modern, large and well-equipped bouldering centre with a strong climbing community. Popular with locals and known for quality route setting.",
    contact: "https://www.strongholdclimbing.com/",
    sourceUrl:
      "https://www.reddit.com/r/bouldering/comments/17342uo/london_climbing_gyms/",
    isVenue: true,
  },
  // ===================== MORE FOOTBALL =====================
  {
    externalId: "football-hackney-borough-youth",
    sport: "Football",
    borough: "Hackney",
    name: "Hackney Borough Youth FC",
    venue: "Various Hackney pitches",
    area: "Hackney",
    level: "All levels",
    description:
      "FA Accredited youth football club and community interest company based in Hackney. Provides coaching and competitive football for young people across the borough.",
    contact: "https://www.hackneyboroughyouth.co.uk/",
    sourceUrl: "https://www.hackneyboroughyouth.co.uk/",
    isVenue: false,
  },
  {
    externalId: "football-5aside-org",
    sport: "Football",
    borough: "Westminster",
    name: "5aside.org Social Leagues",
    venue: "25+ London venues",
    area: "Westminster & citywide",
    level: "All levels",
    description:
      "Social football leagues for all abilities at over 25 London venues. 5-a-side, 6-a-side and 7-a-side leagues running across London including central locations.",
    contact: "https://5aside.org/",
    sourceUrl: "https://5aside.org/about/",
    isVenue: false,
  },
  // ===================== MORE RUNNING =====================
  {
    externalId: "running-parkrun-highbury",
    sport: "Running",
    borough: "Islington",
    name: "Highbury Fields parkrun",
    venue: "Highbury Fields",
    area: "Highbury",
    level: "All levels",
    description:
      "Free, weekly community 5km run every Saturday at 9am in Highbury Fields. Open to all walkers, joggers and runners. Part of the global parkrun movement.",
    contact: "https://www.parkrun.org.uk/highburyfields/",
    sourceUrl: "https://www.parkrun.org.uk/highburyfields/",
    isVenue: false,
  },
  // ===================== MORE BADMINTON =====================
  {
    externalId: "badminton-royals-bc",
    sport: "Badminton",
    borough: "Hackney",
    name: "The Royals Badminton Club",
    venue: "Various East London venues",
    area: "East London",
    level: "Advanced",
    description:
      "Competitive badminton club drawing skilled players from Hackney, Tower Hamlets, Newham and across East London. Welcomes skilled players from all over Greater London.",
    contact: "https://theroyalsbc.co.uk/",
    sourceUrl: "https://theroyalsbc.co.uk/",
    isVenue: false,
  },
  // ===================== MORE TENNIS =====================
  {
    externalId: "tennis-regents-park",
    sport: "Tennis",
    borough: "Westminster",
    name: "Regent's Park Tennis Centre",
    venue: "Regent's Park",
    area: "Regent's Park",
    level: "All levels",
    description:
      "Public tennis courts in the beautiful setting of Regent's Park. Available for pay & play booking with coaching options. One of central London's premier outdoor tennis locations.",
    contact: "https://parksports.co.uk/",
    sourceUrl: "https://parksports.co.uk/",
    isVenue: true,
  },
  // ===================== MORE CYCLING =====================
  {
    externalId: "cycling-no-limit",
    sport: "Cycling",
    borough: "Hackney",
    name: "No Limit Cycling Club",
    venue: "Various London locations",
    area: "Hackney & citywide",
    level: "All levels",
    description:
      "All-inclusive and vibrant London cycling community. Diverse range of cycling opportunities regardless of background or experience level.",
    contact: "https://nolimit.bike/",
    sourceUrl: "https://nolimit.bike/",
    isVenue: false,
  },
  // ===================== MORE SWIMMING =====================
  {
    externalId: "swimming-oasis-camden",
    sport: "Swimming",
    borough: "Camden",
    name: "Oasis Sports Centre",
    venue: "32 Endell Street, WC2H 9AG",
    area: "Covent Garden",
    level: "All levels",
    description:
      "Unique outdoor heated swimming pool in central London alongside indoor pool. Also offers gym, fitness classes including yoga, bums & tums and circuits. Open year-round.",
    contact: "https://www.better.org.uk/leisure-centre/london/camden/oasis-sports-centre",
    sourceUrl:
      "https://cindex.camden.gov.uk/kb5/camden/cd/results.action?nh=20&sortorder=1&sorttype=field&sortfield=review_average&communitychannel=11-70",
    isVenue: true,
  },
  // ===================== MORE YOGA =====================
  {
    externalId: "yoga-fierce-grace-primrose-hill",
    sport: "Yoga",
    borough: "Camden",
    name: "Fierce Grace Primrose Hill",
    venue: "Fierce Grace Studio",
    area: "Primrose Hill",
    level: "All levels",
    description:
      "Hot yoga studio in Primrose Hill offering a range of heated yoga classes including their signature Fierce Grace system. Community-focused with experienced teachers.",
    contact: "https://www.fiercegrace.com/",
    sourceUrl:
      "https://www.reddit.com/r/yoga/comments/1mybnn5/london_yoga/",
    isVenue: true,
  },
  // ===================== MORE CRICKET =====================
  {
    externalId: "cricket-stoke-newington-cc",
    sport: "Cricket",
    borough: "Hackney",
    name: "Stoke Newington Cricket Club",
    venue: "Clissold Park",
    area: "Stoke Newington",
    level: "All levels",
    description:
      "Community cricket club in Stoke Newington partnered with Middlesex Cricket and Hackney Council. Recently launched walking cricket for men and women aged 50+.",
    contact: "https://www.middlesexccc.com/",
    sourceUrl: "https://www.middlesexccc.com/",
    isVenue: false,
  },
  // ===================== KENSINGTON & CHELSEA extras =====================
  {
    externalId: "yoga-life-centre-notting-hill",
    sport: "Yoga",
    borough: "Kensington and Chelsea",
    name: "The Life Centre",
    venue: "The Life Centre, Notting Hill",
    area: "Notting Hill",
    level: "All levels",
    description:
      "Renowned yoga studio in Notting Hill offering a wide variety of yoga styles and teacher training. Known for high-quality teaching and a supportive community atmosphere.",
    contact: "https://www.thelifecentre.com/",
    sourceUrl:
      "https://www.reddit.com/r/yoga/comments/1mybnn5/london_yoga/",
    isVenue: true,
  },
  {
    externalId: "tennis-holland-park-lawn-tc",
    sport: "Tennis",
    borough: "Kensington and Chelsea",
    name: "Holland Park Lawn Tennis Club",
    venue: "Holland Park",
    area: "Holland Park",
    level: "All levels",
    description:
      "Historic lawn tennis club set within beautiful Holland Park. Offers membership, coaching, social tennis and competitive leagues in one of London's most scenic settings.",
    contact: "https://www.hpltc.co.uk/",
    sourceUrl:
      "https://www.flolondon.co.uk/all-posts/where-to-play-tennis-in-london",
    isVenue: true,
  },
  // ===================== WESTMINSTER extras =====================
  {
    externalId: "climbing-arch-wall-bermondsey",
    sport: "Climbing",
    borough: "Lambeth",
    name: "The Arch Climbing Wall",
    venue: "Various London locations",
    area: "Bermondsey & Vauxhall",
    level: "All levels",
    description:
      "Four indoor bouldering walls across London under one membership. Daily beginner lessons available, with an online shop for gear. Great community atmosphere.",
    contact: "https://www.archclimbingwall.com/",
    sourceUrl: "https://www.archclimbingwall.com/",
    isVenue: true,
  },
  {
    externalId: "swimming-westminster-lodge",
    sport: "Swimming",
    borough: "Westminster",
    name: "Marshall Street Leisure Centre",
    venue: "Marshall Street, W1F 7EL",
    area: "Soho",
    level: "All levels",
    description:
      "Grade II listed swimming pool in the heart of Soho with a stunning art deco interior. Offers lane swimming, aqua fitness and casual swimming sessions.",
    contact: "https://www.everyoneactive.com/centre/marshall-street-leisure-centre/",
    sourceUrl: "https://www.everyoneactive.com/centre/marshall-street-leisure-centre/",
    isVenue: true,
  },
  {
    externalId: "rugby-kings-cross-steelers",
    sport: "Rugby",
    borough: "Camden",
    name: "Kings Cross Steelers RFC",
    venue: "Various London grounds",
    area: "Kings Cross",
    level: "All levels",
    description:
      "The world's first openly gay rugby club, founded in 1995. Welcomes all regardless of sexuality, gender or ability. Multiple men's and women's teams.",
    contact: "https://www.kcrfc.com/",
    sourceUrl: "https://www.kcrfc.com/",
    isVenue: false,
  },
];

async function main() {
  console.log(`Seeding ${groups.length} real London sports groups...`);

  let created = 0;
  let updated = 0;

  for (const group of groups) {
    const result = await prisma.group.upsert({
      where: { externalId: group.externalId },
      update: {
        ...group,
        status: "APPROVED",
        sourceType: "MANUAL_ENTRY",
        isActive: true,
      },
      create: {
        ...group,
        status: "APPROVED",
        sourceType: "MANUAL_ENTRY",
        isActive: true,
      },
    });

    if (result.createdAt.getTime() === result.updatedAt.getTime()) {
      created++;
    } else {
      updated++;
    }
  }

  console.log(
    `Done! Created: ${created}, Updated: ${updated}, Total: ${groups.length}`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
