import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | London Sports Community',
  description: 'Why we built a free directory to help Londoners find local sports groups, and how it works.',
  openGraph: {
    title: 'About | London Sports Community',
    description: 'Why we built a free directory to help Londoners find local sports groups.',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-3xl px-5 sm:px-8 py-16 md:py-20">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">About London Sports Community</h1>

          <div className="prose prose-stone max-w-none">
            <p className="text-lg text-stone-600 leading-relaxed mb-6">
              London Sports Community is a free directory built to solve one specific problem: sport
              in London is happening everywhere, all the time — but finding it usually means scrolling
              through Instagram, Facebook groups, and word-of-mouth. We wanted one place to search by
              sport and borough and just find a group to play with.
            </p>

            <h2 className="text-xl font-bold text-stone-900 mt-10 mb-3">What we do</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              We list running clubs, football pitches, padel courts, yoga studios, and dozens of other
              sports communities across all 33 London boroughs. Every listing links to the group or
              venue&apos;s actual website or booking page, so you can go straight to the source. Listing
              is free for group organisers, and browsing is free for everyone — no sign-up required.
            </p>

            <h2 className="text-xl font-bold text-stone-900 mt-10 mb-3">Data quality</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Groups come from a mix of manual research and community submissions, reviewed before
              they go live. If you spot anything wrong with a listing — wrong borough, outdated info,
              or a group that&apos;s closed down — please <Link href="/contact" className="text-emerald-600 hover:underline">let us know</Link>.
              We&apos;d rather have fewer, accurate listings than a lot of stale ones.
            </p>

            <h2 className="text-xl font-bold text-stone-900 mt-10 mb-3">Run a group?</h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              If your group is already listed, you can{' '}
              <Link href="/contact" className="text-emerald-600 hover:underline">get in touch</Link>{' '}
              to update details or claim ownership of the listing. If you&apos;re not listed yet,{' '}
              <Link href="/submit" className="text-emerald-600 hover:underline">add your group</Link>{' '}
              — it&apos;s free and takes about two minutes.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
