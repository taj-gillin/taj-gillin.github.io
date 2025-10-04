import Link from 'next/link';
import { cn } from '@/lib/utils';

type ElementProps = React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLHRElement | HTMLUListElement | HTMLOListElement | HTMLLIElement> & { children?: React.ReactNode };

// Helper function to generate ID from heading text
function generateHeadingId(children: React.ReactNode): string {
  const text = typeof children === 'string' ? children : 
               React.Children.toArray(children).join('');
  
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

export function H1({ className, children, id, ...props }: ElementProps) {
  const headingId = id || generateHeadingId(children);
  return (
    <h1
      id={headingId}
      className={cn('mt-16 scroll-mt-24 text-3xl md:text-4xl font-bold tracking-tight', className)}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H2({ className, children, id, ...props }: ElementProps) {
  const headingId = id || generateHeadingId(children);
  return (
    <h2
      id={headingId}
      className={cn('mt-12 scroll-mt-24 text-2xl md:text-3xl font-semibold tracking-tight', className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ className, children, id, ...props }: ElementProps) {
  const headingId = id || generateHeadingId(children);
  return (
    <h3
      id={headingId}
      className={cn('mt-10 scroll-mt-24 text-xl md:text-2xl font-semibold tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function H4({ className, children, id, ...props }: ElementProps) {
  const headingId = id || generateHeadingId(children);
  return (
    <h4
      id={headingId}
      className={cn('mt-8 scroll-mt-24 text-lg md:text-xl font-semibold tracking-tight', className)}
      {...props}
    >
      {children}
    </h4>
  );
}

export function H5({ className, children, id, ...props }: ElementProps) {
  const headingId = id || generateHeadingId(children);
  return (
    <h5
      id={headingId}
      className={cn('mt-6 scroll-mt-24 text-base md:text-lg font-semibold tracking-tight', className)}
      {...props}
    >
      {children}
    </h5>
  );
}

export function H6({ className, children, id, ...props }: ElementProps) {
  const headingId = id || generateHeadingId(children);
  return (
    <h6
      id={headingId}
      className={cn('mt-4 scroll-mt-24 text-sm md:text-base font-semibold tracking-tight', className)}
      {...props}
    >
      {children}
    </h6>
  );
}

export function P({ className, ...props }: ElementProps) {
  return (
    <p className={cn('leading-7 text-muted-foreground my-4', className)} {...props} />
  );
}

export function HR({ className, ...props }: ElementProps) {
  return <hr className={cn('my-8 border-border/60', className)} {...props} />;
}

export function UL({ className, ...props }: ElementProps) {
  return <ul className={cn('my-6 list-disc pl-6 space-y-2', className)} {...props} />;
}

export function OL({ className, ...props }: ElementProps) {
  return <ol className={cn('my-6 list-decimal pl-6 space-y-2', className)} {...props} />;
}

export function LI({ className, ...props }: ElementProps) {
  return <li className={cn('marker:text-muted-foreground', className)} {...props} />;
}

type AnchorProps = React.ComponentProps<typeof Link> & { className?: string };
export function A({ className, ...props }: AnchorProps) {
  return (
    <Link
      className={cn('underline-offset-4 hover:underline text-foreground', className)}
      {...props}
    />
  );
}







