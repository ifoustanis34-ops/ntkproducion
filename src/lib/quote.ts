import { whatsappUrl } from "./whatsapp";

/** Demande de devis — structure indépendante du canal de transmission. */
export type QuoteRequest = {
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  product: string;
  eventDate: string;
  eventLocation: string;
  message: string;
};

export const serviceTypes = ["Location", "Achat", "Fabrication sur mesure", "Je ne sais pas encore"] as const;

export const productOptions = [
  "Chapiteau",
  "Tente événementielle",
  "Bâche VIP",
  "Tables rondes pliables",
  "Table serpentine VIP",
  "Tables rectangulaires",
  "Podium",
  "Structure métallique",
  "Plusieurs équipements",
  "Autre",
] as const;

export type QuoteErrors = Partial<Record<keyof QuoteRequest, string>>;

export function validateQuote(q: QuoteRequest): QuoteErrors {
  const e: QuoteErrors = {};
  if (q.fullName.trim().length < 2) e.fullName = "Veuillez indiquer votre nom et prénom.";
  const digits = q.phone.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) e.phone = "Veuillez indiquer un numéro de téléphone valide.";
  if (q.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(q.email.trim())) e.email = "Adresse e-mail invalide.";
  if (!q.serviceType) e.serviceType = "Veuillez choisir un type de prestation.";
  if (q.message.trim().length < 10) e.message = "Décrivez votre besoin en quelques mots (10 caractères minimum).";
  return e;
}

function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return d && m && y ? `${d}/${m}/${y}` : iso;
}

export function formatQuoteMessage(q: QuoteRequest) {
  const details: [string, string][] = [
    ["Nom", q.fullName.trim()],
    ["Téléphone", q.phone.trim()],
    ["E-mail", q.email.trim()],
    ["Prestation", q.serviceType],
    ["Produit concerné", q.product],
    ["Date prévue", formatDate(q.eventDate)],
    ["Lieu de l'événement", q.eventLocation.trim()],
  ];
  return [
    "Bonjour NTK Production, je souhaite obtenir un devis.",
    "",
    ...details.filter(([, v]) => v).map(([k, v]) => `• ${k} : ${v}`),
    "",
    "Description du besoin :",
    q.message.trim(),
  ].join("\n");
}

/**
 * Canaux de transmission.
 * V1 : WhatsApp (ouverture de la conversation avec le message préparé ; l'envoi final
 * est effectué par le visiteur dans WhatsApp).
 * Évolution : ajouter ici un transport "email" ou "api" (ex. POST vers une Route Handler).
 */
export type QuoteTransport =
  | { kind: "whatsapp"; url: string }
  | { kind: "unavailable" };

export function prepareQuoteTransport(q: QuoteRequest): QuoteTransport {
  const url = whatsappUrl(formatQuoteMessage(q));
  return url ? { kind: "whatsapp", url } : { kind: "unavailable" };
}
