import type { GalleryCategory } from "./gallery";

/**
 * Catalogue produits.
 * - Aucun prix n'est affiché tant qu'il n'a pas été communiqué (`price` reste absent).
 * - `prestations` : uniquement les modalités confirmées par le brief. Liste vide = « à confirmer ».
 * - Pour ajouter un produit : ajouter une entrée (les images référencent les `id` de data/gallery.ts).
 */

export type Prestation = "fabrication" | "vente" | "location";

export const prestationLabels: Record<Prestation, string> = {
  fabrication: "Fabrication",
  vente: "Vente",
  location: "Location",
};

export type Product = {
  slug: string;
  name: string;
  /** Formulation utilisée dans le message WhatsApp : « …concernant votre {messageLabel}. » */
  messageLabel: string;
  category: GalleryCategory;
  description: string;
  mainImage: string;
  secondaryImages: string[];
  prestations: Prestation[];
  /** Mis en avant sur la page d'accueil */
  featured?: boolean;
  /** Champs prévus pour une évolution future */
  price?: string;
  technicalSheetUrl?: string;
};

const all: Prestation[] = ["fabrication", "vente", "location"];

export const products: Product[] = [
  {
    slug: "chapiteaux",
    name: "Chapiteaux",
    messageLabel: "chapiteau",
    category: "chapiteaux",
    description:
      "Grands chapiteaux blancs à travées, avec parois à fenêtres cintrées, pour vos réceptions, cérémonies et événements en extérieur.",
    mainImage: "chapiteau-structure-longue",
    secondaryImages: ["chapiteau-evenement-tapis-rouge"],
    prestations: all,
    featured: true,
  },
  {
    slug: "chapiteau-parois-transparentes",
    name: "Chapiteau à parois transparentes",
    messageLabel: "chapiteau à parois transparentes",
    category: "chapiteaux",
    description:
      "Structure à pans multiples avec toiture en pointe et parois transparentes, pour un espace lumineux ouvert sur l'extérieur.",
    mainImage: "chapiteau-parois-transparentes",
    secondaryImages: [],
    prestations: all,
  },
  {
    slug: "tentes-evenementielles",
    name: "Tentes événementielles",
    messageLabel: "tente événementielle",
    category: "chapiteaux",
    description:
      "Tentes pagode à toit pointu : parois pleines, à fenêtres cintrées ou transparentes, en blanc ou en couleur. Confection sur commande possible.",
    mainImage: "tente-pagode-fenetres-cintrees",
    secondaryImages: [
      "tente-pagode-interieur-drape",
      "tentes-pagode-parois-transparentes",
      "tente-pagode-jaune",
      "tente-pagode-banderole",
    ],
    prestations: all,
    featured: true,
  },
  {
    slug: "tonnelle-de-jardin",
    name: "Tonnelle de jardin",
    messageLabel: "tonnelle de jardin",
    category: "chapiteaux",
    description: "Tonnelle à double toit équipée de rideaux, pour vos espaces extérieurs.",
    mainImage: "tonnelle-de-jardin",
    secondaryImages: [],
    prestations: [],
  },
  {
    slug: "tables-rondes-pliables",
    name: "Tables rondes pliables",
    messageLabel: "table ronde pliable",
    category: "tables",
    description:
      "Tables rondes à plateau bois et piètement métallique pliant, faciles à transporter et à installer pour vos réceptions.",
    mainImage: "table-ronde-pliable",
    secondaryImages: [
      "table-ronde-pietement-croise",
      "table-ronde-pietement-pliant",
      "table-ronde-et-rectangulaire",
    ],
    prestations: all,
    featured: true,
  },
  {
    slug: "tables-serpentines-vip",
    name: "Tables serpentines VIP",
    messageLabel: "table serpentine VIP",
    category: "tables",
    description:
      "Tables serpentines à plateau bois et piètement métallique noir, assemblées en modules pour créer des lignes courbes élégantes.",
    mainImage: "table-serpentine-vip",
    secondaryImages: ["table-serpentine-modules"],
    prestations: all,
    featured: true,
  },
  {
    slug: "tables-rectangulaires-pliables",
    name: "Tables rectangulaires pliables",
    messageLabel: "table rectangulaire pliable",
    category: "tables",
    description: "Tables rectangulaires à plateau bois et pieds métalliques pliants.",
    mainImage: "table-rectangulaire-pliable",
    secondaryImages: ["tables-entrepot", "table-ronde-et-rectangulaire"],
    prestations: all,
  },
  {
    slug: "tables-hautes",
    name: "Tables hautes",
    messageLabel: "table haute",
    category: "tables",
    description: "Tables hautes rondes sur trépied métallique.",
    mainImage: "tables-mange-debout",
    secondaryImages: [],
    prestations: [],
  },
  {
    slug: "podiums",
    name: "Podiums de spectacle",
    messageLabel: "podium de spectacle",
    category: "podiums",
    description:
      "Podiums pour concerts, spectacles et cérémonies, ici couvert d'une toiture et encadré de tours en treillis métallique.",
    mainImage: "podium-scene-couverte",
    secondaryImages: [],
    prestations: all,
    featured: true,
  },
  {
    slug: "structures-metalliques",
    name: "Structures métalliques",
    messageLabel: "réalisation de structure métallique",
    category: "structures-metalliques",
    description:
      "Réalisations métalliques : charpentes et ossatures de hangars, éléments métalliques fabriqués en atelier.",
    mainImage: "charpente-metallique-hangar",
    secondaryImages: ["elements-metalliques-atelier", "hangar-metallique-ouvert"],
    prestations: ["fabrication"],
    featured: true,
  },
];

export const featuredProducts = products.filter((p) => p.featured);
