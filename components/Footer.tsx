import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-5">
              <svg viewBox="0 0 220 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto" aria-label="Paraura">
                <path d="M4 22 C4 14 10 8 18 8 C22 8 26 10 28 13 L32 18 L28 23 C26 26 22 28 18 28 C10 28 4 26 4 22Z" fill="#38bdf8"/>
                <line x1="14" y1="13" x2="28" y2="23" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round"/>
                <text x="40" y="27" fontFamily="'DM Sans', system-ui, sans-serif" fontSize="18" fontWeight="500" letterSpacing="3" fill="white">PARA</text>
                <text x="126" y="27" fontFamily="'DM Sans', system-ui, sans-serif" fontSize="18" fontWeight="500" letterSpacing="3" fill="white">UR</text>
                <path d="M170 27 L178 9" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M186 27 L178 9" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M172.5 20 L176 20" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M179 19.5 L183 19" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
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
