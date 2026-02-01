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
      className={`sticky top-0 z-50 transition-all duration-300 w-full flex justify-center ${
        transparent
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50'
          : 'bg-white border-b border-slate-200 shadow-sm'
      }`}
    >
      <div className="w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
              <span className="text-white font-bold text-lg">LS</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-slate-900 text-lg">London Sports</span>
              <span className="text-slate-400 text-sm block -mt-1">Community</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/browse"
              className="px-4 py-2 text-slate-600 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all"
            >
              Browse Groups
            </Link>
            <Link
              href="/submit"
              className="px-4 py-2 text-slate-600 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all"
            >
              Add a Group
            </Link>
            <div className="w-px h-6 bg-slate-200 mx-2" />
            <Link
              href="/submit"
              className="px-5 py-2.5 text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-700 hover:to-blue-800 transition-all active:scale-95"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-slate-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2">
              <Link
                href="/browse"
                className="px-4 py-3 text-slate-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Groups
              </Link>
              <Link
                href="/submit"
                className="px-4 py-3 text-slate-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Add a Group
              </Link>
              <Link
                href="/submit"
                className="mt-2 px-4 py-3 text-center text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-semibold shadow-lg shadow-blue-500/25"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
