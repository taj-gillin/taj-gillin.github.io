'use client';

import React from 'react';

interface AlgorithmProps {
  title: string;
  children: React.ReactNode;
  number?: number;
}

export function Algorithm({ title, children, number }: AlgorithmProps) {
  return (
    <div className="my-8 border border-border rounded-lg p-6 bg-muted/20">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Algorithm {number ? number : ''}
        </span>
        <h3 className="text-lg font-semibold font-serif">{title}</h3>
      </div>
      <div className="font-mono text-sm space-y-1">
        {children}
      </div>
    </div>
  );
}

interface AlgorithmLineProps {
  indent?: number;
  children: React.ReactNode;
  number?: number;
}

export function AlgorithmLine({ indent = 0, children, number }: AlgorithmLineProps) {
  return (
    <div 
      className="flex items-start gap-2 py-0.5"
      style={{ paddingLeft: `${indent * 1.5}rem` }}
    >
      {number && (
        <span className="text-muted-foreground w-6 text-right">{number}:</span>
      )}
      <span>{children}</span>
    </div>
  );
}

export function AlgorithmFor({ condition, children }: { condition: string; children: React.ReactNode }) {
  return (
    <div>
      <AlgorithmLine>
        <strong>for</strong> {condition} <strong>do</strong>
      </AlgorithmLine>
      <div className="ml-4 border-l-2 border-muted pl-4">
        {children}
      </div>
      <AlgorithmLine>
        <strong>end for</strong>
      </AlgorithmLine>
    </div>
  );
}

export function AlgorithmIf({ condition, children }: { condition: string; children: React.ReactNode }) {
  return (
    <div>
      <AlgorithmLine>
        <strong>if</strong> {condition} <strong>then</strong>
      </AlgorithmLine>
      <div className="ml-4 border-l-2 border-muted pl-4">
        {children}
      </div>
      <AlgorithmLine>
        <strong>end if</strong>
      </AlgorithmLine>
    </div>
  );
}


