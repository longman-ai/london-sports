import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white mt-auto w-full flex justify-center">
      <div className="w-full max-w-6xl px-5 sm:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">LS</span>
              </div>
              <span className="font-semibold text-white text-[15px]">London Sports</span>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs mb-6">
              We&apos;re building London&apos;s community sports directory. Helping you find local groups, clubs, and pickup games across the city.
            </p>
            {/* Newsletter placeholder */}
            <div className="max-w-xs">
              <p className="text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">Stay in the loop</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                  disabled
                />
                <button className="px-3 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg opacity-60 cursor-not-allowed" disabled>
                  Soon
                </button>
              </div>
              <p className="text-xs text-stone-500 mt-1.5">Newsletter coming soon.</p>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2 md:col-start-7">
            <h3 className="text-xs font-semibold text-stone-300 uppercase tracking-wider mb-4">Navigate</h3>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-stone-400 hover:text-white text-sm transition-colors">Home</Link></li>
              <li><Link href="/browse" className="text-stone-400 hover:text-white text-sm transition-colors">Browse Groups</Link></li>
              <li><Link href="/submit" className="text-stone-400 hover:text-white text-sm transition-colors">Add Your Group</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-stone-300 uppercase tracking-wider mb-4">Sports</h3>
            <ul className="space-y-2.5">
              <li><Link href="/football-hackney" className="text-stone-400 hover:text-white text-sm transition-colors">Football</Link></li>
              <li><Link href="/running-islington" className="text-stone-400 hover:text-white text-sm transition-colors">Running</Link></li>
              <li><Link href="/padel-westminster" className="text-stone-400 hover:text-white text-sm transition-colors">Padel</Link></li>
              <li><Link href="/tennis-kensington-chelsea" className="text-stone-400 hover:text-white text-sm transition-colors">Tennis</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold text-stone-300 uppercase tracking-wider mb-4">Boroughs</h3>
            <ul className="space-y-2.5">
              <li><Link href="/football-hackney" className="text-stone-400 hover:text-white text-sm transition-colors">Hackney</Link></li>
              <li><Link href="/running-camden" className="text-stone-400 hover:text-white text-sm transition-colors">Camden</Link></li>
              <li><Link href="/padel-westminster" className="text-stone-400 hover:text-white text-sm transition-colors">Westminster</Link></li>
              <li><Link href="/padel-lambeth" className="text-stone-400 hover:text-white text-sm transition-colors">Lambeth</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-stone-500 text-xs">
            &copy; {new Date().getFullYear()} London Sports Community
          </p>
          <p className="text-stone-500 text-xs">
            Made in London 🇬🇧
          </p>
        </div>
      </div>
    </footer>
  );
}
