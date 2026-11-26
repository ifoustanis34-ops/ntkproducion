import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { expertises } from "@/data/services";
import { getImage } from "@/data/gallery";

export function Expertise() {
  return (
    <section aria-labelledby="expertise-title" className="bg-steel-50 py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          eyebrow="Nos domaines d'expertise"
          title={<span id="expertise-title">Quatre savoir-faire, un seul interlocuteur.</span>}
          intro="Des abris aux structures, du mobilier à la scène : l'essentiel de votre événement réuni chez NTK Production."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {expertises.map((e, i) => {
            const img = getImage(e.image);
            return (
              <Reveal as="li" key={e.id} delay={i * 0.08}>
                <Link
                  href={e.href}
                  className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-3xl bg-navy-900 p-6 text-white sm:aspect-[4/5] lg:aspect-[3/4.4]"
                >
                  <Photo image={img} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.08]" />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/0 transition-opacity duration-500" />
                  <span aria-hidden className="absolute inset-0 bg-royal-600/0 transition-colors duration-500 group-hover:bg-royal-600/15" />
                  <span className="relative text-xs font-semibold tracking-[0.2em] text-azure-300">0{i + 1}</span>
                  <h3 className="relative mt-2 text-2xl font-bold">{e.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-steel-200 transition-all duration-500 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-32 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-32 lg:group-focus-visible:opacity-100">
                    {e.description}
                  </p>
                  <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                    Découvrir
                    <span className="inline-flex size-8 items-center justify-center rounded-full bg-white/15 transition-all duration-300 group-hover:bg-white group-hover:text-navy-900">
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
