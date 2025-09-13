import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import Image from 'next/image';
import { getAllProjects, ProjectMetadata } from '@/lib/projects';

function ProjectCard({ project }: { project: ProjectMetadata }) {
  return (
    <Card className="flex flex-col h-full border border-white/10 bg-transparent backdrop-blur-sm hover:backdrop-blur-md hover:bg-white/5 hover:border-white/20 shadow-none hover:shadow-md rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
      {project.coverImage && (
        <div className="relative w-full h-48">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader className="p-5">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-semibold font-serif text-primary mb-1">{project.title}</CardTitle>
          {project.award && (
            <Badge variant="default" className="ml-2">🏆 {project.award}</Badge>
          )}
        </div>
        <CardDescription className="text-base leading-relaxed text-muted-foreground line-clamp-3">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-5 pt-0 mt-auto">
        <p className="text-sm text-muted-foreground">{project.date}</p>
      </CardFooter>
    </Card>
  );
}

export function MDXProjectList() {
  const projects = getAllProjects();

  if (!projects || !projects.length) {
    return <p>No projects to display at the moment. Please check back later.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <Link href={`/projects/${project.slug}`} key={project.slug} className="block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg h-full">
          <ProjectCard project={project} />
        </Link>
      ))}
      {/* Placeholder card for upcoming projects */}
      <Card className="flex flex-col h-full border border-white/10 bg-transparent backdrop-blur-sm hover:backdrop-blur-md hover:bg-white/5 hover:border-white/20 shadow-none hover:shadow-md rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
        <CardHeader className="p-5 flex-1 flex flex-col justify-center">
          <CardTitle className="text-xl font-semibold font-serif text-primary mb-2 text-center">More Projects Coming Soon</CardTitle>
          <CardDescription className="text-base leading-relaxed text-muted-foreground text-center">
            This list is being updated with new projects. Check back soon for more work!
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-5 pt-0">
          <p className="text-sm text-muted-foreground text-center w-full">...</p>
        </CardFooter>
      </Card>
    </div>
  );
}


