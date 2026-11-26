import type { WhatsAppContext } from "@/lib/whatsapp";

/** Domaines d'expertise (page d'accueil). */
export type Expertise = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

export const expertises: Expertise[] = [
  {
    id: "chapiteaux",
    title: "Chapiteaux et tentes",
    description:
      "Chapiteaux à travées, tentes pagode, parois pleines ou transparentes : des abris adaptés à chaque événement.",
    image: "chapiteau-evenement-tapis-rouge",
    href: "/produits#chapiteaux",
  },
  {
    id: "tables",
    title: "Tables et mobilier",
    description:
      "Tables rondes pliables, tables serpentines VIP, tables rectangulaires : le mobilier de vos réceptions.",
    image: "table-serpentine-modules",
    href: "/produits#tables",
  },
  {
    id: "podiums",
    title: "Podiums et équipements",
    description: "Podiums de spectacle pour vos concerts, cérémonies et animations.",
    image: "podium-scene-couverte",
    href: "/produits#podiums",
  },
  {
    id: "structures-metalliques",
    title: "Structures métalliques",
    description: "Charpentes, ossatures de hangars et éléments métalliques réalisés en atelier.",
    image: "charpente-metallique-hangar",
    href: "/produits#structures-metalliques",
  },
];

/** Les deux métiers : fabrication et vente (page Services). */
export type ServiceLine = {
  id: "fabrication" | "vente";
  eyebrow: string;
  title: string;
  intro: string;
  prestations: string[];
  heroImage: string;
  gallery: string[];
  whatsapp: WhatsAppContext;
};

export const serviceLines: ServiceLine[] = [
  {
    id: "fabrication",
    eyebrow: "01 — Fabrication",
    title: "Fabrication sur mesure",
    intro:
      "NTK Production fabrique ses équipements événementiels. Chapiteaux, tentes, tables et podiums peuvent être confectionnés sur commande, selon différentes dimensions, pour répondre précisément à votre besoin.",
    prestations: [
      "Fabrication de chapiteaux",
      "Fabrication de tentes événementielles",
      "Confection de tentes sur commande, selon différentes dimensions",
      "Fabrication de bâches VIP",
      "Fabrication de tables de cérémonie",
      "Fabrication de podiums de spectacle",
      "Réalisations et structures métalliques",
    ],
    heroImage: "table-ronde-pietement-pliant",
    gallery: [
      "atelier-plateau-profiles",
      "tables-entrepot",
      "elements-metalliques-atelier",
      "table-serpentine-modules",
    ],
    whatsapp: "fabrication",
  },
  {
    id: "vente",
    eyebrow: "02 — Vente",
    title: "Vente d'équipements événementiels",
    intro:
      "Vous souhaitez disposer de votre propre matériel ? NTK Production vend les équipements qu'elle fabrique : chapiteaux, tentes, bâches VIP, tables de cérémonie et podiums.",
    prestations: [
      "Vente de chapiteaux",
      "Vente de tentes événementielles",
      "Vente de bâches VIP",
      "Vente de tables : rondes pliables, serpentines VIP, rectangulaires",
      "Vente de podiums de spectacle",
    ],
    heroImage: "chapiteau-structure-longue",
    gallery: [
      "tente-pagode-fenetres-cintrees",
      "tables-mange-debout",
      "tente-pagode-jaune",
      "table-ronde-pietement-croise",
    ],
    whatsapp: "vente",
  },
];

/** Arguments de différenciation — aucune certification ni statistique inventée. */
export const strengths = [
  {
    title: "Fabrication sur mesure",
    text: "Nous fabriquons nos équipements et pouvons confectionner des tentes sur commande, selon différentes dimensions.",
    icon: "ruler",
  },
  {
    title: "Diversité des équipements",
    text: "Chapiteaux, tentes, bâches VIP, tables, podiums et structures métalliques : un interlocuteur unique pour votre événement.",
    icon: "layers",
  },
  {
    title: "Vente directe",
    text: "Équipez-vous durablement : nous vendons le matériel que nous fabriquons, prêt à servir pour tous vos événements.",
    icon: "handshake",
  },
  {
    title: "Solutions adaptées",
    text: "Chaque projet est différent. Nous vous orientons vers les équipements qui correspondent à votre besoin.",
    icon: "target",
  },
  {
    title: "Accompagnement de vos projets",
    text: "Notre équipe reste à votre écoute pour vous conseiller et préparer votre projet avec vous.",
    icon: "handshake",
  },
] as const;
