'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function ParauraLogo() {
  return (
    <svg width="140" height="28" viewBox="0 0 140 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Wing mark */}
      <path d="M2 16 C2 10 7 5 14 5 C17 5 20 6.5 22 9 L25 13 L22 17 C20 19.5 17 21 14 21 C7 21 2 18 2 16Z" fill="#38bdf8"/>
      {/* Cutaway line */}
      <line x1="10" y1="8" x2="22" y2="18" stroke="#0c1a2e" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Wordmark */}
      <text x="32" y="19" fill="white" fontSize="13" fontWeight="500" letterSpacing="2.5" fontFamily="system-ui, sans-serif">PARAURA</text>
    </svg>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          <Link href="/" onClick={() => setOpen(false)}>
            <ParauraLogo />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/wings" className="nav-link">Wings</Link>
            <Link href="/selector" className="nav-link">Find Your Wing</Link>
            <Link href="/advice" className="btn-primary text-sm px-5 py-2.5">
              Get Advice
            </Link>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg"
            aria-label="Toggle menu"
          >
            <span className={`block h-px bg-white transition-all duration-300 ${open ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'}`} />
            <span className={`block h-px bg-white transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-4'}`} />
            <span className={`block h-px bg-white transition-all duration-300 ${open ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'}`} />
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-500 overflow-hidden ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="px-6 pb-8 pt-4 flex flex-col gap-1">
          <Link href="/wings" className="mobile-nav-link" onClick={() => setOpen(false)}>Wings</Link>
          <Link href="/selector" className="mobile-nav-link" onClick={() => setOpen(false)}>Find Your Wing</Link>
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
