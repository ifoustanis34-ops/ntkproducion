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

/** Identifiants Schema.org partagés entre les pages (relient les entités entre elles). */
export const schemaIds = {
  business: () => `${siteConfig.url}/#entreprise`,
  website: () => `${siteConfig.url}/#site`,
};

const offerCatalog = [
  "Fabrication et vente de chapiteaux",
  "Fabrication et vente de tentes événementielles",
  "Fabrication de tentes sur mesure",
  "Fabrication et vente de bâches VIP",
  "Fabrication et vente de tables de cérémonie",
  "Fabrication de podiums de spectacle",
  "Fabrication de hangars métalliques",
  "Charpentes et structures métalliques sur mesure",
];

/** Données structurées Schema.org globales — uniquement des informations confirmées. */
export function localBusinessJsonLd() {
  const sameAs = [contact.facebook, contact.instagram, contact.tiktok].filter(Boolean) as string[];
  const { foundedYear } = siteConfig.company;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": schemaIds.business(),
        name: contact.companyName,
        alternateName: ["NTK PRODUCTION", "NTK Production Yaoundé"],
        description: siteConfig.description,
        url: siteConfig.url,
        logo: absoluteUrl(siteConfig.logo),
        image: absoluteUrl(siteConfig.ogImage),
        ...(verifiedPhones[0] ? { telephone: verifiedPhones[0].e164 } : {}),
        ...(contact.emails[0] ? { email: contact.emails[0] } : {}),
        ...(foundedYear ? { foundingDate: String(foundedYear) } : {}),
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.location.district,
          addressLocality: contact.location.city,
          addressCountry: contact.location.countryCode,
        },
        areaServed: [
          { "@type": "City", name: contact.location.city },
          { "@type": "Country", name: contact.location.country },
        ],
        knowsAbout: [
          "Chapiteaux",
          "Tentes événementielles",
          "Bâches VIP",
          "Mobilier événementiel",
          "Podiums de spectacle",
          "Construction métallique",
          "Hangars métalliques",
          "Charpentes métalliques",
        ],
        ...(sameAs.length ? { sameAs } : {}),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Fabrication et vente de matériel événementiel et de structures métalliques",
          itemListElement: offerCatalog.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
      },
      {
        "@type": "WebSite",
        "@id": schemaIds.website(),
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "fr",
        publisher: { "@id": schemaIds.business() },
      },
    ],
  };
}

/** Fil d'Ariane (Accueil inclus automatiquement). */
export function breadcrumbJsonLd(trail: { label: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ label: "Accueil", path: "/" }, ...trail].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absoluteUrl(c.path),
    })),
  };
}

export function serviceJsonLd({ name, description, path, image }: { name: string; description: string; path: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(image),
    provider: { "@id": schemaIds.business() },
    areaServed: [
      { "@type": "City", name: contact.location.city },
      { "@type": "Country", name: contact.location.country },
    ],
  };
}

export function productJsonLd({ name, description, path, images, category }: { name: string; description: string; path: string; images: string[]; category: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: absoluteUrl(path),
    image: images.map((src) => absoluteUrl(src)),
    category,
    brand: { "@type": "Brand", name: siteConfig.name },
    manufacturer: { "@id": schemaIds.business() },
  };
}

export function articleJsonLd({ title, description, path, image, date }: { title: string; description: string; path: string; image: string; date: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl(image),
    datePublished: date,
    dateModified: date,
    inLanguage: "fr",
    author: { "@id": schemaIds.business() },
    publisher: { "@id": schemaIds.business() },
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
