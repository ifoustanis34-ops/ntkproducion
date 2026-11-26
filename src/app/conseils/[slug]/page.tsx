import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ButtonLink } from "@/components/ui/button-link";
import { articles, getArticle } from "@/data/articles";
import { getLanding } from "@/data/landings";
import { getImage } from "@/data/gallery";
import { articleJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/conseils/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const meta = pageMetadata({
    title: a.seoTitle ?? a.title,
    description: a.description,
    path: `/conseils/${a.slug}`,
    image: getImage(a.image).src,
  });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: a.date } };
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });

export default async function ArticlePage({ params }: PageProps<"/conseils/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const path = `/conseils/${a.slug}`;
  const related = a.related.map(getLanding);
  const others = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleJsonLd({ title: a.title, description: a.description, path, image: getImage(a.image).src, date: a.date })} />
      <PageHero
        eyebrow={`Conseils · ${dateFormat.format(new Date(a.date))}`}
        title={a.title}
        intro={a.intro}
        image={a.image}
        crumb={{ label: a.title, path }}
        parents={[{ label: "Conseils", path: "/conseils" }]}
      />

      <article className="py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="max-w-3xl">
            {a.sections.map((s) => (
              <section key={s.title} className="mt-10 first:mt-0">
                <h2 className="text-2xl leading-tight font-bold text-navy-900 sm:text-3xl">{s.title}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-4 space-y-2.5">
                    {s.list.map((li) => (
                      <li key={li} className="flex items-start gap-2.5 text-base leading-relaxed text-navy-900">
                        <Check className="mt-1 size-4 shrink-0 text-royal-600" />
                        {li}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section className="mt-12 rounded-3xl bg-steel-50 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-navy-900">En résumé</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{a.conclusion}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <WhatsAppCta message={a.quoteMessage}>Demander un devis</WhatsAppCta>
                <ButtonLink href="/contact#devis" variant="outline">
                  Formulaire de contact
                </ButtonLink>
              </div>
            </section>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <nav aria-labelledby="activites-title" className="rounded-3xl border border-steel-200 p-6">
              <h2 id="activites-title" className="text-sm font-semibold tracking-[0.14em] text-navy-900 uppercase">
                Nos activités liées
              </h2>
              <ul className="mt-4 space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/${r.slug}`} className="group flex items-start justify-between gap-3 font-medium text-navy-900 hover:text-royal-600">
                      {r.label}
                      <ArrowRight className="mt-1 size-4 shrink-0 text-steel-400 group-hover:text-royal-600" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-labelledby="autres-title">
              <h2 id="autres-title" className="text-sm font-semibold tracking-[0.14em] text-navy-900 uppercase">
                Autres conseils
              </h2>
              <ul className="mt-4 space-y-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/conseils/${o.slug}`} className="text-[0.95rem] text-royal-600 underline-offset-4 hover:underline">
                      {o.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </article>

      <section className="pb-20 sm:pb-28">
        <ContactCTA />
      </section>
    </>
  );
}
