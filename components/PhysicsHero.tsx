'use client'

import { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'

interface PhysicsHeroProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scrollContainerRef?: React.RefObject<any>
}

// Per-character width ratios (relative to fontSize) - tuned for sans-serif bold
const CHAR_WIDTH_RATIOS: Record<string, number> = {
    'T': 0.58,
    'a': 0.52,
    'j': 0.30,
    'G': 0.62,
    'i': 0.22,
    'l': 0.22,
    'n': 0.52,
}
const DEFAULT_WIDTH_RATIO = 0.5
const CHAR_HEIGHT_RATIO = 0.75 // Height relative to fontSize

// Toggle this to show/hide hitbox outlines
const DEBUG_HITBOXES = false

interface LetterInfo {
    char: string
    id: number
    w: number  // physics body width
    h: number  // physics body height
}

export function PhysicsHero({ scrollContainerRef }: PhysicsHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [letters, setLetters] = useState<LetterInfo[]>([])
    const letterRefs = useRef<Map<number, HTMLDivElement>>(new Map())
    const engineRef = useRef<Matter.Engine | null>(null)
    const runnerRef = useRef<Matter.Runner | null>(null)
    const floorRef = useRef<Matter.Body | null>(null)
    const requestRef = useRef<number | null>(null)

    const hasShatteredRef = useRef(false)

    useEffect(() => {
        const Engine = Matter.Engine
        const World = Matter.World
        const Bodies = Matter.Bodies
        const Mouse = Matter.Mouse
        const MouseConstraint = Matter.MouseConstraint
        const Runner = Matter.Runner
        const Events = Matter.Events

        const engine = Engine.create()
        engineRef.current = engine
        engine.gravity.y = 1

        const width = containerRef.current?.clientWidth || window.innerWidth
        const height = containerRef.current?.clientHeight || window.innerHeight

        const text = "Taj Gillin"
        const letterBodies: Matter.Body[] = []
        const letterData: LetterInfo[] = []

        // Responsive sizing
        const isMobile = width < 640
        const fontSize = isMobile ? width / 4 : Math.min(width / 6, 200)
        const gap = fontSize * 0.02 // Tiny gap between letters
        const spaceWidth = fontSize * 0.25 // Width of a space character

        // Pre-calculate total width for centering
        let totalWidth = 0
        const chars = text.split('')
        chars.forEach((char, i) => {
            if (char === ' ') {
                totalWidth += spaceWidth
            } else {
                const wRatio = CHAR_WIDTH_RATIOS[char] || DEFAULT_WIDTH_RATIO
                totalWidth += fontSize * wRatio
                // Add gap after each non-space char (except last)
                if (i < chars.length - 1 && chars[i + 1] !== ' ') {
                    totalWidth += gap
                }
            }
        })

        let currentX = (width - totalWidth) / 2
        const bodyH = fontSize * CHAR_HEIGHT_RATIO
        const startY = height / 2 - bodyH / 2

        chars.forEach((char, i) => {
            if (char === ' ') {
                currentX += spaceWidth
                return
            }

            const wRatio = CHAR_WIDTH_RATIOS[char] || DEFAULT_WIDTH_RATIO
            const bodyW = fontSize * wRatio

            const body = Bodies.rectangle(
                currentX + bodyW / 2,
                startY + bodyH / 2,
                bodyW,
                bodyH,
                {
                    restitution: 0.6,
                    friction: 0.1,
                    frictionAir: 0.02,
                    angle: 0,
                }
            )

            Matter.Body.setStatic(body, true)

            letterBodies.push(body)
            letterData.push({ char, id: body.id, w: bodyW, h: bodyH })

            currentX += bodyW + gap
            // Remove double gap before space
            if (i < chars.length - 1 && chars[i + 1] === ' ') {
                // no extra gap before space
            }
        })

        setLetters(letterData)

        // Floor
        const floor = Bodies.rectangle(width / 2, height + 500, width * 5, 1000, {
            isStatic: true,
            friction: 0.5,
            restitution: 0.8,
            label: 'floor'
        })
        floorRef.current = floor

        // Walls & Ceiling
        const wallThickness = 200
        const wallHeight = height * 100

        const leftWall = Bodies.rectangle(
            -wallThickness / 2, 0, wallThickness, wallHeight,
            { isStatic: true, friction: 0, label: 'wall' }
        )
        const rightWall = Bodies.rectangle(
            width + wallThickness / 2, 0, wallThickness, wallHeight,
            { isStatic: true, friction: 0, label: 'wall' }
        )
        const ceiling = Bodies.rectangle(
            width / 2, -height * 50, width * 10, 200,
            { isStatic: true, label: 'ceiling' }
        )

        World.add(engine.world, [...letterBodies, floor, leftWall, rightWall, ceiling])

        // Interaction
        const mouse = Mouse.create(containerRef.current!)
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: { stiffness: 0.1, render: { visible: false } }
        })

        if (mouse.element) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const mouseWithEvents = mouse as any
            mouse.element.removeEventListener('wheel', mouseWithEvents.mousewheel)
            mouse.element.removeEventListener('DOMMouseScroll', mouseWithEvents.mousewheel)
            mouse.element.removeEventListener('mousewheel', mouseWithEvents.mousewheel)
            mouse.element.removeEventListener('touchmove', mouseWithEvents.mousemove)
            mouse.element.removeEventListener('touchstart', mouseWithEvents.mousedown)
            mouse.element.removeEventListener('touchend', mouseWithEvents.mouseup)
        }

        World.add(engine.world, mouseConstraint)

        // "Push" effect
        Events.on(engine, 'beforeUpdate', () => {
            const mousePosition = mouse.position
            const repulsionRange = 80
            const forceMagnitude = 0.15 * (isMobile ? 1.5 : 1)

            letterBodies.forEach(body => {
                const dx = body.position.x - mousePosition.x
                const dy = body.position.y - mousePosition.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < repulsionRange && distance > 0) {
                    if (!hasShatteredRef.current) triggerShatter()
                    const force = {
                        x: (dx / distance) * forceMagnitude * (repulsionRange - distance) / repulsionRange,
                        y: (dy / distance) * forceMagnitude * (repulsionRange - distance) / repulsionRange
                    }
                    Matter.Body.applyForce(body, body.position, force)
                }
            })
        })

        Events.on(mouseConstraint, 'startdrag', () => {
            if (!hasShatteredRef.current) triggerShatter()
        })

        // Start Runner
        const runner = Runner.create()
        runnerRef.current = runner
        Runner.run(runner, engine)

        // Render loop - use per-letter dimensions
        const renderLoop = () => {
            letterBodies.forEach((body, idx) => {
                const el = letterRefs.current.get(body.id)
                if (el) {
                    const info = letterData[idx]
                    const { x, y } = body.position
                    const angle = body.angle
                    el.style.transform = `translate(${x - info.w / 2}px, ${y - info.h / 2}px) rotate(${angle}rad)`
                }
            })
            requestRef.current = requestAnimationFrame(renderLoop)
        }
        requestRef.current = requestAnimationFrame(renderLoop)

        // Helper to shatter
        const triggerShatter = () => {
            if (hasShatteredRef.current) return
            console.log("Triggering Shatter!")
            hasShatteredRef.current = true
            window.dispatchEvent(new CustomEvent('hero-shattered'))

            letterBodies.forEach(body => {
                Matter.Body.setStatic(body, false)
                Matter.Sleeping.set(body, false)
                Matter.Body.setVelocity(body, {
                    x: (Math.random() - 0.5) * 8,
                    y: (Math.random() - 0.5) * 8
                })
                Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.3)
            })
        }

        // Initial positioning check for scroll
        if (scrollContainerRef?.current) {
            const scrollY = scrollContainerRef.current.scrollTop
            const targetY = (height - scrollY) + (1000 / 2)
            Matter.Body.setPosition(floor, { x: width / 2, y: targetY })
        }

        const handleResize = () => {
            const newWidth = containerRef.current?.clientWidth || window.innerWidth
            Matter.Body.setPosition(rightWall, { x: newWidth + 200 / 2, y: 0 })
            Matter.Body.setPosition(floor, { x: newWidth / 2, y: floor.position.y })
        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('click', triggerShatter)

        const handleScrollTrigger = () => {
            if (!hasShatteredRef.current) triggerShatter()
        }
        window.addEventListener('scroll', handleScrollTrigger, { capture: true, passive: true })

        const handleWheelTrigger = () => {
            if (!hasShatteredRef.current) triggerShatter()
        }
        window.addEventListener('wheel', handleWheelTrigger, { capture: true, passive: true })

        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('click', triggerShatter)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.removeEventListener('scroll', handleScrollTrigger, { capture: true } as any)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.removeEventListener('wheel', handleWheelTrigger, { capture: true } as any)

            if (requestRef.current) cancelAnimationFrame(requestRef.current)
            if (runnerRef.current && engineRef.current) {
                Runner.stop(runnerRef.current)
                World.clear(engineRef.current.world, false)
                Engine.clear(engineRef.current)
            }
        }
    }, [scrollContainerRef])

    // Handle Scroll to update Floor position
    useEffect(() => {
        const handleScroll = () => {
            if (!floorRef.current) return

            const scrollY = (scrollContainerRef?.current)
                ? scrollContainerRef.current.scrollTop
                : window.scrollY

            const height = containerRef.current?.clientHeight || window.innerHeight

            const floorHeight = 1000
            const targetY = (height - scrollY) + (floorHeight / 2)

            Matter.Body.setPosition(floorRef.current, {
                x: floorRef.current.position.x,
                y: targetY
            })

            Matter.Sleeping.set(floorRef.current, false)
        }

        window.addEventListener('scroll', handleScroll, { capture: true, passive: true })
        handleScroll()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return () => window.removeEventListener('scroll', handleScroll, { capture: true } as any)
    }, [scrollContainerRef])

    // Fallback Manual Scroll Handler
    useEffect(() => {
        const container = containerRef.current
        if (!container || !scrollContainerRef?.current) return

        const manualScroll = (e: WheelEvent) => {
            if (scrollContainerRef.current) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                scrollContainerRef.current.scrollBy({ top: e.deltaY, behavior: 'instant' as any })
            }
        }

        container.addEventListener('wheel', manualScroll, { passive: true })
        return () => { container.removeEventListener('wheel', manualScroll) }
    }, [scrollContainerRef])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 w-full h-full pointer-events-auto"
            style={{ zIndex: 0 }}
        >
            {letters.map(({ char, id, w, h }) => (
                <div
                    key={id}
                    ref={(el) => {
                        if (el) letterRefs.current.set(id, el)
                        else letterRefs.current.delete(id)
                    }}
                    className="absolute flex items-center justify-center font-bold text-black select-none pointer-events-none"
                    style={{
                        width: `${w}px`,
                        height: `${h}px`,
                        fontSize: `${h / CHAR_HEIGHT_RATIO}px`,
                        lineHeight: 1,
                        willChange: 'transform',
                        // Debug hitbox outline
                        ...(DEBUG_HITBOXES ? {
                            outline: '2px solid rgba(255, 0, 0, 0.5)',
                            outlineOffset: '-1px',
                        } : {})
                    }}
                >
                    {char}
                </div>
            ))}
        </div>
    )
}
