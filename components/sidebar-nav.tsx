"use client";

import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { id: "hero", href: "#hero", label: "Home" },
  { id: "about", href: "#about", label: "About Me" },
  { id: "academics", href: "#academics", label: "Academics" },
  { id: "research", href: "#research", label: "Research" },
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "skills", href: "#skills", label: "Skills" },
  { id: "experience", href: "#experience", label: "Work Experience" },
  { id: "contact", href: "#contact", label: "Contact" },
];

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  
  // Check if we're on a project or blog page (these have their own sidebars)
  const isProjectPage = pathname?.startsWith('/projects/');
  const isBlogPage = pathname?.startsWith('/blog/');

  useEffect(() => {
    const container = document.getElementById('page-scroll')

    const handleScroll = () => {
      const scrollTop = container ? container.scrollTop : window.scrollY
      const viewportOffset = 100
      const containerRect = container?.getBoundingClientRect()
      let currentSection = "";
      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (!element) continue
        let elementTop: number
        if (container && containerRect) {
          const elementRect = element.getBoundingClientRect()
          elementTop = elementRect.top - containerRect.top + scrollTop
        } else {
          elementTop = element.offsetTop
        }
        if (elementTop <= scrollTop + viewportOffset) {
          currentSection = item.id
        }
      }
      setActiveSection(currentSection)
    }

    const target: HTMLElement | Window = container ?? window
    target.addEventListener('scroll', handleScroll as EventListener, { passive: true } as AddEventListenerOptions)
    handleScroll()
    return () => {
      target.removeEventListener('scroll', handleScroll as EventListener)
    }
  }, [])

  const handleNavLinkClick = (hash: string) => {
    const container = document.getElementById('page-scroll')
    const element = document.getElementById(hash.substring(1));
    if (container && element) {
      // Scroll to top of section when clicking nav links
      container.scrollTo({ top: element.offsetTop, behavior: 'smooth' })
      return
    }
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  };

  // Don't render the home sidebar on project or blog pages
  if (isProjectPage || isBlogPage) {
    return null;
  }

  return (
    <aside className="w-60 h-screen sticky top-0 flex flex-col justify-between overflow-y-auto p-6 space-y-6 border-r border-border bg-background lg:block hidden">
      <div> 
        <h1 className="text-3xl font-bold font-serif text-foreground mb-10">Taj Gillin</h1>
        <nav>
          <ul className="space-y-3">
            {NAV_ITEMS.map((item) => {
              return (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    onClick={() => handleNavLinkClick(item.href)}
                    className={cn(
                        "block text-lg transition-colors duration-150 ease-in-out hover:text-primary",
                        activeSection === item.id ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {/* Theme toggle hidden - dark mode only */}
      {false && (
        <div className="mt-auto"> 
          <ModeToggle />
        </div>
      )}
    </aside>
  );
}
