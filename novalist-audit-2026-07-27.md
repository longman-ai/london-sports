# NovaList Content Audit — London Sports Community
**Run:** 27 Jul 2026
**Method:** London Sports Community treated as a NovaList "client" — ran through the same audit engine that powers novalist.co/audit (GPT-4o scoring on scraped homepage content), plus manual technical checks the automated tool doesn't cover.
**URL audited:** londonsportscommunity.co.uk

---

## Automated Score (from the NovaList audit tool logic)

**Overall: 72/100**

| Category | Score | Verdict |
|---|---|---|
| Messaging Clarity | 75 | Clear and effectively communicates the site's purpose |
| SEO Foundations | 70 | Solid foundation — relevant keywords, meta descriptions in place |
| Content Freshness | 65 | Appears current with recent listings and blog updates |
| CTA Effectiveness | 80 | Clear CTAs, low-friction ("no sign-up required") |

**Quick wins flagged by the tool:**
1. Add alt text to all images for SEO/accessibility
2. Update "Recently listed" section more frequently
3. Include more internal links within body text

**Reality check on quick win #1:** I manually verified this — it's actually **already done**. All 12 homepage images have descriptive alt text (e.g., "Football in London", "Padel in London"). The AI tool's generic template fix doesn't reflect the actual site, which is a useful reminder that the automated audit is a lead-gen conversation-starter, not gospel — a real client engagement needs a human pass on top, which is what follows below.

---

## What the Automated Score Misses (Manual Technical Pass)

### ✅ Genuinely strong
- **Structured data (JSON-LD)** present — `WebSite` schema with `SearchAction` markup, which is exactly what AEO/AI search tools look for
- **robots.txt + sitemap.xml** both correctly configured and reachable
- **Canonical tag** present on homepage
- **Meta description** is well-optimised (176 chars — right at the edge of Google's ~155-160 char display limit, could trim slightly)
- **Title tag** (58 chars) is within safe SEO length
- Fast page load — 101KB homepage, ~0.1s response time from origin
- Real blog exists with 3 posts, reasonably relevant titles (padel courts, running clubs, "find groups by borough")

### ⚠️ Real gaps worth fixing

1. **No borough-specific landing pages** — `/hackney`, `/westminster` etc. all 404. Every borough is only reachable via a query string (`/browse?borough=Hackney`), which is invisible to Google as a distinct indexable page. This is the single biggest missed SEO opportunity: "sports groups in Hackney" is a real, low-competition search term, and right now there's no page built to rank for it. 33 boroughs × a dedicated landing page each = 33 new indexable pages targeting long-tail local search.

2. **Blog posts have no visible publish dates** — I couldn't find a single date on the blog listing page. Combined with the audit tool's own "content freshness" concern (65/100), this is a real, fixable gap: Google and readers both use visible dates as a freshness/trust signal, especially for a directory-style site.

3. **Blog schema markup missing** — only one JSON-LD block exists (WebSite-level). Individual blog posts have no `Article`/`BlogPosting` schema, so they're not eligible for rich snippets (author, date, image) in search results.

4. **Only 3 blog posts total** — for a content-driven local directory, this is thin. The existing 3 posts (padel courts guide, running clubs guide, "find groups by borough") are good topic choices, but there's no regular cadence, and 3 posts won't build meaningful topical authority against competitors.

5. **No og:image confirmed** — Open Graph title/description are present, but I couldn't verify an `og:image` tag is set, meaning shared links (WhatsApp, Twitter, Facebook) may show no preview image, which hurts click-through when people share group listings.

6. **AEO/AI visibility untested** — given last week's research (AI answer visibility is now a distinct, often-neglected channel, per the NovaList blog post published today), it's worth explicitly checking whether ChatGPT/Perplexity surface London Sports Community when someone asks "where can I find a 5-a-side game in Hackney" — this ties directly to the borough landing page gap above.

---

## Recommended Fix Priority (as if this were a paid NovaList engagement)

**High impact, low effort:**
- Add visible publish dates to blog posts
- Trim meta description to ~155 chars
- Add `Article` schema to blog posts

**High impact, medium effort:**
- Build 33 static/dynamic borough landing pages (`/borough/hackney` etc.) with unique intro copy, SEO title/meta per borough, and the existing group data already in the DB — this is mostly a templating exercise since the data already exists (69 groups, 12 sports, 7 boroughs per MEMORY.md, though homepage currently shows 48+/33 boroughs — worth reconciling those numbers too)
- Expand blog to a real cadence (aim for 2x/month) — natural next topics: sport-specific London guides (5-a-side leagues, best running routes by borough), "how to start your own sports group" (community-building angle), seasonal content (New Year fitness resolutions, summer outdoor sports)

**Lower priority / longer term:**
- og:image + social share preview testing
- AEO check across ChatGPT/Perplexity for borough+sport queries

---

## Honest Meta-Note on the Audit Tool Itself
Running this exercise surfaced a real product gap in novalist.co/audit: the AI-only scoring missed something a human/technical pass caught immediately (the alt-text claim was simply wrong for this site) and didn't check technical SEO fundamentals at all (schema, sitemap, borough page architecture, blog dates). If this audit format is core to how NovaList sells its content engine, it's worth pairing the AI score with a lightweight technical checklist (schema present? sitemap present? indexable category pages? blog cadence/dates?) so client-facing audits don't miss things a competent human catches in 10 minutes.
