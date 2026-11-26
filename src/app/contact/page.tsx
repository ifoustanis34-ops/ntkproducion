import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/ui/reveal";
import { FacebookIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { TrussLine } from "@/components/shared/TrussLine";
import { contact, mapsSearchUrl, verifiedPhones } from "@/config/contact";
import { whatsappMessages, whatsappUrlFor } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact et devis gratuit à Yaoundé",
  description:
    "Contactez NTK Production au Camp Tunisien, Yaoundé : téléphone, WhatsApp, e-mail et devis gratuit pour chapiteaux, tentes, bâches, tables, podiums et hangars.",
  path: "/contact",
});

export default function ContactPage() {
  const wa = whatsappUrlFor("general");
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Parlons de <span className="text-steel-gradient">votre projet.</span>
          </>
        }
        intro="Une question, un besoin de matériel ou une demande de devis : notre équipe vous répond par téléphone, sur WhatsApp et par e-mail."
        image="chapiteau-evenement-tapis-rouge"
        crumb={{ label: "Contact", path: "/contact" }}
      />

      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="space-y-4">
            <Reveal>
              <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">Nos coordonnées</h2>
              <p className="mt-2 text-muted-foreground">{contact.companyName}</p>
            </Reveal>

            {verifiedPhones.map((p, i) => (
              <Reveal key={p.e164} delay={0.05 + i * 0.05}>
                <a href={`tel:${p.e164}`} className="group flex items-center gap-4 rounded-2xl border border-steel-200 p-5 transition-colors hover:border-royal-600/40">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-royal-600 text-white">
                    <Phone className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                      Téléphone{verifiedPhones.length > 1 ? ` ${i + 1}` : ""}
                    </span>
                    <span className="block text-lg font-semibold text-navy-900">{p.display}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-steel-400 group-hover:text-royal-600" />
                </a>
              </Reveal>
            ))}

            {wa && (
              <Reveal delay={0.15}>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-steel-200 p-5 transition-colors hover:border-whatsapp/50">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-whatsapp text-white">
                    <WhatsAppIcon className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">WhatsApp</span>
                    <span className="block text-lg font-semibold text-navy-900">Discuter avec nous</span>
                  </span>
                  <ArrowUpRight className="size-4 text-steel-400 group-hover:text-whatsapp" />
                </a>
              </Reveal>
            )}

            {contact.emails.map((email, i) => (
              <Reveal key={email} delay={0.18 + i * 0.03}>
                <a href={`mailto:${email}`} className="group flex items-center gap-4 rounded-2xl border border-steel-200 p-5 transition-colors hover:border-royal-600/40">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-royal-600 text-white">
                    <Mail className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                      E-mail{contact.emails.length > 1 ? ` ${i + 1}` : ""}
                    </span>
                    <span className="block break-all text-lg font-semibold text-navy-900">{email}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-steel-400 group-hover:text-royal-600" />
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="flex items-center gap-4 rounded-2xl border border-steel-200 p-5">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-navy-800 text-white">
                  <MapPin className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Localisation</span>
                  <span className="block text-lg font-semibold text-navy-900">{contact.location.label}</span>
                </span>
              </div>
            </Reveal>

            {contact.facebook && (
              <Reveal delay={0.25}>
                <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-steel-200 p-5 transition-colors hover:border-[#1877f2]/50">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-[#1877f2] text-white">
                    <FacebookIcon className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">Facebook</span>
                    <span className="block text-lg font-semibold text-navy-900">Suivre NTK Production</span>
                  </span>
                  <ArrowUpRight className="size-4 text-steel-400" />
                </a>
              </Reveal>
            )}

            <Reveal delay={0.3} className="pt-2">
              <WhatsAppCta message={whatsappMessages.quote} className="w-full">
                Demander un devis sur WhatsApp
              </WhatsAppCta>
            </Reveal>
          </div>

          <Reveal delay={0.1} id="devis" className="scroll-mt-28 rounded-[2rem] border border-steel-200 bg-steel-50 p-5 sm:p-8 lg:p-10">
            <h2 className="text-2xl font-bold text-navy-900 sm:text-3xl">Demande de devis</h2>
            <p className="mt-2 mb-8 text-muted-foreground">
              Remplissez ce formulaire : votre demande sera mise en forme et transmise via WhatsApp.
            </p>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Emplacement prévu pour la carte Google Maps */}
      <section aria-labelledby="carte-title" className="pb-20 sm:pb-28">
        <div className="container-site">
          {contact.location.mapEmbedUrl ? (
            <div className="overflow-hidden rounded-[2rem] border border-steel-200">
              <iframe
                title={`Carte : ${contact.location.label}`}
                src={contact.location.mapEmbedUrl}
                className="h-[420px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-[2rem] bg-navy-950 px-6 py-16 text-center text-white sm:py-20">
              <TrussLine animated={false} className="pointer-events-none absolute inset-x-0 top-0 mx-auto w-[110%] max-w-none text-white/10" />
              <MapPin className="relative mx-auto size-10 text-azure-300" />
              <h2 id="carte-title" className="relative mt-4 text-2xl font-bold sm:text-3xl">
                {contact.location.label}
              </h2>
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 font-semibold text-navy-900 transition-colors hover:bg-steel-100"
              >
                Rechercher sur Google Maps <ArrowUpRight className="size-4" />
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
