'use client'

import { useRef } from "react"
import { PhysicsHero } from "@/components/PhysicsHero"

export function HomeInteractive({ children }: { children: React.ReactNode }) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    return (
        <div
            ref={scrollContainerRef}
            className="h-full w-full overflow-y-auto relative bg-white selection:bg-black selection:text-white scroll-smooth"
        >
            {/* Physics Hero - Fixed Position, monitoring the container scroll */}
            <PhysicsHero scrollContainerRef={scrollContainerRef} />

            {/* Spacer for Hero Interaction */}
            {/* This invisible spacer ensures the user has to scroll past the hero height before the next section covers it */}
            <div id="hero" className="h-screen w-full pointer-events-none"></div>

            {/* Main Content - "Black Page" rising from below */}
            <div className="relative z-10 bg-black text-white min-h-screen w-full py-20 px-4 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">
                {children}
            </div>
        </div>
    )
}
