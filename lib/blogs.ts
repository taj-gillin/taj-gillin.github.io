import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export type BlogCategory = 'projects' | 'research' | 'thoughts';

export interface BlogMetadata {
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  coverImage?: string;
  slug: string;
}

export function getAllBlogs(): BlogMetadata[] {
  try {
    const contentDir = join(process.cwd(), 'content', 'blog');
    const blogDirs = readdirSync(contentDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    const blogs = blogDirs.map(slug => {
      try {
        const mdxPath = join(contentDir, slug, 'index.mdx');
        const fileContents = readFileSync(mdxPath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          ...data,
          slug,
        } as BlogMetadata;
      } catch {
        return null;
      }
    }).filter(Boolean) as BlogMetadata[];

    // Sort by date (newest first)
    return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export function getBlogsByCategory(category: BlogCategory): BlogMetadata[] {
  return getAllBlogs().filter(blog => blog.category === category);
}


