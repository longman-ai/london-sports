import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-auto w-full flex justify-center">
      <div className="w-full max-w-7xl px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">LS</span>
              </div>
              <div>
                <span className="font-bold text-white text-lg">London Sports</span>
                <span className="text-slate-400 text-sm block">Community</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Connecting sports enthusiasts across London. Find local groups, join communities, and start playing today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/browse" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Browse Groups
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Add Your Group
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Sports */}
          <div>
            <h3 className="font-semibold text-white mb-4">Popular Sports</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/football-hackney" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Football
                </Link>
              </li>
              <li>
                <Link href="/running-camden" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Running
                </Link>
              </li>
              <li>
                <Link href="/tennis-westminster" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Tennis
                </Link>
              </li>
              <li>
                <Link href="/padel-westminster" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Padel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} London Sports Community. Made with ❤️ in London.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500 text-sm">
              Helping Londoners find their sport
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
