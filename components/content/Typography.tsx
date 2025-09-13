import Link from 'next/link';
import { cn } from '@/lib/utils';

type ElementProps = React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLHRElement | HTMLUListElement | HTMLOListElement | HTMLLIElement> & { children?: React.ReactNode };

export function H2({ className, ...props }: ElementProps) {
  return (
    <h2
      className={cn('mt-12 scroll-mt-24 text-2xl md:text-3xl font-semibold tracking-tight', className)}
      {...props}
    />
  );
}

export function H3({ className, ...props }: ElementProps) {
  return (
    <h3
      className={cn('mt-10 scroll-mt-24 text-xl md:text-2xl font-semibold tracking-tight', className)}
      {...props}
    />
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







