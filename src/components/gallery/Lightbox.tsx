"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/data/gallery";
import { categoryLabels } from "@/data/gallery";

type Props = {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

export function Lightbox({ images, index, onClose, onIndexChange }: Props) {
  const open = index !== null && images[index] !== undefined;
  const [dir, setDir] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDir(delta);
      onIndexChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Ouverture : verrouillage du défilement, focus, restitution du focus à la fermeture
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      lastFocus.current?.focus?.();
    };
  }, [open]);

  // Clavier : Échap, flèches, piège de focus
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        const nodes = document.querySelectorAll<HTMLElement>("#visionneuse button");
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, go]);

  if (!mounted) return null;
  const img = open ? images[index!] : null;

  return createPortal(
    <AnimatePresence>
      {img && (
        <m.div
          id="visionneuse"
          role="dialog"
          aria-modal="true"
          aria-label={`Visionneuse : ${img.title}`}
          className="fixed inset-0 z-[80] flex flex-col bg-navy-950/96 text-white backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="text-sm text-steel-300 tabular-nums" aria-live="polite">
              {index! + 1} / {images.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Fermer la visionneuse"
              className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <m.div
                key={img.id}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60, scale: 0.97 }),
                  center: { opacity: 1, x: 0, scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: d * -60, scale: 0.97 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                drag={images.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70 || info.velocity.x < -400) go(1);
                  else if (info.offset.x > 70 || info.velocity.x > 400) go(-1);
                }}
                className="absolute inset-3 cursor-grab touch-pan-y active:cursor-grabbing sm:inset-x-20 sm:inset-y-4"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={img.blurDataURL}
                  draggable={false}
                  loading="eager"
                  fetchPriority="high"
                  className="pointer-events-none object-contain select-none"
                />
              </m.div>
            </AnimatePresence>

            {/* Préchargement des photos voisines pour une navigation instantanée */}
            {images.length > 1 &&
              [1, -1].map((d) => {
                const n = images[(index! + d + images.length) % images.length];
                return (
                  <div key={`pre-${n.id}`} aria-hidden className="pointer-events-none invisible absolute inset-3 sm:inset-x-20 sm:inset-y-4">
                    <Image src={n.src} alt="" fill sizes="100vw" quality={85} loading="eager" className="object-contain" />
                  </div>
                );
              })}

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Photo précédente"
                  className="absolute top-1/2 left-2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/25 sm:inline-flex"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Photo suivante"
                  className="absolute top-1/2 right-2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/25 sm:inline-flex"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>

          <div className="container-site flex items-end justify-between gap-4 py-4 sm:py-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] text-azure-300 uppercase">{categoryLabels[img.category]}</p>
              <h2 className="mt-1 text-lg font-semibold sm:text-xl">{img.title}</h2>
              <p className="mt-1 text-sm text-steel-300">{img.description}</p>
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 sm:hidden">
                <button type="button" onClick={() => go(-1)} aria-label="Photo précédente" className="inline-flex size-11 items-center justify-center rounded-full bg-white/10">
                  <ChevronLeft className="size-5" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Photo suivante" className="inline-flex size-11 items-center justify-center rounded-full bg-white/10">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
