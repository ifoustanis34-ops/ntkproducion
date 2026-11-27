import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { getPublishedProducts } from "@/lib/catalog/store";

export async function FeaturedProducts() {
  const featuredProducts = (await getPublishedProducts()).filter((p) => p.featured).slice(0, 6);
  if (!featuredProducts.length) return null;
  return (
    <section aria-labelledby="produits-title" className="py-20 sm:py-28">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Nos produits"
            title={<span id="produits-title">Des équipements pensés pour vos événements.</span>}
            intro="Une sélection de notre matériel. Tarifs et disponibilités sur demande."
          />
          <Reveal>
            <ButtonLink href="/produits" variant="outline">
              Voir tout le catalogue <ArrowRight />
            </ButtonLink>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
