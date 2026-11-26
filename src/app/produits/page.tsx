import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactCTA } from "@/components/home/ContactCTA";
import { products } from "@/data/products";
import { categoryLabels, type GalleryCategory } from "@/data/gallery";
import { absoluteUrl } from "@/config/site";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { getImage } from "@/data/gallery";

export const metadata: Metadata = pageMetadata({
  title: "Produits — chapiteaux, tentes, tables serpentines VIP et podiums",
  description:
    "Catalogue NTK Production : chapiteaux, tentes événementielles, tables rondes pliables, tables serpentines VIP, tables rectangulaires, podiums et structures métalliques. Devis sur WhatsApp.",
  path: "/produits",
  image: "/images/tables/table-serpentine-modules.jpg",
});

const categoryIntro: Record<GalleryCategory, string> = {
  chapiteaux: "Chapiteaux à travées, structures à parois transparentes, tentes pagode : des abris pour tous vos événements.",
  tables: "Tables rondes et rectangulaires pliables, tables serpentines VIP et tables hautes pour vos réceptions.",
  podiums: "Des podiums de spectacle pour vos concerts, cérémonies et animations.",
  "structures-metalliques": "Charpentes, ossatures de hangars et éléments métalliques.",
};

const order: GalleryCategory[] = ["chapiteaux", "tables", "podiums", "structures-metalliques"];

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
        intro="Chaque fiche vous permet de demander directement un devis sur WhatsApp. Tarifs et disponibilités communiqués sur demande."
        image="table-serpentine-vip"
        crumb={{ label: "Produits", path: "/produits" }}
      />

      <nav aria-label="Catégories de produits" className="sticky top-0 z-30 border-b border-steel-200 bg-white/90 backdrop-blur-xl">
        <ul className="container-site flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {order.map((c) => (
            <li key={c} className="shrink-0">
              <a href={`#${c}`} className="inline-flex min-h-11 items-center rounded-full bg-steel-100 px-5 text-sm font-medium text-navy-900 transition-colors hover:bg-navy-900 hover:text-white">
                {categoryLabels[c]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {order.map((cat, idx) => {
        const list = products.filter((p) => p.category === cat);
        if (!list.length) return null;
        return (
          <section key={cat} id={cat} aria-labelledby={`${cat}-title`} className={idx % 2 === 1 ? "bg-steel-50 py-20 sm:py-24" : "py-20 sm:py-24"}>
            <div className="container-site">
              <SectionHeading eyebrow={`0${idx + 1}`} title={<span id={`${cat}-title`}>{categoryLabels[cat]}</span>} intro={categoryIntro[cat]} />
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p, i) => (
                  <Reveal as="li" key={p.slug} id={p.slug} delay={(i % 3) * 0.08}>
                    <ProductCard product={p} variant="catalog" ctaLabel="Obtenir un devis pour ce produit" />
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <section className="pb-20 sm:pb-28">
        <div className="container-site mb-12 text-center text-sm text-muted-foreground">
          Bâches VIP et autres équipements événementiels : contactez-nous pour connaître les modèles disponibles.
        </div>
        <ContactCTA />
      </section>
    </>
  );
}
