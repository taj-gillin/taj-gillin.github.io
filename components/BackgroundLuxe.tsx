'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

export function BackgroundLuxe() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)

  const reduceMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const isCoarsePointer = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia && window.matchMedia('(pointer: coarse)').matches
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const handleScroll = () => {
      const y = window.scrollY || 0
      const gridTranslate = Math.max(-8, Math.min(8, y * 0.02))
      const gradTranslate = Math.max(-6, Math.min(6, y * 0.01))
      if (gridRef.current) gridRef.current.style.transform = `translate3d(0, ${gridTranslate}px, 0)`
      if (gradientRef.current) gradientRef.current.style.transform = `translate3d(0, ${gradTranslate}px, 0)`
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [reduceMotion, isCoarsePointer])

  // Very subtle SVG noise as data URI
  const noiseDataUri = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.035"/></svg>`
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
  }, [])

  const isDark = theme === 'dark'
  const gridColor = isDark ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.04)'

  if (!mounted) {
    // Avoid SSR -> CSR mismatches by rendering nothing until client hydration
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -3 }}>
      {/* Gradient drift layer */}
      <div
        ref={gradientRef}
        className="absolute inset-0"
        style={{
          zIndex: -3,
          backgroundImage: isDark
            ? 'radial-gradient(1100px circle at 20% 15%, rgba(67, 56, 202, 0.10), transparent 60%), radial-gradient(900px circle at 85% 30%, rgba(30, 64, 175, 0.08), transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.05), transparent 30%)'
            : 'radial-gradient(1100px circle at 20% 15%, rgba(59, 130, 246, 0.10), transparent 60%), radial-gradient(900px circle at 80% 30%, rgba(99, 102, 241, 0.08), transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.02), transparent 30%)',
          transition: 'background-color 300ms ease',
        }}
      />

      {/* Soft grid layer - disabled */}
      {false && (
        <div
          ref={gridRef}
          className="absolute inset-0"
          style={{
            zIndex: -2,
            backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
            backgroundSize: '48px 48px, 48px 48px',
            backgroundPosition: '0 0, 0 0',
          }}
        />
      )}

      {/* Subtle noise overlay */}
      {!reduceMotion && (
        <div
          className="absolute inset-0 opacity-[0.20]"
          style={{ zIndex: -2, backgroundImage: noiseDataUri, mixBlendMode: isDark ? 'soft-light' : 'multiply' }}
        />
      )}

      {/* Vignette to center attention */}
      <div
        ref={vignetteRef}
        className="absolute inset-0"
        style={{
          zIndex: -1,
          background: isDark
            ? 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)'
            : 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.22) 100%)',
        }}
      />
    </div>
  )
}


