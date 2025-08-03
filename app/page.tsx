import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { CourseList } from "@/components/course-list";
import { ProjectList } from "@/components/project-list";
import { SkillList } from "@/components/skill-list";
import { ExperienceList } from "@/components/experience-list";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-8 lg:px-12 py-10 font-sans">
      <main className="w-full max-w-3xl space-y-20">
        <section id="about" className="scroll-mt-16">
          <h2 className="text-3xl font-semibold font-serif mb-8">About Me</h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              This website is still a work in progress. Sorry for the incomplete sections!
            </p>
            <Button asChild variant="outline">
              <a href="/Taj Gillin Resume May 2025.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </a>
            </Button>
          </div>
        </section>

        <section id="academics" className="scroll-mt-16">
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
        </section>

        <section id="projects" className="scroll-mt-16">
          <h2 className="text-3xl font-semibold font-serif">Projects</h2>
          <p className="text-lg text-muted-foreground mb-8">Click on a project to learn more!</p>
          <ProjectList />
        </section>

        <section id="skills" className="scroll-mt-16">
          <h2 className="text-3xl font-semibold font-serif mb-8">Skills</h2>
          <SkillList />
        </section>

        <section id="experience" className="scroll-mt-16">
          <h2 className="text-3xl font-semibold font-serif mb-8">Work Experience</h2>
          <ExperienceList />
        </section>

        <section id="contact" className="scroll-mt-16">
          <h2 className="text-3xl font-semibold font-serif mb-8">Contact Information</h2>
          <div className="space-y-6 text-lg">
            <p className="leading-relaxed">
              I'm always open to discussing new projects, research collaborations, or interesting opportunities. Please feel free to reach out!
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
        </section>
      </main>

      <footer className="w-full max-w-4xl mt-20 py-8 border-t border-border text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Taj Gillin. All rights reserved.</p>
      </footer>
    </div>
  );
}
