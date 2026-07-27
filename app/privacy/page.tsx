import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | London Sports Community',
  description: 'How London Sports Community collects, uses, and protects your personal data.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-3xl px-5 sm:px-8 py-16 md:py-20">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">Privacy Policy</h1>
          <p className="text-stone-500 mb-10">Last updated: 27 July 2026</p>

          <div className="prose prose-stone max-w-none space-y-8">
            <section>
              <h2 className="text-lg font-bold text-stone-900 mb-2">1. Who we are</h2>
              <p className="text-stone-600 leading-relaxed">
                London Sports Community (&quot;we&quot;, &quot;us&quot;) operates londonsportscommunity.co.uk,
                a free directory of sports groups and venues across London. This policy explains what
                personal data we collect, why, and how you can control it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-stone-900 mb-2">2. What we collect</h2>
              <ul className="list-disc pl-5 text-stone-600 leading-relaxed space-y-1.5">
                <li>
                  <strong>Newsletter sign-ups:</strong> your email address, when you subscribe via the
                  footer form.
                </li>
                <li>
                  <strong>Contact form submissions:</strong> your name, email address, and message
                  content, when you use the <Link href="/contact" className="text-emerald-600 hover:underline">contact page</Link>.
                </li>
                <li>
                  <strong>Group submissions:</strong> the group/venue details and your contact
                  information, when you <Link href="/submit" className="text-emerald-600 hover:underline">submit a group listing</Link>.
                </li>
                <li>
                  <strong>Basic technical data:</strong> IP address, used only transiently for spam/rate
                  limiting on forms — not stored long-term or used for tracking.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-stone-900 mb-2">3. Why we collect it</h2>
              <p className="text-stone-600 leading-relaxed">
                We use this data to: send occasional newsletter updates (new groups, guides, community
                news) if you&apos;ve subscribed; respond to contact form and listing submissions; and
                review and publish group listings. We do not sell your data, and we do not use it for
                advertising or third-party marketing.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-stone-900 mb-2">4. Your rights</h2>
              <p className="text-stone-600 leading-relaxed">
                Under UK GDPR, you can ask us to access, correct, or delete your personal data at any
                time, and you can unsubscribe from the newsletter whenever you like. To exercise any of
                these rights, <Link href="/contact" className="text-emerald-600 hover:underline">contact us</Link> with
                your request.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-stone-900 mb-2">5. Data storage</h2>
              <p className="text-stone-600 leading-relaxed">
                Data is stored in a managed PostgreSQL database. We retain newsletter and contact data
                only for as long as needed to provide the service, or until you ask us to delete it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-stone-900 mb-2">6. Changes to this policy</h2>
              <p className="text-stone-600 leading-relaxed">
                We may update this policy from time to time. Material changes will be reflected by
                updating the date at the top of this page.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-stone-900 mb-2">7. Contact</h2>
              <p className="text-stone-600 leading-relaxed">
                Questions about this policy or your data? <Link href="/contact" className="text-emerald-600 hover:underline">Get in touch</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
