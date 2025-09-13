import { notFound } from 'next/navigation';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import { mdxComponents } from '@/lib/mdx';
import { BackgroundLuxe } from '@/components/BackgroundLuxe';
import Link from 'next/link';
import 'katex/dist/katex.min.css';
import { ProjectHeader } from '@/components/project';

type ProjectPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

type Frontmatter = {
  title?: string;
  description?: string;
  technologies?: string[];
  date?: string;
  course?: string;
  coverImage?: string;
  repoUrl?: string;
  demoUrl?: string;
  award?: string;
};

// Function to get MDX content and frontmatter for a project
async function getMDX(slug: string): Promise<{ content: string; meta: Frontmatter } | null> {
  try {
    const mdxPath = join(process.cwd(), 'content', 'projects', slug, 'index.mdx');
    const source = readFileSync(mdxPath, 'utf8');
    const { content, data } = matter(source);

    // If the MDX body begins with a custom header followed by a horizontal rule `---`,
    // trim that header section so we can render a bespoke page header.
    const lines = content.split('\n');
    const firstHrIndex = lines.findIndex((l) => l.trim() === '---');
    let trimmed = content.trim();
    if (firstHrIndex !== -1 && firstHrIndex < 40) {
      trimmed = lines.slice(firstHrIndex + 1).join('\n').trimStart();
    }

    return { content: trimmed, meta: (data as Frontmatter) ?? {} };
  } catch {
    return null;
  }
}

// Generate static params from available MDX projects
export async function generateStaticParams() {
  try {
    const contentDir = join(process.cwd(), 'content', 'projects');
    const projectDirs = readdirSync(contentDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    return projectDirs.map((slug) => ({
      slug,
    }));
  } catch {
    return [];
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const mdx = await getMDX(slug);

  if (!mdx) {
    notFound();
  }

  return (
    <div className="h-screen overflow-y-auto">
      {/* Background layer */}
      <div className="fixed inset-0 z-0">
        <BackgroundLuxe />
      </div>
      
      {/* Scrollable content layer */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
          {/* Navigation */}
          <nav className="mb-8">
            <Link 
              href="/#projects" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Projects
            </Link>
          </nav>

          {/* Page header */}
          <ProjectHeader 
            title={mdx.meta.title ?? slug}
            description={mdx.meta.description}
            course={mdx.meta.course}
            date={mdx.meta.date}
            repoUrl={mdx.meta.repoUrl}
            demoUrl={mdx.meta.demoUrl}
          />

          {/* MDX Content */}
          <article className="prose dark:prose-invert max-w-none">
            <MDXRemote 
              source={mdx.content} 
              options={{
                mdxOptions: {
                  remarkPlugins: [],
                  rehypePlugins: [],
                }
              }}
              components={mdxComponents} 
            />
          </article>

          {/* Footer */}
          <footer className="mt-20 py-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Taj Gillin. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
