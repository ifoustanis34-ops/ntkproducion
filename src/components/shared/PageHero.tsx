import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { TrussLine } from "@/components/shared/TrussLine";
import { getImage } from "@/data/gallery";
import { absoluteUrl } from "@/config/site";
import { JsonLd } from "@/lib/seo";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  image: string;
  /** Libellé et chemin de la page courante pour le fil d'Ariane */
  crumb: { label: string; path: string };
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, title, intro, image, crumb, children }: Props) {
  const img = getImage(image);
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: crumb.label, item: absoluteUrl(crumb.path) },
          ],
        }}
      />
      <div className="hero-zoom absolute inset-0 -z-20">
        <Photo image={img} sizes="100vw" preload className="opacity-55" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-950/30" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/60" />
      <TrussLine className="pointer-events-none absolute right-[-8%] bottom-0 -z-10 hidden w-[50%] text-white/15 lg:block" />
      <div className="container-site pt-[calc(var(--header-h)+3.5rem)] pb-16 sm:pt-[calc(var(--header-h)+5rem)] sm:pb-24">
        <nav aria-label="Fil d'Ariane" className="hero-fade mb-8" style={{ "--d": "0s" } as React.CSSProperties}>
          <ol className="flex items-center gap-2 text-sm text-steel-300">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Accueil
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-white">
              {crumb.label}
            </li>
          </ol>
        </nav>
        <p className="hero-fade mb-4 text-xs font-semibold tracking-[0.22em] text-azure-300 uppercase" style={{ "--d": "0.05s" } as React.CSSProperties}>
          {eyebrow}
        </p>
        <h1 className="hero-fade max-w-4xl text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl" style={{ "--d": "0.12s" } as React.CSSProperties}>
          {title}
        </h1>
        {intro && (
          <p className="hero-fade mt-6 max-w-2xl text-base leading-relaxed text-steel-200 sm:text-lg" style={{ "--d": "0.22s" } as React.CSSProperties}>
            {intro}
          </p>
        )}
        {children && (
          <div className="hero-fade mt-9" style={{ "--d": "0.32s" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
