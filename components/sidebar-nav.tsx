"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation';

import { AnimatePresence, motion, Variants } from 'framer-motion';

const NAV_ITEMS = [
  { id: "hero", href: "#hero", label: "Home" },
  { id: "about", href: "#about", label: "About Me" },
  { id: "academics", href: "#academics", label: "Academics" },
  { id: "research", href: "#research", label: "Research" },
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "experience", href: "#experience", label: "Work Experience" },
  { id: "contact", href: "#contact", label: "Contact" },
];

export function SidebarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isOffHero, setIsOffHero] = useState(false);
  const pathname = usePathname();

  // Check if we're on a project or blog page (these have their own sidebars)
  const isProjectPage = pathname?.startsWith('/projects/');
  const isBlogPage = pathname?.startsWith('/blog/');

  // Scroll spy logic and off-hero detection
  useEffect(() => {
    // If not on home page, we're definitely "off hero"
    if (pathname !== '/') {
      setIsOffHero(true);
      return;
    }

    // On home page, detect scroll
    const handleScroll = () => {
      // The scroll container is inside HomeInteractive, but we can detect its scroll
      // by looking for the element with specific classes or by catching the event.
      // Since HomeInteractive uses h-full overflow-y-auto on its main div, 
      // window.scrollY might be 0. We need to check the actual scroll container.

      const scrollContainer = document.querySelector('.overflow-y-auto');
      if (scrollContainer) {
        const scrollY = scrollContainer.scrollTop;
        // Threshold: halfway through the first screen usually covers the background transition
        setIsOffHero(scrollY > window.innerHeight * 0.5);
      }
    };

    // Use a small delay to ensure the DOM is ready if needed, 
    // or just attach to window with capture to catch bubbled events.
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll, { capture: true } as any);
  }, [pathname]);

  const handleNavLinkClick = (hash: string) => {
    setIsOpen(false);

    // If not on home page, simple navigation
    if (pathname !== '/') return;

    // On home page, find element and scroll
    const element = document.getElementById(hash.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(hash.substring(1));
    }
  };

  // Don't render on specific pages if desired, OR keep it global.
  // User asked for "side bar hidden... click three bars... side bar appears".
  // This sounds like a global navigation pattern.
  // But previously we hid it on project pages. Let's respect that for now unless it feels wrong.
  if (isProjectPage || isBlogPage) {
    return null;
  }

  const sidebarVariants: Variants = {
    hidden: {
      y: "-100%",
    },
    visible: {
      y: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      y: "-100%",
      transition: {
        ease: "easeInOut",
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { x: -20, opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <>
      {/* Hamburger Trigger - Fixed Top Left */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-[60] w-10 h-10 flex flex-col items-center justify-center gap-[5px] bg-black rounded-md hover:bg-gray-800 transition-colors mix-blend-difference"
        aria-label="Toggle Menu"
      >
        <span
          className="block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center"
          style={{
            transform: isOpen ? 'translateY(7px) rotate(45deg)' : 'none',
          }}
        />
        <span
          className="block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? 'scaleX(0)' : 'scaleX(1)',
          }}
        />
        <span
          className="block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] origin-center"
          style={{
            transform: isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
          }}
        />
      </button>

      {/* Backdrop & Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Drawer */}
            <motion.aside
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "fixed top-0 left-0 bottom-0 w-64 z-50 p-8 border-r shadow-2xl flex flex-col transition-colors duration-300",
                isOffHero ? "bg-white text-black border-black/10" : "bg-black text-white border-white/10"
              )}
            >
              <div className="flex justify-between items-center mb-10 mt-12">
                <motion.h1
                  variants={itemVariants}
                  className="text-3xl font-bold font-serif"
                >
                  Taj Gillin
                </motion.h1>
              </div>

              <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-4">
                  {NAV_ITEMS.map((item) => (
                    <motion.li key={item.label} variants={itemVariants}>
                      <Link
                        href={item.href}
                        onClick={() => handleNavLinkClick(item.href)}
                        className={cn(
                          "block text-xl py-2 transition-colors duration-200 hover:pl-2",
                          isOffHero
                            ? "hover:text-gray-600"
                            : "hover:text-gray-300",
                          activeSection === item.id
                            ? (isOffHero ? "text-black font-semibold" : "text-white font-semibold")
                            : (isOffHero ? "text-gray-400" : "text-gray-500")
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                variants={itemVariants}
                className={cn(
                  "mt-auto pt-8 border-t transition-colors duration-300",
                  isOffHero ? "border-black/10" : "border-white/10"
                )}
              >
                {/* Optional footer content */}
                <p className={cn(
                  "text-sm transition-colors duration-300",
                  isOffHero ? "text-gray-400" : "text-gray-500"
                )}>© {new Date().getFullYear()} Taj Gillin</p>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
