#!/usr/bin/env npx tsx
/**
 * URL Audit Script for London Sports Community
 * 
 * Checks all contact and sourceUrl links in the static groups data for:
 * - Broken links (4xx, 5xx)
 * - Redirects (301, 302)
 * - Timeouts
 * - Fundraising/donation pages (likely wrong link)
 * - Generic aggregator pages (not specific to the group)
 * 
 * Usage: npx tsx scripts/audit-urls.ts
 * Output: scripts/audit-report.json + console summary
 */

import { GROUPS } from '../data/groups';

interface AuditResult {
  groupId: string;
  groupName: string;
  field: 'contact' | 'sourceUrl';
  url: string;
  status: number | 'timeout' | 'error';
  finalUrl?: string;
  redirected: boolean;
  issue?: string;
  severity: 'ok' | 'warning' | 'error';
  suggestedFix?: string;
}

// Keywords that suggest a wrong page (fundraising, donate, etc.)
const WRONG_PAGE_KEYWORDS = [
  'donate', 'donation', 'fundrais', 'gofundme', 'justgiving',
  'crowdfund', 'charity', 'appeal', 'support-us', 'give',
];

// Keywords suggesting a generic/aggregator page rather than the actual group
const GENERIC_PAGE_KEYWORDS = [
  '/results/', '/search?', '/find/', '/listings/',
];

async function checkUrl(url: string): Promise<{
  status: number | 'timeout' | 'error';
  finalUrl?: string;
  redirected: boolean;
  title?: string;
  errorMsg?: string;
}> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 London Sports Community URL Audit',
        'Accept': 'text/html,application/xhtml+xml',
      },
    });

    clearTimeout(timeout);

    const finalUrl = res.url;
    const redirected = finalUrl !== url && new URL(finalUrl).pathname !== new URL(url).pathname;

    // Read a chunk of the body to check for page content clues
    let title = '';
    try {
      const text = await res.text();
      const titleMatch = text.match(/<title[^>]*>(.*?)<\/title>/i);
      if (titleMatch) title = titleMatch[1].trim().slice(0, 200);
    } catch {
      // Body read failed, not critical
    }

    return { status: res.status, finalUrl, redirected, title };
  } catch (err: unknown) {
    clearTimeout(timeout);
    const error = err as Error;
    if (error.name === 'AbortError') {
      return { status: 'timeout', redirected: false, errorMsg: 'Request timed out (10s)' };
    }
    return { status: 'error', redirected: false, errorMsg: error.message };
  }
}

function detectIssue(
  url: string,
  result: Awaited<ReturnType<typeof checkUrl>>
): { issue?: string; severity: 'ok' | 'warning' | 'error'; suggestedFix?: string } {
  // Timeout
  if (result.status === 'timeout') {
    return { issue: 'URL timed out — site may be down', severity: 'error' };
  }

  // Connection error
  if (result.status === 'error') {
    return { issue: `Connection error: ${result.errorMsg}`, severity: 'error' };
  }

  // 4xx / 5xx
  if (typeof result.status === 'number') {
    if (result.status === 404) {
      return { issue: 'Page not found (404)', severity: 'error' };
    }
    if (result.status === 403) {
      return { issue: 'Access forbidden (403) — may need different URL', severity: 'warning' };
    }
    if (result.status >= 400) {
      return { issue: `HTTP error ${result.status}`, severity: 'error' };
    }
  }

  // Check for fundraising/donation pages
  const urlLower = url.toLowerCase();
  const titleLower = (result.title || '').toLowerCase();
  const finalUrlLower = (result.finalUrl || '').toLowerCase();

  for (const keyword of WRONG_PAGE_KEYWORDS) {
    if (urlLower.includes(keyword) || finalUrlLower.includes(keyword) || titleLower.includes(keyword)) {
      return {
        issue: `Possible fundraising/donation page (matched: "${keyword}")`,
        severity: 'warning',
        suggestedFix: 'Replace with the group\'s main website or "play" page',
      };
    }
  }

  // Check for significant redirects
  if (result.redirected && result.finalUrl) {
    const origHost = new URL(url).hostname;
    const finalHost = new URL(result.finalUrl).hostname;
    if (origHost !== finalHost) {
      return {
        issue: `Redirected to different domain: ${result.finalUrl}`,
        severity: 'warning',
        suggestedFix: `Update URL to: ${result.finalUrl}`,
      };
    }
  }

  // Check for generic aggregator pages
  for (const keyword of GENERIC_PAGE_KEYWORDS) {
    if (urlLower.includes(keyword)) {
      return {
        issue: `Possibly generic/aggregator page (matched: "${keyword}")`,
        severity: 'warning',
        suggestedFix: 'Consider linking to the group\'s own website instead',
      };
    }
  }

  return { severity: 'ok' };
}

