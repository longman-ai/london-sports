import { MetadataRoute } from 'next'

const SPORTS = ['football', 'basketball', 'tennis', 'badminton', 'running', 'padel', 'cricket', 'rugby', 'cycling', 'swimming', 'yoga', 'climbing']
const BOROUGHS = [
  'hackney', 'camden', 'islington', 'lambeth', 'tower-hamlets', 'westminster',
  'kensington-chelsea', 'southwark', 'wandsworth', 'lewisham', 'greenwich',
  'newham', 'barnet', 'ealing', 'brent', 'enfield', 'haringey', 'waltham-forest',
  'redbridge', 'hounslow', 'hammersmith-and-fulham', 'merton', 'croydon', 'bromley',
  'barking-and-dagenham', 'sutton', 'harrow', 'hillingdon', 'havering',
  'richmond-upon-thames', 'kingston-upon-thames', 'bexley', 'city-of-london'
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://londonsportscommunity.co.uk'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/browse`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/submit`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  const sportBoroughPages = SPORTS.flatMap(sport =>
    BOROUGHS.map(borough => ({
      url: `${baseUrl}/${sport}-${borough}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  )

  return [...staticPages, ...sportBoroughPages]
}
