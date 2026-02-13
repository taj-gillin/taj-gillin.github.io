
import { CourseList } from "@/components/course-list";
import { ExperienceList } from "@/components/experience-list";
import { ResearchList } from "@/components/research-list";
import { PublicationsList } from "@/components/publications-list";
import { MDXProjectList } from "@/components/MDXProjectList";
import { HomeInteractive } from "@/components/HomeInteractive";
import Image from "next/image";

export default function HomePage() {
  return (
    <HomeInteractive>
      <main className="w-full max-w-3xl mx-auto space-y-20">

        <section id="about" className="scroll-mt-16">
          <h2 className="text-3xl font-normal mb-10 border-b border-white/15 pb-3">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-2 space-y-6 text-lg leading-relaxed text-gray-300">
              <div className="flex flex-wrap gap-6 pb-2">
                <a href="/Taj%20Gillin%20Resume%20January%202026.pdf" target="_blank" className="text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">Resume</a>
                <a href="https://github.com/taj-gillin" target="_blank" className="text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">GitHub</a>
                <a href="https://www.linkedin.com/in/taj-gillin-983864237/" target="_blank" className="text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">LinkedIn</a>
                <a href="mailto:taj_gillin@brown.edu" className="text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-0.5">Email</a>
              </div>
              <p>
                Hi, I&apos;m <span className="text-white font-semibold">Taj Gillin</span>, a senior at Brown University pursuing a dual degree in <span className="text-white">Biophysics</span> and <span className="text-white">Applied Math-Computer Science</span>. Originally from San Diego (and you&apos;ll often catch me repping Padres gear), I&apos;ve always been drawn to understanding how complex systems work and love tough, puzzling problems.
              </p>
              <p>
                My journey into programming started through building games in Minecraft using command blocks and its built-in language mcfunction. What began as a hobby taught me to think systematically about logic and problem-solving, ultimately sparking a love for coding that now drives my academic focus. I still have a deep appreciation for thoughtful design, particularly in some of my favorite games: Hollow Knight, Outer Wilds, and The Stanley Parable.
              </p>
              <p>
                Outside of academics, I&apos;m into music and fantasy books, and I love Legos. My favorite band is The Red Hot Chili Peppers and I&apos;m deep into Brandon Sanderson&apos;s Cosmere universe. I am on Brown&apos;s Club Ice Hockey team (there are ice rinks in San Diego, believe it or not), and I love to ski and wakesurf!
              </p>

            </div>

            <div className="relative aspect-square w-full max-w-[250px] mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-white/10 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out">
              <Image
                src="/pfp/breakthrough.jpeg"
                alt="Taj Gillin"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section id="academics" className="scroll-mt-16">
          <h2 className="text-3xl font-normal mb-10 border-b border-white/15 pb-3">Academics</h2>
          <div className="space-y-12">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                <h3 className="text-xl font-medium text-white">Brown University</h3>
                <span className="text-gray-400 font-mono">May 2026</span>
              </div>
              <p className="text-xl text-gray-300">Physics, Biological Track (ScB) and Applied Math-Computer Science (ScB)</p>
              <p className="text-lg text-gray-400 mt-1">GPA: 4.0</p>
              <p className="text-lg text-gray-300 mt-4 italic">Pursuing honors thesis in computer science and honors thesis in physics</p>

              <div className="mt-8">
                <CourseList />
              </div>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                <h3 className="text-xl font-medium text-white">Francis Parker School</h3>
                <span className="text-gray-400 font-mono">May 2022</span>
              </div>
              <p className="text-xl text-gray-300">High School Diploma</p>
              <p className="text-lg text-gray-400">San Diego, CA</p>
            </div>
          </div>
        </section>

        <section id="research" className="scroll-mt-16">
          <h2 className="text-3xl font-normal mb-10 border-b border-white/15 pb-3">Research</h2>
          <div className="space-y-16">
            <div>
              <h3 className="text-xl font-medium mb-6 text-gray-200">Experience</h3>
              {/* ResearchList needs to be styled for dark mode or inherit */}
              <ResearchList />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-6 text-gray-200">Publications & Presentations</h3>
              <PublicationsList />
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-16">
          <h2 className="text-3xl font-normal mb-10 border-b border-white/15 pb-3">Work Experience</h2>
          <ExperienceList />
        </section>

        <section id="projects" className="scroll-mt-16">
          <h2 className="text-3xl font-normal mb-10 border-b border-white/15 pb-3">Projects</h2>
          <div className="w-full">
            <MDXProjectList />
          </div>
        </section>



      </main>

      <footer className="w-full text-center py-8 bg-black border-t border-white/10 text-gray-500 mt-20">
        <p>&copy; {new Date().getFullYear()} Taj Gillin. All rights reserved.</p>
      </footer>
    </HomeInteractive>
  );
}
