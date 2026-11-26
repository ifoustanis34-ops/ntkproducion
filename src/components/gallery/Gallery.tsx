"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useState } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, m } from "motion/react";

const loadMotionFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);
import { Expand } from "lucide-react";
import type { GalleryImage } from "@/data/gallery";
import { categoryLabels, homeFilters, portfolioFilters } from "@/data/gallery";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Visionneuse chargée uniquement à la première ouverture
const Lightbox = dynamic(() => import("./Lightbox").then((m) => m.Lightbox), { ssr: false });

type Props = {
  images: GalleryImage[];
  /** Jeu de filtres : accueil (chapiteaux + tentes regroupés) ou portfolio (distingués) */
  filterSet: "home" | "portfolio";
  /** Nombre maximum d'images affichées (aperçu page d'accueil) */
  limit?: number;
  tone?: "light" | "dark";
};

/** Taille de la tuile dans la grille asymétrique selon le format réel de la photo. */
function tileClass(img: GalleryImage, i: number) {
  if (img.lowRes) return "";
  const ratio = img.width / img.height;
  if (ratio > 1.25) return "col-span-2";
  if (ratio < 0.95) return "row-span-2";
  return i % 7 === 0 ? "col-span-2 row-span-2" : "";
}

export function Gallery({ images, filterSet, limit, tone = "light" }: Props) {
  const filters = filterSet === "home" ? homeFilters : portfolioFilters;
  const [filterId, setFilterId] = useState(filters[0].id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);

  // Ferme la visionneuse si la page est masquée (navigation avec Activity)
  useLayoutEffect(() => () => setLightboxIndex(null), []);

  const visible = useMemo(() => {
    const f = filters.find((x) => x.id === filterId) ?? filters[0];
    let list = images.filter(f.match);
    if (limit) {
      // Aperçu : alterne les catégories pour montrer la diversité des réalisations
      const groups = new Map<string, GalleryImage[]>();
      list.forEach((img) => groups.set(img.category, [...(groups.get(img.category) ?? []), img]));
      const queues = [...groups.values()];
      const mixed: GalleryImage[] = [];
      while (mixed.length < list.length) queues.forEach((q) => q.length && mixed.push(q.shift()!));
      list = mixed.slice(0, limit);
    }
    return list;
  }, [images, filters, filterId, limit]);

  const counts = useMemo(
    () => Object.fromEntries(filters.map((f) => [f.id, images.filter(f.match).length])),
    [filters, images],
  );

  return (
    <LazyMotion features={loadMotionFeatures} strict>
    <MotionConfig reducedMotion="user">
      <div role="group" aria-label="Filtrer les réalisations" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((f) => {
          const active = f.id === filterId;
          if (counts[f.id] === 0) return null;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilterId(f.id)}
              className={cn(
                "relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors duration-300",
                tone === "light"
                  ? active
                    ? "border-navy-900 text-white"
                    : "border-steel-200 text-navy-900 hover:border-royal-600 hover:text-royal-600"
                  : active
                    ? "border-white text-navy-950"
                    : "border-white/20 text-white hover:border-white/60",
              )}
            >
              {active && (
                <m.span
                  layoutId={`filter-pill-${tone}-${limit ?? "all"}`}
                  className={cn("absolute inset-0 -z-0 rounded-full", tone === "light" ? "bg-navy-900" : "bg-white")}
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{f.label}</span>
              <span className={cn("relative text-xs tabular-nums", active ? "opacity-70" : "opacity-50")}>{counts[f.id]}</span>
            </button>
          );
        })}
      </div>

      <m.ul layout className="grid grid-flow-dense grid-cols-2 gap-3 auto-rows-[150px] sm:auto-rows-[190px] md:grid-cols-4 lg:auto-rows-[220px] lg:gap-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((img, i) => (
            <m.li
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={cn("relative", tileClass(img, i))}
            >
              <button
                type="button"
                onClick={() => {
                  setLightboxLoaded(true);
                  setLightboxIndex(i);
                }}
                aria-label={`Agrandir : ${img.title}`}
                className="group relative block size-full overflow-hidden rounded-2xl bg-steel-100 text-left"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={img.lowRes ? "(min-width: 768px) 25vw, 50vw" : "(min-width: 768px) 50vw, 100vw"}
                  placeholder="blur"
                  blurDataURL={img.blurDataURL}
                  className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
                  style={img.focus ? { objectPosition: img.focus } : undefined}
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 translate-y-1 p-3 text-white transition-transform duration-500 group-hover:translate-y-0 sm:p-4">
                  <span className="hidden text-[0.65rem] font-semibold tracking-[0.18em] text-azure-300 uppercase sm:block">{categoryLabels[img.category]}</span>
                  <span className="mt-0.5 block text-sm leading-snug font-semibold sm:text-base">{img.title}</span>
                </span>
                <span aria-hidden className="absolute top-3 right-3 inline-flex size-9 scale-75 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <Expand className="size-4" />
                </span>
              </button>
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      {lightboxLoaded && <Lightbox images={visible} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onIndexChange={setLightboxIndex} />}
    </MotionConfig>
    </LazyMotion>
  );
}
