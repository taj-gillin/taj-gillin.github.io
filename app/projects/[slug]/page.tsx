import { projectData, Project } from '@/components/project-list';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import ProjectGalleryClient from '@/components/ProjectGalleryClient';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

// Function to fetch project data by slug (simulated)
async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return projectData.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  return projectData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find cover image for hero
  const cover = project.details?.images?.find(img => img.url.includes('cover')) || project.details?.images?.[0];
  // Find other images for gallery
  const gallery = project.details?.images?.filter(img => !img.url.includes('cover')) || [];

  return (
    <div className="min-h-screen flex flex-col items-center px-2 sm:px-6 lg:px-8 py-8 font-sans bg-background">
      <header className="w-full max-w-4xl flex justify-between items-center py-6 mb-6">
        <Link href="/#projects" className="flex items-center text-lg hover:underline text-primary">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Projects
        </Link>
      </header>

      {/* Hero Section */}
      {cover && (
        <section className="relative w-full max-w-4xl h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg mb-8 flex items-end">
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative z-10 p-8 w-full flex flex-col gap-2">
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white drop-shadow-lg">{project.title}</h1>
              {project.award && (
                <Badge variant="default" className="ml-2 bg-yellow-400 text-black font-semibold">🏆 {project.award}</Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-white/80 text-black font-medium">{tech}</Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      <main className="w-full max-w-3xl space-y-12">
        {/* Intro & Meta */}
        <section className="space-y-2">
          <p className="text-xl text-muted-foreground leading-relaxed">
            <strong>Illuminate</strong> is an award-winning AI platform that transforms any topic into engaging, animated educational videos. Built at Hack@Brown, it leverages state-of-the-art generative AI to make complex ideas accessible, interactive, and visually compelling.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-base mt-2">
            <span className="font-medium text-foreground">{project.date}</span>
            {project.team && (
              <span className="flex items-center gap-1">• <span className="font-medium text-foreground">Team:</span> {project.team.join(', ')}</span>
            )}
          </div>
        </section>

        {/* Video Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold font-serif">Demo Video</h2>
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-border">
            <iframe
              src="https://www.youtube.com/embed/sFQJPHsCNs0"
              title="Illuminate Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </section>

        {/* Carousel Section */}
        {gallery.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif">Screenshots</h2>
            <ProjectGalleryClient images={gallery} />
          </section>
        )}

        {/* Details Sections */}
        <section className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold font-serif mb-2">Why Illuminate?</h2>
            <p>
              Traditional educational content is often static and uninspiring. Illuminate reimagines learning by instantly generating animated, narrated videos from any text prompt—making knowledge more dynamic, accessible, and memorable for everyone.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold font-serif mb-2">How It Works</h2>
            <p>
              Illuminate combines the power of LangChain, FastAPI, and Manim to turn your curiosity into a cinematic learning experience. Enter a topic, and our AI crafts a lesson plan, writes a narrative script, generates animations, and even creates interactive quizzes—all in real time.
            </p>
          </div>
          {project.details?.keyFeatures && (
            <div>
              <h2 className="text-2xl font-semibold font-serif mb-2">Key Innovations</h2>
              <ul className="list-disc pl-6 space-y-2">
                {project.details.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h2 className="text-2xl font-semibold font-serif mb-2">Impact</h2>
            <p>
              Illuminate was recognized with the Best Use of Gen AI award at Hack@Brown for its innovative approach to automated educational video creation. The project demonstrates how generative AI can revolutionize the way we teach and learn, making high-quality, personalized education available to all.
            </p>
          </div>
          {project.details?.futurePlans && (
            <div>
              <h2 className="text-2xl font-semibold font-serif mb-2">What's Next?</h2>
              <p>
                We're building on Illuminate's success by adding a chat feature for follow-up questions, refining our animations, and experimenting with new AI models like Claude and Deepseek. Our vision is to make Illuminate multilingual and indispensable for both teachers and students worldwide.
              </p>
            </div>
          )}
        </section>

        {/* Project Links */}
        {(project.repoUrl || project.demoUrl) && (
          <section className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-semibold font-serif mb-3">Project Links</h3>
            <div className="flex flex-wrap gap-4">
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition">
                  <ExternalLink className="w-4 h-4" /> View Code Repository
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground font-semibold hover:bg-muted/80 transition border border-border">
                  <ExternalLink className="w-4 h-4" /> View on Devpost
                </a>
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="w-full max-w-4xl mt-20 py-8 border-t border-border text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Taj Gillin. All rights reserved.</p>
      </footer>
    </div>
  );
} 