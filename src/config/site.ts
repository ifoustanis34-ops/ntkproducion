/**
 * Configuration générale du site.
 * NEXT_PUBLIC_SITE_URL doit être défini en production (ex. https://www.votre-domaine.cm)
 * pour des URL canoniques, un sitemap et des balises Open Graph corrects.
 */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export const siteConfig = {
  name: "NTK Production",
  url: rawUrl.replace(/\/+$/, ""),
  locale: "fr_CM",
  language: "fr",
  description:
    "NTK Production : fabrication, vente et location de chapiteaux, tentes événementielles, tables (rondes pliables, serpentines VIP), podiums et structures métalliques à Yaoundé, Cameroun.",
  ogImage: "/images/chapiteaux/chapiteau-evenement-tapis-rouge.jpg",
  logo: "/images/logo/ntk-production-logo.png",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  /**
   * Informations institutionnelles — laissées à null tant qu'elles ne sont pas confirmées.
   * Elles ne sont affichées que lorsqu'elles sont renseignées.
   */
  company: {
    foundedYear: 2016 as number | null,
    legalForm: null as string | null,
    registrationNumber: null as string | null, // RCCM
    taxId: null as string | null, // NIU
    publicationDirector: null as string | null,
    host: null as { name: string; address: string } | null,
  },
};

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
