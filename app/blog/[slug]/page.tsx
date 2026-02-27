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

          <p className="text-stone-500 text-sm mb-10">
            {post.author} ·{' '}
            {new Date(post.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>

          <div
            className="prose prose-stone prose-emerald max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-5 prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-p:leading-[1.8] prose-p:mb-5 prose-p:text-stone-600 prose-li:leading-[1.8] prose-li:text-stone-600 prose-ul:my-5 prose-ul:space-y-2 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-stone-900 prose-hr:my-10"
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
      html.push('<ul>' + items.map(i => `<li>${processInline(i.slice(2))}</li>`).join('') + '</ul>');
    } else {
      // Paragraph — handle single newlines as line breaks
      const lines = trimmed.split('\n').map(l => processInline(l)).join('<br />');
      html.push(`<p>${lines}</p>`);
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
