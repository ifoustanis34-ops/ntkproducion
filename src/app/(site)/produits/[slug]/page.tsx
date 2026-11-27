import type { Metadata } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductConfigurator } from "@/components/products/ProductConfigurator";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Reveal } from "@/components/ui/reveal";
import { getImage } from "@/data/gallery";
import { getLanding } from "@/data/landings";
import { absoluteUrl } from "@/config/site";
import { readCatalogSync, sortProducts } from "@/lib/catalog/store";
import { prestationLabels, rangeLabels, rangeLanding } from "@/lib/catalog/types";
import { JsonLd, pageMetadata, productJsonLd } from "@/lib/seo";

/** Meta description ≤ 160 caractères : description + mention locale si la place le permet. */
function productDescription(text: string) {
  for (const suffix of [" Fabriqué par NTK Production à Yaoundé, devis sur WhatsApp.", " NTK Production, Yaoundé.", ""]) {
    if (text.length + suffix.length <= 160) return text + suffix;
  }
  return text.slice(0, 157).replace(/\s+\S*$/, "") + "…";
}

/**
 * Lecture directe du catalogue (non mise en cache) : une fiche créée ou modifiée dans le portail
 * est visible immédiatement, même si elle n'existait pas au moment de la compilation.
 */
const published = () => sortProducts(readCatalogSync().products.filter((p) => p.published));

export function generateStaticParams() {
  return published().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produits/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = published().find((x) => x.slug === slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name} à Yaoundé`,
    description: productDescription(p.description),
    path: `/produits/${p.slug}`,
    ...(p.photos[0] ? { image: p.photos[0].src } : {}),
  });
}

export default function ProductPage(props: PageProps<"/produits/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-[80svh] bg-navy-950" />}>
      <Product {...props} />
    </Suspense>
  );
}

async function Product({ params }: PageProps<"/produits/[slug]">) {
  await connection(); // toujours rendu à la demande, avec le catalogue à jour
  const { slug } = await params;
  const all = published();
  const p = all.find((x) => x.slug === slug);
  if (!p) notFound();

  const path = `/produits/${p.slug}`;
  const landing = getLanding(rangeLanding[p.range]);
  const prestations = p.prestations.length ? p.prestations.map((x) => prestationLabels[x]).join(" · ") : "À confirmer";
  const siblings = all.filter((x) => x.range === p.range && x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={productJsonLd({
          name: p.name,
          description: [p.description, ...p.details].join(" "),
          path,
          images: p.photos.map((i) => i.src),
          category: rangeLabels[p.range],
        })}
      />
      <PageHero
        eyebrow={rangeLabels[p.range]}
        title={p.name}
        intro={p.description}
        image={p.photos[0] ?? getImage(landing.heroImage)}
        crumb={{ label: p.name, path }}
        parents={[
          { label: "Produits", path: "/produits" },
          { label: landing.label, path: `/${landing.slug}` },
        ]}
      />

      <section className="py-16 sm:py-24" aria-label="Configurer et demander un devis">
        <div className="container-site">
          <ProductConfigurator
            name={p.name}
            pageUrl={absoluteUrl(path)}
            photos={p.photos}
            colors={p.colors}
            dimensions={p.dimensions}
            allowCustomDimensions={p.allowCustomDimensions}
          />
        </div>
      </section>

      <section className="bg-steel-50 py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">Présentation</h2>
            {(p.details.length ? p.details : [p.description]).map((d) => (
              <p key={d} className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {d}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            {p.uses.length > 0 && (
              <>
                <h2 className="text-xl font-bold text-navy-900">Usages</h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {p.uses.map((u) => (
                    <li key={u} className="flex items-start gap-2.5 text-[0.95rem] text-navy-900">
                      <Check className="mt-0.5 size-4 shrink-0 text-royal-600" />
                      {u}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <dl className="mt-8 grid grid-cols-2 gap-3 rounded-2xl bg-white p-4 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Prestation</dt>
                <dd className="mt-0.5 font-semibold text-navy-900">{prestations}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Prix et disponibilité</dt>
                <dd className="mt-0.5 font-semibold text-navy-900">Sur devis</dd>
              </div>
            </dl>
            <Link
              href={`/${landing.slug}`}
              className="mt-6 inline-flex items-center gap-2 font-medium text-royal-600 underline-offset-4 hover:underline"
            >
              Découvrir toute la gamme : {landing.label.toLowerCase()} <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="py-16 sm:py-24" aria-labelledby="similaires-title">
          <div className="container-site">
            <h2 id="similaires-title" className="text-2xl font-bold text-navy-900 sm:text-3xl">
              Dans la même gamme
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s, i) => (
                <Reveal as="li" key={s.slug} delay={i * 0.08}>
                  <ProductCard product={s} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="pb-20 sm:pb-28">
        <ContactCTA />
      </section>
    </>
  );
}
