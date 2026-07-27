import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GROUPS } from "@/data/groups";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Derived from real data so title/description/OG copy can never drift out of
// sync with the actual listing count again (was hardcoded "150+" against an
// actual count of 48 — fixed 2026-07-27 NovaList audit).
const groupCount = GROUPS.length;
const groupCountLabel = `${Math.floor(groupCount / 10) * 10}+`;

export const metadata: Metadata = {
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
