import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSiteStats } from "@/lib/stats";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Derived from real data (live Postgres via getSiteStats, cached 5 min) so
// title/description/OG copy can never drift out of sync with the actual
// listing count again. Originally hardcoded "150+" against an actual count
// of 48; a follow-up fix switched to the static data/groups.ts file (48
// entries, 6 of 12 sports) which was itself wrong vs. the live database (160
// entries, all 12 sports) — this is the definitive fix. NovaList audit,
// 2026-07-27.
export async function generateMetadata(): Promise<Metadata> {
  const stats = await getSiteStats();
  const groupCountLabel = `${Math.floor(stats.totalGroups / 10) * 10}+`;

  return {
    title: "London Sports Community | Find Sports Groups Across London",
    description:
      `Find and join local sports groups across all 33 London boroughs. Browse ${groupCountLabel} football, basketball, tennis, padel, running & yoga communities — free, no sign-up.`,
    keywords: [
      "london sports groups",
      "sports groups near me london",
      "find sports partners london",
      "football groups london",
      "basketball london",
      "tennis groups london",
      "padel courts london",
      "running clubs london",
      "yoga classes london",
      "badminton london",
      "sports communities london",
      "london fitness groups",
      "local sports london",
      "play sport london"
    ],
    metadataBase: new URL("https://londonsportscommunity.co.uk"),
    openGraph: {
      title: "London Sports Community | Find Local Sports Groups Across All 33 Boroughs",
      description: `Browse ${groupCountLabel} sports groups across every London borough. Football, padel, running, tennis, yoga and more — all free, no sign-up required.`,
      url: "https://londonsportscommunity.co.uk",
      siteName: "London Sports Community",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "London Sports Community | Find Local Sports Groups",
      description: `Browse ${groupCountLabel} sports groups across every London borough. Free directory, no sign-up required.`
    },
    alternates: {
      canonical: "https://londonsportscommunity.co.uk"
    }
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#059669"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
