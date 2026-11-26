import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";
import { contact, verifiedPhones } from "@/config/contact";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  /** Titre complet sans le suffixe « | NTK Production » */
  absoluteTitle?: boolean;
};

/** Métadonnées d'une page : titre unique, description, canonique, Open Graph, Twitter. */
export function pageMetadata({ title, description, path, image = siteConfig.ogImage, absoluteTitle }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images: [{ url: image, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

/** Données structurées Schema.org — uniquement des informations confirmées. */
export function localBusinessJsonLd() {
  const sameAs = [contact.facebook, contact.instagram, contact.tiktok].filter(Boolean) as string[];
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#entreprise`,
    name: contact.companyName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl(siteConfig.ogImage),
    ...(verifiedPhones[0] ? { telephone: verifiedPhones[0].e164 } : {}),
    ...(contact.emails[0] ? { email: contact.emails[0] } : {}),
    ...(siteConfig.company.foundedYear ? { foundingDate: String(siteConfig.company.foundedYear) } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.location.district,
      addressLocality: contact.location.city,
      addressCountry: contact.location.countryCode,
    },
    ...(sameAs.length ? { sameAs } : {}),
    makesOffer: [
      "Fabrication de chapiteaux",
      "Vente de chapiteaux",
      "Vente de tentes événementielles",
      "Fabrication de tables événementielles",
      "Tables serpentines VIP",
      "Fabrication de podiums",
      "Structures métalliques",
    ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Contenu statique issu de la configuration (aucune donnée utilisateur)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
