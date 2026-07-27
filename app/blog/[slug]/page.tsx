import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBlogPost, getAllSlugs } from '@/data/blog';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://londonsportscommunity.co.uk/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogArticle({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // BlogPosting schema so search engines/AI tools can surface author, date,
  // and headline as rich results (added 2026-07-27 NovaList audit — blog
  // posts previously had zero JSON-LD, only the homepage did).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'London Sports Community',
      url: 'https://londonsportscommunity.co.uk',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://londonsportscommunity.co.uk/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1 w-full flex flex-col items-center">
        <article className="w-full max-w-[680px] px-6 sm:px-8 py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium mb-8"
          >
            ← Back to blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-[48px] font-bold text-stone-900 mb-5 leading-[1.15] tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-[15px] text-stone-400 mb-12 pb-12 border-b border-stone-200">
            <span>{post.author}</span>
            <span>·</span>
            <span>
              {new Date(post.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}

function markdownToHtml(md: string): string {
  // Split by lines first, then process
  const lines = md.split('\n');
  const html: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trimEnd();

    // Skip empty lines (they create spacing naturally)
    if (!line.trim()) {
      i++;
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      html.push(`<h3>${processInline(line.slice(4))}</h3>`);
      i++;
    } else if (line.startsWith('## ')) {
      html.push(`<h2>${processInline(line.slice(3))}</h2>`);
      i++;
    } else if (line.startsWith('# ')) {
      html.push(`<h1>${processInline(line.slice(2))}</h1>`);
      i++;
    } else if (line.trim() === '---') {
      html.push('<hr />');
      i++;
    } else if (line.startsWith('- ')) {
      // Collect all list items
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2));
        i++;
      }
      html.push('<ul>' + items.map(item => `<li>${processInline(item)}</li>`).join('\n') + '</ul>');
    } else {
      // Paragraph — collect lines until empty line or special line
      const paraLines: string[] = [];
      while (i < lines.length && lines[i].trim() && !lines[i].startsWith('#') && !lines[i].startsWith('- ') && lines[i].trim() !== '---') {
        paraLines.push(lines[i]);
        i++;
      }
      if (paraLines.length > 0) {
        // Check if it looks like metadata (bold label lines like **Location:** ...)
        const isMeta = paraLines.length >= 2 && paraLines.every(l => l.trim().startsWith('**') && l.includes(':'));
        if (isMeta) {
          const metaHtml = paraLines.map(l => `<div>${processInline(l)}</div>`).join('\n');
          html.push(`<div class="meta-card">${metaHtml}</div>`);
        } else {
          // Each line becomes its own paragraph for proper spacing
          for (const pLine of paraLines) {
            html.push(`<p>${processInline(pLine)}</p>`);
          }
        }
      }
    }
  }

  return html.join('\n');
}

function processInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}
