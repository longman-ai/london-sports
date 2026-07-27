import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Simple in-memory rate limit: max 5 requests per IP per minute (same
// pattern as /api/audit on the NovaList site).
const rateMap = new Map<string, number[]>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const window = 60_000
  const max = 5
  const hits = (rateMap.get(ip) || []).filter((t) => now - t < window)
  if (hits.length >= max) return false
  hits.push(now)
  rateMap.set(ip, hits)
  return true
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Try again in a minute.' }, { status: 429 })
    }

    const body = await req.json().catch(() => null)
    const email = (body?.email || '').trim().toLowerCase()

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    // Upsert so re-submitting an email (or re-subscribing after a prior
    // unsubscribe) doesn't error out.
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { unsubscribedAt: null },
      create: { email, source: 'footer' },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
