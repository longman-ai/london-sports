import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "London Sports Community | Find Sports Groups Across London",
  description:
    "Connect with local sports groups across London. Find football, basketball, tennis, badminton, running, and padel communities in your borough.",
  keywords: [
    "london sports",
    "sports groups london",
    "football london",
    "basketball london",
    "tennis london",
    "padel london",
    "running groups london",
    "sports communities london",
    "london fitness groups"
  ],
  metadataBase: new URL("https://londonsportscommunity.co.uk"),
  openGraph: {
    title: "London Sports Community",
    description: "Find your sport across London",
    url: "https://londonsportscommunity.co.uk",
    siteName: "London Sports Community",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb"
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
