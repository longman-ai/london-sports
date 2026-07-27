import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Try again in a minute.' }, { status: 429 })
    }

    const formData = await req.formData()
    const name = (formData.get('name') as string || '').trim()
    const email = (formData.get('email') as string || '').trim()
    const message = (formData.get('message') as string || '').trim()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message is too long.' }, { status: 400 })
    }

    await prisma.contactMessage.create({
      data: { name, email, message },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
