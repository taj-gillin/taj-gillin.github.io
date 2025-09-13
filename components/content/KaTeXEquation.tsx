'use client';

import React, { useEffect, useRef, useState } from 'react';

interface KaTeXEquationProps {
  children: string;
  block?: boolean;
  label?: string;
}

export function KaTeXEquation({ children, block = false, label }: KaTeXEquationProps) {
  const mathRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && mathRef.current) {
      // Dynamically import KaTeX to avoid SSR issues
      import('katex').then((katex) => {
        try {
          katex.default.render(children, mathRef.current!, {
            displayMode: block,
            throwOnError: false,
            strict: false,
            trust: true,
            macros: {
              "\\langle": "\\langle",
              "\\rangle": "\\rangle",
              "\\sum": "\\sum",
              "\\Delta": "\\Delta",
              "\\text": "\\text",
              "\\min": "\\min",
              "\\exp": "\\exp",
            }
          });
        } catch (error) {
          console.error('KaTeX rendering error:', error);
          // Fallback to plain text
          if (mathRef.current) {
            mathRef.current.textContent = children;
          }
        }
      });
    }
  }, [children, block, isClient]);

  if (block) {
    return (
      <div className="my-8 flex flex-col items-center">
        <div className="relative">
          <div 
            ref={mathRef}
            className="text-xl overflow-x-auto max-w-full px-6 py-4 bg-muted/5 rounded-lg border border-muted/20"
            style={{ 
              fontSize: '1.25rem',
              lineHeight: '1.8',
              minHeight: '3rem',
            }}
          >
            {!isClient && (
              <div className="font-serif text-center">{children}</div>
            )}
          </div>
          {label && (
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground font-medium">
              ({label})
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <span 
      ref={mathRef}
      className="inline-block mx-1 bg-muted/10 px-1 rounded"
      style={{ 
        fontSize: '1rem',
        verticalAlign: 'baseline',
        minWidth: '1rem',
      }}
    >
      {!isClient && <span className="font-serif">{children}</span>}
    </span>
  );
}

