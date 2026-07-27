import { Suspense } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | London Sports Community',
  description: 'Get in touch — report a listing issue, claim your group, or ask a question.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-xl px-5 sm:px-8 py-16 md:py-20">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">Contact</h1>
          <p className="text-stone-600 mb-10">
            Spotted a wrong listing, want to claim your group, or have a question? Send us a message
            and we&apos;ll get back to you.
          </p>

          <Suspense fallback={<div className="h-96 bg-white rounded-xl border border-stone-200 animate-pulse" />}>
            <ContactForm />
          </Suspense>

          <p className="text-sm text-stone-500 mt-8 text-center">
            Running a group already listed?{' '}
            <Link href="/submit" className="text-emerald-600 hover:underline">Add or update a listing</Link>{' '}
            directly instead.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
