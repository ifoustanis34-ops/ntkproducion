import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ProductMedia } from "@/components/products/ProductMedia";
import { ProductCard } from "@/components/products/ProductCard";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Reveal } from "@/components/ui/reveal";
import { categoryLabels, getImage } from "@/data/gallery";
import { getProduct, prestationLabels, products } from "@/data/products";
import { getLanding } from "@/data/landings";
import { JsonLd, pageMetadata, productJsonLd } from "@/lib/seo";
import { productQuoteMessage } from "@/lib/whatsapp";

/** Meta description ≤ 160 caractères : description + mention locale si la place le permet. */
function productDescription(text: string) {
  for (const suffix of [" Fabriqué par NTK Production à Yaoundé, devis sur WhatsApp.", " NTK Production, Yaoundé.", ""]) {
    if (text.length + suffix.length <= 160) return text + suffix;
  }
  return text.slice(0, 157).replace(/\s+\S*$/, "") + "…";
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produits/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name} à Yaoundé`,
    description: productDescription(p.description),
    path: `/produits/${p.slug}`,
    image: getImage(p.mainImage).src,
  });
}

export default async function ProductPage({ params }: PageProps<"/produits/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const path = `/produits/${p.slug}`;
  const landing = getLanding(p.landing);
  const images = [p.mainImage, ...p.secondaryImages].map(getImage);
  const prestations = p.prestations.length ? p.prestations.map((x) => prestationLabels[x]).join(" · ") : "À confirmer";
  const siblings = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  const quote = productQuoteMessage(p.messageLabel);

  return (
    <>
      <JsonLd
        data={productJsonLd({
          name: p.name,
          description: [p.description, ...p.details].join(" "),
          path,
          images: images.map((i) => i.src),
          category: categoryLabels[p.category],
        })}
      />
      <PageHero
        eyebrow={categoryLabels[p.category]}
        title={p.name}
        intro={p.description}
        image={p.mainImage}
        crumb={{ label: p.name, path }}
        parents={[
          { label: "Produits", path: "/produits" },
          { label: landing.label, path: `/${landing.slug}` },
        ]}
      />

      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="self-start overflow-hidden rounded-3xl border border-steel-200 bg-white pb-5">
            <ProductMedia images={images} productName={p.name} sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">Présentation</h2>
              {p.details.map((d) => (
                <p key={d} className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {d}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-10 text-xl font-bold text-navy-900">Usages</h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {p.uses.map((u) => (
                  <li key={u} className="flex items-start gap-2.5 text-[0.95rem] text-navy-900">
                    <Check className="mt-0.5 size-4 shrink-0 text-royal-600" />
                    {u}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-8 grid grid-cols-2 gap-3 rounded-2xl bg-steel-50 p-4 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground">Prestation</dt>
                  <dd className="mt-0.5 font-semibold text-navy-900">{prestations}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">Prix et disponibilité</dt>
                  <dd className="mt-0.5 font-semibold text-navy-900">Sur devis</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <WhatsAppCta message={quote}>Obtenir un devis pour ce produit</WhatsAppCta>
              </div>
              <Link
                href={`/${landing.slug}`}
                className="mt-6 inline-flex items-center gap-2 font-medium text-royal-600 underline-offset-4 hover:underline"
              >
                Découvrir toute la gamme : {landing.label.toLowerCase()} <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="bg-steel-50 py-16 sm:py-24" aria-labelledby="similaires-title">
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

      <section className="py-20 sm:py-28">
        <ContactCTA />
      </section>
    </>
  );
}
