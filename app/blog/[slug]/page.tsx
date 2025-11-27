import { notFound } from 'next/navigation';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import { mdxComponents } from '@/lib/mdx';
import { BackgroundLuxe } from '@/components/BackgroundLuxe';
import Link from 'next/link';
import 'katex/dist/katex.min.css';
import { BlogHeader } from '@/components/blog-header';
import { ProjectSidebarNav } from '@/components/project-sidebar-nav';
import { extractHeadingsFromMDX } from '@/lib/mdx-utils';
import { BlogCategory } from '@/lib/blogs';

type BlogPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

type Frontmatter = {
  title?: string;
  description?: string;
  date?: string;
  category?: BlogCategory;
  coverImage?: string;
};

// Function to get MDX content and frontmatter for a blog post
async function getMDX(slug: string): Promise<{ content: string; meta: Frontmatter } | null> {
  try {
    const mdxPath = join(process.cwd(), 'content', 'blog', slug, 'index.mdx');
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

// Generate static params from available MDX blog posts
export async function generateStaticParams() {
  try {
    const contentDir = join(process.cwd(), 'content', 'blog');
    const blogDirs = readdirSync(contentDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    return blogDirs.map((slug) => ({
      slug,
    }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const mdx = await getMDX(slug);

  if (!mdx) {
    notFound();
  }

  // Extract table of contents from MDX content
  const tableOfContents = extractHeadingsFromMDX(mdx.content);
  const blogTitle = mdx.meta.title ?? slug;
  const category = mdx.meta.category ?? 'thoughts';

  return (
    <>
      {/* Blog Sidebar - positioned absolutely to avoid layout conflicts */}
      <div className="fixed left-0 top-0 z-30 hidden lg:block">
        <ProjectSidebarNav 
          projectTitle={blogTitle}
          tableOfContents={tableOfContents}
          backLink={{ href: "/blog", label: "← Back to Blog" }}
        />
      </div>
      
      {/* Main Content - with left margin to account for sidebar */}
      <div id="project-content" className="h-screen overflow-y-auto lg:ml-60">
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
                href="/blog" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Blog
              </Link>
            </nav>

            {/* Page header */}
            <BlogHeader 
              title={blogTitle}
              description={mdx.meta.description}
              date={mdx.meta.date}
              category={category}
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
    </>
  );
}

