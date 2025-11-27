import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogs, BlogMetadata, BlogCategory } from '@/lib/blogs';

const categoryColors: Record<BlogCategory, string> = {
  projects: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  research: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  thoughts: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
};

const categoryLabels: Record<BlogCategory, string> = {
  projects: 'Project',
  research: 'Research',
  thoughts: 'Thoughts',
};

function BlogCard({ blog }: { blog: BlogMetadata }) {
  return (
    <Card className="flex flex-col h-full border border-white/10 bg-transparent backdrop-blur-sm hover:backdrop-blur-md hover:bg-white/5 hover:border-white/20 shadow-none hover:shadow-md rounded-lg overflow-hidden transition-all duration-300 ease-in-out gap-0 py-0">
      {blog.coverImage && (
        <div className="relative w-full h-56">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader className="p-5">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl font-semibold font-serif text-primary mb-1">{blog.title}</CardTitle>
          <Badge 
            variant="outline" 
            className={`shrink-0 ${categoryColors[blog.category]}`}
          >
            {categoryLabels[blog.category]}
          </Badge>
        </div>
        <CardDescription className="text-base leading-relaxed text-muted-foreground line-clamp-3">
          {blog.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-5 pt-1 mt-auto">
        <p className="text-sm text-muted-foreground">{blog.date}</p>
      </CardFooter>
    </Card>
  );
}

interface BlogListProps {
  category?: BlogCategory;
}

export function BlogList({ category }: BlogListProps) {
  const allBlogs = getAllBlogs();
  const blogs = category ? allBlogs.filter(b => b.category === category) : allBlogs;

  if (!blogs || !blogs.length) {
    return <p className="text-muted-foreground">No blog posts yet. Check back later!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {blogs.map((blog) => (
        <Link href={`/blog/${blog.slug}`} key={blog.slug} className="block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg h-full">
          <BlogCard blog={blog} />
        </Link>
      ))}
    </div>
  );
}

