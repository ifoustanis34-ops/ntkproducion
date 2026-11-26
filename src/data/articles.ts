/**
 * Articles de conseils (rubrique /conseils).
 * Règles : répondre réellement à la question, aucun prix ni chiffre commercial inventé,
 * liens internes vers les pages d'activité concernées.
 */
export type ArticleSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export type Article = {
  slug: string;
  title: string;
  /** Balise <title> si différente du titre */
  seoTitle?: string;
  description: string;
  /** Date ISO de publication */
  date: string;
  image: string;
  intro: string;
  sections: ArticleSection[];
  conclusion: string;
  /** Pages d'activité liées (slugs de data/landings.ts) */
  related: string[];
  quoteMessage: string;
};

export const articles: Article[] = [
  {
    slug: "choisir-chapiteau-mariage-cameroun",
    title: "Comment choisir un chapiteau pour un mariage au Cameroun ?",
    seoTitle: "Choisir un chapiteau pour un mariage au Cameroun",
    description:
      "Nombre d'invités, surface, saison des pluies, type de parois : les critères essentiels pour bien choisir le chapiteau de votre mariage au Cameroun.",
    date: "2026-11-26",
    image: "chapiteau-evenement-tapis-rouge",
    intro:
      "Le chapiteau est souvent le cœur d'un mariage au Cameroun : c'est là que les invités sont accueillis, servis et qu'ils célèbrent les mariés. Un mauvais choix de taille ou de modèle peut gâcher la fête. Voici les points à vérifier avant de commander.",
    sections: [
      {
        title: "1. Estimer la surface à partir du nombre d'invités",
        paragraphs: [
          "La surface nécessaire dépend du nombre de personnes et de la façon dont elles seront installées. Un cocktail debout demande beaucoup moins de place qu'un dîner assis autour de tables rondes.",
          "N'oubliez pas les espaces annexes : table d'honneur, piste de danse, buffet, emplacement de l'orchestre ou du DJ, circulation du service. Ce sont souvent eux qui font la différence entre un chapiteau confortable et un chapiteau trop petit.",
        ],
        list: [
          "Comptez le nombre d'invités attendus, avec une marge pour les imprévus.",
          "Choisissez la disposition : debout, assis en tables rondes ou en tables rectangulaires.",
          "Ajoutez la place de la table d'honneur, du buffet, de la piste et de la sonorisation.",
        ],
      },
      {
        title: "2. Vérifier le terrain disponible",
        paragraphs: [
          "Mesurez la longueur et la largeur réellement utilisables, en tenant compte des arbres, des clôtures, des pentes et des accès. Un terrain plat et dégagé facilite le montage et la stabilité de la structure.",
        ],
      },
      {
        title: "3. Anticiper la pluie et le soleil",
        paragraphs: [
          "À Yaoundé et dans le sud du pays, les saisons des pluies rendent la protection indispensable. Une bâche de toit en bon état et des parois latérales fermables protègent les invités d'une averse soudaine. En saison sèche, l'enjeu devient l'ombre et la ventilation.",
        ],
      },
      {
        title: "4. Choisir le type de parois et le style",
        paragraphs: [
          "Les parois à fenêtres cintrées donnent un aspect élégant et laissent entrer la lumière. Les parois transparentes ouvrent la vue sur l'extérieur. Les parois pleines offrent davantage d'intimité. Pour un espace d'honneur, une tente pagode habillée de voilages crée un effet très soigné.",
        ],
      },
      {
        title: "5. Prévoir le mobilier avec le chapiteau",
        paragraphs: [
          "Les tables et le chapiteau se choisissent ensemble : la forme des tables détermine la surface utile. Les tables rondes favorisent la convivialité, les tables serpentines VIP mettent en valeur la table d'honneur.",
        ],
      },
    ],
    conclusion:
      "Le bon chapiteau est celui qui correspond à votre nombre d'invités, à votre terrain et à la saison. Décrivez votre projet à NTK Production : nous vous conseillons le modèle et les dimensions adaptés, puis nous vous transmettons un devis.",
    related: ["chapiteaux-et-tentes", "mobilier-evenementiel", "baches-vip"],
    quoteMessage: "Bonjour NTK Production, je prépare un mariage et je souhaite un conseil et un devis pour un chapiteau.",
  },
  {
    slug: "prix-chapiteau-yaounde",
    title: "Quel est le prix d'un chapiteau à Yaoundé ?",
    description:
      "Dimensions, parois, finitions, quantités : comprendre ce qui fait varier le prix d'un chapiteau à Yaoundé et comment obtenir un devis précis.",
    date: "2026-11-26",
    image: "chapiteau-structure-longue",
    intro:
      "C'est la première question que se posent la plupart de nos clients. Il n'existe pas de prix unique : le coût d'un chapiteau dépend de plusieurs paramètres. Comprendre ces paramètres vous aide à comparer les offres et à formuler une demande de devis précise.",
    sections: [
      {
        title: "Les facteurs qui font varier le prix",
        paragraphs: ["Le prix d'un chapiteau se construit à partir de quelques éléments principaux :"],
        list: [
          "Les dimensions : longueur, largeur et hauteur déterminent la quantité de métal et de bâche.",
          "La structure : épaisseur des tubes, type d'assemblage, système d'ancrage.",
          "La bâche : qualité de la toile, couleur, résistance à la pluie et au soleil.",
          "Les parois : pleines, à fenêtres cintrées ou transparentes.",
          "Les options : voilages intérieurs, gouttières, portes, personnalisation.",
          "La quantité : plusieurs chapiteaux ou tentes commandés ensemble.",
        ],
      },
      {
        title: "Fabrication sur mesure ou modèle standard ?",
        paragraphs: [
          "Un modèle aux dimensions courantes est généralement plus simple à produire. Une fabrication sur mesure permet d'adapter précisément le chapiteau à votre terrain ou à votre activité. Chez NTK Production, nous fabriquons notre matériel : nous pouvons donc vous proposer l'une ou l'autre option.",
        ],
      },
      {
        title: "Comment obtenir un devis précis ?",
        paragraphs: ["Pour recevoir une estimation fiable, transmettez-nous :"],
        list: [
          "l'usage prévu (mariages, événements d'entreprise, activité commerciale…) ;",
          "les dimensions souhaitées ou le nombre de personnes à abriter ;",
          "le type de parois et les options désirées ;",
          "la quantité et le délai souhaité.",
        ],
      },
      {
        title: "Attention aux comparaisons trompeuses",
        paragraphs: [
          "Deux chapiteaux de même taille peuvent avoir des prix très différents selon la qualité de la structure et de la toile. Demandez toujours le détail des matériaux pour comparer ce qui est comparable : un chapiteau robuste dure plus longtemps et se rentabilise mieux.",
        ],
      },
    ],
    conclusion:
      "Le prix d'un chapiteau dépend avant tout de vos besoins. NTK Production établit gratuitement un devis personnalisé : décrivez-nous votre projet sur WhatsApp ou via le formulaire de contact.",
    related: ["chapiteaux-et-tentes", "baches-vip"],
    quoteMessage: "Bonjour NTK Production, je souhaite connaître le prix d'un chapiteau pour mon projet.",
  },
  {
    slug: "acheter-ou-faire-fabriquer-materiel-evenementiel-yaounde",
    title: "Où acheter du matériel événementiel à Yaoundé ?",
    description:
      "Organisateurs, traiteurs, salles des fêtes : comment choisir entre matériel standard et fabrication sur mesure, et à quoi faire attention avant d'acheter à Yaoundé.",
    date: "2026-11-26",
    image: "tables-entrepot",
    intro:
      "Que vous lanciez une activité d'organisation d'événements, que vous gériez une salle des fêtes ou que vous souhaitiez équiper votre association, acheter son propre matériel est un investissement. Voici comment le réussir à Yaoundé.",
    sections: [
      {
        title: "Pourquoi acheter plutôt que dépendre d'un prestataire ?",
        paragraphs: [
          "Disposer de son propre matériel donne de la liberté : vous organisez vos événements quand vous le souhaitez, sans dépendre de la disponibilité d'un tiers. Pour un professionnel, c'est aussi un outil de travail qui se rentabilise au fil des événements.",
        ],
      },
      {
        title: "Privilégier un fabricant local",
        paragraphs: ["Acheter directement auprès d'un fabricant installé à Yaoundé présente plusieurs avantages :"],
        list: [
          "vous voyez le matériel et sa fabrication avant d'acheter ;",
          "les dimensions peuvent être adaptées à votre besoin ;",
          "les pièces de remplacement (bâches, tubes, plateaux) sont plus faciles à obtenir ;",
          "les échanges se font directement, sans intermédiaire.",
        ],
      },
      {
        title: "Les équipements essentiels pour démarrer",
        paragraphs: [
          "Un organisateur d'événements commence généralement par des chapiteaux ou des tentes, des tables et une estrade ou un podium. Les bâches VIP complètent l'ensemble pour les espaces d'honneur.",
        ],
      },
      {
        title: "Les points à vérifier avant d'acheter",
        paragraphs: [],
        list: [
          "La solidité de la structure métallique et la qualité des soudures.",
          "La qualité de la toile : épaisseur, étanchéité, tenue au soleil.",
          "La facilité de montage, de transport et de rangement.",
          "La possibilité de remplacer une pièce endommagée.",
        ],
      },
    ],
    conclusion:
      "NTK Production fabrique et vend chapiteaux, tentes, bâches VIP, tables et podiums depuis le Camp Tunisien à Yaoundé. Contactez-nous pour composer l'équipement adapté à votre activité.",
    related: ["chapiteaux-et-tentes", "mobilier-evenementiel", "podiums-et-scenes"],
    quoteMessage: "Bonjour NTK Production, je souhaite acheter du matériel événementiel et obtenir un devis.",
  },
  {
    slug: "choisir-hangar-metallique-entreprise",
    title: "Comment choisir un hangar métallique pour son entreprise ?",
    seoTitle: "Choisir un hangar métallique pour son entreprise",
    description:
      "Usage, dimensions, hauteur, couverture, terrain et démarches : les critères pour choisir un hangar métallique adapté à votre entreprise au Cameroun.",
    date: "2026-11-26",
    image: "hangar-metallique-ouvert",
    intro:
      "Un hangar métallique est un investissement durable pour une entreprise : stockage, atelier, espace commercial ou abri pour engins. Pour qu'il réponde vraiment à vos besoins, plusieurs choix doivent être faits dès la conception.",
    sections: [
      {
        title: "1. Définir l'usage du hangar",
        paragraphs: [
          "Tout part de l'usage. Un hangar de stockage de marchandises, un atelier de production et un abri pour camions n'ont pas les mêmes exigences de hauteur, d'ouvertures, de ventilation ni de sol.",
        ],
      },
      {
        title: "2. Fixer les dimensions et la hauteur",
        paragraphs: [
          "La surface au sol dépend de ce que vous devez abriter, avec les espaces de circulation. La hauteur dépend des engins ou des rayonnages : un camion ou un chariot élévateur demande une hauteur libre suffisante sous la charpente.",
          "Pensez aussi à l'avenir : un hangar conçu pour être agrandi pourra recevoir des travées supplémentaires lorsque votre activité se développera.",
        ],
      },
      {
        title: "3. Choisir entre hangar ouvert et hangar fermé",
        paragraphs: [
          "Un hangar ouvert protège de la pluie et du soleil tout en restant ventilé, ce qui convient au stationnement ou au stockage de matériaux. Un hangar bardé sur tout ou partie de ses côtés protège mieux le contenu et sécurise l'accès.",
        ],
      },
      {
        title: "4. Étudier le terrain",
        paragraphs: [
          "La nature du sol, la pente et l'accès des véhicules influencent les fondations et l'implantation. L'écoulement des eaux de pluie doit être prévu pour éviter les inondations à l'intérieur du hangar.",
        ],
      },
      {
        title: "5. Se renseigner sur les démarches",
        paragraphs: [
          "Selon la taille et l'emplacement de l'ouvrage, une autorisation peut être nécessaire. Renseignez-vous auprès de la mairie de votre commune avant de lancer les travaux.",
        ],
      },
    ],
    conclusion:
      "Un hangar bien conçu répond à votre usage d'aujourd'hui et à votre croissance de demain. NTK Production fabrique des hangars métalliques sur mesure : présentez-nous votre projet pour obtenir un devis.",
    related: ["hangars-metalliques", "construction-metallique"],
    quoteMessage: "Bonjour NTK Production, je souhaite un conseil et un devis pour un hangar métallique.",
  },
  {
    slug: "avantages-charpente-metallique",
    title: "Quels sont les avantages d'une charpente métallique ?",
    seoTitle: "Les avantages d'une charpente métallique",
    description:
      "Rapidité, grandes portées, résistance aux termites, évolutivité : les avantages d'une charpente métallique et les points d'attention au Cameroun.",
    date: "2026-11-26",
    image: "charpente-metallique-hangar",
    intro:
      "Bois, béton ou métal ? Pour les hangars, les bâtiments commerciaux et de nombreux abris, la charpente métallique s'impose de plus en plus. Voici pourquoi, et ce qu'il faut surveiller pour en profiter pleinement.",
    sections: [
      {
        title: "Les principaux avantages",
        paragraphs: [],
        list: [
          "Rapidité : les éléments sont préparés en atelier, ce qui réduit le temps de montage sur le chantier.",
          "Grandes portées : l'acier permet de couvrir de larges espaces sans poteaux intermédiaires.",
          "Résistance aux termites : contrairement au bois, le métal n'est pas attaqué par les insectes.",
          "Légèreté : à résistance égale, une structure métallique est plus légère, ce qui allège les fondations.",
          "Évolutivité : une structure métallique peut être agrandie ou modifiée plus facilement.",
          "Recyclabilité : l'acier se recycle en fin de vie.",
        ],
      },
      {
        title: "Les points d'attention",
        paragraphs: [
          "Le principal ennemi du métal est la corrosion, surtout en climat humide. Une protection adaptée (traitement antirouille, peinture) et un entretien régulier prolongent la durée de vie de la charpente.",
          "Le dimensionnement doit aussi être sérieux : sections des profilés, assemblages et ancrages sont calculés en fonction de la portée, de la couverture et des efforts dus au vent.",
        ],
      },
      {
        title: "Pour quels projets ?",
        paragraphs: [
          "Hangars industriels et de stockage, bâtiments commerciaux, auvents, abris de parking, préaux, podiums et structures événementielles : la charpente métallique s'adapte à une grande variété d'ouvrages.",
        ],
      },
    ],
    conclusion:
      "La charpente métallique allie rapidité, robustesse et souplesse. NTK Production conçoit et fabrique des charpentes et structures métalliques sur mesure à Yaoundé : contactez-nous pour étudier votre projet.",
    related: ["construction-metallique", "hangars-metalliques"],
    quoteMessage: "Bonjour NTK Production, je souhaite un devis pour une charpente métallique.",
  },
  {
    slug: "commander-tente-evenementielle-sur-mesure",
    title: "Comment commander une tente événementielle sur mesure ?",
    seoTitle: "Commander une tente événementielle sur mesure",
    description:
      "Usage, dimensions, couleur, parois, délai : les informations à préparer pour commander une tente événementielle sur mesure auprès d'un fabricant à Yaoundé.",
    date: "2026-11-26",
    image: "tente-pagode-fenetres-cintrees",
    intro:
      "Une tente sur mesure répond exactement à votre besoin : un format particulier, une couleur à vos couleurs, un usage spécifique. Pour que la commande se passe bien, il suffit de préparer quelques informations.",
    sections: [
      {
        title: "Étape 1 : préciser l'usage",
        paragraphs: [
          "Réception, stand d'exposition, espace VIP, point d'accueil, activité commerciale : l'usage détermine le modèle (tente pagode, chapiteau, tente pliante), la robustesse attendue et la fréquence de montage.",
        ],
      },
      {
        title: "Étape 2 : définir les dimensions",
        paragraphs: [
          "Indiquez la surface souhaitée ou le nombre de personnes à accueillir, ainsi que les contraintes du lieu d'installation habituel. Si vous hésitez, nous vous aidons à déterminer les bonnes dimensions.",
        ],
      },
      {
        title: "Étape 3 : choisir les finitions",
        paragraphs: [],
        list: [
          "La couleur de la toile (blanc, couleurs, aux couleurs de votre marque).",
          "Le type de parois : pleines, à fenêtres cintrées, transparentes.",
          "Les options : voilages intérieurs, banderole, portes.",
        ],
      },
      {
        title: "Étape 4 : demander un devis et valider",
        paragraphs: [
          "Avec ces informations, nous établissons un devis détaillé. Une fois validé, la tente est fabriquée dans notre atelier. Le délai dépend du modèle et de la quantité : il vous est indiqué dans le devis.",
        ],
      },
    ],
    conclusion:
      "Commander une tente sur mesure, c'est s'assurer d'un équipement adapté pour longtemps. Envoyez votre demande à NTK Production sur WhatsApp, avec une photo ou un croquis si vous en avez.",
    related: ["chapiteaux-et-tentes", "baches-vip"],
    quoteMessage: "Bonjour NTK Production, je souhaite commander une tente événementielle sur mesure.",
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
