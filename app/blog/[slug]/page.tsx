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

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center">
        <article className="w-full max-w-3xl px-5 sm:px-8 py-16">
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

          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-stone-500 text-sm mb-14">
            {post.author} ·{' '}
            {new Date(post.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>

          <div
            className="prose prose-lg prose-stone prose-emerald max-w-none prose-headings:font-bold prose-headings:text-stone-900 prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-4 prose-p:leading-[1.9] prose-p:mb-6 prose-p:text-stone-600 prose-li:leading-[1.8] prose-li:text-stone-600 prose-li:mb-2 prose-ul:my-6 prose-ul:pl-6 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-stone-800 prose-hr:my-14 prose-hr:border-stone-200"
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
          const metaHtml = paraLines.map(l => `<div style="margin-bottom: 0.5rem;">${processInline(l)}</div>`).join('\n');
          html.push(`<div style="margin: 2rem 0; padding: 1.25rem 1.5rem; background: #fafaf9; border-radius: 0.75rem; border: 1px solid #e7e5e4; font-size: 0.95rem;">${metaHtml}</div>`);
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
