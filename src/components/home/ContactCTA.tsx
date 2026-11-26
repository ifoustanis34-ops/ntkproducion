import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppCta } from "@/components/shared/whatsapp-cta";
import { TrussLine } from "@/components/shared/TrussLine";
import { getImage } from "@/data/gallery";
import { whatsappMessages } from "@/lib/whatsapp";

export function ContactCTA() {
  const img = getImage("chapiteau-parois-transparentes");
  return (
    <section aria-labelledby="cta-title" className="px-3 sm:px-6">
      <div className="relative isolate mx-auto max-w-[88rem] overflow-hidden rounded-[2rem] bg-navy-950 sm:rounded-[2.5rem]">
        <Photo image={img} sizes="100vw" className="-z-20 object-[50%_40%] opacity-60" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-navy-950/95 via-navy-900/80 to-royal-600/50" />
        <TrussLine animated={false} className="pointer-events-none absolute -top-2 left-1/2 -z-10 w-[120%] max-w-none -translate-x-1/2 text-white/10" />
        <div className="relative px-6 py-20 text-center text-white sm:px-12 sm:py-28">
          <Reveal>
            <h2 id="cta-title" className="mx-auto max-w-3xl text-3xl leading-tight font-extrabold sm:text-5xl lg:text-6xl">
              Un projet événementiel <span className="text-steel-gradient">en préparation ?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-base text-steel-200 sm:text-lg">
              Faites-nous part de vos besoins. Notre équipe pourra vous orienter vers les solutions adaptées à votre projet.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppCta message={whatsappMessages.project} size="lg">
              Parlons de votre projet
            </WhatsAppCta>
            <ButtonLink href="/contact#devis" variant="outlineLight" size="lg">
              Formulaire de devis <ArrowRight />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
