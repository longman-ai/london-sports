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
  // Split into blocks by double newline
  const blocks = md.split(/\n\n+/);
  const html: string[] = [];

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Headings
    if (trimmed.startsWith('### ')) {
      html.push(`<h3>${processInline(trimmed.slice(4))}</h3>`);
    } else if (trimmed.startsWith('## ')) {
      html.push(`<h2>${processInline(trimmed.slice(3))}</h2>`);
    } else if (trimmed.startsWith('# ')) {
      html.push(`<h1>${processInline(trimmed.slice(2))}</h1>`);
    } else if (trimmed === '---') {
      html.push('<hr />');
    } else if (trimmed.startsWith('- ')) {
      // List block
      const items = trimmed.split('\n').filter(l => l.startsWith('- '));
      html.push('<ul>' + items.map(i => `<li>${processInline(i.slice(2))}</li>`).join('\n') + '</ul>');
    } else {
      // Check if it's a metadata block (Location:, Nearest Tube:, etc.)
      const lines = trimmed.split('\n');
      const isMetaBlock = lines.length > 1 && lines.every(l => l.includes(':') || l.trim() === '');
      
      if (isMetaBlock) {
        // Render as a styled definition block
        const metaHtml = lines
          .filter(l => l.trim())
          .map(l => {
            const [label, ...rest] = l.split(':');
            const value = rest.join(':').trim();
            return `<div style="margin-bottom: 0.25rem;"><strong>${processInline(label.trim())}:</strong> ${processInline(value)}</div>`;
          })
          .join('\n');
        html.push(`<div style="margin: 1.5rem 0; padding: 1rem 1.25rem; background: #fafaf9; border-radius: 0.5rem; border: 1px solid #e7e5e4;">${metaHtml}</div>`);
      } else {
        // Regular paragraph
        const paraLines = lines.map(l => processInline(l)).join('<br />');
        html.push(`<p>${paraLines}</p>`);
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
