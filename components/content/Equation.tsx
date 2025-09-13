'use client';

import React, { useEffect, useRef, useState } from 'react';
import katex from 'katex';

// Helper function to extract text content from React nodes
function getTextContent(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node;
  }
  if (typeof node === 'number') {
    return String(node);
  }
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return getTextContent(props.children);
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join('');
  }
  return String(node || '');
}

interface EquationProps {
  children: React.ReactNode;
  block?: boolean;
  label?: string;
}

export function Equation({ children, block = false, label }: EquationProps) {
  const mathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mathRef.current) {
      try {
        // Extract text content from React nodes
        const mathString = getTextContent(children);
        katex.render(mathString, mathRef.current, {
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
        console.error('Children type:', typeof children);
        console.error('Children value:', children);
        // Fallback to formatted text
        if (mathRef.current) {
          const safeString = getTextContent(children);
          mathRef.current.innerHTML = `<code class="font-mono text-sm bg-muted px-2 py-1 rounded">${safeString}</code>`;
        }
      }
    }
  }, [children, block]);

  if (block) {
    return (
      <div className="my-8 flex flex-col items-center">
        <div className="relative">
          <div 
            ref={mathRef}
            className="text-xl overflow-x-auto max-w-full px-6 py-4"
            style={{ 
              fontSize: '1.25rem',
              lineHeight: '1.8',
            }}
          />
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
      className="inline-block mx-1"
      style={{ 
        fontSize: '1rem',
        verticalAlign: 'baseline'
      }}
    />
  );
}

// Server-side safe equation component for static generation
export function StaticEquation({ children, block = false, label }: EquationProps) {
  if (block) {
    return (
      <div className="my-8 flex flex-col items-center">
        <div className="relative">
          <div 
            className="text-xl overflow-x-auto max-w-full px-6 py-4 font-serif"
            style={{ 
              fontSize: '1.25rem',
              lineHeight: '1.8',
            }}
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(getTextContent(children), {
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
              })
            }}
          />
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
      className="inline-block mx-1"
      style={{ 
        fontSize: '1rem',
        verticalAlign: 'baseline'
      }}
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(getTextContent(children), {
          displayMode: false,
          throwOnError: false,
          strict: false,
          trust: true,
        })
      }}
    />
  );
}

// Enhanced equation component with KaTeX rendering
export function BlockEquation({ children, label }: { children: React.ReactNode; label?: string }) {
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
          // Extract text content from React nodes
          const mathString = getTextContent(children);
          katex.default.render(mathString, mathRef.current!, {
            displayMode: true,
            throwOnError: false,
            strict: false,
            trust: true,
            maxExpand: 1000,
            maxSize: Infinity,
            macros: {}
          });
        } catch (error) {
          console.error('KaTeX rendering error:', error);
          console.error('Children type:', typeof children);
          console.error('Children value:', children);
          // Keep the fallback content
        }
      });
    }
  }, [children, isClient]);

  return (
    <div className="my-8 flex flex-col items-center">
      <div className="relative">
        <div 
          ref={mathRef}
          className="text-lg overflow-x-auto max-w-full bg-muted/10 p-6 rounded-lg border border-muted text-center"
          style={{ minHeight: '3rem' }}
        >
          {/* Fallback content for SSR and while KaTeX loads */}
          {!isClient && (
            <div className="text-xl font-medium font-serif" style={{ lineHeight: '1.8' }}>
              {getTextContent(children)}
            </div>
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

