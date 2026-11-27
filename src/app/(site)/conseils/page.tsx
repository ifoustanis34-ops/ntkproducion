import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { articles } from "@/data/articles";
import { getImage } from "@/data/gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Conseils : chapiteaux, tentes et hangars métalliques",
  description:
    "Guides NTK Production : choisir un chapiteau de mariage, comprendre son prix, choisir un hangar métallique, commander une tente sur mesure.",
  path: "/conseils",
  image: getImage("chapiteau-evenement-tapis-rouge").src,
});

export default function ConseilsPage() {
  return (
    <>
      <PageHero
        eyebrow="Conseils"
        title="Guides pratiques pour vos événements et vos constructions métalliques"
        intro="Des réponses concrètes aux questions que nous posent nos clients : choisir, dimensionner et commander le bon équipement."
        image="chapiteau-evenement-tapis-rouge"
        crumb={{ label: "Conseils", path: "/conseils" }}
      />
      <section className="py-16 sm:py-24">
        <ul className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/conseils/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-steel-200 bg-white transition-[box-shadow,border-color] hover:border-steel-300 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Photo image={getImage(a.image)} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-lg leading-snug font-bold text-navy-900">{a.title}</h2>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">{a.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-royal-600">
                    Lire le guide <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
      <section className="pb-20 sm:pb-28">
        <ContactCTA />
      </section>
    </>
  );
}
