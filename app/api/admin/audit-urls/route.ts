import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

const WRONG_PAGE_KEYWORDS = [
  'donate', 'donation', 'fundrais', 'gofundme', 'justgiving',
  'crowdfund', 'charity', 'appeal', 'support-us', 'give',
]

async function checkUrl(url: string): Promise<{
  status: number | string;
  finalUrl?: string;
  redirected: boolean;
  title?: string;
}> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 8000)

  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 London Sports Community URL Audit',
        'Accept': 'text/html',
      },
    })
    clearTimeout(timeout)

    const finalUrl = res.url
    const redirected = finalUrl !== url

    let title = ''
    try {
      const text = await res.text()
      const match = text.match(/<title[^>]*>(.*?)<\/title>/is)
      if (match) title = match[1].trim().slice(0, 200)
    } catch {}

    return { status: res.status, finalUrl, redirected, title }
  } catch (err: unknown) {
    clearTimeout(timeout)
    const error = err as Error
    return {
      status: error.name === 'AbortError' ? 'timeout' : 'error',
      redirected: false,
    }
  }
}

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const groups = await prisma.group.findMany({
    where: { status: "APPROVED" },
    select: {
      id: true,
      name: true,
      sport: true,
      borough: true,
      contact: true,
      sourceUrl: true,
    },
  })

  const issues: Array<{
    groupId: string
    groupName: string
    sport: string
    borough: string
    field: string
    url: string
    status: number | string
    issue: string
    suggestedFix?: string
  }> = []

  for (const group of groups) {
    for (const field of ['contact', 'sourceUrl'] as const) {
      const url = group[field]
      if (!url || !url.startsWith('http')) continue

      const result = await checkUrl(url)

      // Check for errors
      if (result.status === 'timeout' || result.status === 'error') {
        issues.push({
          groupId: group.id,
          groupName: group.name,
          sport: group.sport,
          borough: group.borough,
          field,
          url,
          status: result.status,
          issue: result.status === 'timeout' ? 'Site timed out' : 'Connection error',
        })
        continue
      }

      if (typeof result.status === 'number' && result.status >= 400) {
        issues.push({
          groupId: group.id,
          groupName: group.name,
          sport: group.sport,
          borough: group.borough,
          field,
          url,
          status: result.status,
          issue: `HTTP ${result.status}`,
        })
        continue
      }

      // Check for fundraising pages
      const urlLower = url.toLowerCase()
      const titleLower = (result.title || '').toLowerCase()
      const finalLower = (result.finalUrl || '').toLowerCase()

      for (const kw of WRONG_PAGE_KEYWORDS) {
        if (urlLower.includes(kw) || titleLower.includes(kw) || finalLower.includes(kw)) {
          issues.push({
            groupId: group.id,
            groupName: group.name,
            sport: group.sport,
            borough: group.borough,
            field,
            url,
            status: result.status,
            issue: `Possible fundraising/donation page (matched: "${kw}")`,
            suggestedFix: 'Update to the group\'s main website',
          })
          break
        }
      }

      // Small delay
      await new Promise(r => setTimeout(r, 200))
    }
  }

  return NextResponse.json({
    auditedAt: new Date().toISOString(),
    totalGroups: groups.length,
    totalIssues: issues.length,
    issues,
  })
}
