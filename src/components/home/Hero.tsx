import Image from "next/image";
import { Fragment } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { TrussLine } from "@/components/shared/TrussLine";
import { imageMeta } from "@/data/image-meta";

const HERO_SRC = "/images/hero/hero-tente-pagode-drapee.jpg";
const titleWords = ["L’excellence", "événementielle", "prend", "forme", "avec"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy-950 text-white">
      <div className="hero-parallax-img absolute inset-0 -z-20">
        <div className="hero-zoom absolute inset-0">
          <Image
            src={HERO_SRC}
            alt="Tente pagode blanche de NTK Production, intérieur habillé de voilages crème, installée sur une pelouse"
            fill
            preload
            quality={75}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={imageMeta[HERO_SRC].blurDataURL}
            className="object-cover object-[60%_50%]"
          />
        </div>
      </div>
      {/* Superpositions pour la lisibilité */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/90 via-navy-950/55 to-navy-950/10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/25 to-transparent" />

      <TrussLine className="pointer-events-none absolute top-[calc(var(--header-h)+1.5rem)] right-[-6%] -z-10 hidden w-[52%] text-white/25 lg:block" />

      <div className="hero-parallax-content container-site relative pt-[calc(var(--header-h)+3rem)] pb-28 sm:pb-32">
        <p className="hero-fade mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.22em] text-steel-200 uppercase backdrop-blur-sm" style={{ "--d": "0.1s" } as React.CSSProperties}>
          <span className="size-1.5 rounded-full bg-azure-400" aria-hidden />
          Fabricant de matériel événementiel et de structures métalliques · Yaoundé
        </p>
        <h1 id="hero-title" className="max-w-4xl text-[2.5rem] leading-[1.02] font-extrabold sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
          {titleWords.map((w, i) => (
            <Fragment key={i}>
              <span className="hero-word">
                <span style={{ "--i": i } as React.CSSProperties}>{w}</span>
              </span>{" "}
            </Fragment>
          ))}
          <span className="hero-word">
            <span className="text-steel-gradient" style={{ "--i": titleWords.length } as React.CSSProperties}>
              NTK&nbsp;Production.
            </span>
          </span>
        </h1>
        <p className="hero-fade mt-7 max-w-2xl text-base leading-relaxed text-steel-200 sm:text-lg" style={{ "--d": "0.75s" } as React.CSSProperties}>
          Fabrication et vente de chapiteaux, tentes, bâches VIP, tables et podiums, et construction de hangars et structures métalliques sur mesure : nous donnons vie à vos projets au Cameroun.
        </p>
        <div className="hero-fade mt-10 flex flex-col gap-3 sm:flex-row" style={{ "--d": "0.95s" } as React.CSSProperties}>
          <ButtonLink href="/services" size="lg">
            Découvrir nos services
            <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </ButtonLink>
          <ButtonLink href="/contact#devis" variant="outlineLight" size="lg">
            Demander un devis
          </ButtonLink>
        </div>
      </div>

      <a
        href="#presentation"
        aria-label="Faire défiler vers la présentation"
        className="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.68rem] tracking-[0.3em] text-steel-300 uppercase sm:flex"
        style={{ "--d": "1.4s" } as React.CSSProperties}
      >
        Défiler
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/30">
          <span className="animate-scroll-cue mt-2 block h-2 w-0.5 rounded-full bg-white" />
        </span>
        <ArrowDown className="sr-only" />
      </a>
    </section>
  );
}
