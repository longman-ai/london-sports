# London Sports Community — Fable 5 Feedback Round 2 (27 Jul 2026)
Follow-up to the initial NovaList audit. Fable 5 reviewed the live homepage
and /browse and flagged 8 issues. Verified every claim directly against the
live Postgres database before making any change. Summary of what was
confirmed, what was bigger than reported, and what didn't hold up — then
what was fixed.

## Verification Findings

### ✅ #2 Reddit/listicle links — confirmed, root cause found
Not a data problem. Every affected group already had the correct real URL in
its `contact` field; the display code (`/browse`, `/groups/[id]`) was linking
to `sourceUrl` (an internal scrape-provenance field) instead. One-line fix
in two files resolves all 6 flagged cases plus the JSON-LD schema `url`
field, which had the same bug.

### 🔴 #1 Numbers contradiction — bigger root cause than reported
Not stale hardcoded stats — **two disconnected data sources**. The homepage,
sport cards, and site metadata read from a static file (`data/groups.ts`,
48 entries, only 6 of 12 sports). `/browse` and `/groups/[id]` read live from
Postgres (160 entries, all 12 sports). This is why Running showed "16" on
homepage vs "50+" on browse, and why 6 sport cards showed no count at all.
Fixed by making the database the single source of truth everywhere
(`lib/stats.ts`, cached 5 min via `unstable_cache`).

**Bonus bug found during this fix:** the homepage "Popular boroughs" link
for Kensington & Chelsea pointed to `/browse?borough=Kensington %26 Chelsea`
while the database stores `"Kensington and Chelsea"` — an exact-match
filter, so that link silently returned **zero results** despite the borough
having 6 real listings. Fixed with a `toDbBoroughName()` mapper in
`lib/utils.ts`.

### ✅ #3 Duplicates — one confirmed, others didn't hold up
- **London City Runners** (Islington + Southwark): confirmed duplicate,
  identical contact URL. Archived the less-specific Islington entry
  ("Various locations across London" vs. Southwark's genuine Bermondsey
  detail).
- **Serpentine Running Club vs "Serpentine RC (Kensington Gardens)"**: not a
  duplicate — different boroughs, different descriptions, read as two
  branches of the same club.
- **Powerleague Shoreditch (football) vs Powerleague Shoreditch Padel**: not
  a duplicate — different sports at the same venue, correctly separate.
- **Stratford Padel Club borough**: checked live data — it's filed under
  Tower Hamlets, not Newham as claimed. Left as-is (Stratford genuinely sits
  near the TH/Newham boundary; the listed address supports TH).
- **Clapham Chasers vs Clapham Pioneers**: different domains
  (claphamchasers.co.uk vs claphampioneers.co.uk), read as two real separate
  clubs sharing a common. Left as-is, flagged rather than merged.

### ⚠️ #4 "All levels" dominance — confirmed, soft issue
151/160 listings show "All levels" for skill level. Genuinely reduces the
field's informational value, but changing it means re-researching each
listing's actual skill level — a data-entry project, not a code fix. Not
tackled in this pass; flagged for a future data cleanup pass.

### ✅ #5 Newsletter — fixed
Was a permanently-disabled "coming soon" input. Built a working signup using
infrastructure already in place — new `NewsletterSubscriber` table in the
existing Postgres DB, `/api/newsletter` endpoint, live `NewsletterForm`
component in the footer. No new external ESP dependency; export to a proper
sending platform (Beehiiv/Resend broadcast/etc.) once there's a list worth
mailing.

### ✅ #6 Trust pages — fixed
Added `/about`, `/contact` (with working form), and `/privacy`. Contact form
submissions land in a new `ContactMessage` table. Footer updated with a
"Company" column linking to all three.

### ⏸️ #7 SEO structure (clean borough×sport URLs, blog cadence) — not done
`/football-hackney` style pages already exist (built earlier, confirmed live
in production) — this part of the feedback was based on not having checked
for them. Blog cadence (only 3 posts) is a content project, not addressed in
this pass.

### ✅ #8 Claim-your-listing — fixed (lightweight version)
Added a "Is this your group? Claim this listing" link on every group detail
page, routing to `/contact?claim=<group name>` which prefills the message.
Submissions land in the same `ContactMessage` table for manual follow-up —
not a full self-service claim flow, but a working intake mechanism.

## Data Changes Made
- Archived 1 duplicate (London City Runners, Islington entry) — soft delete
  via `status: ARCHIVED`, not a hard delete, so it's recoverable.
- No other group data was edited or removed.

## Schema Changes
Added via `prisma db push` (non-destructive, additive-only — verified group
count unchanged before/after each push):
- `NewsletterSubscriber` table
- `ContactMessage` table

Note: this project already had schema drift before this audit (a
`GOOGLE_SCRAPER` enum value existed live but not in migration history), so
schema is evidently managed via `db push` rather than clean migration
history — followed that existing convention rather than introducing a new
migration file.

## Files Changed
- `app/browse/page.tsx` — link fix (contact not sourceUrl) + guard
- `app/groups/[id]/page.tsx` — link fix (contact not sourceUrl, JSON-LD too) + claim listing CTA
- `app/page.tsx` — live stats instead of static file, fixed borough link bug
- `app/layout.tsx` — live stats for metadata (generateMetadata)
- `app/opengraph-image.tsx` — live stats instead of static file
- `components/SportSelector.tsx` — accepts live counts as props
- `components/Footer.tsx` — working newsletter form, About/Contact/Privacy links, fixed 13-col grid overflow
- `lib/utils.ts` — added `toDbBoroughName()` mapper
- `lib/stats.ts` — new, single source of truth for aggregate stats (cached)
- `prisma/schema.prisma` — added NewsletterSubscriber, ContactMessage models
- `app/about/page.tsx`, `app/contact/page.tsx`, `app/privacy/page.tsx` — new
- `components/ContactForm.tsx`, `components/NewsletterForm.tsx` — new
- `app/api/contact/route.ts`, `app/api/newsletter/route.ts` — new

## Verified
- `npm run build` — clean, all new routes compile
- Live dev server test: homepage shows "159+ groups across 33 boroughs"
  (matches /browse exactly), all 12 sport cards show real counts, K&C
  borough link resolves correctly with 6 results
- The Life Centre group page: website link now goes to
  thelifecentre.com (was reddit.com), zero Reddit references, claim-listing
  link present and functional
- Newsletter signup + contact form tested end-to-end against live DB,
  including validation (rejects invalid email), then test rows cleaned up
