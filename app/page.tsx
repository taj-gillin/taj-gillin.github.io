import { Github, Linkedin, Mail } from "lucide-react";
import { CourseList } from "@/components/course-list";
import { SkillList } from "@/components/skill-list";
import { ExperienceList } from "@/components/experience-list";
import { ResearchList } from "@/components/research-list";
import { PublicationsList } from "@/components/publications-list";
import { Hero } from "@/components/Hero";
import { ParticleSystem } from "@/components/ParticleSystem";
import { BackgroundLuxe } from "@/components/BackgroundLuxe";
import { MDXProjectList } from "@/components/MDXProjectList";
import Image from "next/image";

export default function HomePage() {

  return (
    <div className="min-h-screen relative">
      {/* Luxe Background Layers */}
      <BackgroundLuxe />
      {/* Global Particle System that responds to scroll */}
      <ParticleSystem useScrollMode={true} particleDensity={0.0004} interactive={true} />
      {/* Scroll container */}
      <div id="page-scroll" className="h-screen overflow-y-auto overscroll-y-contain scroll-smooth focus:outline-none relative z-10" tabIndex={0}>
        {/* Hero Section */}
        <section id="hero" className="min-h-screen">
          <Hero />
        </section>

        {/* Main Content */}
        <main className="w-full min-h-screen font-sans">
          <div className="w-full space-y-10">
            <section id="about" className="scroll-mt-16 min-h-screen px-4 sm:px-8 lg:px-12 py-16 flex flex-col justify-center">
              <div className="w-full max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold font-serif mb-8">About Me</h2>
                <div className="space-y-6 text-lg leading-relaxed">
                  <p>
                    Hi, I&apos;m Taj Gillin, a senior at Brown University pursuing a dual degree in Biophysics and Applied Math-Computer Science. Originally from San Diego (and you&apos;ll often catch me repping Padres gear), I&apos;ve always been drawn to understanding how complex systems work and love tough, puzzling problems.
                  </p>
                  <p>
                    My journey into programming started through building games in Minecraft using command blocks and its built-in language mcfunction. What began as a hobby taught me to think systematically about logic and problem-solving, ultimately sparking a love for coding that now drives my academic focus. I still have a deep appreciation for thoughtful design, particularly in some of my favorite games: Hollow Knight, Outer Wilds, and The Stanley Parable.
                  </p>
                  <p>
                    Outside of academics, I&apos;m into music and fantasy books, and I love Legos. My favorite band is The Red Hot Chili Peppers and I&apos;m deep into Brandon Sanderson&apos;s Cosmere universe. I am on Brown&apos;s Club Ice Hockey team (there are ice rinks in San Diego, believe it or not), and I love to ski and wakesurf!
                  </p>
                </div>
                <div className="flex justify-center mt-8">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-primary/30 shadow-lg">
                    <Image
                      src="/pfp/breakthrough.jpeg"
                      alt="Taj Gillin"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </section>

            <section id="academics" className="scroll-mt-16 min-h-screen px-4 sm:px-8 lg:px-12 py-16 flex flex-col justify-center">
              <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold font-serif mb-8">Academics</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold font-serif mb-2">Brown University</h3>
                    <p className="text-xl text-muted-foreground">Physics, Biological Track (ScB) and Applied Math-Computer Science (ScB)</p>
                    <p className="text-lg text-muted-foreground">Expected Graduation: May 2026 | GPA: 4.0</p>
                    <p className="text-lg text-muted-foreground mt-2">Pursuing honors thesis in computer science and honors thesis in physics</p>
                    <div className="mt-6">
                      <CourseList />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold font-serif mb-2">Francis Parker School</h3>
                    <p className="text-xl text-muted-foreground">High School Diploma</p>
                    <p className="text-lg text-muted-foreground">Graduated: May 2022 | San Diego, CA</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="research" className="scroll-mt-16 min-h-screen px-4 sm:px-8 lg:px-12 py-16 flex flex-col justify-center">
              <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold font-serif mb-8">Research</h2>
                <div className="space-y-12">
                  <div>
                    <h3 className="text-xl font-semibold font-serif mb-6 text-foreground/80">Experience</h3>
                    <ResearchList />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold font-serif mb-6 text-foreground/80">Publications & Presentations</h3>
                    <PublicationsList />
                  </div>
                </div>
              </div>
            </section>

            <section id="projects" className="scroll-mt-16 min-h-screen px-4 sm:px-8 lg:px-12 py-16 flex flex-col justify-center">
              <div className="w-full max-w-6xl mx-auto">
                <h2 className="text-3xl font-semibold font-serif mb-8">Projects</h2>
                <MDXProjectList />
              </div>
            </section>

            <section id="skills" className="scroll-mt-16 min-h-screen px-4 sm:px-8 lg:px-12 py-16 flex flex-col justify-center">
              <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold font-serif mb-8">Skills</h2>
                <SkillList />
              </div>
            </section>

            <section id="experience" className="scroll-mt-16 min-h-screen px-4 sm:px-8 lg:px-12 py-16 flex flex-col justify-center">
              <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold font-serif mb-8">Work Experience</h2>
                <ExperienceList />
              </div>
            </section>

            <section id="contact" className="scroll-mt-16 min-h-screen px-4 sm:px-8 lg:px-12 py-16 flex flex-col justify-center">
              <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold font-serif mb-8">Contact Information</h2>
                <div className="space-y-6 text-lg">
                  <p className="leading-relaxed">
                    I&apos;m always open to discussing new projects, research collaborations, or interesting opportunities. Please feel free to reach out!
                  </p>
                  <div className="space-y-4">
                    <a href="mailto:taj_gillin@brown.edu" className="flex items-center hover:text-primary transition-colors">
                      <Mail className="mr-3 h-6 w-6" />
                      taj_gillin@brown.edu
                    </a>
                    <a href="mailto:tajgillin@gmail.com" className="flex items-center hover:text-primary transition-colors">
                      <Mail className="mr-3 h-6 w-6" />
                      tajgillin@gmail.com
                    </a>
                    <a href="https://github.com/taj-gillin" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors">
                      <Github className="mr-3 h-6 w-6" />
                      GitHub Profile
                    </a>
                    <a href="https://www.linkedin.com/in/taj-gillin-983864237/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors">
                      <Linkedin className="mr-3 h-6 w-6" />
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer className="w-full max-w-4xl mx-auto mt-20 py-8 border-t border-border text-center text-muted-foreground px-4 sm:px-8 lg:px-12">
          <p>&copy; {new Date().getFullYear()} Taj Gillin. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
