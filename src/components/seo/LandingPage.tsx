import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ButtonLink } from "@/components/ui/button-link";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { getImage } from "@/data/gallery";
import { getLanding } from "@/data/landings";
import { products } from "@/data/products";
import { articles } from "@/data/articles";
import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export function landingMetadata(slug: string): Metadata {
  const l = getLanding(slug);
  return pageMetadata({
    title: l.seoTitle,
    description: l.metaDescription,
    path: `/${l.slug}`,
    image: getImage(l.heroImage).src,
  });
}

/** Page d'activité : contenu éditorial, fiches produits, FAQ, liens internes et devis. */
export function LandingPage({ slug }: { slug: string }) {
  const l = getLanding(slug);
  const path = `/${l.slug}`;
  const list = l.productCategory ? products.filter((p) => p.category === l.productCategory) : [];
  const related = l.related.map(getLanding);
  const relatedArticles = articles.filter((a) => l.articles.includes(a.slug));

  return (
    <>
      <JsonLd data={serviceJsonLd({ name: l.serviceType, description: l.metaDescription, path, image: getImage(l.heroImage).src })} />
      <PageHero
        eyebrow={l.eyebrow}
        title={l.h1}
        intro={l.intro}
        image={l.heroImage}
        crumb={{ label: l.label, path }}
        parents={[{ label: "Produits", path: "/produits" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppCta message={l.quoteMessage} size="lg">
            Demander un devis
          </WhatsAppCta>
          <ButtonLink href="/contact#devis" variant="outlineLight" size="lg">
            Formulaire de devis
          </ButtonLink>
        </div>
      </PageHero>

      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div className="space-y-12">
            {l.sections.map((s) => (
              <Reveal key={s.title}>
                <h2 className="text-2xl leading-tight font-bold text-navy-900 sm:text-3xl">{s.title}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {p}
                  </p>
                ))}
                {s.subsections && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {s.subsections.map((sub) => (
                      <div key={sub.title} className="rounded-2xl border border-steel-200 bg-white p-5">
                        <h3 className="font-semibold text-navy-900">{sub.title}</h3>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{sub.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Reveal>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal className="rounded-3xl border border-steel-200 bg-steel-50 p-6 sm:p-7">
              <h2 className="text-sm font-semibold tracking-[0.14em] text-navy-900 uppercase">Ce que nous proposons</h2>
              <ul className="mt-4 space-y-2.5">
                {l.offer.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-[0.95rem] text-navy-900">
                    <Check className="mt-0.5 size-4 shrink-0 text-royal-600" />
                    {o}
                  </li>
                ))}
              </ul>
              <WhatsAppCta message={l.quoteMessage} className="mt-6 w-full">
                Obtenir un devis gratuit
              </WhatsAppCta>
              <p className="mt-4 text-sm text-muted-foreground">
                NTK Production · Camp Tunisien, Yaoundé.{" "}
                <Link href="/zone-intervention" className="font-medium text-royal-600 underline-offset-4 hover:underline">
                  Zone d&apos;intervention
                </Link>
              </p>
            </Reveal>
          </aside>
        </div>
      </section>

      {list.length > 0 && (
        <section className="bg-steel-50 py-16 sm:py-24" aria-labelledby="produits-title">
          <div className="container-site">
            <h2 id="produits-title" className="text-2xl font-bold text-navy-900 sm:text-3xl">
              Nos modèles : {l.label.toLowerCase()}
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={(i % 3) * 0.08}>
                  <ProductCard product={p} variant="catalog" ctaLabel="Obtenir un devis pour ce produit" />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {!list.length && l.gallery && (
        <section className="bg-steel-50 py-16 sm:py-24" aria-label={`Photos : ${l.label}`}>
          <ul className="container-site grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {l.gallery.map((id) => {
              const img = getImage(id);
              return (
                <li key={id} className="relative aspect-square overflow-hidden rounded-2xl">
                  <Photo image={img} sizes="(min-width: 1024px) 25vw, 50vw" />
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="py-16 sm:py-24" aria-labelledby="faq-title">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="faq-title" className="text-2xl font-bold text-navy-900 sm:text-3xl">
              Questions fréquentes
            </h2>
            <div className="mt-8 divide-y divide-steel-200 border-y border-steel-200">
              {l.faq.map((f) => (
                <details key={f.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-navy-900">
                    <h3 className="text-base sm:text-lg">{f.question}</h3>
                    <span aria-hidden className="mt-1 text-royal-600 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <nav aria-labelledby="related-title">
              <h2 id="related-title" className="text-2xl font-bold text-navy-900 sm:text-3xl">
                Nos autres activités
              </h2>
              <ul className="mt-6 grid gap-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/${r.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-steel-200 p-4 font-medium text-navy-900 transition-colors hover:border-royal-600/40"
                    >
                      {r.h1}
                      <ArrowRight className="size-4 shrink-0 text-steel-400 group-hover:text-royal-600" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {relatedArticles.length > 0 && (
              <nav aria-labelledby="conseils-title">
                <h2 id="conseils-title" className="text-xl font-bold text-navy-900">
                  Nos conseils
                </h2>
                <ul className="mt-4 space-y-2">
                  {relatedArticles.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/conseils/${a.slug}`} className="text-royal-600 underline-offset-4 hover:underline">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <ContactCTA />
      </section>
    </>
  );
}
