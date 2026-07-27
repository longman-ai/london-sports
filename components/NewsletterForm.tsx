'use client'

import { useState } from 'react'

// Was a permanently-disabled "coming soon" input/button. Fixed 2026-07-27
// NovaList audit: this is the site's most valuable commercial asset (an
// owned email list you can use for sponsorship, featured listings, or
// promotion) and it was sitting dead on every page. Stores subscribers in
// the existing Postgres DB (see prisma/schema.prisma NewsletterSubscriber) —
// no new external provider dependency required to start collecting emails
// today.
export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setStatus('error')
        return
      }
      setStatus('done')
      setEmail('')
    } catch {
      setError('Failed to connect. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <p className="text-xs text-emerald-400 mt-1.5">✓ Subscribed — thanks!</p>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={status === 'loading'}
          className="flex-1 px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? '…' : 'Join'}
        </button>
      </div>
      {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
      {!error && <p className="text-xs text-stone-500 mt-1.5">New groups, guides, and community updates.</p>}
    </form>
  )
}
