"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/landing/section-header";
import { StaggerContainer, scaleUp } from "@/components/landing/motion";

// ---------------------------------------------------------------------------
// Gallery -- local high-res images (1200px, optimized jpg)
// ---------------------------------------------------------------------------

interface GalleryItem {
  category: string;
  title: string;
  image: string;
  colSpan?: string;
  rowSpan?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    category: "Digital art",
    title: "Dreamlike Jellyfish -- AI digital sculpture",
    image: "/images/showcase/showcase-1.jpg",
    rowSpan: "row-span-2",
  },
  {
    category: "Street fashion",
    title: "Punk Cowboy -- AI fashion styling",
    image: "/images/showcase/showcase-10.jpg",
    colSpan: "col-span-2",
  },
  {
    category: "Art photography",
    title: "Dark Flow -- AI stylized portrait",
    image: "/images/showcase/showcase-2.jpg",
  },
  {
    category: "Creative collage",
    title: "Eastern Aesthetics -- AI mixed-media creation",
    image: "/images/showcase/showcase-3.jpg",
  },
  {
    category: "Still life photography",
    title: "Vintage Jewelry Box -- AI refined still life",
    image: "/images/showcase/showcase-4.jpg",
  },
  {
    category: "Fashion editorial",
    title: "Retro Sport -- AI editorial photography",
    image: "/images/showcase/showcase-5.jpg",
    colSpan: "col-span-2",
  },
  {
    category: "Portrait photography",
    title: "Fresh Duo -- AI natural-light portrait",
    image: "/images/showcase/showcase-11.jpg",
  },
  {
    category: "Light and shadow photography",
    title: "Under Flash -- AI dramatic lighting",
    image: "/images/showcase/showcase-12.jpg",
    rowSpan: "row-span-2",
  },
];

// ---------------------------------------------------------------------------
// GalleryCard -- uses next/image for CLS prevention and native lazy loading
// ---------------------------------------------------------------------------

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <motion.div
      variants={scaleUp}
      className={cn(
        "relative rounded-xl overflow-hidden group cursor-pointer",
        "border border-border/50",
        item.colSpan,
        item.rowSpan,
      )}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        unoptimized
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <span
          className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-2 w-fit"
          style={{
            background: "oklch(0.90 0.17 115)",
            color: "oklch(0.18 0 0)",
          }}
        >
          {item.category}
        </span>
        <p className="text-white text-sm font-medium leading-snug">
          {item.title}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ShowcaseGallery
// ---------------------------------------------------------------------------

export function ShowcaseGallery() {
  return (
    <section id="showcase" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-14 md:mb-20">
          <SectionHeader
            title="Creativity without limits"
            subtitle="Explore unlimited AI-powered design possibilities"
          />
        </div>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[240px] md:auto-rows-[280px] lg:auto-rows-[260px]">
          {GALLERY_ITEMS.map((item) => (
            <GalleryCard key={item.title} item={item} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
