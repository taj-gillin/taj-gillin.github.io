'use client'

import { motion } from 'framer-motion'
import { Download, Github, Linkedin, Mail, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-8 flex flex-col justify-center min-h-screen">
        {/* Name */}
        <motion.h1 
          className="text-6xl sm:text-7xl lg:text-8xl font-bold font-serif bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          Taj Gillin
        </motion.h1>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap gap-6 justify-center items-center"
        >
          <Button asChild size="lg" className="gap-2 text-base px-6 py-3">
            <a href="/Taj Gillin Resume August 2025.pdf" download>
              <Download className="h-5 w-5" />
              Resume
            </a>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="gap-2 text-base px-6 py-3">
            <a href="https://github.com/taj-gillin" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="gap-2 text-base px-6 py-3">
            <a href="https://www.linkedin.com/in/taj-gillin-983864237/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="gap-2 text-base px-6 py-3">
            <a href="mailto:taj_gillin@brown.edu">
              <Mail className="h-5 w-5" />
              Contact
            </a>
          </Button>
        </motion.div>

        {/* Mobile-only scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="md:hidden mt-16 flex flex-col items-center text-muted-foreground"
        >
          <p className="text-sm mb-2">Scroll to see more</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>

      {/* Overlay removed for cleaner background */}
    </div>
  )
}