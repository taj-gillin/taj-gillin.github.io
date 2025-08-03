"use client";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";

interface CarouselImage {
  url: string;
  alt: string;
  caption?: string;
}

export default function ProjectGalleryClient({ images }: { images: CarouselImage[] }) {
  if (!images || images.length === 0) return null;
  return (
    <div className="w-full">
      <ScreenshotCarousel images={images} />
    </div>
  );
} 