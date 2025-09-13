'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
  zoom?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

export function ProjectImage({ 
  src, 
  alt, 
  caption, 
  zoom = false,
  width,
  height,
  className = ""
}: ProjectImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const imageElement = (
    <div className={`relative group ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 600}
        className="w-full h-auto rounded-lg border border-border shadow-sm"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      />
      {zoom && (
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <ZoomIn className="h-8 w-8 text-white drop-shadow-lg" />
        </button>
      )}
    </div>
  );

  return (
    <figure className="my-6">
      {imageElement}
      {caption && (
        <figcaption className="text-sm text-muted-foreground mt-2 text-center italic">
          {caption}
        </figcaption>
      )}
      
      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          <Image
            src={src}
            alt={alt}
            width={width || 1200}
            height={height || 900}
            className="max-w-full max-h-full object-contain"
            sizes="100vw"
          />
        </div>
      )}
    </figure>
  );
}


