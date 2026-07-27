'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

// Split out from app/contact/page.tsx because useSearchParams() requires a
// Suspense boundary in the Next.js app router — the page wraps this in
// <Suspense>.
export default function ContactForm() {
  const searchParams = useSearchParams()
  const claimGroupName = searchParams.get('claim')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // Prefill the message when arriving via a "Claim this listing" link on a
  // group page (see app/groups/[id]/page.tsx).
  useEffect(() => {
    if (claimGroupName) {
      setMessage(`Hi, I run "${claimGroupName}" and I'd like to claim/update this listing.\n\n`)
    }
  }, [claimGroupName])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    const form = e.currentTarget
    const formData = new FormData(form)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setStatus('error')
        return
      }
      setStatus('done')
      form.reset()
      setMessage('')
    } catch {
      setError('Failed to connect. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
        <p className="text-emerald-800 font-medium">Thanks — message sent.</p>
        <p className="text-emerald-700 text-sm mt-1">We&apos;ll get back to you as soon as we can.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-stone-200 p-6 md:p-8 shadow-sm">
      <div className="mb-5">
        <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1.5">
          Name
        </label>
        <input
          type="text" id="name" name="name" required
          className="w-full px-3.5 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-stone-900"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
          Email
        </label>
        <input
          type="email" id="email" name="email" required
          className="w-full px-3.5 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-stone-900"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1.5">
          Message
        </label>
        <textarea
          id="message" name="message" required rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. I run [group name] and I'd like to update/claim our listing..."
          className="w-full px-3.5 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-stone-900 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 font-semibold text-sm transition-colors disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
    </form>
  )
}
