import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-night)', color: 'var(--color-cloud)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">

          {/* Brand */}
          <div className="md:col-span-2">
            <Image src="/images/parauralogo.png" alt="Paraura" width={200} height={60}
              className="h-14 w-auto object-contain mb-5" />
            <p className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: 'var(--color-thermal)' }}>
              South Africa&apos;s official Skywalk Paragliders importer &amp; distributor.
              Expert guidance for pilots at every level.
            </p>
            <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'rgba(107,163,214,0.45)' }}>
              Catch the Breeze
            </p>
            <a href="https://www.skywalk.info" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:opacity-80"
              style={{ border: '1px solid rgba(107,163,214,0.3)', backgroundColor: 'rgba(107,163,214,0.08)' }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0" style={{ color: 'var(--color-thermal)' }}>
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="text-xs tracking-widest uppercase font-medium" style={{ color: 'var(--color-thermal)' }}>
                  Official Skywalk Distributor
                </p>
                <p className="text-sm font-medium text-white">skywalk.info ↗</p>
              </div>
            </a>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-5 font-medium" style={{ color: 'var(--color-thermal)' }}>
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/wings', label: 'Skywalk Wings' },
                { href: '/fly', label: 'Fly With Us' },
                { href: '/selector', label: 'Wing Selector' },
                { href: '/insights', label: 'Insights' },
                { href: '/advice', label: 'Get Advice' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm transition-colors hover:text-white"
                    style={{ color: 'rgba(240,239,237,0.6)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-widest uppercase mb-5 font-medium" style={{ color: 'var(--color-thermal)' }}>
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@paraura.com" className="text-sm transition-colors hover:text-white"
                  style={{ color: 'rgba(240,239,237,0.6)' }}>
                  info@paraura.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/27826363666" target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: 'rgba(240,239,237,0.6)' }}>
                  WhatsApp SA: +27 82 636 3666
                </a>
              </li>
              <li>
                <a href="https://wa.me/447983345203" target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: 'rgba(240,239,237,0.6)' }}>
                  WhatsApp UK: +44 79 8334 5203
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@parauraparagliding" target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: 'rgba(240,239,237,0.6)' }}>
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs" style={{ color: 'rgba(240,239,237,0.3)' }}>
            © {new Date().getFullYear()} Paraura. Official Skywalk Paragliders importer &amp; distributor, South Africa.
          </p>
        </div>
      </div>
    </footer>
  )
}
