import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-5 sm:px-8">
        <div className="text-center max-w-md">
          <p className="text-6xl font-bold text-emerald-600 mb-4">404</p>
          <h1 className="text-2xl font-bold text-stone-900 mb-3">
            This page doesn&apos;t exist yet
          </h1>
          <p className="text-stone-600 mb-8">
            We couldn&apos;t find what you&apos;re looking for. It might have been moved, or it might not exist yet — we&apos;re growing every week!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Go home
            </Link>
            <Link
              href="/browse"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-stone-700 font-semibold rounded-lg border border-stone-300 hover:border-stone-400 transition-colors"
            >
              Browse sports
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
