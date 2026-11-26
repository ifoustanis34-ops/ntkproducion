import { contact } from "@/config/contact";

/** Messages contextuels préremplis. */
export const whatsappMessages = {
  general:
    "Bonjour NTK Production, je souhaite obtenir des informations concernant vos équipements événementiels.",
  quote: "Bonjour NTK Production, je souhaite obtenir un devis pour mon projet événementiel.",
  project:
    "Bonjour NTK Production, j'ai un projet événementiel en préparation et je souhaite vous faire part de mes besoins.",
  chapiteaux:
    "Bonjour NTK Production, je souhaite obtenir des renseignements concernant vos chapiteaux et les possibilités de location ou de fabrication.",
  tables: "Bonjour, je souhaite obtenir des informations concernant vos tables événementielles.",
  podiums: "Bonjour, je souhaite obtenir un devis pour vos podiums événementiels.",
  "structures-metalliques":
    "Bonjour, je souhaite obtenir des renseignements concernant vos réalisations métalliques.",
  fabrication:
    "Bonjour NTK Production, je souhaite obtenir un devis pour une fabrication sur mesure.",
  vente: "Bonjour NTK Production, je souhaite obtenir des informations sur l'achat de vos équipements événementiels.",
  location:
    "Bonjour NTK Production, je souhaite obtenir des informations sur la location de vos équipements événementiels.",
} as const;

export type WhatsAppContext = keyof typeof whatsappMessages;

/** Un numéro valide pour wa.me : uniquement des chiffres, indicatif inclus (Cameroun : 237 + 9 chiffres). */
function isCompleteNumber(n: string | null): n is string {
  if (!n || !/^\d+$/.test(n)) return false;
  if (n.startsWith("237")) return n.length === 12;
  return n.length >= 10 && n.length <= 15;
}

export const whatsappAvailable = isCompleteNumber(contact.whatsapp);

/** Construit un lien WhatsApp. Renvoie null si le numéro est absent ou incomplet. */
export function whatsappUrl(message: string = whatsappMessages.general): string | null {
  if (!isCompleteNumber(contact.whatsapp)) return null;
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function whatsappUrlFor(context: WhatsAppContext) {
  return whatsappUrl(whatsappMessages[context]);
}

/** Message de demande de devis pour un produit précis. */
export function productQuoteMessage(productLabel: string) {
  return `Bonjour NTK Production, je souhaite obtenir des informations et un devis concernant votre ${productLabel}.`;
}
