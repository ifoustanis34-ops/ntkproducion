import type { GalleryCategory } from "./gallery";

/**
 * Gammes de produits NTK Production (page Produits), dans l'ordre d'affichage.
 * - `id` sert d'ancre (/produits#<id>) : ne pas le modifier sans mettre à jour les liens.
 * - `productCategory` : fiches produits (data/products.ts) affichées sous la gamme.
 * - `image` : illustration utilisée quand la gamme n'a pas encore de fiche produit.
 */
export type ProductRange = {
  id: string;
  title: string;
  shortTitle: string;
  intro: string;
  items: string[];
  /** Formulation du message WhatsApp : « …devis concernant vos {quoteLabel}. » */
  quoteLabel: string;
  productCategory?: GalleryCategory;
  image?: string;
  /** Pages d'activité détaillées (slugs de data/landings.ts) */
  landings: string[];
};

export const productRanges: ProductRange[] = [
  {
    id: "chapiteaux",
    title: "Chapiteaux et tentes événementielles",
    shortTitle: "Chapiteaux & tentes",
    intro:
      "Des abris pour toutes vos cérémonies et réceptions : chapiteaux de cérémonie et VIP, tentes de réception, tentes pliantes et tentes confectionnées sur mesure.",
    items: [
      "Chapiteaux de cérémonie",
      "Chapiteaux VIP",
      "Tentes événementielles",
      "Tentes de réception",
      "Tentes pliantes",
      "Tentes sur mesure",
    ],
    landings: ["chapiteaux-et-tentes"],
    quoteLabel: "chapiteaux et tentes événementielles",
    productCategory: "chapiteaux",
  },
  {
    id: "structures-metalliques",
    title: "Structures et hangars métalliques",
    shortTitle: "Structures & hangars",
    intro:
      "Nous fabriquons des hangars et des structures métalliques sur mesure, pour l'industrie, le stockage ou le commerce : charpentes, abris et ossatures.",
    items: [
      "Fabrication de hangars métalliques",
      "Hangars industriels",
      "Hangars de stockage",
      "Hangars commerciaux",
      "Structures métalliques sur mesure",
      "Charpentes métalliques",
      "Abris métalliques",
      "Ossatures métalliques",
    ],
    landings: ["construction-metallique", "hangars-metalliques"],
    quoteLabel: "hangars et structures métalliques",
    productCategory: "structures-metalliques",
  },
  {
    id: "baches",
    title: "Bâches et couvertures",
    shortTitle: "Bâches & couvertures",
    intro:
      "Bâches VIP et de cérémonie, bâches de protection, bâches pour chapiteaux et bâches personnalisées selon vos dimensions et votre usage.",
    items: [
      "Bâches VIP",
      "Bâches de cérémonie",
      "Bâches de protection",
      "Bâches pour chapiteaux",
      "Bâches personnalisées",
    ],
    landings: ["baches-vip"],
    quoteLabel: "bâches et couvertures",
    image: "chapiteau-evenement-tapis-rouge",
  },
  {
    id: "tables",
    title: "Tables et mobilier événementiel",
    shortTitle: "Tables & mobilier",
    intro:
      "Tables rondes, rectangulaires, de cérémonie ou de traiteur, et mobilier de réception pour accueillir vos invités dans les meilleures conditions.",
    items: ["Tables rondes", "Tables rectangulaires", "Tables de cérémonie", "Tables de traiteur", "Mobilier de réception"],
    landings: ["mobilier-evenementiel"],
    quoteLabel: "tables et mobilier événementiel",
    productCategory: "tables",
  },
  {
    id: "podiums",
    title: "Podiums et structures de spectacle",
    shortTitle: "Podiums & scènes",
    intro: "Podiums, estrades, plateformes et structures de scène pour vos concerts, spectacles, cérémonies et animations.",
    items: ["Podiums de spectacle", "Estrades", "Plateformes événementielles", "Structures de scène"],
    landings: ["podiums-et-scenes"],
    quoteLabel: "podiums et structures de spectacle",
    productCategory: "podiums",
  },
];
