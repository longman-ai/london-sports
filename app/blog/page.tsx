import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BLOG_POSTS } from '@/data/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | London Sports Community',
  description: 'Guides, tips, and articles about finding and joining sports groups across London. Padel courts, running clubs, and more.',
  openGraph: {
    title: 'Blog | London Sports Community',
    description: 'Guides, tips, and articles about sports in London.',
    url: 'https://londonsportscommunity.co.uk/blog',
  },
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-4xl px-5 sm:px-8 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">Blog</h1>
          <p className="text-stone-600 mb-10 text-lg">
            Guides, tips, and stories about sport in London.
          </p>

          <div className="grid gap-8">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-xl border border-stone-200 p-6 hover:border-emerald-300 hover:shadow-md transition-all"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-bold text-stone-900 mb-2">{post.title}</h2>
                <p className="text-stone-600 mb-3 leading-relaxed">{post.excerpt}</p>
                <p className="text-sm text-stone-400">
                  {new Date(post.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
