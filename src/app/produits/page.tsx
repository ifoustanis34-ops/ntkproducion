import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getLanding } from "@/data/landings";
import { PageHero } from "@/components/shared/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactCTA } from "@/components/home/ContactCTA";
import { products } from "@/data/products";
import { productRanges } from "@/data/ranges";
import { categoryLabels } from "@/data/gallery";
import { Photo } from "@/components/ui/photo";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { cn } from "@/lib/utils";
import { absoluteUrl } from "@/config/site";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { getImage } from "@/data/gallery";

export const metadata: Metadata = pageMetadata({
  title: "Produits : chapiteaux, tentes, hangars, podiums",
  description:
    "5 gammes NTK Production à Yaoundé : chapiteaux et tentes, hangars et structures métalliques, bâches VIP, tables et mobilier, podiums. Devis sur WhatsApp.",
  path: "/produits",
  image: "/images/tables/table-serpentine-modules.jpg",
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Catalogue NTK Production",
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Product",
              name: p.name,
              description: p.description,
              image: absoluteUrl(getImage(p.mainImage).src),
              brand: { "@type": "Brand", name: "NTK Production" },
              category: categoryLabels[p.category],
            },
          })),
        }}
      />
      <PageHero
        eyebrow="Nos produits"
        title={
          <>
            Le catalogue <span className="text-steel-gradient">NTK Production.</span>
          </>
        }
        intro="Cinq gammes d'équipements fabriqués et vendus par NTK Production. Demandez directement votre devis sur WhatsApp : tarifs et disponibilités communiqués sur demande."
        image="table-serpentine-vip"
        crumb={{ label: "Produits", path: "/produits" }}
      />

      <nav aria-label="Gammes de produits" className="sticky top-0 z-30 border-b border-steel-200 bg-white/90 backdrop-blur-xl">
        <ul className="container-site flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {productRanges.map((g) => (
            <li key={g.id} className="shrink-0">
              <a href={`#${g.id}`} className="inline-flex min-h-11 items-center rounded-full bg-steel-100 px-5 text-sm font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-white">
                {g.shortTitle}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {productRanges.map((g, idx) => {
        const list = g.productCategory ? products.filter((p) => p.category === g.productCategory) : [];
        const illustration = !list.length && g.image ? getImage(g.image) : null;
        const quote = `Bonjour NTK Production, je souhaite obtenir un devis concernant vos ${g.quoteLabel}.`;
        return (
          <section
            key={g.id}
            id={g.id}
            aria-labelledby={`${g.id}-title`}
            className={cn("scroll-mt-20 py-20 sm:py-24", idx % 2 === 1 && "bg-steel-50")}
          >
            <div className="container-site">
              <div className={cn("grid gap-10", illustration ? "items-center lg:grid-cols-2 lg:gap-16" : "lg:grid-cols-[1.1fr_0.9fr] lg:gap-16")}>
                {illustration && (
                  <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                    <Photo image={illustration} sizes="(min-width: 1024px) 45vw, 100vw" />
                  </Reveal>
                )}
                <div>
                  <SectionHeading
                    eyebrow={`Gamme ${String(idx + 1).padStart(2, "0")}`}
                    title={<span id={`${g.id}-title`}>{g.title}</span>}
                    intro={g.intro}
                  />
                  {illustration && <RangeItems items={g.items} quote={quote} landings={g.landings} className="mt-8" />}
                </div>
                {!illustration && <RangeItems items={g.items} quote={quote} landings={g.landings} className="lg:pt-10" />}
              </div>

              {list.length > 0 && (
                <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label={`Produits : ${g.title}`}>
                  {list.map((p, i) => (
                    <Reveal as="li" key={p.slug} id={p.slug} delay={(i % 3) * 0.08}>
                      <ProductCard product={p} variant="catalog" ctaLabel="Obtenir un devis pour ce produit" />
                    </Reveal>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      })}

      <section className="pb-20 sm:pb-28">
        <ContactCTA />
      </section>
    </>
  );
}

/** Liste des prestations d'une gamme + bouton de devis WhatsApp. */
function RangeItems({ items, quote, landings, className }: { items: string[]; quote: string; landings: string[]; className?: string }) {
  return (
    <Reveal delay={0.1} className={cn("rounded-3xl border border-steel-200 bg-white p-6 sm:p-7", className)}>
      <h3 className="text-sm font-semibold tracking-[0.14em] text-navy-900 uppercase">Dans cette gamme</h3>
      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[0.95rem] text-navy-900">
            <Check className="mt-0.5 size-4 shrink-0 text-royal-600" />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
        <WhatsAppCta message={quote} className="w-full sm:w-auto">
          Demander un devis
        </WhatsAppCta>
        {landings.map(getLanding).map((l) => (
          <Link key={l.slug} href={`/${l.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-600 underline-offset-4 hover:underline">
            {l.label} : en savoir plus <ArrowRight className="size-4" />
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
