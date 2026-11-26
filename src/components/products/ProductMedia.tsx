"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryImage } from "@/data/gallery";
import { cn } from "@/lib/utils";

/** Photo principale + miniatures cliquables (fondu CSS à chaque changement). */
export function ProductMedia({
  images,
  productName,
  badge,
  sizes = "(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw",
}: {
  images: GalleryImage[];
  productName: string;
  badge?: React.ReactNode;
  sizes?: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active];
  return (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-steel-100">
        <Image
          key={current.id}
          src={current.src}
          alt={current.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          blurDataURL={current.blurDataURL}
          className={cn("object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.05]", active > 0 && "page-enter")}
          style={current.focus ? { objectPosition: current.focus } : undefined}
        />
        {badge}
      </div>
      {images.length > 1 && (
      <div className="flex gap-2 px-5 pt-4" role="group" aria-label={`Photos : ${productName}`}>
        {images.map((img, i) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Afficher la photo ${i + 1} : ${img.title}`}
            aria-pressed={i === active}
            className={cn(
              "relative size-12 shrink-0 overflow-hidden rounded-lg ring-2 ring-offset-2 transition-all",
              i === active ? "ring-royal-600" : "opacity-70 ring-transparent hover:opacity-100",
            )}
          >
            <Image src={img.src} alt="" fill sizes="96px" className="object-cover" style={img.focus ? { objectPosition: img.focus } : undefined} />
          </button>
        ))}
      </div>
      )}
    </>
  );
}
