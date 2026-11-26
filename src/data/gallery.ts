import { imageMeta } from "./image-meta";

/**
 * Photothèque de NTK Production.
 *
 * Les descriptions se limitent à ce qui est visible sur les photographies :
 * aucune dimension, capacité ou caractéristique technique n'est supposée.
 * Pour ajouter une photo : la déposer dans public/images/<catégorie>/,
 * lancer `python3 scripts/generate-image-meta.py`, puis ajouter une entrée ci-dessous.
 */

export type GalleryCategory = "chapiteaux" | "tables" | "podiums" | "structures-metalliques";
/** Sous-type utilisé pour distinguer chapiteaux et tentes dans le portfolio. */
export type GalleryKind = "chapiteau" | "tente" | "table" | "podium" | "structure";

export type GalleryImage = {
  id: string;
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  title: string;
  category: GalleryCategory;
  kind: GalleryKind;
  description: string;
  alt: string;
  /** false = image utilisée ailleurs (services…) mais pas dans la galerie des réalisations */
  inGallery: boolean;
  /** Photo de faible résolution : affichée dans des emplacements de petite taille uniquement. */
  lowRes?: boolean;
  /**
   * Cadrage (CSS object-position) dans les vignettes recadrées.
   * Utilisé pour les visuels comportant un bandeau texte incrusté : la photo d'origine
   * n'est pas modifiée et reste visible en entier dans la visionneuse.
   */
  focus?: string;
};

type Entry = Omit<GalleryImage, "width" | "height" | "blurDataURL" | "inGallery"> & {
  inGallery?: boolean;
};

