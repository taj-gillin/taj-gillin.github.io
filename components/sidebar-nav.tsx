"use client";

import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "about", href: "#about", label: "About Me" },
  { id: "academics", href: "#academics", label: "Academics" },
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "skills", href: "#skills", label: "Skills" },
  { id: "experience", href: "#experience", label: "Work Experience" },
  { id: "contact", href: "#contact", label: "Contact" },
];

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let currentSection = "";
      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);
        if (element && element.offsetTop <= scrollPosition) {
          currentSection = item.id;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavLinkClick = (hash: string) => {
    const element = document.getElementById(hash.substring(1));
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      <div className="mt-auto"> 
        <ModeToggle />
      </div>
    </aside>
  );
}
