import { BackgroundLuxe } from '@/components/BackgroundLuxe';
import { BlogList } from '@/components/blog-list';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="h-screen overflow-y-auto">
      {/* Background layer */}
      <div className="fixed inset-0 z-0">
        <BackgroundLuxe />
      </div>
      
      {/* Scrollable content layer */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
          {/* Navigation */}
          <nav className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </Link>
          </nav>

          {/* Page Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-4">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Thoughts, projects, and research notes.
            </p>
          </header>

          {/* Blog List */}
          <BlogList />

          {/* Footer */}
          <footer className="mt-20 py-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Taj Gillin. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

