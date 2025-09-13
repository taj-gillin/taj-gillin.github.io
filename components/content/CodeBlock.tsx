'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ 
  children, 
  language = 'text', 
  title,
  showLineNumbers = false 
}: CodeBlockProps) {
  return (
    <div className="my-6 rounded-lg border border-border overflow-hidden">
      {title && (
        <div className="bg-muted px-4 py-2 border-b border-border">
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          background: 'transparent',
          fontSize: '14px',
          padding: '1rem',
        }}
        codeTagProps={{
          style: {
            fontSize: '14px',
            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          }
        }}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  );
}

export function InlineCode({ children }: { children: string }) {
  return (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  );
}


