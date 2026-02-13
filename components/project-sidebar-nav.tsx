"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { TableOfContentsItem } from '@/lib/mdx-utils';

interface ProjectSidebarNavProps {
  projectTitle: string;
  tableOfContents: TableOfContentsItem[];
  backLink?: {
    href: string;
    label: string;
  };
}

export function ProjectSidebarNav({
  projectTitle,
  tableOfContents,
  backLink = { href: "/#projects", label: "← Back to Projects" }
}: ProjectSidebarNavProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const viewportOffset = 100;
      let currentSection = "";

      // Find the project content container by ID
      const projectContent = document.getElementById('project-content');
      if (!projectContent) return;

      const scrollTop = projectContent.scrollTop;
      const containerRect = projectContent.getBoundingClientRect();

      // Check each TOC item to see which section is currently visible
      for (const item of tableOfContents) {
        const element = document.getElementById(item.id);
        if (!element) continue;

        const elementRect = element.getBoundingClientRect();
        const elementTop = elementRect.top - containerRect.top + scrollTop;

        if (elementTop <= scrollTop + viewportOffset) {
          currentSection = item.id;
        }
      }
      setActiveSection(currentSection);
    };

    // Find the project content container by ID
    const projectContent = document.getElementById('project-content');
    if (projectContent) {
      projectContent.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Set initial state

      return () => {
        projectContent.removeEventListener('scroll', handleScroll);
      };
    }
  }, [tableOfContents]);

  const handleNavLinkClick = (hash: string) => {
    const element = document.getElementById(hash.substring(1));
    const projectContent = document.getElementById('project-content');

    if (element && projectContent) {
      // Calculate the position to scroll to within the project content container
      const containerRect = projectContent.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const scrollTop = projectContent.scrollTop;
      const targetScrollTop = elementRect.top - containerRect.top + scrollTop - 100; // 100px offset

      projectContent.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    } else if (element) {
      // Fallback to regular scroll
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="w-60 h-screen flex flex-col justify-between overflow-y-auto p-6 space-y-6 border-r border-white/10 bg-black/80 backdrop-blur-xl text-white lg:block hidden shadow-xl">
      <div>
        <Link
          href="/"
          className="text-3xl font-bold font-serif text-white mb-4 block hover:text-gray-300 transition-colors"
        >
          Taj Gillin
        </Link>

        {/* Project title */}
        <h2 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">
          {projectTitle}
        </h2>

        {/* Back link */}
        <Link
          href={backLink.href}
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-6"
        >
          {backLink.label}
        </Link>

        {/* Table of Contents */}
        <nav>
          <ul className="space-y-3">
            {tableOfContents.map((item) => {
              const indent = Math.max(0, (item.level - 1)) * 16;

              let textSize = "text-lg";

              if (item.level === 1) {
                textSize = "text-lg";
              } else if (item.level === 2) {
                textSize = "text-base";
              } else if (item.level === 3) {
                textSize = "text-sm";
              } else if (item.level >= 4) {
                textSize = "text-xs";
              }

              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavLinkClick(`#${item.id}`)}
                    className={cn(
                      "block w-full text-left transition-colors duration-150 ease-in-out hover:text-gray-300 cursor-pointer",
                      textSize,
                      activeSection === item.id ? "text-white font-semibold" : "text-gray-500"
                    )}
                    style={{
                      paddingLeft: `${indent}px`
                    }}
                  >
                    {item.text}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
