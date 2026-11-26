import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { legalNav, mainNav } from "@/data/navigation";
import { contact, verifiedPhones } from "@/config/contact";
import { whatsappUrlFor } from "@/lib/whatsapp";
import { FacebookIcon, WhatsAppIcon } from "@/components/ui/brand-icons";
import { CopyrightYear } from "./CopyrightYear";

const serviceLinks = [
  { label: "Chapiteaux et tentes", href: "/produits#chapiteaux" },
  { label: "Structures et hangars métalliques", href: "/produits#structures-metalliques" },
  { label: "Bâches et couvertures", href: "/produits#baches" },
  { label: "Tables et mobilier", href: "/produits#tables" },
  { label: "Podiums et scènes", href: "/produits#podiums" },
  { label: "Fabrication · Vente", href: "/services" },
];

export function Footer() {
  const wa = whatsappUrlFor("general");
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-steel-300">
      <div aria-hidden className="bg-truss pointer-events-none absolute inset-0 text-white/[0.025]" />
      <div aria-hidden className="bg-steel-line absolute inset-x-0 top-0 h-px opacity-40" />
      <div className="container-site relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.1fr_1.3fr] lg:py-20">
        <div>
          <Link href="/" aria-label="NTK Production — accueil" className="block w-40">
            <Image
              src="/images/logo/ntk-production-logo-fond-sombre.png"
              alt="NTK Production"
              width={1056}
              height={528}
              sizes="160px"
              className="h-auto w-full"
            />
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            Fabrication et vente d&apos;équipements événementiels à Yaoundé : chapiteaux, tentes, tables, podiums et
            structures métalliques.
          </p>
          <div className="mt-6 flex gap-3">
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-whatsapp"
              >
                <WhatsAppIcon className="size-5" />
              </a>
            )}
            {contact.facebook && (
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex size-11 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-[#1877f2]"
              >
                <FacebookIcon className="size-5" />
              </a>
            )}
          </div>
        </div>

        <FooterCol title="Navigation">
          {mainNav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-block py-1 transition-colors hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Services">
          {serviceLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-block py-1 transition-colors hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Coordonnées">
          {verifiedPhones.map((p) => (
            <li key={p.e164}>
              <a href={`tel:${p.e164}`} className="inline-flex min-h-8 items-center gap-2.5 transition-colors hover:text-white">
                <Phone className="size-4 text-azure-300" /> {p.display}
              </a>
            </li>
          ))}
          {wa && (
            <li>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-2.5 transition-colors hover:text-white">
                <WhatsAppIcon className="size-4 text-whatsapp" /> WhatsApp
              </a>
            </li>
          )}
          <li className="inline-flex items-start gap-2.5">
            <MapPin className="mt-0.5 size-4 shrink-0 text-azure-300" /> {contact.location.label}
          </li>
          {contact.emails.map((email) => (
            <li key={email}>
              <a href={`mailto:${email}`} className="inline-block break-all py-1 transition-colors hover:text-white">
                {email}
              </a>
            </li>
          ))}
        </FooterCol>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-steel-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CopyrightYear /> NTK Production. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block py-1 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-5 text-sm font-semibold tracking-[0.18em] text-white uppercase">{title}</h2>
      <ul className="space-y-1.5 text-sm">{children}</ul>
    </div>
  );
}
