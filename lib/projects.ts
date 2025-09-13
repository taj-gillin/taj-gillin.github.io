import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export interface ProjectMetadata {
  title: string;
  description: string;
  technologies: string[];
  date: string;
  course?: string;
  event?: string;
  team?: string[];
  coverImage?: string;
  repoUrl?: string;
  demoUrl?: string;
  award?: string;
  slug: string;
}

export function getAllProjects(): ProjectMetadata[] {
  try {
    const contentDir = join(process.cwd(), 'content', 'projects');
    const projectDirs = readdirSync(contentDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const projects = projectDirs.map(slug => {
      try {
        const mdxPath = join(contentDir, slug, 'index.mdx');
        const fileContents = readFileSync(mdxPath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          ...data,
          slug,
        } as ProjectMetadata;
      } catch {
        return null;
      }
    }).filter(Boolean) as ProjectMetadata[];

    // Sort by date (newest first)
    return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}


