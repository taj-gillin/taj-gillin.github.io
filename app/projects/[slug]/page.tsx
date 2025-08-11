import { projectData, Project } from '@/components/project-list';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import ProjectGalleryClient from '@/components/ProjectGalleryClient';
import { ParticleSystem } from '@/components/ParticleSystem';
import { BackgroundLuxe } from '@/components/BackgroundLuxe';
import { SnapScrollController } from '@/components/SnapScrollController';

type ProjectPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

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
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find cover image for hero
  const cover = project.details?.images?.find(img => img.url.includes('cover')) || project.details?.images?.[0];
  // Find other images for gallery
  const gallery = project.details?.images?.filter(img => !img.url.includes('cover')) || [];

  return (
    <div className="min-h-screen relative">
      {/* Background layers */}
      <BackgroundLuxe />
      <ParticleSystem mode="projects" particleDensity={0.0003} interactive={true} />
      
      {/* Scroll container for project content */}
      <div id="page-scroll" className="h-screen overflow-y-auto scroll-smooth relative z-10" tabIndex={0}>
        <SnapScrollController />
        
        <div className="flex flex-col items-center px-2 sm:px-6 lg:px-8 py-8 font-sans">
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
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-base mt-2">
            <span className="font-medium text-foreground">{project.date}</span>
            {project.team && (
              <span className="flex items-center gap-1">• <span className="font-medium text-foreground">Team:</span> {project.team.join(', ')}</span>
            )}
          </div>
        </section>

        {/* Video Section - only for Illuminate */}
        {project.slug === 'illuminate-hackathon' && (
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
        )}

        {/* Carousel Section */}
        {gallery.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold font-serif">Screenshots</h2>
            <ProjectGalleryClient images={gallery} />
          </section>
        )}

        {/* Details Sections */}
        {project.details && (
          <section className="space-y-10">
            {project.details.problemStatement && (
              <div>
                <h2 className="text-2xl font-semibold font-serif mb-2">Problem Statement</h2>
                <p className="text-lg leading-relaxed">{project.details.problemStatement}</p>
              </div>
            )}
            {project.details.approach && (
              <div>
                <h2 className="text-2xl font-semibold font-serif mb-2">Approach</h2>
                <p className="text-lg leading-relaxed">{project.details.approach}</p>
              </div>
            )}
            {project.details.keyFeatures && (
              <div>
                <h2 className="text-2xl font-semibold font-serif mb-2">Key Features</h2>
                <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed">
                  {project.details.keyFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {project.details.results && (
              <div>
                <h2 className="text-2xl font-semibold font-serif mb-2">Results</h2>
                <p className="text-lg leading-relaxed">{project.details.results}</p>
              </div>
            )}
            {project.details.futurePlans && (
              <div>
                <h2 className="text-2xl font-semibold font-serif mb-2">Future Plans</h2>
                <p className="text-lg leading-relaxed">{project.details.futurePlans}</p>
              </div>
            )}
          </section>
        )}

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
      </div>
    </div>
  );
}
