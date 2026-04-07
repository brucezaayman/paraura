'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Nav is always visible with a solid background — no transparent mode
  // This prevents the "white on white" problem on light-background pages
  const isLight = true // always solid

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: open ? 'var(--surface-light)' : 'rgba(240,239,237,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo — 50% bigger: was h-12, now h-16 */}
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
            <Image
              src="/images/parauralogo.png"
              alt="Paraura"
              width={240}
              height={72}
              className="h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: '/wings', label: 'Skywalk Wings' },
              { href: '/fly', label: 'Fly With Us' },
              { href: '/selector', label: 'Find Your Wing' },
              { href: '/insights', label: 'Insights' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-sm font-medium transition-colors duration-200"
                style={{ color: 'var(--color-carbon)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-blue)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-carbon)')}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/advice" className="btn-primary text-sm px-5 py-2.5">
              Get Advice
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg"
            aria-label="Toggle menu"
          >
            <span className={`block h-px transition-all duration-300 ${open ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'}`}
              style={{ backgroundColor: 'var(--color-carbon)' }} />
            <span className={`block h-px transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-4'}`}
              style={{ backgroundColor: 'var(--color-carbon)' }} />
            <span className={`block h-px transition-all duration-300 ${open ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'}`}
              style={{ backgroundColor: 'var(--color-carbon)' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ backgroundColor: 'var(--surface-light)' }}
      >
        <nav className="px-6 pb-8 pt-4 flex flex-col gap-1">
          {[
            { href: '/wings', label: 'Skywalk Wings' },
            { href: '/fly', label: 'Fly With Us' },
            { href: '/selector', label: 'Find Your Wing' },
            { href: '/insights', label: 'Insights' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="mobile-nav-link" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <div className="mt-6">
            <Link href="/advice" className="btn-primary w-full text-center block" onClick={() => setOpen(false)}>
              Get Advice
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
