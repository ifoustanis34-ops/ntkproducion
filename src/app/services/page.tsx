import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { ContactCTA } from "@/components/home/ContactCTA";
import { serviceLines } from "@/data/services";
import { getImage } from "@/data/gallery";
import { whatsappMessages } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Services — fabrication, vente et location de matériel événementiel",
  description:
    "Fabrication de chapiteaux et de tentes sur commande, vente et location de chapiteaux, tentes, bâches VIP, tables et podiums à Yaoundé. Demandez votre devis à NTK Production.",
  path: "/services",
  image: "/images/chapiteaux/chapiteau-evenement-tapis-rouge.jpg",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title={
          <>
            Fabrication, vente <span className="text-steel-gradient">et location.</span>
          </>
        }
        intro="Trois métiers distincts et complémentaires pour équiper vos événements : choisissez la formule qui correspond à votre projet."
        image="chapiteau-structure-longue"
        crumb={{ label: "Services", path: "/services" }}
      >
        <nav aria-label="Services" className="flex flex-wrap gap-2">
          {serviceLines.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex min-h-11 items-center rounded-full border border-white/25 bg-white/5 px-5 text-sm font-medium backdrop-blur transition-colors hover:bg-white hover:text-navy-900"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {serviceLines.map((s, idx) => {
        const hero = getImage(s.heroImage);
        const reversed = idx % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className={cn("py-20 sm:py-28", idx % 2 === 1 && "bg-steel-50")}
          >
            <div className="container-site">
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <Reveal className={cn("relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:aspect-[5/6]", reversed && "lg:order-2")}>
                  <Photo image={hero} sizes="(min-width: 1024px) 45vw, 100vw" />
                  <span className="absolute top-5 left-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] text-navy-900 uppercase backdrop-blur">
                    {s.eyebrow}
                  </span>
                </Reveal>
                <div>
                  <Reveal>
                    <p className="text-xs font-semibold tracking-[0.22em] text-royal-600 uppercase">{s.eyebrow}</p>
                    <h2 id={`${s.id}-title`} className="mt-3 text-3xl leading-tight font-bold text-navy-900 sm:text-4xl lg:text-5xl">
                      {s.title}
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{s.intro}</p>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h3 className="mt-8 text-sm font-semibold tracking-[0.14em] text-navy-900 uppercase">Prestations disponibles</h3>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {s.prestations.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-[0.95rem] text-navy-900">
                          <Check className="mt-0.5 size-4 shrink-0 text-royal-600" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={0.2} className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <WhatsAppCta message={whatsappMessages[s.whatsapp]}>Demander un devis</WhatsAppCta>
                    <ButtonLink href="/produits" variant="outline">
                      Voir les produits <ArrowRight />
                    </ButtonLink>
                  </Reveal>
                </div>
              </div>

              <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-label={`Galerie : ${s.title}`}>
                {s.gallery.map((id, i) => {
                  const img = getImage(id);
                  return (
                    <Reveal as="li" key={id} delay={i * 0.06} className="group relative aspect-square overflow-hidden rounded-2xl">
                      <Photo
                        image={img}
                        sizes={img.lowRes ? "25vw" : "(min-width: 1024px) 25vw, 50vw"}
                        className="transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent p-3 pt-10 text-sm font-medium text-white">
                        {img.title}
                      </span>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}

      <div className="py-20 sm:py-28">
        <ContactCTA />
      </div>
    </>
  );
}
