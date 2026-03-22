'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function ParauraLogo() {
  return (
    <svg
      width="180"
      height="44"
      viewBox="0 0 180 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Paraura"
    >
      <defs>
        {/* Oval cutout mask — the paraglider canopy scooped from the bottom of the wordmark */}
        <mask id="logo-cutaway">
          <rect width="180" height="44" fill="white" />
          <ellipse cx="88" cy="40" rx="72" ry="13" fill="black" />
        </mask>
      </defs>

      {/* Wordmark in italic — sky blue, masked with canopy cutout */}
      <text
        x="4"
        y="32"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="32"
        fontWeight="400"
        fontStyle="italic"
        letterSpacing="1"
        fill="#38bdf8"
        mask="url(#logo-cutaway)"
      >
        paraura
      </text>

      {/* Faint arc tracing the canopy edge — just visible */}
      <ellipse
        cx="88"
        cy="40"
        rx="72"
        ry="13"
        stroke="#38bdf8"
        strokeWidth="0.6"
        fill="none"
        opacity="0.35"
      />
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
