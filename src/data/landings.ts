import type { RangeId } from "@/lib/catalog/types";

/**
 * Pages d'activité optimisées pour le référencement (une page = une intention de recherche).
 * Contenu factuel uniquement : aucun chiffre, délai, prix ou référence client inventé.
 */
export type LandingSection = {
  title: string;
  paragraphs: string[];
  /** Sous-parties (H3) facultatives */
  subsections?: { title: string; text: string }[];
};

export type Landing = {
  slug: string;
  /** Balise <title> (sans le suffixe « | NTK Production ») */
  seoTitle: string;
  metaDescription: string;
  /** Libellé court : fil d'Ariane, menus, liens internes */
  label: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroImage: string;
  /** Liste « Ce que nous proposons » */
  offer: string[];
  sections: LandingSection[];
  /** Fiches produits associées */
  productCategory?: RangeId;
  /** Photos affichées quand aucune fiche produit n'existe encore */
  gallery?: string[];
  faq: { question: string; answer: string }[];
  /** Slugs d'autres pages d'activité liées */
  related: string[];
  /** Articles de conseils liés (slugs) */
  articles: string[];
  /** Nom du service pour les données structurées */
  serviceType: string;
  quoteMessage: string;
};

export const landings: Landing[] = [
  {
    slug: "chapiteaux-et-tentes",
    seoTitle: "Fabricant de chapiteaux et tentes à Yaoundé",
    metaDescription:
      "NTK Production fabrique et vend chapiteaux de cérémonie, chapiteaux VIP et tentes événementielles sur mesure à Yaoundé, Cameroun. Devis gratuit sur WhatsApp.",
    label: "Chapiteaux et tentes",
    eyebrow: "Chapiteaux et tentes événementielles",
    h1: "Fabricant de chapiteaux et de tentes événementielles à Yaoundé",
    intro:
      "Mariages, dots, obsèques, réceptions, salons ou lancements de produits : NTK Production fabrique et vend des chapiteaux et des tentes adaptés à chaque événement, depuis son atelier du Camp Tunisien à Yaoundé.",
    heroImage: "chapiteau-structure-longue",
    offer: [
      "Chapiteaux de cérémonie",
      "Chapiteaux VIP",
      "Tentes événementielles",
      "Tentes de réception",
      "Tentes pliantes",
      "Tentes sur mesure, selon vos dimensions",
    ],
    sections: [
      {
        title: "Des chapiteaux fabriqués pour vos cérémonies",
        paragraphs: [
          "Nos chapiteaux à travées offrent de grands espaces couverts pour accueillir vos invités à l'abri du soleil et de la pluie. Les parois peuvent être pleines, à fenêtres cintrées ou transparentes, selon l'ambiance recherchée et la luminosité souhaitée.",
          "Parce que nous fabriquons nous-mêmes notre matériel, nous pouvons adapter la longueur, la couleur des bâches et la configuration des parois à votre projet.",
        ],
      },
      {
        title: "Tentes événementielles et tentes pagode",
        paragraphs: [
          "Les tentes pagode, reconnaissables à leur toit pointu, conviennent aux espaces d'accueil, aux stands, aux espaces VIP et aux réceptions de taille moyenne. Plusieurs tentes peuvent être juxtaposées pour former un ensemble plus vaste.",
        ],
        subsections: [
          {
            title: "Tentes de réception",
            text: "Habillées de voilages intérieurs, elles créent un espace élégant pour un mariage, un cocktail ou une cérémonie officielle.",
          },
          {
            title: "Tentes pliantes",
            text: "Rapides à monter et faciles à transporter, elles répondent aux besoins ponctuels : marchés, stands, points d'accueil.",
          },
          {
            title: "Tentes sur mesure",
            text: "Nous confectionnons des tentes sur commande, selon différentes dimensions, pour les projets qui sortent des formats habituels.",
          },
        ],
      },
      {
        title: "Comment commander votre chapiteau ?",
        paragraphs: [
          "Indiquez-nous le type d'événement, le nombre d'invités, la surface disponible et la date souhaitée. Nous vous orientons vers le modèle et les dimensions adaptés, puis nous vous transmettons un devis détaillé.",
        ],
      },
    ],
    productCategory: "chapiteaux",
    faq: [
      {
        question: "Quelle taille de chapiteau choisir pour mon événement ?",
        answer:
          "La surface dépend du nombre d'invités et de la disposition : une réception debout demande moins d'espace qu'un dîner assis avec tables rondes. Décrivez-nous votre événement et nous vous conseillons les dimensions adaptées.",
      },
      {
        question: "Pouvez-vous fabriquer une tente à des dimensions précises ?",
        answer:
          "Oui. NTK Production confectionne des tentes sur commande, selon différentes dimensions. Communiquez-nous vos mesures et l'usage prévu pour obtenir un devis.",
      },
      {
        question: "Quel est le prix d'un chapiteau ?",
        answer:
          "Le prix dépend des dimensions, du type de parois, des finitions et des quantités. Nous établissons un devis personnalisé pour chaque demande, gratuitement, par WhatsApp ou via le formulaire de contact.",
      },
    ],
    related: ["baches-vip", "mobilier-evenementiel", "podiums-et-scenes"],
    articles: ["choisir-chapiteau-mariage-cameroun", "prix-chapiteau-yaounde", "commander-tente-evenementielle-sur-mesure"],
    serviceType: "Fabrication et vente de chapiteaux et tentes événementielles",
    quoteMessage: "Bonjour NTK Production, je souhaite obtenir un devis pour un chapiteau ou une tente événementielle.",
  },
  {
    slug: "baches-vip",
    seoTitle: "Bâches VIP et bâches de cérémonie au Cameroun",
    metaDescription:
      "Fabrication et vente de bâches VIP, bâches de cérémonie, bâches de protection et bâches pour chapiteaux à Yaoundé. Bâches personnalisées sur demande. Devis rapide.",
    label: "Bâches VIP",
    eyebrow: "Bâches et couvertures",
    h1: "Bâches VIP, bâches de cérémonie et bâches de protection",
    intro:
      "NTK Production fabrique et vend des bâches pour l'événementiel et la protection : bâches VIP pour vos espaces d'honneur, bâches de cérémonie, bâches de remplacement pour chapiteaux et bâches personnalisées.",
    heroImage: "chapiteau-evenement-tapis-rouge",
    offer: ["Bâches VIP", "Bâches de cérémonie", "Bâches de protection", "Bâches pour chapiteaux", "Bâches personnalisées"],
    sections: [
      {
        title: "Bâches VIP et bâches de cérémonie",
        paragraphs: [
          "La bâche VIP couvre les espaces réservés aux invités d'honneur, aux officiels ou aux mariés. Elle apporte de l'ombre, protège de la pluie et marque visuellement l'espace principal de la cérémonie.",
        ],
      },
      {
        title: "Bâches pour chapiteaux et bâches de protection",
        paragraphs: [
          "Une bâche de chapiteau usée ou déchirée peut être remplacée sans changer toute la structure. Nous fabriquons également des bâches de protection pour couvrir du matériel, une zone de travail ou un espace de stockage.",
        ],
      },
      {
        title: "Des bâches personnalisées selon votre besoin",
        paragraphs: [
          "Dimensions, couleur, ouvertures : précisez l'usage de votre bâche et la structure qui la recevra. Nous vous proposons une solution adaptée et un devis détaillé.",
        ],
      },
    ],
    productCategory: "baches",
    gallery: ["chapiteau-evenement-tapis-rouge", "tente-pagode-interieur-drape", "tente-pagode-jaune", "chapiteau-parois-transparentes"],
    faq: [
      {
        question: "Pouvez-vous fabriquer une bâche pour mon chapiteau existant ?",
        answer:
          "Envoyez-nous les dimensions de votre structure et, si possible, une photo. Nous vous indiquerons la solution adaptée et le devis correspondant.",
      },
      {
        question: "Quelle différence entre une bâche VIP et une bâche de protection ?",
        answer:
          "La bâche VIP est pensée pour l'événementiel : elle couvre un espace d'accueil et participe au décor. La bâche de protection est utilitaire : elle couvre du matériel, une zone de travail ou un stock.",
      },
    ],
    related: ["chapiteaux-et-tentes", "mobilier-evenementiel", "hangars-metalliques"],
    articles: ["choisir-chapiteau-mariage-cameroun", "commander-tente-evenementielle-sur-mesure"],
    serviceType: "Fabrication et vente de bâches VIP et bâches de cérémonie",
    quoteMessage: "Bonjour NTK Production, je souhaite obtenir un devis pour des bâches (VIP, cérémonie ou protection).",
  },
  {
    slug: "mobilier-evenementiel",
    seoTitle: "Tables de cérémonie et mobilier à Yaoundé",
    metaDescription:
      "Fabrication et vente de tables rondes pliables, tables serpentines VIP, tables rectangulaires, tables de traiteur et mobilier de réception à Yaoundé, Cameroun.",
    label: "Mobilier événementiel",
    eyebrow: "Tables et mobilier événementiel",
    h1: "Tables de cérémonie et mobilier événementiel",
    intro:
      "Recevoir ses invités confortablement commence par un mobilier adapté. NTK Production fabrique et vend des tables rondes, rectangulaires, serpentines VIP et des tables de traiteur pour vos mariages, réceptions et cérémonies.",
    heroImage: "table-serpentine-vip",
    offer: ["Tables rondes", "Tables rectangulaires", "Tables de cérémonie", "Tables de traiteur", "Mobilier de réception"],
    sections: [
      {
        title: "Des tables fabriquées pour durer",
        paragraphs: [
          "Nos tables associent un plateau en bois et un piètement métallique. Les modèles pliants se transportent et se rangent facilement, un atout pour les organisateurs qui enchaînent les événements.",
        ],
        subsections: [
          {
            title: "Tables rondes pliables",
            text: "Le format classique des dîners de mariage et des banquets, qui favorise la convivialité entre invités.",
          },
          {
            title: "Tables serpentines VIP",
            text: "Assemblées en modules, elles dessinent des lignes courbes élégantes pour les tables d'honneur et les buffets.",
          },
          {
            title: "Tables rectangulaires et tables de traiteur",
            text: "Idéales pour les buffets, le service traiteur, les tables d'honneur en ligne ou les espaces de travail.",
          },
        ],
      },
      {
        title: "Équiper votre salle ou votre activité",
        paragraphs: [
          "Salles des fêtes, traiteurs, organisateurs d'événements ou particuliers : nous vous conseillons sur les formats et les quantités en fonction de vos espaces et de vos usages.",
        ],
      },
    ],
    productCategory: "tables",
    faq: [
      {
        question: "Vendez-vous des tables en grande quantité ?",
        answer: "Oui, indiquez-nous les modèles et les quantités souhaités : nous vous transmettons un devis adapté à votre commande.",
      },
      {
        question: "Les tables sont-elles pliables ?",
        answer:
          "Les tables rondes et rectangulaires présentées disposent d'un piètement pliant, pratique pour le transport et le stockage.",
      },
    ],
    related: ["chapiteaux-et-tentes", "podiums-et-scenes", "baches-vip"],
    articles: ["acheter-ou-faire-fabriquer-materiel-evenementiel-yaounde", "choisir-chapiteau-mariage-cameroun"],
    serviceType: "Fabrication et vente de tables et mobilier événementiel",
    quoteMessage: "Bonjour NTK Production, je souhaite obtenir un devis pour des tables et du mobilier événementiel.",
  },
  {
    slug: "podiums-et-scenes",
    seoTitle: "Podiums de spectacle et scènes au Cameroun",
    metaDescription:
      "NTK Production fabrique et vend des podiums de spectacle, estrades, plateformes événementielles et structures de scène à Yaoundé. Devis sur mesure par WhatsApp.",
    label: "Podiums et scènes",
    eyebrow: "Podiums et structures de spectacle",
    h1: "Fabrication de podiums de spectacle, estrades et structures de scène",
    intro:
      "Concerts, spectacles, meetings, cérémonies officielles ou remises de diplômes : NTK Production fabrique et vend des podiums, des estrades et des structures de scène adaptés à votre événement.",
    heroImage: "podium-scene-couverte",
    offer: ["Podiums de spectacle", "Estrades", "Plateformes événementielles", "Structures de scène"],
    sections: [
      {
        title: "Podiums de spectacle et scènes couvertes",
        paragraphs: [
          "Un podium surélève les artistes, les orateurs ou les officiels pour qu'ils soient vus de tous. Couvert d'une toiture et encadré de tours en treillis métallique, il protège aussi le matériel et les intervenants.",
        ],
      },
      {
        title: "Estrades et plateformes événementielles",
        paragraphs: [
          "Pour une table d'honneur, un discours ou un défilé, une estrade ou une plateforme délimite l'espace principal et améliore la visibilité. Les dimensions sont définies selon votre lieu et votre programme.",
        ],
      },
      {
        title: "Une fabrication en structure métallique",
        paragraphs: [
          "Notre savoir-faire en construction métallique nous permet de fabriquer des podiums et des structures de scène robustes, conçues pour être montées et démontées à chaque événement.",
        ],
      },
    ],
    productCategory: "podiums",
    faq: [
      {
        question: "Quelles dimensions pour un podium de spectacle ?",
        answer:
          "Elles dépendent du nombre d'intervenants, du matériel de sonorisation et de l'espace disponible. Décrivez-nous votre événement pour obtenir une proposition adaptée.",
      },
      {
        question: "Le podium peut-il être couvert ?",
        answer: "Oui, un podium peut être équipé d'une toiture pour protéger les intervenants et le matériel du soleil et de la pluie.",
      },
    ],
    related: ["chapiteaux-et-tentes", "construction-metallique", "mobilier-evenementiel"],
    articles: ["acheter-ou-faire-fabriquer-materiel-evenementiel-yaounde"],
    serviceType: "Fabrication et vente de podiums et structures de scène",
    quoteMessage: "Bonjour NTK Production, je souhaite obtenir un devis pour un podium ou une structure de scène.",
  },
  {
    slug: "construction-metallique",
    seoTitle: "Construction métallique à Yaoundé, Cameroun",
    metaDescription:
      "Entreprise de construction métallique à Yaoundé : charpentes, ossatures, abris et structures métalliques sur mesure au Cameroun. NTK Production, devis gratuit.",
    label: "Construction métallique",
    eyebrow: "Construction métallique",
    h1: "Construction métallique à Yaoundé : charpentes, ossatures et structures sur mesure",
    intro:
      "Au-delà de l'événementiel, NTK Production conçoit et fabrique des structures métalliques pour les particuliers, les commerces et les entreprises : charpentes, ossatures, abris et ouvrages sur mesure.",
    heroImage: "charpente-metallique-hangar",
    offer: [
      "Structures métalliques sur mesure",
      "Charpentes métalliques",
      "Ossatures métalliques",
      "Abris métalliques",
      "Fabrication de hangars métalliques",
      "Conception et fabrication en atelier",
    ],
    sections: [
      {
        title: "Charpentes et ossatures métalliques",
        paragraphs: [
          "La charpente métallique permet de couvrir de grandes portées avec une structure légère et résistante. Elle est utilisée pour les hangars, les bâtiments commerciaux, les auvents et les extensions.",
          "L'ossature métallique forme le squelette d'un ouvrage : poteaux, poutres et contreventements sont dimensionnés selon l'usage du bâtiment et les charges qu'il doit supporter.",
        ],
      },
      {
        title: "Structures et abris métalliques sur mesure",
        paragraphs: [
          "Abris de parking, auvents, préaux, structures pour l'événementiel : chaque ouvrage est fabriqué selon vos dimensions et votre usage. Les éléments sont préparés en atelier avant leur assemblage.",
        ],
      },
      {
        title: "De l'étude à la fabrication",
        paragraphs: [
          "Nous échangeons d'abord sur votre besoin, votre terrain et votre budget. Nous définissons ensuite la structure adaptée et vous remettons un devis détaillé avant toute fabrication.",
        ],
      },
    ],
    productCategory: "structures-metalliques",
    faq: [
      {
        question: "Quels types de structures métalliques réalisez-vous ?",
        answer:
          "Charpentes, ossatures, hangars, abris et structures métalliques sur mesure, pour les particuliers comme pour les entreprises.",
      },
      {
        question: "Intervenez-vous en dehors de Yaoundé ?",
        answer:
          "NTK Production est basée à Yaoundé. Les projets dans d'autres villes du Cameroun sont étudiés au cas par cas : les conditions sont précisées dans le devis.",
      },
    ],
    related: ["hangars-metalliques", "podiums-et-scenes", "chapiteaux-et-tentes"],
    articles: ["avantages-charpente-metallique", "choisir-hangar-metallique-entreprise"],
    serviceType: "Construction métallique : charpentes, ossatures et structures sur mesure",
    quoteMessage: "Bonjour NTK Production, je souhaite obtenir un devis pour une structure ou une charpente métallique.",
  },
  {
    slug: "hangars-metalliques",
    seoTitle: "Hangars métalliques sur mesure à Yaoundé",
    metaDescription:
      "Fabrication de hangars métalliques sur mesure à Yaoundé : hangars industriels, de stockage et commerciaux partout au Cameroun. Devis gratuit.",
    label: "Hangars métalliques",
    eyebrow: "Hangars métalliques",
    h1: "Fabrication de hangars métalliques sur mesure au Cameroun",
    intro:
      "Stocker des marchandises, abriter des machines, ouvrir un espace de vente : NTK Production fabrique des hangars métalliques sur mesure, dimensionnés selon votre activité et votre terrain.",
    heroImage: "hangar-metallique-ouvert",
    offer: [
      "Hangars industriels",
      "Hangars de stockage",
      "Hangars commerciaux",
      "Hangars ouverts ou fermés",
      "Charpentes de hangar",
      "Hangars sur mesure",
    ],
    sections: [
      {
        title: "Un hangar adapté à votre activité",
        paragraphs: [
          "Chaque hangar répond à un usage précis. Les dimensions, la hauteur, les ouvertures et la couverture sont définies avec vous en fonction de ce que le bâtiment doit accueillir.",
        ],
        subsections: [
          {
            title: "Hangars industriels",
            text: "Pour les ateliers, les unités de production et le stationnement d'engins, avec de grandes portées libres de poteaux intermédiaires.",
          },
          {
            title: "Hangars de stockage",
            text: "Pour protéger vos marchandises, matériaux ou récoltes du soleil et de la pluie.",
          },
          {
            title: "Hangars commerciaux",
            text: "Pour créer un espace de vente, un marché couvert ou un point de distribution.",
          },
        ],
      },
      {
        title: "Pourquoi choisir un hangar métallique ?",
        paragraphs: [
          "La structure métallique se fabrique rapidement, résiste aux termites contrairement au bois, et permet de couvrir de grandes surfaces. Elle peut aussi être agrandie plus tard en ajoutant des travées.",
        ],
      },
      {
        title: "Préparer votre projet de hangar",
        paragraphs: [
          "Pour établir un devis, nous avons besoin de connaître l'usage du hangar, les dimensions souhaitées, l'emplacement du terrain et le type de fermeture envisagé (hangar ouvert, partiellement ou entièrement bardé).",
        ],
      },
    ],
    productCategory: "structures-metalliques",
    faq: [
      {
        question: "Combien coûte un hangar métallique ?",
        answer:
          "Le prix dépend des dimensions, de la hauteur, du type de couverture et du bardage. Chaque hangar étant fabriqué sur mesure, nous établissons un devis personnalisé.",
      },
      {
        question: "Peut-on agrandir un hangar métallique plus tard ?",
        answer:
          "Oui, la construction métallique se prête bien aux extensions : des travées supplémentaires peuvent être ajoutées si la conception initiale le prévoit.",
      },
    ],
    related: ["construction-metallique", "baches-vip", "podiums-et-scenes"],
    articles: ["choisir-hangar-metallique-entreprise", "avantages-charpente-metallique"],
    serviceType: "Fabrication et construction de hangars métalliques",
    quoteMessage: "Bonjour NTK Production, je souhaite obtenir un devis pour un hangar métallique.",
  },
];

export function getLanding(slug: string) {
  const l = landings.find((x) => x.slug === slug);
  if (!l) throw new Error(`Page d'activité inconnue : ${slug}`);
  return l;
}
