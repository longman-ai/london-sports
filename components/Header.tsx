'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full flex justify-center transition-all duration-200 ${
        transparent
          ? 'bg-stone-50/90 backdrop-blur-xl border-b border-stone-200/60'
          : 'bg-white border-b border-stone-200 shadow-sm'
      }`}
    >
      <div className="w-full max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center group-hover:bg-emerald-700 transition-colors">
              <span className="text-white font-bold text-sm tracking-tight">LS</span>
            </div>
            <span className="font-semibold text-stone-900 text-[15px] hidden sm:block">
              London Sports
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/browse"
              className="px-3.5 py-2 text-stone-600 hover:text-stone-900 text-sm font-medium rounded-lg hover:bg-stone-100 transition-all"
            >
              Browse
            </Link>
            <Link
              href="/submit"
              className="px-3.5 py-2 text-stone-600 hover:text-stone-900 text-sm font-medium rounded-lg hover:bg-stone-100 transition-all"
            >
              Add a Group
            </Link>
            <Link
              href="/blog"
              className="px-3.5 py-2 text-stone-600 hover:text-stone-900 text-sm font-medium rounded-lg hover:bg-stone-100 transition-all"
            >
              Blog
            </Link>
            <div className="w-px h-5 bg-stone-200 mx-2" />
            <Link
              href="/browse"
              className="px-4 py-2 text-white bg-emerald-600 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"
            >
              Find Groups
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-stone-200">
            <nav className="flex flex-col gap-1">
              <Link href="/browse" className="px-3 py-2.5 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-100" onClick={() => setMobileMenuOpen(false)}>
                Browse Groups
              </Link>
              <Link href="/submit" className="px-3 py-2.5 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-100" onClick={() => setMobileMenuOpen(false)}>
                Add a Group
              </Link>
              <Link href="/blog" className="px-3 py-2.5 text-stone-700 text-sm font-medium rounded-lg hover:bg-stone-100" onClick={() => setMobileMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/browse" className="mt-1 px-3 py-2.5 text-center text-white bg-emerald-600 rounded-lg text-sm font-semibold" onClick={() => setMobileMenuOpen(false)}>
                Find Groups
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
