"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type ProjectHeaderProps = {
  title: string;
  description?: string;
  course?: string;
  date?: string;
  repoUrl?: string;
  demoUrl?: string;
  className?: string;
};

export function ProjectHeader({
  title,
  description,
  course,
  date,
  repoUrl,
  demoUrl,
  className,
}: ProjectHeaderProps) {
  return (
    <section className={cn("mb-10", className)}>
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
        {date ? <p className="mt-2 text-sm text-muted-foreground">{date}</p> : null}
        {course ? <p className="mt-1 text-xs text-muted-foreground/80">{course}</p> : null}
        {description ? (
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{description}</p>
        ) : null}

        {(repoUrl || demoUrl) ? (
          <div className="mt-6 flex items-center justify-center gap-3">
            {repoUrl ? (
              <Button asChild variant="outline" size="sm">
                <Link href={repoUrl} target="_blank" rel="noreferrer">Source Code</Link>
              </Button>
            ) : null}
            {demoUrl ? (
              <Button asChild size="sm">
                <Link href={demoUrl} target="_blank" rel="noreferrer">Live Demo</Link>
              </Button>
            ) : null}
          </div>
        ) : null}

        <div className="mt-8 border-t border-border/60" />
      </div>
    </section>
  );
}


