'use client'

import { useState, useEffect } from 'react'

export type ParticleMode = 'hero' | 'about' | 'academics' | 'research' | 'projects' | 'experience' | 'contact'

// Define sections in order with their corresponding particle modes
const SECTIONS: { id: string; mode: ParticleMode }[] = [
  { id: 'hero', mode: 'hero' },
  { id: 'about', mode: 'about' },
  { id: 'academics', mode: 'academics' },
  { id: 'research', mode: 'research' },
  { id: 'projects', mode: 'projects' },
  { id: 'experience', mode: 'experience' },
  { id: 'contact', mode: 'contact' }
]

export function useScrollSection() {
  const [currentMode, setCurrentMode] = useState<ParticleMode>('hero')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progress, setProgress] = useState(0) // 0-1 progress through current section

  useEffect(() => {
    const scrollContainer = document.getElementById('page-scroll') || window

    const computeActiveSection = () => {
      // Determine which section's center is closest to viewport center
      let newMode: ParticleMode = 'hero'
      let bestDistance = Infinity
      const viewportCenter = window.innerHeight * 0.5
      let selectedRect: DOMRect | null = null

      for (const section of SECTIONS) {
        const element = document.getElementById(section.id)
        if (!element) continue
        const rect = element.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const distance = Math.abs(sectionCenter - viewportCenter)
        if (distance < bestDistance) {
          bestDistance = distance
          newMode = section.mode
          selectedRect = rect
        }
      }

      if (newMode !== currentMode) {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentMode(newMode)
          setIsTransitioning(false)
        }, 120)
      }

      // Compute progress within the selected section based on how far the top has moved past center
      if (selectedRect) {
        const sectionHeight = Math.max(1, selectedRect.height)
        const topToCenter = viewportCenter - selectedRect.top
        const p = Math.max(0, Math.min(1, topToCenter / sectionHeight))
        setProgress(p)
      }
    }

    // Initial
    computeActiveSection()

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        computeActiveSection()
        ticking = false
      })
    }

    if (scrollContainer instanceof Window) {
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    } else {
      scrollContainer.addEventListener('scroll', onScroll, { passive: true })
      return () => scrollContainer.removeEventListener('scroll', onScroll)
    }
  }, [currentMode])

  return {
    currentMode,
    isTransitioning,
    progress,
    sections: SECTIONS,
  }
}
