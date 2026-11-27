/**
 * Coordonnées de NTK Production — source unique de vérité.
 *
 * Règle : une valeur `null` n'est JAMAIS affichée publiquement.
 * Pour publier une information, renseignez-la ici ; elle apparaîtra automatiquement
 * partout où elle est prévue (header, footer, page contact, données structurées…).
 */

export type PhoneNumber = {
  /** Libellé affiché, ex. "+237 6 93 74 92 10" */
  display: string;
  /** Format E.164 sans espaces, ex. "+237693749210" */
  e164: string;
  /** Un numéro non vérifié n'est ni affiché, ni utilisé pour un lien tel: / WhatsApp. */
  verified: boolean;
};

export const contact = {
  companyName: "NTK Production",

  phones: [
    {
      display: "+237 6 93 74 92 10",
      e164: "+237693749210",
      verified: true,
    },
  ] satisfies PhoneNumber[],

  /** Numéro WhatsApp (E.164 sans "+"), utilisé pour tous les liens wa.me. */
  whatsapp: "237693749210" as string | null,

  location: {
    district: "Camp Tunisien",
    city: "Yaoundé",
    country: "Cameroun",
    countryCode: "CM",
    /** Libellé complet affiché */
    label: "Camp Tunisien, Yaoundé, Cameroun",
    /** URL d'intégration Google Maps (iframe "embed") — à renseigner une fois l'adresse exacte confirmée. */
    mapEmbedUrl: null as string | null,
  },

  /** Lien de la page Facebook — non communiqué dans le brief : à renseigner. */
  facebook: null as string | null,
  /** Adresses e-mail affichées (la première est l'adresse principale). Liste vide = rien d'affiché. */
  emails: ["noutchomwakevin@gmail.com", "Noutchodzevon@yahoo.fr"] as string[],
  instagram: null as string | null,
  tiktok: null as string | null,
  /** Zone d'intervention — à confirmer. */
  serviceArea: null as string | null,
} as const;

export const verifiedPhones = contact.phones.filter((p) => p.verified);
export const primaryPhone = verifiedPhones[0] ?? null;

/** Lien de recherche Google Maps à partir du libellé (aucune coordonnée GPS inventée). */
export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contact.location.label,
)}`;
