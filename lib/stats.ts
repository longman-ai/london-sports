import { unstable_cache } from 'next/cache';
import { prisma } from './prisma';

/**
 * Single source of truth for site-wide aggregate stats (group counts by
 * sport/borough, totals, recently listed groups).
 *
 * Fixes a real bug found during the 2026-07-27 NovaList audit: the homepage,
 * sport cards, and layout metadata were all reading from a static 48-entry
 * file (data/groups.ts covering only 6 of 12 sports) while /browse and
 * /groups/[id] read live from Postgres (160 entries, all 12 sports). This
 * caused numbers to visibly contradict each other across the same site (e.g.
 * "48+ groups" on the homepage vs "160 groups found" on /browse, and 6 sport
 * cards showing no count at all despite having real listings) and one
 * functional bug: the homepage linked to `/browse?borough=Kensington %26
 * Chelsea` while the database stores the borough as "Kensington and
 * Chelsea", so that link silently returned zero results.
 *
 * Cached for 5 minutes (unstable_cache) so we don't hit Postgres on every
 * request, while staying far more accurate than a static file that's never
 * updated after a scraper/admin approval run.
 */

export interface SiteStats {
  totalGroups: number;
  sportCounts: Record<string, number>; // keyed by lowercase sport slug, e.g. "football"
  boroughCounts: Record<string, number>; // keyed by the exact DB borough string
}

async function fetchSiteStats(): Promise<SiteStats> {
  const [total, bySport, byBorough] = await Promise.all([
    prisma.group.count({ where: { status: 'APPROVED' } }),
    prisma.group.groupBy({ by: ['sport'], where: { status: 'APPROVED' }, _count: true }),
    prisma.group.groupBy({ by: ['borough'], where: { status: 'APPROVED' }, _count: true }),
  ]);

  const sportCounts: Record<string, number> = {};
  for (const row of bySport) {
    sportCounts[row.sport.toLowerCase()] = row._count;
  }

  const boroughCounts: Record<string, number> = {};
  for (const row of byBorough) {
    boroughCounts[row.borough] = row._count;
  }

  return { totalGroups: total, sportCounts, boroughCounts };
}

export const getSiteStats = unstable_cache(fetchSiteStats, ['site-stats'], {
  revalidate: 300,
});

export interface FeaturedGroup {
  id: string;
  name: string;
  sport: string;
  borough: string;
  venue: string;
  area: string;
  level: string;
  description: string;
  isVenue: boolean;
}

async function fetchRecentGroups(limit: number): Promise<FeaturedGroup[]> {
  const groups = await prisma.group.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: {
      id: true,
      name: true,
      sport: true,
      borough: true,
      venue: true,
      area: true,
      level: true,
      description: true,
      isVenue: true,
    },
  });
  return groups;
}

export const getRecentGroups = unstable_cache(
  (limit: number) => fetchRecentGroups(limit),
  ['recent-groups'],
  { revalidate: 300 }
);