async function auditAll() {
  console.log(`\n🔍 Auditing ${GROUPS.length} groups (${GROUPS.length * 2} URLs)...\n`);

  const results: AuditResult[] = [];
  let checked = 0;

  for (const group of GROUPS) {
    for (const field of ['contact', 'sourceUrl'] as const) {
      const url = group[field];
      if (!url || !url.startsWith('http')) continue;

      checked++;
      process.stdout.write(`  [${checked}/${GROUPS.length * 2}] ${group.name} (${field})...`);

      const result = await checkUrl(url);
      const { issue, severity, suggestedFix } = detectIssue(url, result);

      const auditResult: AuditResult = {
        groupId: group.id,
        groupName: group.name,
        field,
        url,
        status: result.status,
        finalUrl: result.finalUrl,
        redirected: result.redirected,
        issue,
        severity,
        suggestedFix,
      };

      results.push(auditResult);

      if (severity === 'error') {
        console.log(` ❌ ${issue}`);
      } else if (severity === 'warning') {
        console.log(` ⚠️  ${issue}`);
      } else {
        console.log(` ✅`);
      }

      // Small delay to be polite
      await new Promise(r => setTimeout(r, 300));
    }
  }

  // Summary
  const errors = results.filter(r => r.severity === 'error');
  const warnings = results.filter(r => r.severity === 'warning');
  const ok = results.filter(r => r.severity === 'ok');

  console.log(`\n${'='.repeat(60)}`);
  console.log(`📊 AUDIT SUMMARY`);
  console.log(`${'='.repeat(60)}`);
  console.log(`✅ OK:       ${ok.length}`);
  console.log(`⚠️  Warnings: ${warnings.length}`);
  console.log(`❌ Errors:   ${errors.length}`);
  console.log(`${'='.repeat(60)}\n`);

  if (errors.length > 0) {
    console.log('❌ ERRORS (broken/dead links):');
    for (const r of errors) {
      console.log(`  • ${r.groupName} [${r.field}]`);
      console.log(`    URL: ${r.url}`);
      console.log(`    Issue: ${r.issue}`);
      if (r.suggestedFix) console.log(`    Fix: ${r.suggestedFix}`);
      console.log();
    }
  }

  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS (suspicious links):');
    for (const r of warnings) {
      console.log(`  • ${r.groupName} [${r.field}]`);
      console.log(`    URL: ${r.url}`);
      console.log(`    Issue: ${r.issue}`);
      if (r.suggestedFix) console.log(`    Fix: ${r.suggestedFix}`);
      console.log();
    }
  }

  // Write full report
  const reportPath = new URL('./audit-report.json', import.meta.url).pathname;
  const { writeFileSync } = await import('fs');
  writeFileSync(reportPath, JSON.stringify({ 
    auditedAt: new Date().toISOString(),
    totalGroups: GROUPS.length,
    totalUrls: checked,
    summary: { ok: ok.length, warnings: warnings.length, errors: errors.length },
    issues: [...errors, ...warnings],
    allResults: results,
  }, null, 2));
  console.log(`📄 Full report saved to: scripts/audit-report.json\n`);
}

auditAll().catch(console.error);
