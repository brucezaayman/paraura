import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-sky-400 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path
                    d="M12 3C7 3 3 9 3 12s4 6 9 6c2 0 4-1 6-3l3-3-3-3c-1.5-1.5-3.5-3-6-6z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="text-white font-semibold tracking-widest uppercase text-sm">
                Paraura
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              South Africa&apos;s official Skywalk paraglider specialist. Expert guidance for pilots at every level.
            </p>
            <p className="text-stone-600 text-xs mt-4 tracking-widest uppercase">
              Catch the Breeze
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-5 font-medium">
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/wings" className="text-stone-400 hover:text-white text-sm transition-colors">
                  Wings
                </Link>
              </li>
              <li>
                <Link href="/selector" className="text-stone-400 hover:text-white text-sm transition-colors">
                  Wing Selector
                </Link>
              </li>
              <li>
                <Link href="/advice" className="text-stone-400 hover:text-white text-sm transition-colors">
                  Get Advice
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-5 font-medium">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@paraura.com"
                  className="text-stone-400 hover:text-white text-sm transition-colors"
                >
                  info@paraura.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/27000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-white text-sm transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <span className="text-stone-500 text-sm">South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-stone-600 text-xs">
            © {new Date().getFullYear()} Paraura. Official Skywalk distributor, South Africa.
          </p>
          <a
            href="https://www.skywalk.info"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-600 hover:text-stone-400 text-xs transition-colors tracking-wide"
          >
            skywalk.info ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
