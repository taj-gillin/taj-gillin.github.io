import { Github, Linkedin, Mail } from "lucide-react";
import { CourseList } from "@/components/course-list";
import { SkillList } from "@/components/skill-list";
import { ExperienceList } from "@/components/experience-list";
import { ResearchList } from "@/components/research-list";
import { Hero } from "@/components/Hero";
import { ParticleSystem } from "@/components/ParticleSystem";
import { BackgroundLuxe } from "@/components/BackgroundLuxe";
import { SnapScrollController } from "@/components/SnapScrollController";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  
  return (
    <div className="min-h-screen relative">
      {/* Luxe Background Layers */}
      <BackgroundLuxe />
      {/* Global Particle System that responds to scroll */}
      <ParticleSystem useScrollMode={true} particleDensity={0.0004} interactive={true} />
      {/* Scroll snapping container */}
      <div id="page-scroll" className="h-screen overflow-y-auto overscroll-y-contain snap-y snap-mandatory scroll-smooth focus:outline-none relative z-10" tabIndex={0}>
        <SnapScrollController />
        {/* Hero Section */}
        <section id="hero" className="min-h-screen snap-start">
          <Hero />
        </section>
        
        {/* Main Content */}
        <main className="w-full min-h-screen font-sans">
          <div className="w-full space-y-32">
            <section id="about" className="scroll-mt-16 min-h-screen snap-start px-4 sm:px-8 lg:px-12 py-32">
              <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold font-serif mb-8">About Me</h2>
                <div className="space-y-6 text-lg leading-relaxed">
                  <p>
                    Hi, I&apos;m Taj Gillin, a senior at Brown University pursuing a dual degree in Biophysics and Applied Math-Computer Science. Originally from San Diego (and you&apos;ll often catch me repping Padres gear), I&apos;ve always been drawn to understanding how complex systems work and love and tough puzzling problems.
                  </p>
                  <p>
                    My journey into programming started through building games in Minecraft using command blocks and its built-in language mcfunction. What began as a hobby taught me to think systematically about logic and problem-solving, ultimately sparking a love for coding that now drives my academic focus. I still have a deep appreciation for thoughtful design, particularly in some of my favorites: Hollow Knight, Outer Wilds, and The Stanley Parable.
                  </p>
                  <p>
                    When I&apos;m not diving into coursework or research, you&apos;ll find me with a guitar or bass in hand—I&apos;ve been playing guitar for several years and recently picked up bass. My musical tastes lean toward classic and alternative rock, with the Red Hot Chili Peppers being a longtime favorite. I&apos;m also an avid fantasy reader who could easily spend hours discussing Brandon Sanderson&apos;s Cosmere universe.
                  </p>
                </div>
              </div>
            </section>

            <section id="academics" className="scroll-mt-16 min-h-screen snap-start px-4 sm:px-8 lg:px-12 py-32 flex flex-col justify-center">
              <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold font-serif mb-8">Academics</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-semibold font-serif mb-2">Brown University</h3>
                    <p className="text-xl text-muted-foreground">Physics, Biological Track (ScB) and Applied Math-Computer Science (ScB)</p>
                    <p className="text-lg text-muted-foreground">Expected Graduation: May 2026 | GPA: 4.0</p>
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

            <section id="research" className="scroll-mt-16 min-h-screen snap-start px-4 sm:px-8 lg:px-12 py-32 flex flex-col justify-center">
              <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold font-serif mb-8">Research</h2>
                <ResearchList />
              </div>
            </section>

            <section id="projects" className="scroll-mt-16 min-h-screen snap-start px-4 sm:px-8 lg:px-12 py-32 flex flex-col justify-center">
              <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold font-serif mb-8">Projects</h2>
                <div className="flex justify-center">
                  <Card className="w-full max-w-md text-center">
                    <CardHeader>
                      <CardTitle className="text-2xl">Projects Coming This Week</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        I&apos;m putting the finishing touches on my project showcase. Check back soon!
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section id="skills" className="scroll-mt-16 min-h-screen snap-start px-4 sm:px-8 lg:px-12 py-32 flex flex-col justify-center">
              <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold font-serif mb-8">Skills</h2>
                <SkillList />
              </div>
            </section>

            <section id="experience" className="scroll-mt-16 min-h-screen snap-start px-4 sm:px-8 lg:px-12 py-32 flex flex-col justify-center">
              <div className="w-full max-w-3xl mx-auto">
                <h2 className="text-3xl font-semibold font-serif mb-8">Work Experience</h2>
                <ExperienceList />
              </div>
            </section>

            <section id="contact" className="scroll-mt-16 min-h-screen snap-start px-4 sm:px-8 lg:px-12 py-32 flex flex-col justify-center">
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
