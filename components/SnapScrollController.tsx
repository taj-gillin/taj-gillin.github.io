'use client'

import { useEffect, useRef } from 'react'

export function SnapScrollController() {
  const isAnimatingRef = useRef(false)
  const lastWheelTimeRef = useRef(0)
  const wheelAccumulatedRef = useRef(0)

  useEffect(() => {
    const container = document.getElementById('page-scroll')
    if (!container) return

    const getSections = (): HTMLElement[] => {
      return Array.from(container.querySelectorAll('section[id]')) as HTMLElement[]
    }

    const getCurrentIndex = (sections: HTMLElement[]) => {
      const scrollTop = container.scrollTop
      const viewportHeight = container.clientHeight
      const viewportCenter = scrollTop + viewportHeight / 2
      
      // Find which section the viewport center is in
      for (let i = 0; i < sections.length; i++) {
        const el = sections[i]
        const top = el.offsetTop
        const bottom = top + el.offsetHeight
        if (viewportCenter >= top && viewportCenter < bottom) {
          return i
        }
      }
      return 0
    }

    const canScrollWithinSection = (direction: 'up' | 'down') => {
      const sections = getSections()
      const currentIdx = getCurrentIndex(sections)
      const currentSection = sections[currentIdx]
      if (!currentSection) return false

      const sectionTop = currentSection.offsetTop
      const sectionHeight = currentSection.offsetHeight
      const sectionBottom = sectionTop + sectionHeight
      const scrollTop = container.scrollTop
      const viewportHeight = container.clientHeight
      const viewportBottom = scrollTop + viewportHeight

      if (direction === 'down') {
        // Can scroll down if section bottom is below viewport bottom
        return sectionBottom > viewportBottom + 10 // 10px tolerance
      } else {
        // Can scroll up if section top is above viewport top
        return sectionTop < scrollTop - 10 // 10px tolerance
      }
    }

    const scrollToIndex = (index: number, direction: 'up' | 'down' = 'down') => {
      const sections = getSections()
      const clamped = Math.max(0, Math.min(index, sections.length - 1))
      const target = sections[clamped]
      if (!target) return
      isAnimatingRef.current = true
      
      let scrollTop: number
      if (direction === 'up') {
        // When going up, scroll to show the bottom of the section
        const sectionBottom = target.offsetTop + target.offsetHeight
        scrollTop = sectionBottom - container.clientHeight
      } else {
        // When going down, scroll to the top of the section
        scrollTop = target.offsetTop
      }
      
      container.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' })
      // Reset wheel accumulation and unlock after animation
      wheelAccumulatedRef.current = 0
      window.setTimeout(() => {
        isAnimatingRef.current = false
      }, 1000)
    }

    const onWheel = (e: WheelEvent) => {
      // Only handle vertical intent
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return
      
      if (isAnimatingRef.current) {
        e.preventDefault()
        return
      }

      const direction = e.deltaY > 0 ? 'down' : 'up'
      
      // Check if we can scroll within the current section
      if (canScrollWithinSection(direction)) {
        // Allow normal scrolling within section
        return
      }

      // We're at section boundary, prevent default and handle section navigation
      e.preventDefault()

      const now = Date.now()
      const timeSinceLastWheel = now - lastWheelTimeRef.current
      lastWheelTimeRef.current = now

      // Reset accumulation if too much time has passed
      if (timeSinceLastWheel > 150) {
        wheelAccumulatedRef.current = 0
      }

      // Accumulate wheel delta
      wheelAccumulatedRef.current += e.deltaY

      // Only trigger scroll when we've accumulated enough wheel movement (increased resistance)
      const threshold = 200
      if (Math.abs(wheelAccumulatedRef.current) >= threshold) {
        const sections = getSections()
        const idx = getCurrentIndex(sections)
        const sectionDirection = wheelAccumulatedRef.current > 0 ? 1 : -1
        const nextIdx = idx + sectionDirection
        const scrollDirection = wheelAccumulatedRef.current > 0 ? 'down' : 'up'
        scrollToIndex(nextIdx, scrollDirection)
      }
    }

    // Keyboard support
    const onKey = (e: KeyboardEvent) => {
      if (isAnimatingRef.current) return
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault()
        const idx = getCurrentIndex(getSections())
        scrollToIndex(idx + 1, 'down')
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        const idx = getCurrentIndex(getSections())
        scrollToIndex(idx - 1, 'up')
      }
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('keydown', onKey as EventListener)

    return () => {
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('keydown', onKey as EventListener)
    }
  }, [])

  return null
}


