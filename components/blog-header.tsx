import { Badge } from "@/components/ui/badge";
import { BlogCategory } from "@/lib/blogs";

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

interface BlogHeaderProps {
  title: string;
  description?: string;
  date?: string;
  category: BlogCategory;
}

export function BlogHeader({ title, description, date, category }: BlogHeaderProps) {
  return (
    <header className="mb-12 pb-8 border-b border-border">
      <div className="flex items-center gap-3 mb-4">
        <Badge 
          variant="outline" 
          className={`${categoryColors[category]}`}
        >
          {categoryLabels[category]}
        </Badge>
        {date && (
          <span className="text-sm text-muted-foreground">{date}</span>
        )}
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4">
        {title}
      </h1>
      
      {description && (
        <p className="text-xl text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}


