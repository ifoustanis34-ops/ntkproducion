/** Modèle du catalogue géré depuis le portail /admin. */

export const rangeIds = ["chapiteaux", "structures-metalliques", "baches", "tables", "podiums"] as const;
export type RangeId = (typeof rangeIds)[number];

export const rangeLabels: Record<RangeId, string> = {
  chapiteaux: "Chapiteaux & tentes",
  "structures-metalliques": "Structures & hangars",
  baches: "Bâches & couvertures",
  tables: "Tables & mobilier",
  podiums: "Podiums & scènes",
};

/** Page d'activité (data/landings.ts) associée à chaque gamme. */
export const rangeLanding: Record<RangeId, string> = {
  chapiteaux: "chapiteaux-et-tentes",
  "structures-metalliques": "construction-metallique",
  baches: "baches-vip",
  tables: "mobilier-evenementiel",
  podiums: "podiums-et-scenes",
};

export type Prestation = "fabrication" | "vente";
export const prestationLabels: Record<Prestation, string> = { fabrication: "Fabrication", vente: "Vente" };

/** Image affichable (photo du catalogue ou image statique). */
export type MediaImage = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  blurDataURL?: string;
  /** object-position CSS facultatif */
  focus?: string;
};

export type CatalogPhoto = MediaImage & {
  /** Valeurs d'options illustrées par la photo (vide = photo générale, affichée pour tous les choix) */
  valueIds: string[];
};

/** Une valeur proposée dans une option : « Blanc », « Acier noir », « Ø 150 cm »… */
export type OptionValue = {
  id: string;
  label: string;
  /** Teinte affichée (options de type « couleur ») */
  hex?: string;
  /** Précision affichée sous la valeur, ex. « 10 places » */
  note?: string;
};

/** Saisie libre proposée en plus des valeurs : aucune, texte, ou longueur × largeur (× hauteur). */
export type OptionCustom = "aucune" | "texte" | "dimensions";

/** Une option à choisir : « Couleur de la bâche », « Structure », « Diamètre »… */
export type OptionGroup = {
  id: string;
  name: string;
  kind: "couleur" | "liste";
  /** Le client doit faire un choix avant d'envoyer sa demande */
  required: boolean;
  custom: OptionCustom;
  values: OptionValue[];
};

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  range: RangeId;
  /** Formulation dans le message WhatsApp : « …concernant votre {messageLabel} » */
  messageLabel: string;
  description: string;
  details: string[];
  uses: string[];
  prestations: Prestation[];
  featured: boolean;
  published: boolean;
  /** Ordre d'affichage dans la gamme (croissant) */
  order: number;
  photos: CatalogPhoto[];
  /** Options propres à ce produit (en plus de celles de sa gamme) */
  options: OptionGroup[];
  /** Options de la gamme désactivées pour ce produit (ids) */
  disabledRangeOptions: string[];
  updatedAt: string;
};

export type Catalog = {
  version: 2;
  products: CatalogProduct[];
  /** Options communes à tous les produits d'une gamme */
  rangeOptions: Record<RangeId, OptionGroup[]>;
};

export function isRangeId(v: unknown): v is RangeId {
  return typeof v === "string" && (rangeIds as readonly string[]).includes(v);
}
