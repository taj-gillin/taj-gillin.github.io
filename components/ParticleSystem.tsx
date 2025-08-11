'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { useScrollSection } from '@/hooks/useScrollSection'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
  hueOffset: number
  id: string
}

export type ParticleMode = 'hero' | 'about' | 'academics' | 'projects' | 'skills' | 'experience' | 'contact'

interface ParticleSystemProps {
  mode?: ParticleMode
  particleDensity?: number // particles per 100,000 pixels (density factor)
  interactive?: boolean
  className?: string
  useScrollMode?: boolean
}

export function ParticleSystem({
  mode = 'hero',
  particleDensity = 0.004, // ~260 particles for 1920x1080 screen
  interactive = true,
  className = '',
  useScrollMode = false,
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const { theme } = useTheme()
  const { currentMode } = useScrollSection()

  const activeMode = useScrollMode ? currentMode : mode

  // Calculate particle count based on screen area and density
  const calculateParticleCount = (width: number, height: number): number => {
    const area = width * height
    const baseCount = Math.floor(area * particleDensity)
    // Clamp between reasonable bounds to prevent performance issues
    return Math.max(50, Math.min(500, baseCount))
  }

  // Base hue per section for subtle hue modulation
  const MODE_BASE_HUE: Record<ParticleMode, number> = {
    hero: 230,
    about: 212,
    academics: 205,
    projects: 220,
    skills: 236,
    experience: 215,
    contact: 225,
  }

  const baseHueRef = useRef<number>(MODE_BASE_HUE[activeMode])
  const targetBaseHueRef = useRef<number>(MODE_BASE_HUE[activeMode])

  // Initialize particles
  const initializeParticles = (width: number, height: number) => {
    const particles: Particle[] = []
    const dynamicParticleCount = calculateParticleCount(width, height)
    
    for (let i = 0; i < dynamicParticleCount; i++) {
      const hueOffset = (Math.random() * 16) - 8 // -8° to +8° per particle for variety
      const baseHue = (baseHueRef.current + hueOffset + 360) % 360
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.6,
        hue: baseHue,
        hueOffset,
        id: `particle-${i}`,
      })
    }
    particlesRef.current = particles
  }

  // Hero: Brownian motion + cursor repulsion
  const updateHeroParticles = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas
    const mouse = mouseRef.current
    particlesRef.current.forEach((p) => {
      if (interactive) {
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.hypot(dx, dy)
        const max = 150
        if (dist < max && dist > 0.0001) {
          const force = (max - dist) / max
          const angle = Math.atan2(dy, dx)
          p.vx -= Math.cos(angle) * force * 0.02
          p.vy -= Math.sin(angle) * force * 0.02
        }
      }
      p.vx += (Math.random() - 0.5) * 0.02
      p.vy += (Math.random() - 0.5) * 0.02
      p.vx *= 0.99
      p.vy *= 0.99
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0) p.x = width
      if (p.x > width) p.x = 0
      if (p.y < 0) p.y = height
      if (p.y > height) p.y = 0
      p.size = 1.5 + Math.sin(Date.now() * 0.0008 + p.x * 0.01) * 0.4
    })
  }

  // Contact: Wave-like formation
  const updateContactParticles = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas
    particlesRef.current.forEach((p, i) => {
      const gridSize = Math.sqrt(particlesRef.current.length)
      const cols = Math.ceil(gridSize)
      const rows = Math.ceil(particlesRef.current.length / cols)
      const col = i % cols
      const row = Math.floor(i / cols)
      const targetX = (width / (cols + 1)) * (col + 1) + Math.sin(Date.now() * 0.001 + i) * 30
      const targetY = (height / (rows + 1)) * (row + 1) + Math.cos(Date.now() * 0.001 + i) * 20
      const dx = targetX - p.x
      const dy = targetY - p.y
      p.vx += dx * 0.002
      p.vy += dy * 0.002
      p.vx += (Math.random() - 0.5) * 0.02
      p.vy += (Math.random() - 0.5) * 0.02
      p.vx *= 0.95
      p.vy *= 0.95
      p.x += p.vx
      p.y += p.vy
      p.size = 1.5 + Math.sin(Date.now() * 0.003 + i * 0.2) * 0.8
    })
  }

  // (Removed other section-specific patterns by request)

  // Drawing
  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas
    const isDark = theme === 'dark'
    ctx.clearRect(0, 0, width, height)

    // Gently ease current base hue toward target for smooth section transitions
    baseHueRef.current += (targetBaseHueRef.current - baseHueRef.current) * 0.05
    const currentBaseHue = (baseHueRef.current + 360) % 360
    // Connections
    particlesRef.current.forEach((a, i) => {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const b = particlesRef.current[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d = Math.hypot(dx, dy)
        if (d < 100) {
          const opacity = ((100 - d) / 100) * (isDark ? 0.45 : 0.35)
          const hue = currentBaseHue
          ctx.strokeStyle = `hsla(${hue}, 80%, ${isDark ? 85 : 65}%, ${opacity})`
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    })
    // Particles
    particlesRef.current.forEach((p) => {
      // Ease particle hue toward the current base hue plus its offset
      const targetHue = (currentBaseHue + p.hueOffset + 360) % 360
      const delta = ((((targetHue - p.hue) + 540) % 360) - 180) // shortest hue distance
      p.hue = (p.hue + delta * 0.05 + 360) % 360

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5)
      const lightness = isDark ? 85 : 65
      const saturation = isDark ? 80 : 75
      const opacity = isDark ? p.opacity * 1.3 : p.opacity * 1.1
      gradient.addColorStop(0, `hsla(${p.hue}, ${saturation}%, ${lightness}%, ${opacity})`)
      gradient.addColorStop(0.6, `hsla(${p.hue}, ${saturation}%, ${lightness}%, ${opacity * 0.4})`)
      gradient.addColorStop(1, `hsla(${p.hue}, ${saturation}%, ${lightness}%, 0)`)
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (activeMode === 'contact') {
      updateContactParticles(ctx)
    } else {
      updateHeroParticles(ctx)
    }
    drawParticles(ctx)
    animationRef.current = requestAnimationFrame(animate)
  }

  // Events
  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const handleResize = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const { innerWidth, innerHeight } = window
    canvas.width = innerWidth
    canvas.height = innerHeight
    setDimensions({ width: innerWidth, height: innerHeight })
    initializeParticles(innerWidth, innerHeight)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    if (interactive) window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (interactive) window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [interactive])

  useEffect(() => {
    // Update target hue when active section changes
    targetBaseHueRef.current = MODE_BASE_HUE[activeMode]
    if (dimensions.width && dimensions.height) animate()
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [dimensions, activeMode, theme])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ background: 'transparent', zIndex: -1 }}
    />
  )
}


