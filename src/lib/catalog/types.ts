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
  /** Couleur illustrée par la photo (null = toutes couleurs) */
  colorId: string | null;
  /** Dimension illustrée par la photo (null = toutes dimensions) */
  dimensionId: string | null;
};

export type CatalogColor = { id: string; name: string; hex: string };
export type CatalogDimension = { id: string; label: string };

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
  colors: CatalogColor[];
  dimensions: CatalogDimension[];
  /** Le visiteur peut saisir ses propres dimensions */
  allowCustomDimensions: boolean;
  updatedAt: string;
};

export type Catalog = { version: 1; products: CatalogProduct[] };

export function isRangeId(v: unknown): v is RangeId {
  return typeof v === "string" && (rangeIds as readonly string[]).includes(v);
}
