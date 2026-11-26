export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Services", href: "/services" },
  { label: "Produits", href: "/produits" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Conseils", href: "/conseils" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
];
