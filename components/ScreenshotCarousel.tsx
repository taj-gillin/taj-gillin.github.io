"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface CarouselImage {
  url: string;
  alt: string;
  caption?: string;
}

interface ScreenshotCarouselProps {
  images: CarouselImage[];
  contain?: boolean; // If true, shows the entire image without cropping
  fixedSize?: boolean; // If true with contain, locks carousel to first image's aspect ratio
}

export default function ScreenshotCarousel({ images, contain = false, fixedSize = false }: ScreenshotCarouselProps) {
  const [idx, setIdx] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load first image to get its dimensions for fixed size mode
  useEffect(() => {
    if (contain && fixedSize && images.length > 0) {
      const img = new window.Image();
      img.onload = () => {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
      };
      img.src = images[0].url;
    }
  }, [contain, fixedSize, images]);

  if (!images || images.length === 0) return null;

  const prev = () => setIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  // Determine container styles
  const getContainerClass = () => {
    if (!contain) return 'aspect-video';
    if (fixedSize && aspectRatio) return ''; // Use inline style for custom aspect ratio
    return 'min-h-[300px]';
  };

  const containerStyle = contain && fixedSize && aspectRatio 
    ? { aspectRatio: aspectRatio.toString() } 
    : undefined;

  return (
    <div 
      ref={containerRef}
      className={`relative w-full rounded-xl overflow-hidden shadow-lg border border-border bg-muted flex flex-col items-center ${getContainerClass()}`}
      style={containerStyle}
    >
      <Image
        src={images[idx].url}
        alt={images[idx].alt}
        fill
        className={contain ? "object-contain" : "object-cover"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={idx === 0}
      />
      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            aria-label="Previous screenshot"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 z-10"
            style={{ backdropFilter: 'blur(2px)' }}
          >
            &#8592;
          </button>
          <button
            aria-label="Next screenshot"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 z-10"
            style={{ backdropFilter: 'blur(2px)' }}
          >
            &#8594;
          </button>
        </>
      )}
      {/* Caption */}
      {images[idx].caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm px-4 pt-2 pb-8 text-center">
          {images[idx].caption}
        </div>
      )}
      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {images.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-2 h-2 rounded-full ${i === idx ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 