const entries: Entry[] = [
  // ——— Chapiteaux ———
  {
    id: "chapiteau-structure-longue",
    src: "/images/chapiteaux/chapiteau-structure-longue.jpg",
    title: "Chapiteau à travées",
    category: "chapiteaux",
    kind: "chapiteau",
    description:
      "Grand chapiteau blanc composé de plusieurs travées, aux parois munies de fenêtres cintrées, monté sur pelouse.",
    alt: "Grand chapiteau blanc à travées avec fenêtres cintrées monté sur une pelouse",
  },
  {
    id: "chapiteau-evenement-tapis-rouge",
    src: "/images/chapiteaux/chapiteau-evenement-tapis-rouge.jpg",
    title: "Chapiteau installé pour un événement",
    category: "chapiteaux",
    kind: "chapiteau",
    description:
      "Chapiteau blanc à fenêtres cintrées, ouvert en façade avec rideaux noués et tapis rouge, installé sur une esplanade.",
    alt: "Chapiteau blanc ouvert en façade avec tapis rouge installé sur une esplanade",
  },
  {
    id: "chapiteau-parois-transparentes",
    src: "/images/chapiteaux/chapiteau-octogonal-parois-transparentes.jpg",
    title: "Chapiteau à parois transparentes",
    category: "chapiteaux",
    kind: "chapiteau",
    description:
      "Structure à pans multiples avec toiture blanche en pointe, parois transparentes, rideaux blancs et sol recouvert d'un tapis rouge.",
    alt: "Chapiteau à pans multiples avec parois transparentes, rideaux blancs et tapis rouge",
  },
  // ——— Tentes ———
  {
    id: "tente-pagode-interieur-drape",
    src: "/images/chapiteaux/tente-pagode-interieur-drape.jpg",
    title: "Tente pagode avec drapé intérieur",
    category: "chapiteaux",
    kind: "tente",
    description:
      "Tente à toit pointu dont l'intérieur est habillé de voilages crème, avec parois latérales à fenêtres cintrées.",
    alt: "Tente pagode blanche à l'intérieur habillé de voilages crème",
  },
  {
    id: "tente-pagode-fenetres-cintrees",
    src: "/images/chapiteaux/tente-pagode-fenetres-cintrees.jpg",
    title: "Tente pagode à fenêtres cintrées",
    category: "chapiteaux",
    kind: "tente",
    description:
      "Tente blanche à toit pointu, parois à fenêtres cintrées et un côté transparent, installée sur pelouse.",
    alt: "Tente pagode blanche avec fenêtres cintrées installée sur une pelouse",
  },
  {
    id: "tentes-pagode-parois-transparentes",
    src: "/images/chapiteaux/tentes-pagode-parois-transparentes.jpg",
    title: "Tentes pagode à parois transparentes",
    category: "chapiteaux",
    kind: "tente",
    description: "Tentes blanches à toit pointu dont les parois latérales sont transparentes.",
    alt: "Tentes pagode blanches à parois transparentes",
  },
  {
    id: "tente-pagode-jaune",
    src: "/images/chapiteaux/tente-pagode-jaune.jpg",
    title: "Tente pagode jaune",
    category: "chapiteaux",
    kind: "tente",
    description: "Tente pagode de couleur jaune à fenêtres cintrées, installée devant un bâtiment.",
    alt: "Tente pagode jaune à fenêtres cintrées installée devant un bâtiment",
  },
  {
    id: "tente-pagode-banderole",
    src: "/images/chapiteaux/tente-pagode-fenetres-banderole.jpg",
    title: "Tente pagode avec banderole",
    category: "chapiteaux",
    kind: "tente",
    description:
      "Tente blanche à toit pointu avec fenêtres à croisillons, portant la banderole d'une fondation.",
    alt: "Tente pagode blanche avec fenêtres et banderole installée près d'un bâtiment",
  },
  {
    id: "tonnelle-de-jardin",
    focus: "50% 45%",
    src: "/images/chapiteaux/tonnelle-de-jardin.jpg",
    title: "Tonnelle de jardin",
    category: "chapiteaux",
    kind: "tente",
    description: "Visuel de présentation d'une tonnelle de jardin à double toit, équipée de rideaux.",
    alt: "Tonnelle de jardin grise à double toit avec rideaux, devant une maison",
  },
  // ——— Tables ———
  {
    id: "table-serpentine-vip",
    focus: "50% 100%",
    src: "/images/tables/table-serpentine-vip-reception.jpg",
    title: "Table serpentine VIP",
    category: "tables",
    kind: "table",
    description:
      "Table serpentine à plateau bois et piètement métallique noir, dressée avec compositions florales et bougies dans une salle de réception.",
    alt: "Table serpentine VIP en bois décorée de fleurs blanches et de bougies dans une salle de réception",
  },
  {
    id: "table-serpentine-modules",
    src: "/images/tables/table-serpentine-modules.jpg",
    title: "Table serpentine en modules",
    category: "tables",
    kind: "table",
    description: "Modules de table serpentine à plateau bois, assemblés pour former une courbe.",
    alt: "Modules de table serpentine en bois assemblés en courbe",
  },
  {
    id: "table-ronde-pliable",
    focus: "50% 100%",
    src: "/images/tables/table-ronde-pliable.jpg",
    title: "Table ronde pliable",
    category: "tables",
    kind: "table",
    description: "Table ronde à plateau bois et piètement métallique pliant.",
    alt: "Table ronde pliable à plateau en bois et piètement métallique",
  },
  {
    id: "table-ronde-pietement-croise",
    src: "/images/tables/table-ronde-pietement-croise.jpg",
    title: "Table ronde à piètement croisé",
    category: "tables",
    kind: "table",
    description: "Table ronde inclinée laissant voir son piètement métallique croisé, repliable.",
    alt: "Table ronde en bois inclinée montrant son piètement métallique croisé",
  },
  {
    id: "table-ronde-pietement-pliant",
    src: "/images/tables/table-ronde-pietement-pliant-entrepot.jpg",
    title: "Piètement pliant de table ronde",
    category: "tables",
    kind: "table",
    description: "Plateau rond en bois retourné, laissant voir le piètement métallique pliant.",
    alt: "Plateau de table ronde retourné montrant le piètement métallique pliant",
  },
  {
    id: "table-rectangulaire-pliable",
    focus: "50% 0%",
    src: "/images/tables/table-rectangulaire-pliable.jpg",
    title: "Table rectangulaire pliable",
    category: "tables",
    kind: "table",
    description: "Tables rectangulaires à plateau bois et pieds métalliques pliants, en entrepôt.",
    alt: "Table rectangulaire pliable à plateau en bois dans un entrepôt",
  },
  {
    id: "tables-entrepot",
    src: "/images/tables/tables-rondes-et-rectangulaire-entrepot.jpg",
    title: "Plateaux ronds et table rectangulaire",
    category: "tables",
    kind: "table",
    description:
      "Plateaux ronds en bois empilés, table rectangulaire pliable et table ronde montée.",
    alt: "Plateaux ronds en bois empilés, table rectangulaire pliable et table ronde",
  },
  {
    id: "tables-mange-debout",
    src: "/images/tables/tables-mange-debout-et-pliables.jpg",
    title: "Tables hautes et tables pliables",
    category: "tables",
    kind: "table",
    description:
      "Tables hautes rondes sur trépied, table rectangulaire repliée et table ronde à piètement croisé.",
    alt: "Tables hautes rondes sur trépied et tables pliables dans un jardin",
  },
  {
    id: "table-ronde-et-rectangulaire",
    src: "/images/tables/table-ronde-et-table-rectangulaire.jpg",
    title: "Table ronde et table rectangulaire",
    category: "tables",
    kind: "table",
    description: "Table ronde à piètement croisé et table rectangulaire pliable.",
    alt: "Table ronde à piètement croisé et table rectangulaire pliable",
  },
  {
    id: "atelier-plateau-profiles",
    src: "/images/tables/atelier-plateau-et-profiles.jpg",
    title: "Matériaux en atelier",
    category: "tables",
    kind: "table",
    description: "Plateau rond en bois et profilés métalliques posés au sol.",
    alt: "Plateau rond en bois et profilés métalliques posés au sol",
    inGallery: false,
  },
  // ——— Podiums ———
  {
    id: "podium-scene-couverte",
    src: "/images/podiums/podium-scene-couverte.jpg",
    title: "Podium de spectacle couvert",
    category: "podiums",
    kind: "podium",
    description:
      "Podium installé en extérieur pour un événement, couvert d'une toiture et encadré de tours en treillis métallique.",
    alt: "Podium de spectacle couvert avec tours en treillis métallique installé en extérieur",
  },
  // ——— Structures métalliques ———
  {
    id: "charpente-metallique-hangar",
    src: "/images/structures-metalliques/charpente-metallique-hangar.jpg",
    title: "Charpente métallique de hangar",
    category: "structures-metalliques",
    kind: "structure",
    description:
      "Ossature métallique d'un hangar — poteaux, fermes et pannes — avant la pose de la couverture.",
    alt: "Ossature métallique d'un hangar avant la pose de la couverture",
    lowRes: true,
  },
  {
    id: "elements-metalliques-atelier",
    src: "/images/structures-metalliques/elements-metalliques-atelier.jpg",
    title: "Éléments métalliques en atelier",
    category: "structures-metalliques",
    kind: "structure",
    description: "Poutres et profilés métalliques en cours de fabrication dans un atelier.",
    alt: "Poutres et profilés métalliques en cours de fabrication dans un atelier",
    lowRes: true,
  },
  {
    id: "hangar-metallique-ouvert",
    src: "/images/structures-metalliques/hangar-metallique-ouvert.jpg",
    title: "Hangar métallique ouvert",
    category: "structures-metalliques",
    kind: "structure",
    description: "Hangar à ossature métallique, ouvert sur les côtés.",
    alt: "Hangar à ossature métallique ouvert sur les côtés",
    lowRes: true,
  },
];

