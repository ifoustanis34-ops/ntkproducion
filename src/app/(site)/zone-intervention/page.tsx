import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Reveal } from "@/components/ui/reveal";
import { contact } from "@/config/contact";
import { landings } from "@/data/landings";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Zone d'intervention : Yaoundé et Cameroun",
  description:
    "Basée au Camp Tunisien à Yaoundé, NTK Production étudie aussi vos projets à Douala, Bafoussam, Kribi, Garoua, Bamenda, Buea, Dschang et ailleurs au Cameroun.",
  path: "/zone-intervention",
  image: "/images/structures-metalliques/hangar-metallique-ouvert.jpg",
});

/**
 * Villes pour lesquelles les demandes sont étudiées. Aucune agence ni adresse n'existe dans ces villes :
 * le texte le dit explicitement (pas de fausse implantation).
 */
const cities = ["Douala", "Bafoussam", "Dschang", "Garoua", "Bamenda", "Buea", "Kribi"];

const steps = [
  { title: "Votre demande", text: "Décrivez votre projet, la ville et le lieu d'installation, la date souhaitée." },
  { title: "Étude et devis", text: "Nous étudions la faisabilité et précisons dans le devis les conditions de fabrication et d'acheminement." },
  { title: "Fabrication", text: "Le matériel ou la structure est fabriqué dans notre atelier à Yaoundé." },
  { title: "Remise du matériel", text: "Les modalités de livraison ou de retrait sont convenues avec vous à l'avance." },
];

export default function ZoneInterventionPage() {
  return (
    <>
      <PageHero
        eyebrow="Zone d'intervention"
        title="Basés à Yaoundé, à l'écoute de vos projets partout au Cameroun"
        intro={`NTK Production fabrique son matériel événementiel et ses structures métalliques depuis le ${contact.location.label}. Nous étudions également les demandes venant des autres villes du pays.`}
        image="hangar-metallique-ouvert"
        crumb={{ label: "Zone d'intervention", path: "/zone-intervention" }}
      />

      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">Yaoundé et ses environs</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Notre atelier se trouve au Camp Tunisien, à Yaoundé. C&apos;est là que nous fabriquons chapiteaux, tentes, bâches VIP,
              tables, podiums et structures métalliques. Les clients de Yaoundé et des environs peuvent nous rencontrer facilement pour
              discuter de leur projet et voir le matériel.
            </p>
            <h2 className="mt-12 text-2xl font-bold text-navy-900 sm:text-3xl">Projets dans les autres villes du Cameroun</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Nous n&apos;avons pas d&apos;agence en dehors de Yaoundé, mais nous étudions les projets venant de tout le pays. Les
              conditions (fabrication, acheminement, délais) sont étudiées au cas par cas et précisées dans le devis.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Villes pour lesquelles nous étudions les demandes">
              {cities.map((c) => (
                <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-steel-100 px-4 py-2 text-sm font-medium text-navy-900">
                  <MapPin className="size-3.5 text-royal-600" /> {c}
                </li>
              ))}
            </ul>
            <WhatsAppCta
              message="Bonjour NTK Production, j'ai un projet en dehors de Yaoundé et je souhaite savoir s'il est réalisable."
              className="mt-8"
            >
              Présenter mon projet
            </WhatsAppCta>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">Comment se déroule un projet hors de Yaoundé ?</h2>
            <ol className="mt-6 space-y-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-2xl border border-steel-200 p-5">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-royal-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy-900">{s.title}</h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="bg-steel-50 py-16 sm:py-20" aria-labelledby="activites-title">
        <div className="container-site">
          <h2 id="activites-title" className="text-2xl font-bold text-navy-900 sm:text-3xl">
            Nos activités
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {landings.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/${l.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-steel-200 bg-white p-5 transition-colors hover:border-royal-600/40"
                >
                  <span className="font-semibold text-navy-900">{l.label}</span>
                  <span className="mt-1 text-sm text-muted-foreground">{l.eyebrow}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <ContactCTA />
      </section>
    </>
  );
}
