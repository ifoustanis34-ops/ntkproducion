import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { FacebookIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { contact, mapsSearchUrl, primaryPhone } from "@/config/contact";
import { whatsappUrlFor } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type Item = { label: string; value: string; href: string; icon: React.ReactNode; accent: string; external?: boolean };

export function QuickContact() {
  const wa = whatsappUrlFor("general");
  const items: Item[] = [];
  if (primaryPhone)
    items.push({ label: "Téléphone", value: primaryPhone.display, href: `tel:${primaryPhone.e164}`, icon: <Phone className="size-5" />, accent: "bg-royal-600" });
  if (wa) items.push({ label: "WhatsApp", value: "Discuter maintenant", href: wa, icon: <WhatsAppIcon className="size-5" />, accent: "bg-whatsapp", external: true });
  items.push({ label: "Localisation", value: contact.location.label, href: mapsSearchUrl, icon: <MapPin className="size-5" />, accent: "bg-navy-800", external: true });
  if (contact.facebook)
    items.push({ label: "Facebook", value: "Suivre NTK Production", href: contact.facebook, icon: <FacebookIcon className="size-5" />, accent: "bg-[#1877f2]", external: true });

  return (
    <section aria-labelledby="contact-rapide-title" className="py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          align="center"
          eyebrow="Contact rapide"
          title={<span id="contact-rapide-title">Une question ? Nous sommes joignables directement.</span>}
        />
        <ul className={cn("mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2", items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
          {items.map((it, i) => (
            <Reveal as="li" key={it.label} delay={i * 0.06}>
              <a
                href={it.href}
                {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex h-full items-center gap-4 rounded-2xl border border-steel-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-steel-300 hover:shadow-lg hover:shadow-navy-950/5"
              >
                <span className={cn("inline-flex size-12 shrink-0 items-center justify-center rounded-xl text-white", it.accent)}>{it.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">{it.label}</span>
                  <span className="mt-0.5 block font-semibold text-navy-900">{it.value}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-steel-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-royal-600" />
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