export const gallery: GalleryImage[] = entries.map((e) => {
  const meta = imageMeta[e.src];
  if (!meta) throw new Error(`Image introuvable dans image-meta : ${e.src}`);
  return { ...meta, ...e, inGallery: e.inGallery ?? true };
});

const byId = new Map(gallery.map((img) => [img.id, img]));

export function getImage(id: string): GalleryImage {
  const img = byId.get(id);
  if (!img) throw new Error(`Image inconnue : ${id}`);
  return img;
}

export const galleryImages = gallery.filter((img) => img.inGallery);

export const categoryLabels: Record<GalleryCategory, string> = {
  chapiteaux: "Chapiteaux & tentes",
  tables: "Tables & mobilier",
  podiums: "Podiums & scènes",
  "structures-metalliques": "Structures & hangars",
};

export type GalleryFilter = {
  id: string;
  label: string;
  match: (img: GalleryImage) => boolean;
};

/** Filtres de la page d'accueil. */
export const homeFilters: GalleryFilter[] = [
  { id: "tout", label: "Tout", match: () => true },
  { id: "chapiteaux", label: "Chapiteaux", match: (i) => i.category === "chapiteaux" },
  { id: "tables", label: "Tables", match: (i) => i.category === "tables" },
  { id: "podiums", label: "Podiums", match: (i) => i.category === "podiums" },
  {
    id: "structures-metalliques",
    label: "Structures métalliques",
    match: (i) => i.category === "structures-metalliques",
  },
];

/** Filtres du portfolio (chapiteaux et tentes distingués). */
export const portfolioFilters: GalleryFilter[] = [
  { id: "tout", label: "Tout", match: () => true },
  { id: "chapiteaux", label: "Chapiteaux", match: (i) => i.kind === "chapiteau" },
  { id: "tentes", label: "Tentes", match: (i) => i.kind === "tente" },
  { id: "tables", label: "Tables", match: (i) => i.kind === "table" },
  { id: "podiums", label: "Podiums", match: (i) => i.kind === "podium" },
  {
    id: "structures-metalliques",
    label: "Structures métalliques",
    match: (i) => i.kind === "structure",
  },
];
