import type { GalleryCategory } from "./gallery";

/**
 * Catalogue produits.
 * - Aucun prix n'est affiché tant qu'il n'a pas été communiqué (`price` reste absent).
 * - `prestations` : uniquement les modalités confirmées par le brief. Liste vide = « à confirmer ».
 * - Pour ajouter un produit : ajouter une entrée (les images référencent les `id` de data/gallery.ts).
 */

export type Prestation = "fabrication" | "vente";

export const prestationLabels: Record<Prestation, string> = {
  fabrication: "Fabrication",
  vente: "Vente",
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
  /** Page d'activité parente (slug de data/landings.ts) */
  landing: string;
  /** Texte détaillé de la fiche produit (paragraphes) */
  details: string[];
  /** Usages typiques */
  uses: string[];
  /** Champs prévus pour une évolution future */
  price?: string;
  technicalSheetUrl?: string;
};

const all: Prestation[] = ["fabrication", "vente"];

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
    landing: "chapiteaux-et-tentes",
    details: ["Le chapiteau à travées est la solution de référence pour abriter un grand nombre d'invités. Sa structure métallique supporte une bâche de toit et des parois latérales qui protègent du soleil comme de la pluie.", "Fabriqué par NTK Production à Yaoundé, il peut être adapté en longueur et en finitions selon votre usage : parois pleines, à fenêtres cintrées ou transparentes."],
    uses: ["Mariages et dots", "Obsèques et veillées", "Réceptions et galas", "Salons et événements d'entreprise"],
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
    landing: "chapiteaux-et-tentes",
    details: ["Ses parois transparentes laissent entrer la lumière naturelle et ouvrent la vue sur le jardin ou le site de l'événement, tout en protégeant les invités.", "La toiture en pointe et la structure à pans multiples lui donnent une silhouette élégante, appréciée pour les cocktails et les espaces VIP."],
    uses: ["Cocktails et réceptions", "Espaces VIP", "Lancements de produits", "Événements en journée"],
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
    landing: "chapiteaux-et-tentes",
    details: ["La tente pagode, reconnaissable à son toit pointu, se décline en parois pleines, à fenêtres cintrées ou transparentes, en blanc ou en couleur.", "Plusieurs tentes peuvent être juxtaposées pour former un ensemble plus vaste. NTK Production confectionne aussi des tentes sur commande, selon différentes dimensions."],
    uses: ["Espaces d'accueil", "Stands et salons", "Espaces d'honneur", "Réceptions de taille moyenne"],
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
    landing: "chapiteaux-et-tentes",
    details: ["Avec son double toit qui favorise la ventilation et ses rideaux, la tonnelle crée un coin d'ombre agréable dans un jardin, une cour ou une terrasse."],
    uses: ["Jardins et terrasses", "Petites réceptions", "Espaces de détente"],
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
    landing: "mobilier-evenementiel",
    details: ["La table ronde est le format classique des dîners de mariage et des banquets : chaque invité voit les autres, ce qui favorise la convivialité.", "Plateau en bois et piètement métallique pliant : elle se transporte, se monte et se range facilement."],
    uses: ["Dîners de mariage", "Banquets", "Salles des fêtes", "Traiteurs"],
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
    landing: "mobilier-evenementiel",
    details: ["Assemblées en modules, les tables serpentines dessinent des lignes courbes qui mettent en valeur une table d'honneur, un buffet ou un espace VIP.", "Plateau en bois et piètement métallique noir : un mobilier élégant, fabriqué par NTK Production."],
    uses: ["Tables d'honneur", "Buffets", "Espaces VIP", "Réceptions haut de gamme"],
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
    landing: "mobilier-evenementiel",
    details: ["Polyvalente, la table rectangulaire convient aux buffets, au service traiteur, aux tables d'honneur en ligne comme aux espaces de travail.", "Ses pieds métalliques pliants facilitent le transport et le stockage."],
    uses: ["Buffets et traiteurs", "Tables d'honneur en ligne", "Conférences et séminaires", "Ateliers"],
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
    landing: "mobilier-evenementiel",
    details: ["Les tables hautes sur trépied métallique accueillent les invités debout lors des cocktails et des réceptions, et facilitent les échanges."],
    uses: ["Cocktails", "Réceptions debout", "Salons et stands"],
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
    landing: "podiums-et-scenes",
    details: ["Le podium surélève artistes, orateurs et officiels pour qu'ils soient vus de tout le public. Couvert d'une toiture et encadré de tours en treillis métallique, il protège aussi le matériel de sonorisation.", "NTK Production fabrique podiums, estrades et structures de scène selon les dimensions de votre événement."],
    uses: ["Concerts et spectacles", "Meetings et cérémonies officielles", "Remises de diplômes", "Défilés"],
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
    landing: "construction-metallique",
    details: ["Charpentes, ossatures de hangars et éléments métalliques : NTK Production conçoit et fabrique en atelier des structures métalliques sur mesure.", "Chaque ouvrage est dimensionné selon son usage : hangar industriel, de stockage ou commercial, abri, auvent ou structure événementielle."],
    uses: ["Hangars industriels et de stockage", "Hangars commerciaux", "Abris et auvents", "Structures sur mesure"],
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
