import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { ContactCTA } from "@/components/home/ContactCTA";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { expertises } from "@/data/services";
import { getImage } from "@/data/gallery";
import { siteConfig } from "@/config/site";
import { whatsappMessages } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "À propos — fabricant d'équipements événementiels à Yaoundé",
  description:
    "Découvrez NTK Production, entreprise de Yaoundé spécialisée dans la fabrication et la vente de chapiteaux, tentes, tables, podiums et structures métalliques.",
  path: "/a-propos",
  image: "/images/chapiteaux/chapiteau-structure-longue.jpg",
});

const approach = [
  { title: "Écouter", text: "Comprendre la nature de votre événement, le lieu et vos contraintes." },
  { title: "Orienter", text: "Vous proposer les équipements et la formule — achat ou fabrication sur mesure — qui vous conviennent." },
  { title: "Réaliser", text: "Fabriquer ou préparer le matériel retenu pour votre projet." },
];

const commitments = [
  "Des informations claires sur nos équipements et nos prestations",
  "Une écoute attentive de vos besoins avant toute proposition",
  "Des devis établis selon votre besoin réel",
  "Une équipe joignable directement par téléphone et WhatsApp",
];

export default function AboutPage() {
  const { foundedYear } = siteConfig.company;
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title={
          <>
            NTK Production, <span className="text-steel-gradient">l&apos;événementiel prend forme.</span>
          </>
        }
        intro="Une entreprise de Yaoundé qui fabrique, vend et loue les équipements qui structurent vos événements."
        image="tente-pagode-interieur-drape"
        crumb={{ label: "À propos", path: "/a-propos" }}
      />

      {/* Présentation */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Présentation"
              title="Un acteur de l'équipement événementiel à Yaoundé."
              intro="NTK Production intervient dans le secteur de l'événementiel, depuis le Camp Tunisien à Yaoundé. Notre activité repose sur deux métiers complémentaires : la fabrication et la vente d'équipements — chapiteaux, tentes, bâches VIP, tables de cérémonie, podiums de spectacle et structures métalliques."
            />
            {foundedYear && (
              <Reveal className="mt-8 inline-flex items-baseline gap-3 rounded-2xl bg-steel-50 px-5 py-4">
                <span className="font-display text-3xl font-bold text-royal-600">{foundedYear}</span>
                <span className="text-sm text-muted-foreground">Année de création</span>
              </Reveal>
            )}
          </div>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl">
              <Photo image={getImage("chapiteau-evenement-tapis-rouge")} sizes="(min-width: 1024px) 45vw, 100vw" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Photo image={getImage("table-ronde-pietement-croise")} sizes="(min-width: 1024px) 22vw, 50vw" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <Photo image={getImage("tente-pagode-jaune")} sizes="(min-width: 1024px) 22vw, 50vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Domaines d'activité */}
      <section className="bg-steel-50 py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading eyebrow="Nos domaines d'activité" title="Ce que nous faisons." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {expertises.map((e, i) => (
              <Reveal as="li" key={e.id} delay={i * 0.06} className="overflow-hidden rounded-3xl border border-steel-200 bg-white">
                <div className="relative aspect-[4/3]">
                  <Photo image={getImage(e.image)} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy-900">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Savoir-faire */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white sm:py-28">
        <div aria-hidden className="bg-truss pointer-events-none absolute inset-0 text-white/[0.03]" />
        <div className="container-site relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[4/3] lg:aspect-[4/5]">
            <Photo image={getImage("tables-entrepot")} sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Notre savoir-faire"
              title="Fabriquer pour mieux vous servir."
              intro="Nous fabriquons notre matériel : chapiteaux, tentes confectionnées sur commande et selon différentes dimensions, bâches VIP, tables de cérémonie, podiums de spectacle et réalisations métalliques. Cette maîtrise de la fabrication nous permet de proposer des équipements adaptés à chaque projet, à la vente comme à la location."
            />
            <Reveal delay={0.15} className="mt-8">
              <ButtonLink href="/services" variant="light">
                Découvrir nos services <ArrowRight />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Approche + Engagements */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Notre approche" title="Une démarche simple, centrée sur votre besoin." />
            <ol className="mt-10 space-y-4">
              {approach.map((a, i) => (
                <Reveal as="li" key={a.title} delay={i * 0.08} className="flex gap-5 rounded-2xl border border-steel-200 p-5">
                  <span className="font-display text-3xl leading-none font-extrabold text-royal-600">0{i + 1}</span>
                  <span>
                    <span className="block font-semibold text-navy-900">{a.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{a.text}</span>
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading eyebrow="Nos engagements" title="Ce sur quoi vous pouvez compter." />
            <ul className="mt-10 space-y-3">
              {commitments.map((c, i) => (
                <Reveal as="li" key={c} delay={i * 0.06} className="flex items-start gap-3 rounded-2xl bg-steel-50 p-5">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-royal-600 text-white">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-navy-900">{c}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2} className="mt-8">
              <WhatsAppCta message={whatsappMessages.general}>Échanger avec notre équipe</WhatsAppCta>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="pb-20 sm:pb-28">
        <ContactCTA />
      </div>
    </>
  );
}
