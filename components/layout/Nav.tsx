'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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

          {/* Logo — using your actual artwork */}
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
            <Image
              src="/images/parauralogo.png"
              alt="Paraura"
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/wings" className="nav-link">Skywalk Wings</Link>
            <Link href="/fly" className="nav-link">Fly With Us</Link>
            <Link href="/selector" className="nav-link">Find Your Wing</Link>
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
            <span className={`block h-px bg-white transition-all duration-300 ${open ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5'}`} />
            <span className={`block h-px bg-white transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-4'}`} />
            <span className={`block h-px bg-white transition-all duration-300 ${open ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="px-6 pb-8 pt-4 flex flex-col gap-1">
          <Link href="/wings" className="mobile-nav-link" onClick={() => setOpen(false)}>Skywalk Wings</Link>
          <Link href="/fly" className="mobile-nav-link" onClick={() => setOpen(false)}>Fly With Us</Link>
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
